# Technical report

**Project started:** 23 March 2023  
**Platform:** ForroVivo  
**Initiative:** Linguistic Research  
**Public brand:** https://www.forrovivo.com  
**GitHub:** https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-  
**Public API:** https://api.forrovivo.com  
**App Store:** https://apps.apple.com/app/id6751409176

ForroVivo is the platform and ecosystem. This document describes the technical design of the Linguistic Research initiative within it: the open datasets and the read-only dictionary API. Collection rules are in [docs/methodology.md](../../docs/methodology.md). Bibliography is in [research/sources](../sources/README.md). How to add attested entries is in [CONTRIBUTING.md](../../CONTRIBUTING.md). The operational specification is [collection-prompt.md](collection-prompt.md).

## Purpose

The Linguistic Research project publishes verified dictionary data for Portuguese-lexifier creoles so the ForroVivo ecosystem can look up attested forms without inventing translations.

The system has two layers in this repository:

1. **Dataset** — isolated JSON and Markdown lexicons under `data/`.
2. **API** — GET-only HTTP service in `api/`, public host `api.forrovivo.com`.

The public brand is ForroVivo.com. The language-learning product is on the App Store. Neither is stored in this repository. This repository does not write lexicon data over HTTP. New entries enter the JSON files through source-traced collection, then the API serves those files.

Accuracy comes before coverage. A missing translation is better than a guessed one.

## Languages

Each language is an independent linguistic system. Relatedness is not a licence to copy vocabulary.

| Language | Autonym | ISO 639-3 | Storage |
|---|---|---|---|
| Forro / Santome / Santomense | *lungwa santome* | cri | `data/saotome_dataset/forro/` |
| Angolar / Ngola | *n'golá* | aoa | `data/saotome_dataset/angolar/` |
| Principense / Lung’Ie | *lung’Ie* | pre | `data/saotome_dataset/lungie/` |
| Kabuverdianu / Kriolu | island varieties | kea | `data/caboverde_dataset/<island>/` |
| Kriol / Kiriol of Guinea-Bissau | regional varieties | pov | `data/guinebissau_dataset/<region>/` |
| Angola Contruy | Angola (country) | — | `data/angola_dataset/` |

The São Tomé and Príncipe languages are Gulf of Guinea creoles. They are not mutually intelligible. Cabo Verdean island creoles and Guinea-Bissau regional Kriol are Upper Guinea creoles; they are not the same language.

`data/angola_dataset/` is **Angola Contruy**, the Angola country dataset. It is not Angolar / Ngola. Kimbundu, Umbundu, and Angolan Portuguese are not Angola Contruy headwords unless a source names them that way. São Toméan Portuguese is not Forro, Angolar, or Lung’Ie.

If a source says only “Cape Verdean” and does not name the island, the form stays out of island folders. If it says only “Guinea-Bissau Kriol” and does not name the region, the form stays out of region folders. Casamance Kriyol of Senegal is not stored here.

## Dataset architecture

```text
data/
├── index.md
├── saotome_dataset/
│   ├── forro/
│   ├── angolar/
│   └── lungie/
├── caboverde_dataset/        island index; one folder per inhabited island
├── guinebissau_dataset/      region index; one folder per region
└── angola_dataset/           Angola Contruy (country; not Angolar)
```

Each lexicon folder holds:

- `dictionary.json` — machine-readable entries
- `dictionary.md` — human-readable entries
- `sources.md` — what was extracted from which work
- `Audio/` — recordings linked from matching entries, when present

Parent `dictionary.json` files under `data/saotome_dataset/`, `data/caboverde_dataset/`, and `data/guinebissau_dataset/` are **indexes**. They do not store a merged word list. `research/notes/comparative-seed.md` is a small comparative seed, not a merged lexicon.

The API catalog is derived from those index files. Adding a labelled island or region folder to the parent index is how the service learns a new isolated dataset. No vocabulary is copied between folders because two spellings look similar.

## Entry model

An entry names the language being documented and the target languages separately. A Portuguese gloss of a Forro word is not evidence for Angolar or for another island or region.

Fields are stored only when a source supports them. Unavailable information is `null`. Empty-looking completeness is not a goal.

Required when evidence exists:

- identity: `id`, `language`, `headword`, `orthography`, `part_of_speech`
- translations: `translation_pt`, `translation_en`
- example: `example`, `example_translation_pt`, `example_translation_en`
- sound: `pronunciation`, `ipa`, optional `audio`
- source: `source`, `source_type`, `source_page`, `source_url`
- quality: `verification_status`, `confidence`

Homographs stay separate entries (same headword, different `id` and part of speech). Variants stay tagged to their sources. Disagreements are `verification_status: disputed`, not a silent choice of one form.

Cross-language comparison is metadata only. It must not rewrite an isolated entry. A relationship is recorded only when a linguistic source supports it.

## Collection pipeline

The collector is a retrieval and verification process, not a translator.

