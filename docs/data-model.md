# Data model

**Project started:** 23 March 2023

Lexical data lives under `data/`. Schemas live under `schema/`. Collection rules are in [methodology.md](methodology.md). This model belongs to the ForroVivo Linguistic Research initiative, not to the website UI or the App Store product.

## Files

Each isolated lexicon folder contains:

| File | Role |
|---|---|
| `dictionary.json` | Machine-readable lexicon |
| `dictionary.md` | Human-readable lexicon |
| `sources.md` | Extraction record for that language or variety |
| `Audio/` | Recordings linked from matching entries, when present |

Parent folders `data/saotome/`, `data/caboverde/`, and `data/guinebissau/` are indexes. They must not store a merged word list. `data/angola/` is an alias of `data/saotome/angolar/`.

Schemas:

- [dictionary.schema.json](../schema/dictionary.schema.json)
- [source.schema.json](../schema/source.schema.json)
- [language.schema.json](../schema/language.schema.json)

## Entry

An entry names the language being documented and the target languages separately. A Portuguese gloss of a Forro word is not evidence for Angolar or for another island or region.

Required when the row exists:

- `id`, `language`, `headword`, `source`

Present when the source supplies them; otherwise `null`:

- `translation_pt`, `translation_en`
- `example`, `example_translation_pt`, `example_translation_en`
- `pronunciation`, `ipa`
- `part_of_speech`, `orthography`
- `cultural_context`, `etymology`
- `verification_status`, `confidence`

Homographs are separate entries. Variants stay tagged to their sources. Disagreements are `disputed`.

Cross-language comparison is metadata only. It must not rewrite an isolated entry.

## Isolation

| Dataset | Path |
|---|---|
| Forro | `data/saotome/forro/` |
| Angolar | `data/saotome/angolar/` |
| Lung’Ie | `data/saotome/lungie/` |
| Kabuverdianu (one island) | `data/caboverde/<island>/` |
| Guinea-Bissau Kriol (one region) | `data/guinebissau/<region>/` |
| Angola | alias of `data/saotome/angolar/` |

Never copy a form from one of these folders into another because the spelling looks similar.

## Missing data

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```
