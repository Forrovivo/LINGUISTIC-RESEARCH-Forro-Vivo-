"""Read-only HTTP API for the isolated dictionary JSON files."""

__all__ = ["REPO_ROOT"]

from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
