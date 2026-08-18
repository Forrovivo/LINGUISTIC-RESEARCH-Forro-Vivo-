"""Isolated Knowledge Base collections for the Linguistic Research API."""

from __future__ import annotations

import json
from pathlib import Path
from typing import TYPE_CHECKING, Any, Dict, Iterable, List, Optional, Tuple

if TYPE_CHECKING:
    from api.store import Dataset, Store

DOCUMENT_COLLECTIONS = (
    "grammar",
    "expressions",
    "proverbs",
    "culture",
    "food",
    "music",
    "dance",
    "folklore",
    "stories",
    "places",
)

KNOWLEDGE_BASE = (
    "languages",
    "entries",
    *DOCUMENT_COLLECTIONS,
    "sources",
    "search",
)

LISTABLE_COLLECTIONS = ("entries", *DOCUMENT_COLLECTIONS, "sources")


def empty_knowledge() -> Dict[str, List[Dict[str, Any]]]:
    return {name: [] for name in DOCUMENT_COLLECTIONS}


def knowledge_path(json_path: Path) -> Path:
    return json_path.parent / "knowledge.json"


def load_knowledge(json_path: Path, expected_language: Optional[str]) -> Dict[str, List[Dict[str, Any]]]:
    payload = empty_knowledge()
    path = knowledge_path(json_path)
    if not path.is_file():
        return payload
    with path.open(encoding="utf-8") as handle:
        document = json.load(handle)
    for name in DOCUMENT_COLLECTIONS:
        payload[name] = _accepted_records(
            name,
            document.get(name) or [],
            expected_language,
        )
    return payload


