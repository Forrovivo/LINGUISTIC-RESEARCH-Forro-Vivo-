"""Public hosts and branding for the ForroVivo ecosystem."""

from __future__ import annotations

import os

SITE_ORIGIN = os.environ.get("FORROVIVO_SITE_ORIGIN", "https://www.forrovivo.com")
API_HOST = os.environ.get("FORROVIVO_API_HOST", "api.forrovivo.com")
API_ORIGIN = os.environ.get("FORROVIVO_API_ORIGIN", "https://api.forrovivo.com")
GITHUB_URL = os.environ.get(
    "FORROVIVO_GITHUB_URL",
    "https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-",
)
APP_STORE_URL = os.environ.get(
    "FORROVIVO_APP_STORE_URL",
    "https://apps.apple.com/app/id6751409176",
)

CORS_ORIGINS = [
    "https://forrovivo.com",
    "https://www.forrovivo.com",
    API_ORIGIN,
    "http://127.0.0.1:8000",
    "http://localhost:8000",
]
