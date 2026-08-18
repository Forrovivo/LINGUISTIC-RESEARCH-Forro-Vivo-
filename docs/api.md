# API

**ForroVivo** is the platform and ecosystem. This API is the machine-readable layer of the **Linguistic Research** initiative within it.

| Surface | Role |
|---|---|
| [ForroVivo.com](https://www.forrovivo.com) | Public brand |
| [GitHub](https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-) | Open research and datasets |
| [api.forrovivo.com](https://api.forrovivo.com) | Machine-readable linguistic data |
| [ForroVivo on the App Store](https://apps.apple.com/app/id6751409176) | Language-learning product |

**Public host:** https://api.forrovivo.com  
**Local host:** http://127.0.0.1:8000  
**Contract:** [openapi.yaml](../api/openapi.yaml)  
**Examples:** [api/examples](../api/examples)

The API is GET-only. It loads the JSON files under `data/`. It does not invent translations, merge languages, or write lexicon data. The website and the App Store product are not this service.

## Run locally

```text
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
PYTHONPATH=. uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

Point DNS `api.forrovivo.com` at the process that serves this app. The public brand stays on `www.forrovivo.com`. The language-learning product stays on the App Store.

## Paths

São Tomé languages live under `data/saotome/`, matching `/v1/saotome/forro`, `/v1/saotome/angolar`, and `/v1/saotome/lungie`.

| Method | Path |
|---|---|
| GET | `/v1` |
| GET | `/v1/datasets` |
| GET | `/v1/saotome/forro` |
| GET | `/v1/saotome/forro/lookup?headword=kume` |
| GET | `/v1/saotome/forro/entries?q=` |
| GET | `/v1/saotome/forro/entries/{id}` |
| GET | `/v1/saotome/forro/audio/{file}` |
| GET | `/v1/saotome/angolar/lookup?headword=` |
| GET | `/v1/saotome/lungie/lookup?headword=` |
| GET | `/v1/caboverde/santiago/lookup?headword=` |
| GET | `/v1/guinebissau/bissau/lookup?headword=` |
| GET | `/v1/angola/lookup?headword=` |

`/v1/saotome`, `/v1/caboverde`, and `/v1/guinebissau` are indexes. Lookup there returns `TERM_NOT_FOUND`. `/v1/angola` serves `data/saotome/angolar` without a second lexicon.

A missing headword in a lexicon returns that dataset’s `TERM_NOT_FOUND` object. An unknown path returns `DATASET_NOT_FOUND`. Search never crosses folders.

Interactive docs: https://api.forrovivo.com/docs
