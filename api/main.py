"""Read-only FastAPI service for ForroVivo Linguistic Research datasets."""

from __future__ import annotations

from typing import Any, Dict, Optional

from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from api.settings import (
    API_HOST,
    API_ORIGIN,
    APP_STORE_URL,
    CORS_ORIGINS,
    GITHUB_URL,
    SITE_ORIGIN,
)
from api.knowledge import (
    DOCUMENT_COLLECTIONS,
    collection_directory,
    knowledge_base_map,
    languages_catalog,
    page_rows,
    record_by_id,
    search_collection,
    search_dataset,
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
    version="2.2.0",
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


def dataset_required(collection: str) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={
            "status": "error",
            "code": "DATASET_REQUIRED",
            "message": "This collection is isolated. Name one dataset; do not search across languages.",
            "collection": collection,
            "example": f"/v1/saotome/forro/{collection}" if collection != "search" else "/v1/search?dataset=saotome/forro&q=kume",
        },
    )


def present_hit(dataset, hit: Dict[str, Any], request: Request) -> Dict[str, Any]:
    if hit.get("collection") == "entries":
        return {
            "collection": "entries",
            "item": present(dataset, hit["item"], request),
        }
    return hit


def present_records(dataset, collection: str, rows: list, request: Request) -> list:
    if collection == "entries":
        return [present(dataset, row, request) for row in rows]
    return rows


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def site_root() -> RedirectResponse:
    return RedirectResponse(url="/v1", status_code=307)


@app.get("/v1")
def root() -> Dict[str, Any]:
    return {
        "name": "ForroVivo Linguistic Research API",
        "version": "2.2.0",
        "platform": "ForroVivo",
        "initiative": "Linguistic Research",
        "founder": "Henriques Pontes",
        "idealist": "Henriques Pontes",
        "cofounders": ["Luis Lima"],
        "host": API_HOST,
        "url": API_ORIGIN,
        "homepage": SITE_ORIGIN,
        "github": GITHUB_URL,
        "app_store": APP_STORE_URL,
        "project_start_date": "2023-03-23",
        "principle": "Zero hallucination. Missing data is preferable to incorrect data.",
        "isolation": (
            "Each path serves one dataset. Parent indexes are not merged lexicons. "
            "data/angola_dataset/ is Angola Contruy (country). It is not Angolar / Ngola."
        ),
        "graph": (
            "Each entry includes an attested relation graph: "
            "means (Portuguese / English concepts), belongs_to (one language), "
            "related_to (grammar, culture), appears_in (proverb, story), "
            "documented_by (source). Missing edges stay empty. Edges never cross folders."
        ),
        "license": {
            "project_original": "CC BY 4.0",
            "source_extracts": (
                "Third-party dictionaries and papers keep their original licenses. See research/sources/README.md."
            ),
        },
        "docs": f"{API_ORIGIN}/docs",
        "catalog": f"{API_ORIGIN}/v1/datasets",
        "knowledge_base": f"{API_ORIGIN}/v1/kb",
        "languages": f"{API_ORIGIN}/v1/languages",
    }


@app.get("/v1/datasets")
def list_datasets() -> Dict[str, Any]:
    return {"datasets": STORE.catalog()}


@app.get("/v1/kb")
def knowledge_base() -> Dict[str, Any]:
    return knowledge_base_map(API_ORIGIN)


@app.get("/v1/languages")
def list_languages() -> Dict[str, Any]:
    return languages_catalog(STORE, API_ORIGIN)


