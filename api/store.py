"""In-memory indexes over the real dictionary.json files."""

from __future__ import annotations

import copy
import json
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from api import REPO_ROOT
from api.catalog import DatasetRef, load_catalog
from api.settings import API_ORIGIN

APOSTROPHES = dict.fromkeys(map(ord, "‘’ʼ´`"), "'")
META_SKIP = frozenset({"entries"})


def fold(text: str) -> str:
    text = unicodedata.normalize("NFC", text).strip().casefold()
    text = text.translate(APOSTROPHES)
    return " ".join(text.split())


def fold_loose(text: str) -> str:
    decomposed = unicodedata.normalize("NFD", fold(text))
    return "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")


def _headword_keys(entry: Dict[str, Any]) -> List[str]:
    values = [entry.get("headword") or ""]
    for variant in entry.get("variants") or []:
        if isinstance(variant, str):
            values.append(variant)
        elif isinstance(variant, dict):
            values.append(variant.get("form") or variant.get("headword") or "")
    return [value for value in values if value]


@dataclass
class Dataset:
    ref: DatasetRef
    document: Dict[str, Any]
    entries: List[Dict[str, Any]] = field(default_factory=list)
    by_id: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    by_fold: Dict[str, List[Dict[str, Any]]] = field(default_factory=dict)
    by_loose: Dict[str, List[Dict[str, Any]]] = field(default_factory=dict)

    @property
    def kind(self) -> str:
        return self.ref.kind

    @property
    def missing_term(self) -> Dict[str, Any]:
        return dict(self.document.get("missing_term") or {
            "status": "error",
            "code": "TERM_NOT_FOUND",
            "message": "Translation not available in the verified database.",
        })

    def metadata(self) -> Dict[str, Any]:
        payload = {
            key: copy.deepcopy(value)
            for key, value in self.document.items()
            if key not in META_SKIP
        }
        payload["dataset"] = self.ref.key
        payload["kind"] = self.ref.kind
        if self.ref.canonical_key:
            payload["canonical_dataset"] = self.ref.canonical_key
        payload["entry_count"] = len(self.entries)
        return payload


class Store:
    def __init__(self, datasets: Dict[str, Dataset]) -> None:
        self.datasets = datasets

    @classmethod
    def load(cls) -> "Store":
        catalog = load_catalog()
        loaded: Dict[str, Dataset] = {}
        for key, ref in catalog.items():
            with ref.json_path.open(encoding="utf-8") as handle:
                document = json.load(handle)
            dataset = Dataset(ref=ref, document=document)
            if ref.kind == "lexicon":
                _index_entries(dataset, document.get("entries") or [])
            loaded[key] = dataset

        angola = loaded["angola"]
        canonical = loaded[angola.ref.canonical_key]
        angola.entries = canonical.entries
        angola.by_id = canonical.by_id
        angola.by_fold = canonical.by_fold
        angola.by_loose = canonical.by_loose
        return cls(loaded)

    def get(self, key: str) -> Optional[Dataset]:
        return self.datasets.get(key)

    def require(self, key: str) -> Dataset:
        dataset = self.get(key)
        if dataset is None:
            raise KeyError(key)
        return dataset

    def resolve_key(self, family: str, variety: Optional[str] = None) -> Optional[str]:
        if variety:
            return f"{family}/{variety}"
        return family

    def catalog(self) -> List[Dict[str, Any]]:
        items = []
        for key in sorted(self.datasets):
            dataset = self.datasets[key]
            meta = dataset.metadata()
            items.append(
                {
                    "dataset": key,
                    "kind": dataset.kind,
                    "language": meta.get("language"),
                    "language_name": meta.get("language_name"),
                    "iso_639_3": meta.get("iso_639_3"),
                    "entry_count": meta.get("entry_count"),
                    "canonical_dataset": meta.get("canonical_dataset"),
                    "path": str(dataset.ref.json_path.relative_to(REPO_ROOT)),
                }
            )
        return items


def _index_entries(dataset: Dataset, entries: List[Dict[str, Any]]) -> None:
    dataset.entries = entries
    for entry in entries:
        entry_id = entry.get("id")
        if entry_id:
            dataset.by_id[entry_id] = entry
        for value in _headword_keys(entry):
            dataset.by_fold.setdefault(fold(value), []).append(entry)
            dataset.by_loose.setdefault(fold_loose(value), []).append(entry)


def present_entry(
    dataset: Dataset,
    entry: Dict[str, Any],
    base_url: Optional[str] = None,
) -> Dict[str, Any]:
    origin = (base_url or API_ORIGIN).rstrip("/")
    payload = copy.deepcopy(entry)
    audio_items = payload.get("audio") or []
    for item in audio_items:
        relative = (item.get("file") or "").replace("\\", "/")
        filename = Path(relative).name
        if filename:
            item["url"] = f"{origin}/v1/{dataset.ref.key}/audio/{filename}"
    return payload


def lookup_headword(dataset: Dataset, headword: str) -> Tuple[str, List[Dict[str, Any]]]:
    needle = unicodedata.normalize("NFC", headword).strip()
    if not needle:
        return "exact", []

    folded = fold(needle)
    loose = fold_loose(needle)

    exact = [
        entry
        for entry in dataset.by_fold.get(folded, [])
        if unicodedata.normalize("NFC", (entry.get("headword") or "")).strip() == needle
    ]
    if exact:
        return "exact", _unique(exact)

    folded_hits = dataset.by_fold.get(folded) or []
    if folded_hits:
        return "normalized", _unique(folded_hits)

    if len(loose) > 1:
        loose_hits = dataset.by_loose.get(loose) or []
        if loose_hits:
            return "diacritic-insensitive", _unique(loose_hits)
    return "exact", []


def search_entries(dataset: Dataset, query: str) -> List[Dict[str, Any]]:
    needle = fold(query)
    if not needle:
        return list(dataset.entries)

    scored: List[Tuple[int, int, Dict[str, Any]]] = []
    for index, entry in enumerate(dataset.entries):
        headword = fold(entry.get("headword") or "")
        translation_pt = fold(entry.get("translation_pt") or "")
        translation_en = fold(entry.get("translation_en") or "")
        entry_id = fold(entry.get("id") or "")
        if needle == headword:
            rank = 0
        elif headword.startswith(needle):
            rank = 1
        elif needle in headword:
            rank = 2
        elif needle in translation_pt or needle in translation_en:
            rank = 3
        elif needle in entry_id:
            rank = 4
        else:
            continue
        scored.append((rank, index, entry))
    scored.sort(key=lambda item: (item[0], item[1]))
    return [item[2] for item in scored]


def audio_file(dataset: Dataset, filename: str) -> Optional[Path]:
    name = Path(filename).name
    if name != filename or name in {".", ".."}:
        return None
    folder = dataset.ref.json_path.parent / "Audio"
    path = (folder / name).resolve()
    try:
        path.relative_to(folder.resolve())
    except ValueError:
        return None
    if path.is_file():
        return path
    return None


def _unique(entries: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    seen = set()
    unique = []
    for entry in entries:
        marker = id(entry)
        if marker in seen:
            continue
        seen.add(marker)
        unique.append(entry)
    return unique
