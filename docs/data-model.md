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
| `knowledge.json` | Optional Knowledge Base records (grammar, proverbs, culture, …) |
| `Audio/` | Recordings linked from matching entries, when present |

Parent folders `data/saotome_dataset/`, `data/caboverde_dataset/`, `data/guinebissau_dataset/`, `data/angola_dataset/`, and the other `data/*_dataset/` country folders are indexes. They must not store a merged word list. Angola Contruy is `data/angola_dataset/contruy/`, not an alias of Angolar.

Schemas:

- [dictionary.schema.json](../schema/dictionary.schema.json)
- [source.schema.json](../schema/source.schema.json)
- [language.schema.json](../schema/language.schema.json)
- [knowledge.schema.json](../schema/knowledge.schema.json)

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

## Word graph

Lookup returns an attested relation graph on each entry. Portuguese and English glosses are **concepts the word means**, not proof that the word belongs to Portuguese or English.

```text
headword
     │
     ├── means → Portuguese concept
     ├── means → English concept
     ├── belongs to → one isolated language
     ├── related to → grammar rule
     ├── appears in → proverb
     ├── related to → cultural practice
     └── documented by → source
```

The API object is `graph`:

| Edge | When it is present |
|---|---|
| `belongs_to` | Always, from the folder that stores the entry |
| `means` | `translation_pt` / `translation_en` when the source supplies them |
| `related_to` | `grammatical_information`, `cultural_context`, or a `knowledge.json` grammar/culture record linked by `related_entry_ids` or the same headword |
| `appears_in` | A proverb, expression, or story in **that** folder’s `knowledge.json`, linked the same way |
| `documented_by` | The entry `source` |

Missing edges stay empty. A Forro graph never includes Angolar records. Do not invent a proverb or grammar rule to complete the tree.

## Knowledge Base

Non-lexical records (grammar sketches, expressions, proverbs, culture, food, music, dance, folklore, stories, places) live in `knowledge.json` in the **same isolated folder** as `dictionary.json`. They are not a second encyclopedia copied across languages.

Required when a row exists:

- `id`, `language`, `collection`, `source`

Present when the source supplies them; otherwise `null`:

- `title`, `headword`
- `text`, `text_pt`, `text_en`
- `related_entry_ids`
- source metadata, `verification_status`, `confidence`

If `knowledge.json` is absent, the API still serves the collections as empty lists. Do not invent a proverb, story, or cultural note to fill them.

`/v1/languages` is the catalog. `/v1/{dataset}/entries` is the lexicon. `/v1/{dataset}/sources` is that folder’s bibliography. `/v1/{dataset}/search` searches that folder only.

## Isolation

| Dataset | Path |
|---|---|
| Forro | `data/saotome_dataset/forro/` |
| Angolar | `data/saotome_dataset/angolar/` |
| Lung’Ie | `data/saotome_dataset/lungie/` |
| Kabuverdianu (one island) | `data/caboverde_dataset/<island>/` |
| Guinea-Bissau Kriol (one region) | `data/guinebissau_dataset/<region>/` |
| Angola Contruy | `data/angola_dataset/contruy/` |
| Umbundu | `data/angola_dataset/umbundu/` |
| Kimbundu | `data/angola_dataset/kimbundu/` |
| Kikongo | `data/angola_dataset/kikongo/` |
| Seychellois | `data/seychelles_dataset/seychellois/` |
| Annobonese | `data/equatorialguinea_dataset/annobonese/` |
| Pichi | `data/equatorialguinea_dataset/pichi/` |
| Fanakalo | `data/southafrica_dataset/fanakalo/` |
| Ghanaian Pidgin | `data/ghana_dataset/ghanaianpidgin/` |
| Krio | `data/sierraleone_dataset/krio/` |
| Kituba | `data/rdcongo_dataset/kituba/` |
| Mauritian | `data/mauritius_dataset/mauritian/` |
| Naija | `data/nigeria_dataset/naija/` |
| Réunion Creole | `data/reunion_dataset/reunioncreole/` |
| Sango | `data/centralafrican_dataset/sango/` |
| Cameroonian Pidgin | `data/cameroon_dataset/cameroonianpidgin/` |

Never copy a form from one of these folders into another because the spelling looks similar.

## Missing data

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```