@app.get("/v1/search")
def search_isolated(
    request: Request,
    dataset: Optional[str] = Query(None, description="Isolated dataset key, for example saotome/forro."),
    q: Optional[str] = Query(None, description="Search inside that dataset only."),
    offset: int = Query(0, ge=0),
    limit: int = Query(DEFAULT_LIMIT, ge=1, le=MAX_LIMIT),
) -> Any:
    if not dataset:
        return dataset_required("search")
    parts = dataset.strip("/").split("/")
    family = parts[0]
    variety = parts[1] if len(parts) > 1 else None
    loaded, error = resolve(family, variety)
    if error is not None:
        return error
    if loaded.kind == "index":
        return term_not_found(loaded)
    if not q:
        return JSONResponse(
            status_code=400,
            content={
                "status": "error",
                "code": "QUERY_REQUIRED",
                "message": "Search requires q= inside one isolated dataset.",
                "dataset": loaded.ref.key,
            },
        )
    rows = search_dataset(loaded, q)
    page, total = page_rows(rows, offset, limit)
    return envelope(
        loaded,
        {
            "collection": "search",
            "query": q,
            "total": total,
            "offset": offset,
            "limit": limit,
            "results": [present_hit(loaded, hit, request) for hit in page],
        },
    )


@app.get("/v1/entries")
@app.get("/v1/grammar")
@app.get("/v1/expressions")
@app.get("/v1/proverbs")
@app.get("/v1/culture")
@app.get("/v1/food")
@app.get("/v1/music")
@app.get("/v1/dance")
@app.get("/v1/folklore")
@app.get("/v1/stories")
@app.get("/v1/places")
@app.get("/v1/sources")
def knowledge_collection_index(request: Request) -> Dict[str, Any]:
    collection = request.url.path.rstrip("/").rsplit("/", 1)[-1]
    return collection_directory(STORE, collection)


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


def list_knowledge_collection(
    request: Request,
    family: str,
    variety: Optional[str] = None,
    q: Optional[str] = Query(None),
    offset: int = Query(0, ge=0),
    limit: int = Query(DEFAULT_LIMIT, ge=1, le=MAX_LIMIT),
) -> Any:
    collection = request.url.path.rstrip("/").rsplit("/", 1)[-1]
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    rows = search_collection(dataset, collection, q)
    page, total = page_rows(rows, offset, limit)
    return envelope(
        dataset,
        {
            "collection": collection,
            "query": q,
            "total": total,
            "offset": offset,
            "limit": limit,
            "items": present_records(dataset, collection, page, request),
        },
    )


def get_knowledge_item(
    request: Request,
    item_id: str,
    family: str,
    variety: Optional[str] = None,
) -> Any:
    collection = request.url.path.rstrip("/").rsplit("/", 2)[-2]
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    if dataset.kind == "index":
        return term_not_found(dataset)
    item = record_by_id(dataset, collection, item_id)
    if item is None:
        return term_not_found(dataset)
    payload = item
    if collection == "entries":
        payload = present(dataset, item, request)
    return envelope(dataset, {"collection": collection, "item": payload})


def search_one_dataset(
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
    if not q:
        return JSONResponse(
            status_code=400,
            content={
                "status": "error",
                "code": "QUERY_REQUIRED",
                "message": "Search requires q= inside one isolated dataset.",
                "dataset": dataset.ref.key,
            },
        )
    rows = search_dataset(dataset, q)
    page, total = page_rows(rows, offset, limit)
    return envelope(
        dataset,
        {
            "collection": "search",
            "query": q,
            "total": total,
            "offset": offset,
            "limit": limit,
            "results": [present_hit(dataset, hit, request) for hit in page],
        },
    )


for _name in (*DOCUMENT_COLLECTIONS, "sources"):
    app.add_api_route(f"/v1/{{family}}/{_name}", list_knowledge_collection, methods=["GET"])
    app.add_api_route(f"/v1/{{family}}/{{variety}}/{_name}", list_knowledge_collection, methods=["GET"])
    app.add_api_route(f"/v1/{{family}}/{_name}/{{item_id}}", get_knowledge_item, methods=["GET"])
    app.add_api_route(f"/v1/{{family}}/{{variety}}/{_name}/{{item_id}}", get_knowledge_item, methods=["GET"])

app.add_api_route("/v1/{family}/search", search_one_dataset, methods=["GET"])
app.add_api_route("/v1/{family}/{variety}/search", search_one_dataset, methods=["GET"])


@app.get("/v1/{family}")
@app.get("/v1/{family}/{variety}")
def get_dataset(family: str, variety: Optional[str] = None) -> Any:
    dataset, error = resolve(family, variety)
    if error is not None:
        return error
    return dataset.metadata()
