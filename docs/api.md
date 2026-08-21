# API

**ForroVivo** is the platform and ecosystem. This API is the machine-readable layer of the **Linguistic Research** initiative within it.

| Surface | Role |
|---|---|
| [forrovivo.com](https://forrovivo.com) | Public brand (Open Knowledge). `www` redirects there. |
| [forrovivo.com/api](https://forrovivo.com/api) | Developer playground on the Open Knowledge site |
| [GitHub](https://github.com/Forrovivo/linguistic-research) | Open research and datasets |
| [api.forrovivo.com](https://api.forrovivo.com) | Machine-readable linguistic data |
| [ForroVivo on the App Store](https://apps.apple.com/app/id6751409176) | Language-learning product |

**Public host:** https://api.forrovivo.com  
**Worker local host:** http://127.0.0.1:8787  
**Python local host:** http://127.0.0.1:8000  
**Contract:** [openapi.yaml](../api/openapi.yaml)  
**Examples:** [api/examples](../api/examples)

The API is GET-only. Production reads `data/` from this GitHub repository. It does not invent translations, merge languages, or write lexicon data. The website and the App Store product are not this service.

## Production (GitHub + Cloudflare Workers)

| Layer | Role |
|---|---|
| This GitHub repository | Source of truth for `data/**/dictionary.json`, `knowledge.json`, and audio |
| Cloudflare Worker | GET router at `api.forrovivo.com` (production) |
| Workers Builds | Production deploy of the Worker on push to `main` |
| GitHub Actions (`Verify ForroVivo API`) | Bundle dry-run only — no Cloudflare credentials |

The Worker fetches attested files from GitHub (`raw.githubusercontent.com`) and caches them at the edge. A push that only changes `data/` is live after cache TTL. A push that changes Worker code under `api/` or root `wrangler.jsonc` deploys the Worker via Workers Builds.

Deploy runs at the repository root. Root [`wrangler.jsonc`](../wrangler.jsonc) points `main` at `api/src/index.ts` and installs Worker dependencies before upload. Root `requirements.txt` is Python pytest support, not the production runtime. The dashboard Worker name must match wrangler `name`: `linguistic-research-forro-vivo`.

```text
cd api
npm install
npx wrangler deploy
```

Attach DNS `api.forrovivo.com` to **this Worker**, not to the ForroVivo.com website.

`/` redirects to `/v1`. Health check: `/health` and `/v1/health`.

## Developer contract

| Topic | Behaviour |
|---|---|
| Versioning | Data routes are `/v1/...`. `/` redirects to `/v1`. Responses send `API-Version: v1`. JSON `api` is the URL family; `version` is the release. |
| Naming | Lexicons: `/v1/{family}/{variety}/{collection}`. Country indexes: `/v1/{family}` — not a merged dictionary. Angola Contruy is `/v1/angola/contruy`, not `/v1/angola`. |
| Authentication | None. Public GET, HEAD, and OPTIONS. |
| CORS | Any origin. Credentials are not used. |
| Rate limits | Fair-use per client. Over the policy: `429` `RATE_LIMITED` and `Retry-After`. Read `RateLimit-Policy`. |
| Attribution | Lookup envelopes include `attribution`. Headers send `Link` with `rel=source` (this GitHub repository) and `rel=license`. Each entry keeps its cited source. Project materials are CC BY 4.0; source extracts keep their original terms. |

Interactive docs (web UI): https://forrovivo.com/api  
The Worker also serves HTML at `/docs`.  
Contract: https://api.forrovivo.com/v1/openapi.yaml

## Run locally

Worker (same GitHub data path as production):

```text
cd api
npm install
npm run dev
```

Python (local `data/` files, used by pytest):

```text
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
PYTHONPATH=. uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

## Paths

São Tomé languages live under `data/saotome_dataset/`, matching `/v1/saotome/forro`, `/v1/saotome/angolar`, and `/v1/saotome/lungie`.

| Method | Path |
|---|---|
| GET | `/v1` |
| GET | `/v1/health` |
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
| GET | `/v1/angola/contruy/lookup?headword=` |
| GET | `/v1/angola/umbundu/lookup?headword=` |
| GET | `/v1/angola/kimbundu/lookup?headword=` |
| GET | `/v1/angola/kikongo/lookup?headword=` |
| GET | `/v1/seychelles/seychellois/lookup?headword=` |
| GET | `/v1/equatorialguinea/annobonese/lookup?headword=` |
| GET | `/v1/equatorialguinea/pichi/lookup?headword=` |
| GET | `/v1/southafrica/fanakalo/lookup?headword=` |
| GET | `/v1/ghana/ghanaianpidgin/lookup?headword=` |
| GET | `/v1/sierraleone/krio/lookup?headword=` |
| GET | `/v1/rdcongo/kituba/lookup?headword=` |
| GET | `/v1/mauritius/mauritian/lookup?headword=` |
| GET | `/v1/nigeria/naija/lookup?headword=` |
| GET | `/v1/reunion/reunioncreole/lookup?headword=` |
| GET | `/v1/centralafrican/sango/lookup?headword=` |
| GET | `/v1/cameroon/cameroonianpidgin/lookup?headword=` |

`/v1/saotome`, `/v1/caboverde`, `/v1/guinebissau`, `/v1/angola`, and the other country keys are indexes. Lookup there returns `TERM_NOT_FOUND`. `/v1/angola/contruy` is Angola Contruy. It does not serve Angolar.

The Knowledge Base uses the same isolation. `/v1/languages` lists lexicons, not a merged word list. `/v1/grammar` (and the sibling collection indexes) list **counts per folder**. Records are read from `/v1/{dataset}/grammar`, `/v1/{dataset}/proverbs`, and the other collections. Empty means unsourced, not “fill from another creole”. `/v1/search` requires `dataset=`.

A missing headword in a lexicon returns that dataset’s `TERM_NOT_FOUND` object. An unknown path returns `DATASET_NOT_FOUND`. Search never crosses folders.

Each returned entry includes `graph`: meaning concepts (Portuguese / English), `belongs_to` (one language), `related_to` (grammar, culture), `appears_in` (proverb, story), and `documented_by` (source). Empty arrays mean unsourced, not “fill from another creole”. Lookup also returns `attribution` for the folder.

Interactive docs (web UI): https://forrovivo.com/api
