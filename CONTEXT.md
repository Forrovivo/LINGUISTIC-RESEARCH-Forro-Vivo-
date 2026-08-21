# Linguistic Research — Implementation Masterplan

> **Operator:** LIVLU TECHNOLOGIES LTD  
> **Pillar:** Research (open licence)  
> **Author & Creator:** Henriques Pontes · **Linguistic Research co-founder:** Luis Lima  
> **Official Website:** [forrovivo.com](https://forrovivo.com) (Open Knowledge sister surface)  
> **Public API:** [api.forrovivo.com](https://api.forrovivo.com)  
> **Privacy / Terms (company):** [forrovivo.com/legal/privacy](https://www.forrovivo.com/legal/privacy) · [forrovivo.com/legal/terms](https://www.forrovivo.com/legal/terms)  
> **GitHub:** [Forrovivo/linguistic-research](https://github.com/Forrovivo/linguistic-research) · Org [Forrovivo](https://github.com/Forrovivo) · packs also via [datasets](https://github.com/Forrovivo/datasets)  
> **Contact:** support@forrovivo.com | geral@forrovivo.com  
> **License:** CC BY 4.0 for project-original materials + **source-specific terms unchanged** (not a free licence to invent glosses)  
> **Place in LIVLU TECHNOLOGIES:** Individual Research team repo — the **only open** product pillar. Sister pillars Open Knowledge and Learning are proprietary.  
> **Quick Summary:** Attested creole / contact-language lexicons and a read-only dictionary API. Missing stays `TERM_NOT_FOUND`. No generative fill. No mixed-language folders.

---

## Big Picture Tracker

```
[DONE] Phase 1: House rules + isolated data tree
       |
[DONE] Phase 2: Schemas, validation, import tooling
       |
[DONE] Phase 3: Local FastAPI harness + pytest
       |
[DONE] Phase 4: Production Cloudflare Worker API (api.forrovivo.com)
       |
[DONE] Phase 5: Knowledge Base graph endpoints (/v1/kb…)
       |
[DONE] Phase 6: Africa country indexes (hub ≠ merged lexicon)
       |
[NEXT] Phase 7: Fill empty language folders only from attested sources
       |
[NEXT] Phase 8: Keep OpenAPI + Worker package aligned with Open Knowledge docs
       |
[LATER] Broader Africa coverage under the same isolation rules

Open Knowledge presents this data. Learning apps consume packs / API. Neither owns this git history.
```

---

## PHASE 1: House rules & isolation (COMPLETED)

> **Goal:** One language, one box. Evidence or absence — never invention.

- [x] Documented house rules in README / CONTRIBUTING
- [x] Country / language folder tree under `data/`
- [x] Missing headword → `TERM_NOT_FOUND` (no guessed translation)
- [x] Source attribution retained with third-party terms

---

## PHASE 2: Schemas & tooling (COMPLETED)

> **Goal:** Machine-checkable lexicon shape before publish.

- [x] JSON Schema under `schema/`
- [x] Validate / import / build-index scripts under `scripts/`
- [x] Methodology and data-model docs under `docs/`

---

## PHASE 3: Local API harness (COMPLETED)

> **Goal:** Develop and test against on-disk JSON without requiring the edge.

- [x] Python FastAPI (`api/main.py`) over repository files
- [x] pytest suite for contract honesty
- [x] FastAPI is **not** the public production edge

---

## PHASE 4: Production Worker API (COMPLETED)

> **Goal:** Public read-only host at `https://api.forrovivo.com`.

- [x] Cloudflare Worker + Hono (`api/src`)
- [x] Wrangler deploy path; OpenAPI `api/openapi.yaml`
- [x] Edge cache + per-dataset indexes (id, headword)
- [x] Public linguistic GET stays keyless for read

---

## PHASE 5: Knowledge Base (COMPLETED)

> **Goal:** Expose attested relation graphs without inventing edges.

- [x] Optional `knowledge.json` per lexicon folder
- [x] `/v1/kb` and related GETs
- [x] Grammar / culture / proverb / source links only when evidenced

---

## PHASE 6: Country indexes (COMPLETED)

> **Goal:** Parent `dictionary.json` files are indexes, not merged dictionaries.

- [x] Angola hub vs Contruy / Umbundu / Kimbundu / Kikongo separation
- [x] Africa country index folders present; empty lexicons stay empty until sourced
- [x] Open Knowledge catalog mirrors this isolation (does not store the JSON here)

---

## PHASE 7–8: Collection & contract (IN PROGRESS)

- [ ] Author / import attested material for empty language boxes (credit sources; keep terms)
- [ ] Keep Worker package / OpenAPI in sync with Open Knowledge `/docs/api-reference`
- [ ] Expand coverage only under isolation rules — never merge folders for spelling similarity

---

## Tech Stack Cheat-Sheet

| What | Tool | Why |
|---|---|---|
| **Datasets** | JSON + Markdown under `data/` | Attested lexicons and notes |
| **Schema** | JSON Schema + scripts | Validate before publish |
| **Production API** | Cloudflare Workers + Hono | `api.forrovivo.com` |
| **Local / tests** | FastAPI + pytest | On-disk harness |
| **Contract** | OpenAPI YAML + `/docs` on API host | Developer-facing truth |
| **Licence** | CC BY 4.0 + source terms | Open Research pillar only |
| **Docs** | `TECH_REPORT.md` · `TECH_REPORT_v2.0.md` · this file | Spec vs shipped lab |

---

*This document is the active source of truth for step-by-step development of the Linguistic Research pillar.*
