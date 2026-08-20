# Methodology

**Project started:** 23 March 2023  
**Founder and idealist:** Henriques Pontes  
**Linguistic Research co-founder:** Luis Lima

This repository is the **Linguistic Research** initiative inside the ForroVivo platform. It collects verified dictionary data for Portuguese-lexifier creoles and, under `data/angola_dataset/`, local Bantu languages of Angola. Accuracy comes before coverage. A missing translation is better than a guessed one.

The operational specification is [collection-prompt.md](../research/notes/collection-prompt.md). How to contribute: [CONTRIBUTING.md](../CONTRIBUTING.md). Bibliography: [research/sources](../research/sources/README.md).

This is a **data collection and linguistic research** task. The public brand is [ForroVivo.com](https://www.forrovivo.com). The language-learning product is on the [App Store](https://apps.apple.com/app/id6751409176). Do not inspect, modify, or discuss that product’s application code, UI, or databases in this repository.

## Languages and isolation

Treat each language as an independent linguistic system. Never copy a word from one folder into another because the spellings look similar.

| Language | Autonym | ISO 639-3 | Canonical path | Translation pairs |
|---|---|---|---|---|
| Forro / Santome / Santomense | *lungwa santome* | cri | `data/saotome_dataset/forro/` | Forro ↔ Portuguese, Forro ↔ English |
| Angolar / Ngola | *n'golá* | aoa | `data/saotome_dataset/angolar/` | Angolar ↔ Portuguese, Angolar ↔ English |
| Principense / Lung’Ie | *lung’Ie* | pre | `data/saotome_dataset/lungie/` | Lung’Ie ↔ Portuguese, Lung’Ie ↔ English |
| Kabuverdianu / Kriolu | island varieties | kea | `data/caboverde_dataset/<island>/` | that island ↔ Portuguese, that island ↔ English |
| Kriol / Kiriol of Guinea-Bissau | regional varieties | pov | `data/guinebissau_dataset/<region>/` | that region ↔ Portuguese, that region ↔ English |
| Angola Contruy | Angola (country) | — | `data/angola_dataset/contruy/` | Angola Contruy ↔ Portuguese, Angola Contruy ↔ English |
| Umbundu | *umbundu* | umb | `data/angola_dataset/umbundu/` | Umbundu ↔ Portuguese, Umbundu ↔ English |
| Kimbundu | *kimbundu* | kmb | `data/angola_dataset/kimbundu/` | Kimbundu ↔ Portuguese, Kimbundu ↔ English |
| Kikongo | *kikongo* | kng | `data/angola_dataset/kikongo/` | Kikongo ↔ Portuguese, Kikongo ↔ English |

Angolar / Ngola is a São Tomé creole in `data/saotome_dataset/angolar/`. Angola Contruy is in `data/angola_dataset/contruy/`. They are not the same language. Do not copy between them.

Umbundu, Kimbundu, and Kikongo are local Bantu languages of Angola. They are not Angola Contruy and they are not each other. Kikongo of Angola is not Kituba.

The São Tomé and Príncipe languages are related Gulf of Guinea creoles. They are not mutually intelligible. Cabo Verdean island creoles and Guinea-Bissau regional Kriol are Upper Guinea creoles; they are not the same language.

Portuguese is the official language of these countries. São Toméan Portuguese is not Forro, Angolar, or Lung’Ie.

If a source says only “Cape Verdean” and does not name the island, do not place the form in an island folder. If it says only “Guinea-Bissau Kriol” and does not name the region, do not place the form in a region folder. Do not insert Casamance Kriyol of Senegal.

Parent `dictionary.md` and `dictionary.json` files under `saotome/`, `caboverde/`, `guinebissau/`, and `angola/` are indexes, not merged lexicons.

## Zero hallucination

This is retrieval and verification, not generative translation.

Never:

- invent a translation
- infer a missing word
- create a word by modifying Portuguese
- assume two similar words have the same meaning
- transfer a word from one creole in this repository to another
- use another language as evidence for a missing entry
- fabricate example sentences, cultural information, pronunciation, etymology, or grammar

If evidence does not exist, mark the field as unavailable (`null`). Do not invent empty fields that look complete.

Knowledge Base collections (grammar, expressions, proverbs, culture, food, music, dance, folklore, stories, places) follow the same rule. They are stored in `knowledge.json` in the isolated folder. An empty collection is the correct result until a source names that language.

## Source verification

For every lexical item, record:

- source
- source type
- source title
- page number, when applicable
- URL, when applicable
- confidence
- verification status

If multiple sources disagree, do not silently choose one. Record the disagreement:

```text
verification_status: disputed
notes: Source A gives X; Source B gives Y.
```

Search order: provided files in this repository, then academic and institutional sources, then reliable linguistic websites. See [research/sources](../research/sources/README.md).

## Research process

For every requested term:

1. Search the provided PDF, TXT, Markdown, CSV, and JSON files.
2. Search the academic literature listed for that language.
3. Search reliable web sources to locate citable works.
4. Compare the results.
5. Determine whether the evidence refers to Forro, Angolar, Lung’Ie, a named Cabo Verdean island, a named Guinea-Bissau region, São Toméan Portuguese, or another language.
6. Reject evidence that belongs to the wrong language, island, or region.
7. Record the verified information.
8. Record the source and confidence.
9. Only then add the entry to that folder’s `dictionary.json` and `dictionary.md`.

## Translation direction

Distinguish the language being documented from the target language. Never store a generic `word → translation` without naming both.

A Portuguese translation of a Forro word is not automatically valid for Angolar, Lung’Ie, Kabuverdianu, or Guinea-Bissau Kriol.

## Data model

Each lexical entry should contain, when evidence exists:

```yaml
id:
language:
language_name:
language_aliases:

headword:
orthography:
part_of_speech:

translation_pt:
translation_en:

definition_pt:
definition_en:

example:
example_translation_pt:
example_translation_en:

pronunciation:
ipa:

grammatical_information:

semantic_category:

cultural_context:

etymology:

regional_information:

usage_notes:

variants:

synonyms:

related_terms:

source:
source_type:
source_page:
source_url:

verification_status:
confidence:

notes:
```

If information is unavailable, use `null` rather than guessing.

Human-readable `dictionary.md` entries follow section 17 of the collection prompt.

## Examples, culture, and grammar

Include an example only if it appears in a verified source, or if the source explicitly provides the word in a sentence. Do not construct an example to make an entry look complete.

Include cultural context only when a source supports it, and only as it relates to the word. Do not turn the dictionary into a general cultural encyclopedia.

Record grammatical behaviour when a source documents it. Do not generalize a grammatical rule from one creole to another.

## Orthography

Respect the documented orthography of each language. Where applicable, use ALUSTP conventions **when that is the spelling in the source**.

Do not normalize spelling because another spelling looks more familiar. If multiple spellings are documented, keep them as sourced variants. Do not decide that one spelling is correct unless the source provides evidence.

## Similar forms across languages

If the same or similar lexical form appears in multiple languages, create separate entries. Do not merge them because the spelling is similar.

Cross-language comparison is allowed only as a research metadata layer. It must never change the individual dictionary entries. Only establish a relationship when a linguistic source explicitly supports it.

```yaml
cross_language_relation:
  type:
  related_language:
  related_term:
  evidence:
```

Possible types: cognate, shared lexical origin, borrowing, similar form, similar meaning, uncertain, disputed. If no evidence exists, `cross_language_relation` is `null`.

## Confidence

Use:

```text
high
medium
low
unverified
disputed
```

- **high** — directly documented in a reliable linguistic source
- **medium** — supported by multiple sources but with limited documentation
- **low** — found in a less authoritative source or with incomplete context
- **unverified** — potential information found but not sufficiently supported
- **disputed** — reliable sources disagree

Never convert low or unverified data into high confidence.

## Missing data

If the requested term is not found, do not translate it using Portuguese, infer it from another creole, or create a plausible equivalent.

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```

Replace `[LANGUAGE]` with the language or variety that was queried (Forro, Angolar, Lung’Ie, Kabuverdianu of Santiago, Kriol of Bissau, and so on).

## What this methodology forbids

```text
Portuguese word → modify spelling → assume it is Forro
Forro word → assume Angolar equivalent
Forro word → assume Lung’Ie equivalent
English meaning → generate a plausible creole translation
Santiago form → copy into São Vicente
Bissau form → copy into Cacheu
Angolar JSON → copy into data/angola_dataset/contruy/
Umbundu word → copy into Kimbundu
Kikongo of Angola → copy into Kituba
```

## Objective

Optimize for trustworthy linguistic data, not for the number of words.

Prioritize, in order:

1. linguistic accuracy
2. language isolation
3. source traceability
4. orthographic fidelity
5. cultural accuracy
6. contextual accuracy
7. completeness
