"""Read-only FastAPI application over isolated dictionary JSON files."""

from __future__ import annotations

from typing import Any, Dict, Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from api.store import (
    Store,
    audio_file,
    lookup_headword,
    present_entry,
    search_entries,
)

STORE = Store.load()
FAMILIES = frozenset({"saotome", "caboverde", "guinebissau", "angola"})
DEFAULT_LIMIT = 50
MAX_LIMIT = 1000

app = FastAPI(
    title="Forro Languages Dictionary API",
    description=(
        "Read-only HTTP API for attested Portuguese-lexifier creole lexicons. "
        "Each dataset is isolated. Missing terms return TERM_NOT_FOUND. "
        "This API does not invent translations or merge languages."
    ),
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


def term_not_found(dataset) -> JSONResponse:
    return JSONResponse(status_code=404, content=dataset.missing_term)


def dataset_not_found(key: str) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={
            "status": "error",
            "code": "DATASET_NOT_FOUND",
            "message": "No isolated dataset is published at this path.",
            "dataset": key,
        },
    )


def resolve(family: str, variety: Optional[str] = None):
    if family not in FAMILIES:
        return None, dataset_not_found(family if not variety else f"{family}/{variety}")
    key = STORE.resolve_key(family, variety)
    dataset = STORE.get(key)
    if dataset is None:
        return None, dataset_not_found(key)
    return dataset, None


def envelope(dataset, extra: Dict[str, Any]) -> Dict[str, Any]:
    payload = {
        "dataset": dataset.ref.key,
        "kind": dataset.kind,
        "language": dataset.document.get("language"),
    }
    if dataset.ref.canonical_key:
        payload["canonical_dataset"] = dataset.ref.canonical_key
    payload.update(extra)
    return payload


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/v1")
def root() -> Dict[str, Any]:
    return {
        "name": "Forro Languages Dictionary API",
        "version": "1.0.0",
        "project_start_date": "2023-03-23",
        "principle": "Zero hallucination. Missing data is preferable to incorrect data.",
        "isolation": (
            "Each path serves one dataset. Parent indexes are not merged lexicons. "
            "dictionary/angola/ is an alias of saotome/angolar."
        ),
        "license": {
            "project_original": "CC BY 4.0",
            "source_extracts": (
                "Third-party dictionaries and papers keep their original licenses. See SOURCES.md."
            ),
        },
        "docs": "/docs",
        "catalog": "/v1/datasets",
    }


@app.get("/v1/datasets")
def list_datasets() -> Dict[str, Any]:
    return {"datasets": STORE.catalog()}


@app.get("/v1/{family}/lookup")
@app.get("/v1/{family}/{variety}/lookup")
def lookup(
    family: str,
    variety: Optional[str] = None,
    headword: str = Query(..., min_length=1),
) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    match, entries = lookup_headword(dataset, headword)
    if not entries:
        return term_not_found(dataset)
    return envelope(
        dataset,
        {
            "query": {"headword": headword},
            "match": match,
            "count": len(entries),
            "entries": [present_entry(dataset, entry) for entry in entries],
        },
    )


@app.get("/v1/{family}/entries/{entry_id}")
@app.get("/v1/{family}/{variety}/entries/{entry_id}")
def get_entry(entry_id: str, family: str, variety: Optional[str] = None) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    entry = dataset.by_id.get(entry_id)
    if entry is None:
        return term_not_found(dataset)
    return envelope(dataset, {"entry": present_entry(dataset, entry)})


@app.get("/v1/{family}/entries")
@app.get("/v1/{family}/{variety}/entries")
def list_entries(
    family: str,
    variety: Optional[str] = None,
    q: Optional[str] = Query(None, description="Search inside this dataset only."),
    offset: int = Query(0, ge=0),
    limit: int = Query(DEFAULT_LIMIT, ge=1, le=MAX_LIMIT),
) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    rows = search_entries(dataset, q) if q else dataset.entries
    page = rows[offset : offset + limit]
    return envelope(
        dataset,
        {
            "query": q,
            "total": len(rows),
            "offset": offset,
            "limit": limit,
            "entries": [present_entry(dataset, entry) for entry in page],
        },
    )


@app.get("/v1/{family}/audio/{filename}")
@app.get("/v1/{family}/{variety}/audio/{filename}")
def get_audio(filename: str, family: str, variety: Optional[str] = None) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    served = dataset
    if dataset.ref.canonical_key:
        served = STORE.require(dataset.ref.canonical_key)
    path = audio_file(served, filename)
    if path is None:
        return JSONResponse(
            status_code=404,
            content={
                "status": "error",
                "code": "AUDIO_NOT_FOUND",
                "message": "No audio file with that name is stored in this dataset.",
                "dataset": served.ref.key,
            },
        )
    return FileResponse(path, media_type="audio/mpeg")


@app.get("/v1/{family}")
@app.get("/v1/{family}/{variety}")
def get_dataset(family: str, variety: Optional[str] = None) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    return dataset.metadata()
