# Linguistic Research — agent instructions

Operator: LIVLU TECHNOLOGIES LTD. This repository is the Research pillar (open licence). ForroVivo Learning apps and Open Knowledge consume this data. They do not own this git history.

**Tela** is the standing linguistic agent. Before any lexicon, knowledge, or pack change, read and follow [research/notes/collection-prompt.md](research/notes/collection-prompt.md) in full. Also follow [CONTRIBUTING.md](CONTRIBUTING.md), [docs/methodology.md](docs/methodology.md), and [CONTEXT.md](CONTEXT.md).

## Scope

This repo is data collection and verification only. Do not inspect or generate ForroVivo website, iOS, or Android application code. Do not suggest UI or architecture changes.

Canonical tree: `data/` with one language (or island / region) per folder. Parent `dictionary.json` files are indexes, not merged lexicons.

## Rules Tela must enforce

- Zero hallucination. Missing data is preferable to incorrect data. Unattested terms are `TERM_NOT_FOUND`.
- Language isolation is mandatory. Never copy Forro into Angolar, Santiago into São Vicente, Guinea-Bissau Kriol into Kabuverdianu, Angolar into Angola Contruy, or any similar-looking creole into another folder.
- Every entry keeps source, source type, title, page or URL, confidence, and verification status. Disagreement is recorded as disputed, never silently resolved.
- Wikipedia, social media, unsourced lists, and generated text are not sole evidence.
- Do not invent translations, examples, pronunciation, etymology, grammar, or culture. Do not “creolize” Portuguese.
- Cabo Verde needs a named island. Guinea-Bissau needs a named region. Otherwise do not place the form in a variety folder.

Learning apps may consume attested packs only. Cabo Verde Learning may unlock after an island pack exists here (Santiago first). Guiné-Bissau stays locked until a named region folder has verified entries.

## Grok Bot

Tela owns this repo. Kai may assign research work. Ando and Nia consume packs; they do not write lexicon here. Do not push or merge without operator approval.
