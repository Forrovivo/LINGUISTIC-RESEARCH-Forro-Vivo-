"""Attested relation graph for one isolated dictionary entry."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any, Dict, Iterable, List, Optional, Tuple

if TYPE_CHECKING:
    from api.store import Dataset

COLLECTION_RELATIONS = {
    "grammar": ("related_to", "grammar_rule"),
    "expressions": ("appears_in", "expression"),
    "proverbs": ("appears_in", "proverb"),
    "culture": ("related_to", "cultural_practice"),
    "food": ("related_to", "food"),
    "music": ("related_to", "music"),
    "dance": ("related_to", "dance"),
    "folklore": ("related_to", "folklore"),
    "stories": ("appears_in", "story"),
    "places": ("related_to", "place"),
}


def index_knowledge_links(dataset: Dataset) -> None:
    by_entry: Dict[str, List[Tuple[str, Dict[str, Any]]]] = {}
    by_headword: Dict[str, List[Tuple[str, Dict[str, Any]]]] = {}
    from api.store import fold

    for collection, rows in (dataset.knowledge or {}).items():
        for row in rows:
            for entry_id in row.get("related_entry_ids") or []:
                if entry_id:
                    by_entry.setdefault(str(entry_id), []).append((collection, row))
            headword = row.get("headword")
            if headword:
                by_headword.setdefault(fold(headword), []).append((collection, row))
    dataset.knowledge_by_entry_id = by_entry
    dataset.knowledge_by_headword = by_headword


def entry_graph(dataset: Dataset, entry: Dict[str, Any], origin: str) -> Dict[str, Any]:
    host = origin.rstrip("/")
    language = entry.get("language")
    graph = {
        "word": {
            "id": entry.get("id"),
            "headword": entry.get("headword"),
            "type": "headword",
        },
        "belongs_to": {
            "language": language,
            "language_name": entry.get("language_name") or dataset.document.get("language_name"),
            "dataset": dataset.ref.key,
        },
        "means": _meanings(entry),
        "related_to": [],
        "appears_in": [],
        "documented_by": _sources(entry),
    }
    _add_embedded(graph, entry)
    seen = set()
    for collection, record in _linked_records(dataset, entry):
        marker = (collection, record.get("id"))
        if marker in seen:
            continue
        seen.add(marker)
        bucket, kind = COLLECTION_RELATIONS.get(collection, ("related_to", collection))
        graph[bucket].append(
            _knowledge_edge(dataset, collection, kind, record, host)
        )
    return graph


def _meanings(entry: Dict[str, Any]) -> List[Dict[str, str]]:
    meanings = []
    portuguese = entry.get("translation_pt")
    english = entry.get("translation_en")
    if portuguese:
        meanings.append({"language": "pt", "concept": portuguese})
    if english:
        meanings.append({"language": "en", "concept": english})
    return meanings


def _sources(entry: Dict[str, Any]) -> List[Dict[str, Any]]:
    source = entry.get("source")
    if not source:
        return []
    return [
        {
            "source": source,
            "source_type": entry.get("source_type"),
            "source_title": entry.get("source_title"),
            "source_page": entry.get("source_page"),
            "source_url": entry.get("source_url"),
            "source_file": entry.get("source_file"),
        }
    ]


def _add_embedded(graph: Dict[str, Any], entry: Dict[str, Any]) -> None:
    grammar = entry.get("grammatical_information")
    if grammar:
        graph["related_to"].append(
            {
                "kind": "grammar_rule",
                "from": "entry",
                "text": grammar,
            }
        )
    culture = entry.get("cultural_context")
    if culture:
        graph["related_to"].append(
            {
                "kind": "cultural_practice",
                "from": "entry",
                "text": culture,
            }
        )


def _linked_records(dataset: Dataset, entry: Dict[str, Any]) -> Iterable[Tuple[str, Dict[str, Any]]]:
    from api.store import fold

    entry_id = entry.get("id")
    if entry_id:
        yield from dataset.knowledge_by_entry_id.get(entry_id) or []
    headword = entry.get("headword")
    if headword:
        yield from dataset.knowledge_by_headword.get(fold(headword)) or []


def _knowledge_edge(
    dataset: Dataset,
    collection: str,
    kind: str,
    record: Dict[str, Any],
    host: str,
) -> Dict[str, Any]:
    item_id = record.get("id")
    path = f"/v1/{dataset.ref.key}/{collection}/{item_id}" if item_id else None
    return {
        "kind": kind,
        "collection": collection,
        "id": item_id,
        "title": record.get("title"),
        "headword": record.get("headword"),
        "path": path,
        "url": f"{host}{path}" if path else None,
        "source": record.get("source"),
        "from": "knowledge",
    }
