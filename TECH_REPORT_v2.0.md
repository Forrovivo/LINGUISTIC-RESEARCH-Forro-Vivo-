# Linguistic Research v2.0 Technical Report

> Authored: 2026-08-21
> Version: v2.0 (Feature Complete)
> Based on: v1.0 → v2.0 Incremental Iteration
> Project Path: `<project-root>/DATA COLLECTION/`
> Product: Linguistic Research (datasets + public API)
> Pillar: Research (open licence)
> Operator: LIVLU TECHNOLOGIES LTD
> Team note: Individual Research repo; Open Knowledge and Learning stay separate

---

## I. v2.0 Overview

Building upon the open research lab in v1.0 (isolated lexicons, GET-only dictionary API, house rules), v2.0 focuses on the **production Cloudflare Worker API**, **Knowledge Base surfaces**, **Africa country indexes**, and **operator alignment**. It does not move website UI or App Store app code into this repository, and it does not invent translations.

| Direction | Main Changes |
|-----------|--------------|
| Production API | Cloudflare Worker (`api/`, Hono, Wrangler). Public host `https://api.forrovivo.com`. Package **2.4.0**. |
| Knowledge Base | Optional `knowledge.json`; `/v1/kb` and related GETs; attested relation graph only |
| Country indexes | Parent `dictionary.json` files are indexes, not merged lexicons. Angola hub vs Contruy / Umbundu / Kimbundu / Kikongo |
| Africa folders | Country index folders exist; empty lexicons stay empty until a source names that language |
| Operator branding | **LIVLU TECHNOLOGIES LTD** operates the ForroVivo platform; this repo is the research lab |
| Evidence rule unchanged | Missing → `TERM_NOT_FOUND`. No generative fill. |

Website UI: Open Knowledge at `https://forrovivo.com`. Learning product: Forro Vivo App (separate repos). This repository = attested data + read-only API.

---

## II. Technology Stack

Same mission as v1.0, with production emphasis:

| Layer | Technology Choice |
|-------|-------------------|
| Datasets | JSON + Markdown under `data/`; JSON Schema under `schema/` |
| Production API | Cloudflare Workers + Hono (`api/src`) |
| Local / tests | Python FastAPI + pytest over on-disk files (`api/main.py`) |
| Tooling | Wrangler; validate / import / build-index scripts |
| Contract | OpenAPI `api/openapi.yaml`; docs playground at `/docs` on the API host |
| Licence | CC BY 4.0 project materials + source-specific terms |

Public linguistic GET stays keyless for read. Optional key issue is a platform concern served through the Worker contract when enabled; this report does not treat keys as a licence to invent lexicon.

---

## III. Directory Structure (v2.0 Changes)

```
DATA COLLECTION/
├── TECH_REPORT.md                    # v1.0 baseline (formalized from research notes)
├── TECH_REPORT_v2.0.md               # This document
├── README.md                         # v2.0 Changed: operator line
├── CONTRIBUTING.md
├── LICENSE
├── api/
│   ├── package.json                  # Worker 2.4.0
│   ├── openapi.yaml
│   ├── src/                          # Cloudflare Worker
│   └── main.py                       # Local FastAPI harness
├── data/                             # Country / language isolation tree
├── docs/                             # methodology, data-model, api
├── research/
│   ├── sources/
│   └── notes/tech-report.md          # Earlier working note (superseded as baseline by TECH_REPORT.md)
├── schema/
└── scripts/
```

Lexical data is not stored in Open Knowledge. Open Knowledge catalogs and proxies this API.

---

## IV. Detailed v2.0 Core Changes

### 4.1 Production Worker API

**Background**: v1.0 defined isolation and a GET-only service. Production needed an edge host over GitHub-published JSON.

**Solution**:

```
Client
  └─ GET https://api.forrovivo.com/v1/…
        └─ Worker reads dictionary.json / knowledge.json from repo
              ├─ Edge cache
              ├─ Per-dataset indexes (id, headword)
              └─ TERM_NOT_FOUND when unattested
```

Python FastAPI remains the local pytest harness. It is not the public production edge.

### 4.2 Knowledge Base graph

**Background**: Lexicon lookup alone does not expose grammar, proverb, and culture records.

**Solution**: Optional `knowledge.json` per lexicon folder. Lookup may attach an attested relation graph (meaning concepts, membership, grammar/culture, proverb/story, source). No separate invented database. No edges without evidence.

### 4.3 Country indexes vs lexicons

**Background**: Similar spellings tempt merged folders (e.g. Angolar vs Angola).

**Solution**: Parent country `dictionary.json` files are **indexes**. `/v1/angola` is a country hub, not Umbundu and not Angolar of São Tomé. Angola Contruy is `/v1/angola/contruy`. Each variety stays in its own folder.

### 4.4 Africa collection surface

**Background**: Roadmap expands beyond Gulf of Guinea and Upper Guinea seeds.

**Solution**: Country index folders exist for additional African contact languages. Folders without labelled sources stay empty. Empty is correct. Guessing is not.

