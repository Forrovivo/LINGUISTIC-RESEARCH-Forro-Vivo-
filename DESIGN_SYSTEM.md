# Design System — Linguistic Research

> **Operator:** LIVLU TECHNOLOGIES LTD  
> **Pillar:** Research (open licence)  
> **UI note:** This repository has **no product UI design system**. It ships attested datasets and a read-only API.

---

## Place in LIVLU TECHNOLOGIES

Research is data + API. Visual presentation of that data on the web belongs to **Open Knowledge** (that repo’s `DESIGN_SYSTEM.md` / [forrovivo.com](https://forrovivo.com)). Learning apps use their own native design systems.

Do not add a marketing site or App Store UI chrome to this folder.

---

## Presentation principles (data honesty)

These rules govern how Research content must be presented anywhere it is shown:

1. **Isolation** — One language / variety, one folder. UI and docs must not merge islands, regions, or lookalike creoles.
2. **Missing is visible** — Unattested terms stay `TERM_NOT_FOUND`. Never style a gap as a successful translation.
3. **Source first** — Attribution and third-party licence notices travel with extracts (see [LICENSE](LICENSE), [CONTRIBUTING.md](CONTRIBUTING.md)).
4. **Indexes ≠ lexicons** — Parent `dictionary.json` country files are indexes, not merged dictionaries. Downstream UI must keep that distinction.
5. **No generative fill** — Knowledge Base edges and glosses exist only when evidenced in `knowledge.json` / lexicon files.

---

## Surfaces that consume this data

| Surface | Design system to follow |
|---------|-------------------------|
| [forrovivo.com](https://forrovivo.com) | Open Knowledge `DESIGN_SYSTEM.md` |
| ForroVivo App (iOS / Android) | Learning `DESIGN_SYSTEM.md` in each client repo |
| [api.forrovivo.com](https://api.forrovivo.com) | Machine-readable JSON / OpenAPI — no branded UI chrome required |

---

## Docs / markdown tone

- Prefer clear tables and code blocks over decorative badges in operational docs.
- Keep methodology language precise; do not use gamified Learning copy in collection guides.

---

*Implementation tracker: [CONTEXT.md](CONTEXT.md). Spec: [TECH_REPORT.md](TECH_REPORT.md).*
