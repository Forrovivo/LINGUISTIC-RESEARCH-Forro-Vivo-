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

São Tomé languages live under `data/saotome_dataset/`, matching `/v1/saotome/forro`, `/v1/saotome/angolar`, and `/v1/saotome/lungie`.

| Method | Path |
|---|---|
| GET | `/v1` |
| GET | `/v1/kb` |
| GET | `/v1/languages` |
| GET | `/v1/datasets` |
| GET | `/v1/saotome/forro` |
| GET | `/v1/saotome/forro/lookup?headword=kume` |
| GET | `/v1/saotome/forro/entries?q=` |
| GET | `/v1/saotome/forro/entries/{id}` |
| GET | `/v1/saotome/forro/audio/{file}` |
| GET | `/v1/saotome/forro/grammar` |
| GET | `/v1/saotome/forro/expressions` |
| GET | `/v1/saotome/forro/proverbs` |
| GET | `/v1/saotome/forro/culture` |
| GET | `/v1/saotome/forro/food` |
| GET | `/v1/saotome/forro/music` |
| GET | `/v1/saotome/forro/dance` |
| GET | `/v1/saotome/forro/folklore` |
| GET | `/v1/saotome/forro/stories` |
| GET | `/v1/saotome/forro/places` |
| GET | `/v1/saotome/forro/sources` |
| GET | `/v1/saotome/forro/search?q=` |
| GET | `/v1/search?dataset=saotome/forro&q=` |
| GET | `/v1/saotome/angolar/lookup?headword=` |
| GET | `/v1/saotome/lungie/lookup?headword=` |
| GET | `/v1/caboverde/santiago/lookup?headword=` |
| GET | `/v1/guinebissau/bissau/lookup?headword=` |
| GET | `/v1/angola/lookup?headword=` |

`/v1/saotome`, `/v1/caboverde`, and `/v1/guinebissau` are indexes. Lookup there returns `TERM_NOT_FOUND`. `/v1/angola` is Angola Contruy. It does not serve Angolar.

The Knowledge Base uses the same isolation. `/v1/languages` lists lexicons, not a merged word list. `/v1/grammar` (and the sibling collection indexes) list **counts per folder**. Records are read from `/v1/{dataset}/grammar`, `/v1/{dataset}/proverbs`, and the other collections. Empty means unsourced, not “fill from another creole”. `/v1/search` requires `dataset=`.

A missing headword in a lexicon returns that dataset’s `TERM_NOT_FOUND` object. An unknown path returns `DATASET_NOT_FOUND`. Search never crosses folders.

Each returned entry includes `graph`: meaning concepts (Portuguese / English), `belongs_to` (one language), `related_to` (grammar, culture), `appears_in` (proverb, story), and `documented_by` (source). Empty arrays mean unsourced, not “fill from another creole”.

Interactive docs: https://api.forrovivo.com/docs
