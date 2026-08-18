# Contributing

**Project started:** 23 March 2023

This repository holds **language data** and a **read-only HTTP API** in `api/` that serves those files. It is not a website and not the ForroVivo application.

Contributions should add **attested** data, not guessed translations.

Follow [METHODOLOGY.md](METHODOLOGY.md) for collection rules and [SOURCES.md](SOURCES.md) for bibliography. The operational specification is [Three-Language Dictionary Data Collection Prompt.md](Three-Language%20Dictionary%20Data%20Collection%20Prompt.md).

## What to contribute

- New headwords that a cited source labels for **one** language or variety
- Missing Portuguese or English glosses **only when that source supplies them**
- Example sentences copied from the source
- Pronunciation, grammar, etymology, and cultural notes when the source documents them
- Source disagreements recorded as disputed, not silently resolved
- Corrections that fix a wrong language assignment or a mis-copied field

Do not contribute:

- Guessed translations or “creolized” Portuguese
- Vocabulary copied from another creole, island, or region because the spelling looks similar
- Invented example sentences
- ForroVivo, UI, or database application code
- Write endpoints or code that invents translations
- Wikipedia, social media, unsourced word lists, or generated text as the only evidence for an entry

## Where to put an entry

Each language and variety has its own folder. Parent `dictionary.md` / `dictionary.json` files are indexes, not merged lexicons.

| Variety | Canonical path |
|---|---|
| Forro / Santome | `dictionary/saotome/forro/` |
| Angolar / Ngola | `dictionary/saotome/angolar/` |
| Lung’Ie / Principense | `dictionary/saotome/lungie/` |
| Kabuverdianu (one inhabited island) | `dictionary/caboverde/<island>/` |
| Guinea-Bissau Kriol (one region) | `dictionary/guinebissau/<region>/` |
| Angola | Do not add entries here. Use `dictionary/saotome/angolar/`. `dictionary/angola/` is an alias. |

Cabo Verde islands: `santiago`, `fogo`, `maio`, `brava`, `saovicente`, `santoantao`, `saonicolau`, `sal`, `boavista`.

Guinea-Bissau regions: `bissau`, `biombo`, `cacheu`, `oio`, `bafata`, `gabu`, `quinara`, `tombali`, `bolama`.

If the source says only “Cape Verdean” and does not name the island, do not place the form in an island folder. If it says only “Guinea-Bissau Kriol” and does not name the region, do not place the form in a region folder. Do not insert Casamance Kriyol of Senegal.

## How to add an entry

1. Search the isolated dictionary folder for that language or variety first.
2. Then check the academic and institutional sources listed in that folder’s `sources.md` and in [SOURCES.md](SOURCES.md).
3. Confirm which language the evidence belongs to. Reject evidence for the wrong creole, for Portuguese, or for an unnamed island or region.
4. Add the entry only in that folder, with source and confidence.
5. Update both `dictionary.json` and `dictionary.md` in the same folder.
6. Record the work in that folder’s `sources.md` if the citation is new to the folder.
7. Leave other languages empty until they have their own citation.

Human-readable entries follow the format in section 17 of the collection prompt. JSON entries use the fields in [METHODOLOGY.md](METHODOLOGY.md).

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
- Do not duplicate Angolar into `dictionary/angola/`.
- Do not insert Kimbundu, Umbundu, or Angolan Portuguese as Angolar headwords.
- São Toméan Portuguese is not Forro, Angolar, or Lung’Ie.
- Keep the spelling used in the source. Do not normalize one language into another.

## API

`api/` is a GET-only service over the JSON files. Do not add POST/PUT/PATCH handlers that write lexicon data. Clients must query one dataset path. A missing term returns `TERM_NOT_FOUND` for that dataset. See the API section in [README.md](README.md).

## License and attribution

Original project materials are [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Third-party dictionaries and papers keep their original licenses. See [LICENSE](LICENSE) and [SOURCES.md](SOURCES.md).

When you extract from a work, keep the author names, title, and license notice on the entry. Do not relicense that material as CC BY 4.0.

*Dicionário livre santome/português* (Araujo & Hagemeijer, 2013) is **CC BY-NC**. Commercial reuse of that extract requires permission from the rights holders.
