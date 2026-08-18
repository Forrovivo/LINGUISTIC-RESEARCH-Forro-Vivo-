"""Dataset registry derived from data/ indexes."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional

from api import REPO_ROOT

DATA_ROOT = REPO_ROOT / "data"

FAMILY_INDEXES = (
    ("saotome", DATA_ROOT / "saotome_dataset" / "dictionary.json"),
    ("caboverde", DATA_ROOT / "caboverde_dataset" / "dictionary.json"),
    ("guinebissau", DATA_ROOT / "guinebissau_dataset" / "dictionary.json"),
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

    catalog["angola"] = DatasetRef(
        key="angola",
        family="angola",
        variety=None,
        kind="lexicon",
        json_path=DATA_ROOT / "angola_dataset" / "dictionary.json",
    )

    missing = [ref.key for ref in catalog.values() if not ref.json_path.exists()]
    if missing:
        raise FileNotFoundError("Missing dictionary.json for: " + ", ".join(missing))
    return catalog