1. Search files in this repository.
2. Search academic and institutional sources listed for that language.
3. Use the web only to locate a citable work.
4. Confirm that the evidence names Forro, Angolar, Lung’Ie, a Cabo Verdean island, a Guinea-Bissau region, or Angola Contruy — not Portuguese and not another creole.
5. Reject the wrong language, island, or region.
6. Write the attested fields into that folder’s `dictionary.json` and `dictionary.md`.
7. Record the citation in that folder’s `sources.md`.

Never:

- invent a translation
- creolize Portuguese to fill a gap
- copy Forro into Angolar or Lung’Ie
- copy Santiago into São Vicente, or Bissau into Cacheu
- copy Angolar into `data/angola_dataset/` (Angola Contruy is not Angolar)
- fabricate examples, IPA, etymology, or cultural notes

If the term is not attested for the queried language, the dataset returns:

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```

Confidence values are `high`, `medium`, `low`, `unverified`, and `disputed`. Low or unverified data is never promoted to high without new evidence.

Orthography follows the source. ALUSTP is used when that is the spelling in the source. The API does not rewrite one language into another’s spelling. Lookup may fold case and apostrophes to find the stored form; the stored headword is unchanged.

## API architecture

The service is FastAPI (`api/main.py`). At startup it loads every `dictionary.json` into memory and builds per-dataset indexes by `id` and headword. It does not query a separate database and does not generate lexical content.

Public host: **https://api.forrovivo.com**  
Local host: `http://127.0.0.1:8000`  
OpenAPI: https://api.forrovivo.com/docs

URL layout follows the folders:

```text
GET /v1
GET /v1/datasets
GET /v1/saotome/forro
GET /v1/saotome/forro/lookup?headword=
GET /v1/saotome/angolar/lookup?headword=
GET /v1/saotome/lungie/lookup?headword=
GET /v1/caboverde/{island}/lookup?headword=
GET /v1/guinebissau/{region}/lookup?headword=
GET /v1/angola/lookup?headword=
```

`family` is `saotome`, `caboverde`, `guinebissau`, or `angola`. São Tomé languages are `/v1/saotome/forro`, `/v1/saotome/angolar`, and `/v1/saotome/lungie`. Island and region folders stay under Cabo Verde and Guinea-Bissau.

Behaviour:

| Request | Result |
|---|---|
| Lexicon lookup, attested headword | Entries from that dataset only |
| Lexicon lookup, missing headword | `TERM_NOT_FOUND` for that dataset |
| Parent index (`/v1/caboverde/lookup`, `/v1/saotome/lookup`, …) | `TERM_NOT_FOUND` from the index (not a merged lexicon) |
| Unknown path | `DATASET_NOT_FOUND` |
| `/v1/angola/…` | Angola Contruy only. Does not serve Angolar |
| Search `q=` | Restricted to the dataset in the path |

The API is GET, HEAD, and OPTIONS only. CORS allows ForroVivo brand origins. TLS-terminating proxies are supported through forwarded headers. Audio URLs are absolute and stay inside the queried dataset’s `Audio/` folder. Path traversal outside that folder is rejected.

Runtime settings live in `api/settings.py`:

- `FORROVIVO_API_HOST` — default `api.forrovivo.com`
- `FORROVIVO_API_ORIGIN` — default `https://api.forrovivo.com`
- `FORROVIVO_SITE_ORIGIN` — default `https://www.forrovivo.com`
- `FORROVIVO_GITHUB_URL` — default `https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-`
- `FORROVIVO_APP_STORE_URL` — default `https://apps.apple.com/app/id6751409176`

## Hosts

| Host | Role |
|---|---|
| https://www.forrovivo.com | Public brand |
| https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo- | Open research and datasets |
| https://api.forrovivo.com | Machine-readable linguistic data |
| https://apps.apple.com/app/id6751409176 | Language-learning product |
| http://127.0.0.1:8000 | Local API process |

DNS for `api.forrovivo.com` must point at the process that runs:

```text
PYTHONPATH=. uvicorn api.main:app --host 0.0.0.0 --port 8000
```

The public brand host is not this API. Do not serve a merged lexicon from `forrovivo.com` as a substitute for isolated dataset paths.

## Quality controls

Isolation is enforced in storage and in routing. A Forro headword cannot appear as an Angolar result. Tests in `api/tests/` check that property against the real JSON files (Forro `kume` is not returned for Angolar; `/v1/angola` is Angola Contruy and does not serve Angolar; parent Cabo Verde lookup is not a merged list).

Licenses stay on the entry. Original project materials are CC BY 4.0. *Dicionário livre santome/português* extracts remain CC BY-NC. APiCS audio remains CC BY 4.0. Other publications keep publisher or author terms. See [LICENSE](../../LICENSE) and [research/sources](../sources/README.md).

## Out of scope

This technical design does not include:

- generative translation
- a merged “all creoles” search
- write APIs for lexicon data
- the ForroVivo.com website UI or the App Store language-learning product
- substitution of Portuguese, Kimbundu, Umbundu, or Casamance Kriyol for a missing creole form
