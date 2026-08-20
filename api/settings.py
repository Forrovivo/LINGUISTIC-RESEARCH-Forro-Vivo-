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

LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/"
API_FAMILY = "v1"
CORS_ALLOW_ORIGIN = "*"
CORS_EXPOSE_HEADERS = [
    "API-Version",
    "Link",
    "RateLimit-Limit",
    "RateLimit-Policy",
    "Retry-After",
]
PROJECT_LICENSE = {
    "project_original": "CC BY 4.0",
    "source_extracts": (
        "Third-party dictionaries and papers keep their original licenses. See research/sources/README.md."
    ),
}
