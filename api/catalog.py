"""Dataset registry derived from the existing dictionary/ indexes."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional

from api import REPO_ROOT

DICTIONARY_ROOT = REPO_ROOT / "dictionary"

FAMILY_INDEXES = (
    ("saotome", DICTIONARY_ROOT / "saotome" / "dictionary.json"),
    ("caboverde", DICTIONARY_ROOT / "caboverde" / "dictionary.json"),
    ("guinebissau", DICTIONARY_ROOT / "guinebissau" / "dictionary.json"),
)


@dataclass(frozen=True)
class DatasetRef:
    key: str
    family: str
    variety: Optional[str]
    kind: str
    json_path: Path
    canonical_key: Optional[str] = None


def _json_path(relative: str) -> Path:
    relative = relative.rstrip("/")
    path = REPO_ROOT / relative
    if path.is_dir() or not relative.endswith("dictionary.json"):
        path = (REPO_ROOT / relative.rstrip("/")) / "dictionary.json"
    return path


def load_catalog() -> Dict[str, DatasetRef]:
    catalog: Dict[str, DatasetRef] = {}

    for family, index_path in FAMILY_INDEXES:
        catalog[family] = DatasetRef(
            key=family,
            family=family,
            variety=None,
            kind="index",
            json_path=index_path,
        )
        with index_path.open(encoding="utf-8") as handle:
            payload = json.load(handle)
        children = payload.get("languages") or payload.get("varieties") or []
        for child in children:
            child_id = child["id"]
            key = f"{family}/{child_id}"
            catalog[key] = DatasetRef(
                key=key,
                family=family,
                variety=child_id,
                kind="lexicon",
                json_path=_json_path(child["path"]),
            )

    angola_path = DICTIONARY_ROOT / "angola" / "dictionary.json"
    with angola_path.open(encoding="utf-8") as handle:
        angola = json.load(handle)
    catalog["angola"] = DatasetRef(
        key="angola",
        family="angola",
        variety=None,
        kind="alias",
        json_path=angola_path,
        canonical_key="saotome/angolar",
    )
    canonical = _json_path(angola["canonical_path"])
    if not canonical.exists():
        raise FileNotFoundError(canonical)

    missing = [ref.key for ref in catalog.values() if not ref.json_path.exists()]
    if missing:
        raise FileNotFoundError("Missing dictionary.json for: " + ", ".join(missing))
    return catalog