def _accepted_records(
    collection: str,
    rows: Iterable[Dict[str, Any]],
    expected_language: Optional[str],
) -> List[Dict[str, Any]]:
    accepted: List[Dict[str, Any]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        if not row.get("id") or not row.get("source"):
            continue
        language = row.get("language")
        if expected_language and language and language != expected_language:
            continue
        record = dict(row)
        record["collection"] = collection
        accepted.append(record)
    return accepted


def collection_path(dataset: Dataset, collection: str) -> str:
    return f"/v1/{dataset.ref.key}/{collection}"


def knowledge_base_map(origin: str) -> Dict[str, Any]:
    host = origin.rstrip("/")
    collections = []
    for name in KNOWLEDGE_BASE:
        item = {
            "id": name,
            "path": f"/v1/{name}",
            "url": f"{host}/v1/{name}",
        }
        if name == "languages":
            item["isolation"] = "Catalog of isolated lexicons. Not a merged word list."
        elif name == "search":
            item["isolation"] = "Requires dataset=. Search never crosses folders."
            item["example"] = "/v1/search?dataset=saotome/forro&q=kume"
        else:
            item["isolation"] = (
                "Content lives on one language path. "
                f"Example: /v1/saotome/forro/{name}"
            )
            item["example"] = f"/v1/saotome/forro/{name}"
        collections.append(item)
    return {
        "name": "ForroVivo Linguistic Research Knowledge Base",
        "principle": "Zero hallucination. Missing data is preferable to incorrect data.",
        "isolation": (
            "Each collection is served per isolated dataset. "
            "Parent indexes are not merged knowledge. "
            "Empty collections stay empty until a cited source fills them."
        ),
        "file": "knowledge.json next to dictionary.json in the same isolated folder",
        "collections": collections,
    }


def language_paths(dataset: Dataset) -> Dict[str, str]:
    paths = {name: collection_path(dataset, name) for name in LISTABLE_COLLECTIONS}
    paths["search"] = collection_path(dataset, "search")
    paths["lookup"] = collection_path(dataset, "lookup")
    return paths


def languages_catalog(store: Store, origin: str) -> Dict[str, Any]:
    host = origin.rstrip("/")
    languages = []
    for key in sorted(store.datasets):
        dataset = store.datasets[key]
        if dataset.kind != "lexicon":
            continue
        meta = dataset.metadata()
        languages.append(
            {
                "dataset": key,
                "language": meta.get("language"),
                "language_name": meta.get("language_name"),
                "iso_639_3": meta.get("iso_639_3"),
                "entry_count": meta.get("entry_count"),
                "knowledge": {
                    name: len(dataset.knowledge.get(name) or [])
                    for name in DOCUMENT_COLLECTIONS
                },
                "path": f"/v1/{key}",
                "url": f"{host}/v1/{key}",
                "collections": {
                    name: f"{host}{path}"
                    for name, path in language_paths(dataset).items()
                },
            }
        )
    return {
        "isolation": (
            "Each object is one lexicon. Counts are per folder. "
            "This list is not a merged dictionary."
        ),
        "languages": languages,
    }


def collection_directory(store: Store, collection: str) -> Dict[str, Any]:
    datasets = []
    for key in sorted(store.datasets):
        dataset = store.datasets[key]
        if dataset.kind != "lexicon":
            continue
        if collection == "entries":
            count = len(dataset.entries)
        elif collection == "sources":
            count = len(dataset.document.get("sources") or [])
        else:
            count = len(dataset.knowledge.get(collection) or [])
        datasets.append(
            {
                "dataset": key,
                "count": count,
                "path": collection_path(dataset, collection),
            }
        )
    return {
        "collection": collection,
        "isolation": (
            "This index lists isolated folders only. It does not merge records. "
            "Open one path to read that language."
        ),
        "datasets": datasets,
    }


def dataset_sources(dataset: Dataset) -> List[Dict[str, Any]]:
    rows = []
    for index, source in enumerate(dataset.document.get("sources") or []):
        if isinstance(source, dict):
            item = dict(source)
        else:
            item = {"source": str(source)}
        item.setdefault("id", item.get("source_file") or f"{dataset.ref.key}-source-{index + 1}")
        item["dataset"] = dataset.ref.key
        item["language"] = dataset.document.get("language")
        rows.append(item)
    return rows


def collection_records(dataset: Dataset, collection: str) -> List[Dict[str, Any]]:
    if collection == "entries":
        return list(dataset.entries)
    if collection == "sources":
        return dataset_sources(dataset)
    return list(dataset.knowledge.get(collection) or [])


def record_by_id(dataset: Dataset, collection: str, item_id: str) -> Optional[Dict[str, Any]]:
    for row in collection_records(dataset, collection):
        if row.get("id") == item_id:
            return row
    return None


def search_collection(dataset: Dataset, collection: str, query: Optional[str]) -> List[Dict[str, Any]]:
    from api.store import fold, search_entries

    rows = collection_records(dataset, collection)
    if not query:
        return rows
    if collection == "entries":
        return search_entries(dataset, query)
    needle = fold(query)
    hits = []
    for row in rows:
        blob = fold(
            " ".join(
                str(row.get(field) or "")
                for field in ("id", "title", "headword", "text", "text_pt", "text_en", "source", "source_title")
            )
        )
        if needle in blob:
            hits.append(row)
    return hits


def search_dataset(dataset: Dataset, query: str) -> List[Dict[str, Any]]:
    from api.store import fold, search_entries

    hits: List[Dict[str, Any]] = []
    for entry in search_entries(dataset, query):
        hits.append({"collection": "entries", "item": entry})
    needle = fold(query)
    if not needle:
        return hits
    for collection in DOCUMENT_COLLECTIONS:
        for row in dataset.knowledge.get(collection) or []:
            blob = fold(
                " ".join(
                    str(row.get(field) or "")
                    for field in ("id", "title", "headword", "text", "text_pt", "text_en")
                )
            )
            if needle in blob:
                hits.append({"collection": collection, "item": row})
    for source in dataset_sources(dataset):
        blob = fold(
            " ".join(
                str(source.get(field) or "")
                for field in ("id", "source", "source_title", "source_file")
            )
        )
        if needle in blob:
            hits.append({"collection": "sources", "item": source})
    return hits


def page_rows(rows: List[Dict[str, Any]], offset: int, limit: int) -> Tuple[List[Dict[str, Any]], int]:
    return rows[offset : offset + limit], len(rows)