### 4.5 Operator and platform wording

**Background**: Documentation alignment across the LIVLU TECHNOLOGIES workspace.

**Solution**: README and this report state **LIVLU TECHNOLOGIES LTD** = operator, **ForroVivo** = platform, **this repo** = Linguistic Research lab.

---

## V. Data Layer Changes

### 5.1 What this repo stores

| Kind | Location | Notes |
|------|----------|--------|
| Lexicons | `data/*_dataset/…/dictionary.json` (+ `.md`) | Attested only |
| Sources | `…/sources.md` | Citation trail |
| Knowledge | optional `knowledge.json` | Attested KB records |
| Schemas | `schema/` | Validation |
| Audio | optional `Audio/` | Linked from entries when present |

### 5.2 Entry model (unchanged contract)

Fields only when a source supports them. Unavailable information is `null`. Homographs stay separate entries. Cross-language comparison is metadata only and must not rewrite an isolated entry.

Confidence: `high` | `medium` | `low` | `unverified` | `disputed`. Low or unverified is never silently promoted.

### 5.3 Error contract

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```

---

## VI. Build & Deployment

### 6.1 Development environment

| Surface | Host |
|---------|------|
| Production | `https://api.forrovivo.com` |
| Worker local | `http://127.0.0.1:8787` |
| Python local | `http://127.0.0.1:8000` |

```bash
cd api
npm run dev      # wrangler
# or run the Python harness for pytest over on-disk data
```

### 6.2 Standard publish flow

1. Attest entries into the correct isolated folder.
2. Record citations in `sources.md`.
3. Validate against schemas / scripts.
4. Deploy Worker when API code changes (`wrangler deploy`).
5. Data origin remains the published GitHub files the Worker reads.

### 6.3 Out of scope for this repo

Website UI, App Store learning app, generative translation, merged all-creoles search, write APIs that invent lexicon over HTTP.

---

## VII. Complete Differences from v1.0

### 7.1 Emphasized in v2.0

- Production Worker **2.4.0** as the public edge
- Knowledge Base GETs and attested graphs
- Explicit country-index vs lexicon rules (Angola hub clarity)
- Broader Africa index folders (empty until sourced)
- Operator branding (LIVLU TECHNOLOGIES LTD)
- Root `TECH_REPORT.md` / `TECH_REPORT_v2.0.md` pair aligned with other ForroVivo products

### 7.2 Unchanged from v1.0

- Isolation house rules
- Evidence-first collection pipeline
- GET-only dictionary mission
- `TERM_NOT_FOUND` over guessing

---

## VIII. v2.0 Boundary Notes (same release)

### 8.1 Empty folders are valid

An Africa language folder with no labelled source must stay empty. Do not seed from Portuguese or from a related creole.

### 8.2 Unnamed varieties stay out

If a source says only “Cape Verdean” without an island, or only “Guinea-Bissau Kriol” without a region, the form stays out of island/region folders. Casamance is not stored here.

### 8.3 Open Knowledge is not this repo

Open Knowledge proxies and documents this API. Lexical source of truth remains here (and the Worker’s published files).

---

## IX. Known Issues & Limitations (Inherited and new)

| Item | Impact | Direction |
|------|--------|-----------|
| Many Africa lexicons empty | Catalog shows indexes without words | Collect only with labelled sources |
| Site / app live elsewhere | Contributors may look in the wrong repo | Keep README boundary clear |
| Counts can drift in marketing copy | Stale numbers | Prefer live `/v1/languages` over hardcoded totals |
| Dual runtimes (Worker + Python) | Two entry points to maintain | Keep Python as test harness; Worker as production |

---

## X. Key Code Explanations (New in v2.0)

### 10.1 Isolation URL layout

```text
GET /v1/saotome/forro/lookup?headword=
GET /v1/saotome/angolar/lookup?headword=
GET /v1/angola/contruy/lookup?headword=
GET /v1/angola/umbundu/lookup?headword=
```

Parent country paths are indexes. Lookup stays inside one named dataset.

### 10.2 Edge indexes

The Worker caches `dictionary.json` from the repository and builds per-dataset indexes by `id` and headword. It does not generate lexical content.

### 10.3 Attested KB links only

Knowledge records attach through `related_entry_ids` or matching headword when evidence exists. No speculative graph fill.

---

## XI. Future Development Suggestions

1. **[High] Source-led Africa fill**: Populate empty country language folders only with labelled, citable works.
2. **[High] Keep OpenAPI and docs in sync**: Every route change updates `api/openapi.yaml` and `docs/api.md` in the same change.
3. **[Medium] Stronger validation CI**: Fail PRs that break schema or isolation rules.
4. **[Medium] Reduce dual-runtime drift**: Shared fixtures between Worker and Python tests.
5. **[Low] Audio coverage**: Link recordings only when files and citations exist.

---

*This report covers the v2.0 deliverable state (21 August 2026). For the v1.0 baseline (purpose, languages table, collection pipeline, entry model), see `TECH_REPORT.md`.*
