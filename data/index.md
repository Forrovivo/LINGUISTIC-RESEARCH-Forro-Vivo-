# Dictionary datasets

**Project started:** 23 March 2023

This folder is the open research dataset of the ForroVivo Linguistic Research initiative. It is not ForroVivo.com and not the App Store language-learning product.

Each language is a separate dataset. Do not copy vocabulary from one folder into another.

```text
data/
├── index.md
├── saotome_dataset/
│   ├── forro/
│   ├── angolar/
│   └── lungie/
├── caboverde_dataset/
├── guinebissau_dataset/
└── angola_dataset/
```

| Dataset | Language | Status | Path |
|---|---|---|---|
| São Tomé and Príncipe | Forro, Angolar, Lung’Ie | Country index | [saotome_dataset/](saotome_dataset/) |
| Forro | Forro / Santome / Santomense | Extracted from *Dicionário livre santome/português* | [saotome_dataset/forro/](saotome_dataset/forro/) |
| Angolar | Angolar / Ngola | São Tomé creole. Isolated from APiCS, Rougé & Schang, Bandeira 2017, and SciELO 2021. Not Angola Contruy | [saotome_dataset/angolar/](saotome_dataset/angolar/) |
| Lung’Ie | Principense / Lung’Ie | Isolated from APiCS, Rougé & Schang, Araujo 2013, Agostinho & Araujo 2021, and Bandeira 2017 (Lung’Ie column only) | [saotome_dataset/lungie/](saotome_dataset/lungie/) |
| Cabo Verde | Kabuverdianu island varieties | Santiago, Brava, and São Vicente extracted from APiCS; other inhabited islands still empty | [caboverde_dataset/](caboverde_dataset/) |
| Guiné-Bissau | Kriol regional varieties | APiCS 33 is country-level and is not copied into a region folder; region lexicons stay empty until a source names the region | [guinebissau_dataset/](guinebissau_dataset/) |
| Angola Contruy | Angola (country), not Angolar | Empty until a source names Angola Contruy | [angola_dataset/](angola_dataset/) |

## São Tomé and Príncipe

Parent index: [saotome_dataset/dictionary.md](saotome_dataset/dictionary.md)

### Forro

- [saotome_dataset/forro/dictionary.md](saotome_dataset/forro/dictionary.md)
- [saotome_dataset/forro/dictionary.json](saotome_dataset/forro/dictionary.json)
- [saotome_dataset/forro/sources.md](saotome_dataset/forro/sources.md)
- [saotome_dataset/forro/Audio/](saotome_dataset/forro/Audio/) — APiCS Santome recordings linked from matching entries

If a Forro term is not attested there, return `TERM_NOT_FOUND` for Forro.

### Angolar

- [saotome_dataset/angolar/dictionary.md](saotome_dataset/angolar/dictionary.md)
- [saotome_dataset/angolar/dictionary.json](saotome_dataset/angolar/dictionary.json)
- [saotome_dataset/angolar/sources.md](saotome_dataset/angolar/sources.md)
- [saotome_dataset/angolar/Audio/](saotome_dataset/angolar/Audio/) — APiCS Angolar recordings linked from matching entries

If an Angolar term is not attested there, return `TERM_NOT_FOUND` for Angolar. Do not substitute a Forro word. Do not copy Angolar into `data/angola_dataset/`.

### Lung’Ie

- [saotome_dataset/lungie/dictionary.md](saotome_dataset/lungie/dictionary.md)
- [saotome_dataset/lungie/dictionary.json](saotome_dataset/lungie/dictionary.json)
- [saotome_dataset/lungie/sources.md](saotome_dataset/lungie/sources.md)
- [saotome_dataset/lungie/Audio/](saotome_dataset/lungie/Audio/) — APiCS Principense recordings linked from matching entries

If a Lung’Ie term is not attested there, return `TERM_NOT_FOUND` for Lung’Ie. Do not substitute a Forro or Angolar word.

## Cabo Verde

Parent index: [caboverde_dataset/dictionary.md](caboverde_dataset/dictionary.md)

Sotavento:

- [caboverde_dataset/santiago/](caboverde_dataset/santiago/) — extracted from APiCS 30 (Lang 2013)
- [caboverde_dataset/fogo/](caboverde_dataset/fogo/)
- [caboverde_dataset/maio/](caboverde_dataset/maio/)
- [caboverde_dataset/brava/](caboverde_dataset/brava/) — extracted from APiCS 31 (Baptista 2013)

Barlavento:

- [caboverde_dataset/saovicente/](caboverde_dataset/saovicente/) — extracted from APiCS 32 (Swolkien 2013)
- [caboverde_dataset/santoantao/](caboverde_dataset/santoantao/)
- [caboverde_dataset/saonicolau/](caboverde_dataset/saonicolau/)
- [caboverde_dataset/sal/](caboverde_dataset/sal/)
- [caboverde_dataset/boavista/](caboverde_dataset/boavista/)

If a term is not attested for that island, return `TERM_NOT_FOUND` for that island only. Do not substitute another island, Guinea-Bissau Kriol, or a São Tomé creole.

## Guiné-Bissau

Parent index: [guinebissau_dataset/dictionary.md](guinebissau_dataset/dictionary.md)

- [guinebissau_dataset/bissau/](guinebissau_dataset/bissau/)
- [guinebissau_dataset/biombo/](guinebissau_dataset/biombo/)
- [guinebissau_dataset/cacheu/](guinebissau_dataset/cacheu/)
- [guinebissau_dataset/oio/](guinebissau_dataset/oio/)
- [guinebissau_dataset/bafata/](guinebissau_dataset/bafata/)
- [guinebissau_dataset/gabu/](guinebissau_dataset/gabu/)
- [guinebissau_dataset/quinara/](guinebissau_dataset/quinara/)
- [guinebissau_dataset/tombali/](guinebissau_dataset/tombali/)
- [guinebissau_dataset/bolama/](guinebissau_dataset/bolama/)

If a term is not attested for that region, return `TERM_NOT_FOUND` for that region only. Do not substitute another region, Cabo Verdean Kabuverdianu, or a São Tomé creole.

## Angola Contruy

- [angola_dataset/dictionary.md](angola_dataset/dictionary.md)
- [angola_dataset/dictionary.json](angola_dataset/dictionary.json)
- [angola_dataset/sources.md](angola_dataset/sources.md)

This is the Angola **country** dataset. It is **not Angolar**. Look up Angolar in [saotome_dataset/angolar/](saotome_dataset/angolar/). Do not copy that lexicon here. The Angola Contruy list stays empty until a source names it.

The file `research/notes/comparative-seed.md` is a small comparative seed. It is not a merged lexicon.

## Roadmap log

Named dates only. The intervals below are calendar differences between those dates.

- **23 March 2023** — Project starts. São Tomé and Príncipe: Forro, Angolar, Lung’Ie.
- **23 April 2025** — Cabo Verde, Angola, and Guinea-Bissau collection starts. **2 years 1 month** after the project start.
  - Cabo Verde: one folder per inhabited island; lexicons empty until a source names the island
  - Angola Contruy: Angola country dataset; not Angolar; empty until a source names it
  - Guinea-Bissau: one folder per region; lexicons empty until a source names the region
- **2026** — Continue Cabo Verde, Angola, and Guinea-Bissau from labelled sources. APiCS 30–32 are in the matching Cabo Verde island folders. APiCS 33 (Guinea-Bissau Kriyol) is country-level and is not in a region folder. APiCS 36 (Angolar) stays in `data/saotome_dataset/angolar/`. On **23 April 2026** that collection is **1 year** old, and the project is **3 years 1 month** old.
