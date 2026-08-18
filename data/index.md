# Dictionary datasets

**Project started:** 23 March 2023

This folder is the open research dataset of the ForroVivo Linguistic Research initiative. It is not ForroVivo.com and not the App Store language-learning product.

Each language is a separate dataset. Do not copy vocabulary from one folder into another.

```text
data/
├── index.md
├── saotome/
│   ├── forro/
│   ├── angolar/
│   └── lungie/
├── caboverde/
├── guinebissau/
└── angola/
```

| Dataset | Language | Status | Path |
|---|---|---|---|
| São Tomé and Príncipe | Forro, Angolar, Lung’Ie | Country index | [saotome/](saotome/) |
| Forro | Forro / Santome / Santomense | Extracted from *Dicionário livre santome/português* | [saotome/forro/](saotome/forro/) |
| Angolar | Angolar / Ngola | Principal Angola-related creole in this repository (spoken on São Tomé). Isolated from APiCS, Rougé & Schang, Bandeira 2017, and SciELO 2021 | [saotome/angolar/](saotome/angolar/) |
| Lung’Ie | Principense / Lung’Ie | Isolated from APiCS, Rougé & Schang, Araujo 2013, Agostinho & Araujo 2021, and Bandeira 2017 (Lung’Ie column only) | [saotome/lungie/](saotome/lungie/) |
| Cabo Verde | Kabuverdianu island varieties | Santiago, Brava, and São Vicente extracted from APiCS; other inhabited islands still empty | [caboverde/](caboverde/) |
| Guiné-Bissau | Kriol regional varieties | APiCS 33 is country-level and is not copied into a region folder; region lexicons stay empty until a source names the region | [guinebissau/](guinebissau/) |
| Angola | Alias of Angolar | Points to `saotome/angolar/`; not a second lexicon | [angola/](angola/) |

## São Tomé and Príncipe

Parent index: [saotome/dictionary.md](saotome/dictionary.md)

### Forro

- [saotome/forro/dictionary.md](saotome/forro/dictionary.md)
- [saotome/forro/dictionary.json](saotome/forro/dictionary.json)
- [saotome/forro/sources.md](saotome/forro/sources.md)
- [saotome/forro/Audio/](saotome/forro/Audio/) — APiCS Santome recordings linked from matching entries

If a Forro term is not attested there, return `TERM_NOT_FOUND` for Forro.

### Angolar

- [saotome/angolar/dictionary.md](saotome/angolar/dictionary.md)
- [saotome/angolar/dictionary.json](saotome/angolar/dictionary.json)
- [saotome/angolar/sources.md](saotome/angolar/sources.md)
- [saotome/angolar/Audio/](saotome/angolar/Audio/) — APiCS Angolar recordings linked from matching entries

If an Angolar term is not attested there, return `TERM_NOT_FOUND` for Angolar. Do not substitute a Forro word.

`data/angola/` is an alias of this dataset.

### Lung’Ie

- [saotome/lungie/dictionary.md](saotome/lungie/dictionary.md)
- [saotome/lungie/dictionary.json](saotome/lungie/dictionary.json)
- [saotome/lungie/sources.md](saotome/lungie/sources.md)
- [saotome/lungie/Audio/](saotome/lungie/Audio/) — APiCS Principense recordings linked from matching entries

If a Lung’Ie term is not attested there, return `TERM_NOT_FOUND` for Lung’Ie. Do not substitute a Forro or Angolar word.

## Cabo Verde

Parent index: [caboverde/dictionary.md](caboverde/dictionary.md)

Sotavento:

- [caboverde/santiago/](caboverde/santiago/) — extracted from APiCS 30 (Lang 2013)
- [caboverde/fogo/](caboverde/fogo/)
- [caboverde/maio/](caboverde/maio/)
- [caboverde/brava/](caboverde/brava/) — extracted from APiCS 31 (Baptista 2013)

Barlavento:

- [caboverde/saovicente/](caboverde/saovicente/) — extracted from APiCS 32 (Swolkien 2013)
- [caboverde/santoantao/](caboverde/santoantao/)
- [caboverde/saonicolau/](caboverde/saonicolau/)
- [caboverde/sal/](caboverde/sal/)
- [caboverde/boavista/](caboverde/boavista/)

If a term is not attested for that island, return `TERM_NOT_FOUND` for that island only. Do not substitute another island, Guinea-Bissau Kriol, or a São Tomé creole.

## Guiné-Bissau

Parent index: [guinebissau/dictionary.md](guinebissau/dictionary.md)

- [guinebissau/bissau/](guinebissau/bissau/)
- [guinebissau/biombo/](guinebissau/biombo/)
- [guinebissau/cacheu/](guinebissau/cacheu/)
- [guinebissau/oio/](guinebissau/oio/)
- [guinebissau/bafata/](guinebissau/bafata/)
- [guinebissau/gabu/](guinebissau/gabu/)
- [guinebissau/quinara/](guinebissau/quinara/)
- [guinebissau/tombali/](guinebissau/tombali/)
- [guinebissau/bolama/](guinebissau/bolama/)

If a term is not attested for that region, return `TERM_NOT_FOUND` for that region only. Do not substitute another region, Cabo Verdean Kabuverdianu, or a São Tomé creole.

## Angola (alias of Angolar)

- [angola/dictionary.md](angola/dictionary.md) — pointer only
- Canonical lexicon: [saotome/angolar/](saotome/angolar/)

Do not add Angolar entries in `angola/`. Use `saotome/angolar/` for lookup and new extraction.

The file `research/notes/comparative-seed.md` is a small comparative seed. It is not a merged lexicon.

## Roadmap log

Named dates only. The intervals below are calendar differences between those dates.

- **23 March 2023** — Project starts. São Tomé and Príncipe: Forro, Angolar, Lung’Ie.
- **23 April 2025** — Cabo Verde, Angola, and Guinea-Bissau collection starts. **2 years 1 month** after the project start.
  - Cabo Verde: one folder per inhabited island; lexicons empty until a source names the island
  - Angola: alias of Angolar; no second lexicon
  - Guinea-Bissau: one folder per region; lexicons empty until a source names the region
- **2026** — Continue Cabo Verde, Angola, and Guinea-Bissau from labelled sources. APiCS 30–32 are in the matching Cabo Verde island folders. APiCS 33 (Guinea-Bissau Kriyol) is country-level and is not in a region folder. APiCS 36 (Angolar) stays in `data/saotome/angolar/`. On **23 April 2026** that collection is **1 year** old, and the project is **3 years 1 month** old.
