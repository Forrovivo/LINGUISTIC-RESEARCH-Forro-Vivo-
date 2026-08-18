"""Read-only FastAPI service for ForroVivo Linguistic Research datasets."""

from __future__ import annotations

from typing import Any, Dict, Optional

from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from api.settings import (
    API_HOST,
    API_ORIGIN,
    APP_STORE_URL,
    CORS_ORIGINS,
    GITHUB_URL,
    SITE_ORIGIN,
)
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
    title="ForroVivo Linguistic Research API",
    description=(
        "ForroVivo is the platform and ecosystem. This API is the machine-readable "
        "layer of the Linguistic Research initiative within it. "
        "Public host: https://api.forrovivo.com. "
        "Each dataset is isolated. Missing terms return TERM_NOT_FOUND. "
        "This API does not invent translations or merge languages."
    ),
    version="2.0.6",
    servers=[
        {"url": API_ORIGIN, "description": "Production"},
        {"url": "http://127.0.0.1:8000", "description": "Local"},
    ],
)
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)


def request_origin(request: Request) -> str:
    return str(request.base_url).rstrip("/")


def present(dataset, entry, request: Request) -> Dict[str, Any]:
    return present_entry(dataset, entry, base_url=request_origin(request))


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
        "name": "ForroVivo Linguistic Research API",
        "version": "2.0.6",
        "platform": "ForroVivo",
        "initiative": "Linguistic Research",
        "host": API_HOST,
        "url": API_ORIGIN,
        "homepage": SITE_ORIGIN,
        "github": GITHUB_URL,
        "app_store": APP_STORE_URL,
        "project_start_date": "2023-03-23",
        "principle": "Zero hallucination. Missing data is preferable to incorrect data.",
        "isolation": (
            "Each path serves one dataset. Parent indexes are not merged lexicons. "
            "data/angola/ is an alias of data/saotome/angolar."
        ),
        "license": {
            "project_original": "CC BY 4.0",
            "source_extracts": (
                "Third-party dictionaries and papers keep their original licenses. See research/sources/README.md."
            ),
        },
        "docs": f"{API_ORIGIN}/docs",
        "catalog": f"{API_ORIGIN}/v1/datasets",
    }


@app.get("/v1/datasets")
def list_datasets() -> Dict[str, Any]:
    return {"datasets": STORE.catalog()}


@app.get("/v1/{family}/lookup")
@app.get("/v1/{family}/{variety}/lookup")
def lookup(
    request: Request,
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
            "entries": [present(dataset, entry, request) for entry in entries],
        },
    )


@app.get("/v1/{family}/entries/{entry_id}")
@app.get("/v1/{family}/{variety}/entries/{entry_id}")
def get_entry(request: Request, entry_id: str, family: str, variety: Optional[str] = None) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    entry = dataset.by_id.get(entry_id)
    if entry is None:
        return term_not_found(dataset)
    return envelope(dataset, {"entry": present(dataset, entry, request)})


@app.get("/v1/{family}/entries")
@app.get("/v1/{family}/{variety}/entries")
def list_entries(
    request: Request,
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
            "entries": [present(dataset, entry, request) for entry in page],
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
