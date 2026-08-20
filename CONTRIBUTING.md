# Contributing

**ForroVivo** is the platform and ecosystem. This repository is the **Linguistic Research** project: an open research initiative within it.

| Surface | Role |
|---|---|
| [ForroVivo.com](https://www.forrovivo.com) | Public brand |
| [This GitHub repository](https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-) | Open research and datasets |
| [api.forrovivo.com](https://api.forrovivo.com) | Machine-readable linguistic data |
| [ForroVivo on the App Store](https://apps.apple.com/app/id6751409176) | Language-learning product |

**Project started:** 23 March 2023  
**Founder and idealist:** Henriques Pontes  
**Linguistic Research co-founder:** Luis Lima

Contribute **attested** dictionary data here. Do not add the website UI or the App Store app to this folder.

Follow [docs/methodology.md](docs/methodology.md) for collection rules and [research/sources/README.md](research/sources/README.md) for bibliography. The operational specification is [research/notes/collection-prompt.md](research/notes/collection-prompt.md).

## What to contribute

- New headwords that a cited source labels for **one** language or variety
- Missing Portuguese or English glosses **only when that source supplies them**
- Example sentences copied from the source
- Pronunciation, grammar, etymology, and cultural notes when the source documents them
- Knowledge Base records (grammar, expressions, proverbs, culture, food, music, dance, folklore, stories, places) **only when a cited source supplies that text**, in that folder’s `knowledge.json`
- Source disagreements recorded as disputed, not silently resolved
- Corrections that fix a wrong language assignment or a mis-copied field

Do not contribute:

- Guessed translations or “creolized” Portuguese
- Vocabulary copied from another creole, island, or region because the spelling looks similar
- Invented example sentences
- ForroVivo website UI, App Store app code, or product databases
- Write endpoints or code that invents translations
- Wikipedia, social media, unsourced word lists, or generated text as the only evidence for an entry

## Where to put an entry

Each language and variety has its own folder. Parent `dictionary.md` / `dictionary.json` files are indexes, not merged lexicons.

| Variety | Canonical path |
|---|---|
| Forro / Santome | `data/saotome_dataset/forro/` |
| Angolar / Ngola | `data/saotome_dataset/angolar/` |
| Lung’Ie / Principense | `data/saotome_dataset/lungie/` |
| Kabuverdianu (one inhabited island) | `data/caboverde_dataset/<island>/` |
| Guinea-Bissau Kriol (one region) | `data/guinebissau_dataset/<region>/` |
| Angola Contruy | `data/angola_dataset/contruy/` |
| Umbundu | `data/angola_dataset/umbundu/` |
| Kimbundu | `data/angola_dataset/kimbundu/` |
| Kikongo | `data/angola_dataset/kikongo/` |

Cabo Verde islands: `santiago`, `fogo`, `maio`, `brava`, `saovicente`, `santoantao`, `saonicolau`, `sal`, `boavista`.

Guinea-Bissau regions: `bissau`, `biombo`, `cacheu`, `oio`, `bafata`, `gabu`, `quinara`, `tombali`, `bolama`.

If the source says only “Cape Verdean” and does not name the island, do not place the form in an island folder. If it says only “Guinea-Bissau Kriol” and does not name the region, do not place the form in a region folder. Do not insert Casamance Kriyol of Senegal.

## How to add an entry

1. Search the isolated dictionary folder for that language or variety first.
2. Then check the academic and institutional sources listed in that folder’s `sources.md` and in [research/sources](research/sources/README.md).
3. Confirm which language the evidence belongs to. Reject evidence for the wrong creole, for Portuguese, or for an unnamed island or region.
4. Add the entry only in that folder, with source and confidence.
5. Update both `dictionary.json` and `dictionary.md` in the same folder.
6. If the source is a grammar note, proverb, story, or other Knowledge Base record (not a dictionary headword), add it to `knowledge.json` in that same folder. Do not copy it into another language.
7. Record the work in that folder’s `sources.md` if the citation is new to the folder.
8. Leave other languages empty until they have their own citation.

Human-readable entries follow the format in section 17 of the collection prompt. JSON entries use the fields in [docs/data-model.md](docs/data-model.md).

If a requested term is not attested for that language, the dataset records it as unavailable:

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified [LANGUAGE] database."
}
```

Do not fill the gap by analogy.

## Isolation rules

- Keep each creole in its own folder.
- Never mix Cabo Verdean islands with each other.
- Never mix Guinea-Bissau regions with each other.
- Cabo Verdean Kabuverdianu is not Guinea-Bissau Kriol.
- Do not copy Angolar into `data/angola_dataset/`. Angola Contruy is not Angolar.
- Do not mix Umbundu, Kimbundu, and Kikongo. Kikongo of Angola is not Kituba.
- Do not insert Umbundu, Kimbundu, Kikongo, or Angolan Portuguese as Angolar headwords, and do not insert them as Angola Contruy unless a source labels them that way.
- São Toméan Portuguese is not Forro, Angolar, or Lung’Ie.
- Keep the spelling used in the source. Do not normalize one language into another.

## API

`api/` is a GET-only service over the JSON files. The public host is **https://api.forrovivo.com**. It publishes machine-readable research data for the ForroVivo ecosystem. Do not add POST/PUT/PATCH handlers that write lexicon data. Clients must query one dataset path. A missing term returns `TERM_NOT_FOUND` for that dataset. See [docs/api.md](docs/api.md).

## License and attribution

Original project materials are [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Third-party dictionaries and papers keep their original licenses. See [LICENSE](LICENSE) and [research/sources/README.md](research/sources/README.md).

When you extract from a work, keep the author names, title, and license notice on the entry. Do not relicense that material as CC BY 4.0.

*Dicionário livre santome/português* (Araujo & Hagemeijer, 2013) is **CC BY-NC**. Commercial reuse of that extract requires permission from the rights holders.
