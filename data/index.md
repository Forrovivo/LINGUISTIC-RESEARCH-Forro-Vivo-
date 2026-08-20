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
├── angola_dataset/
├── seychelles_dataset/
├── equatorialguinea_dataset/
├── southafrica_dataset/
├── ghana_dataset/
├── sierraleone_dataset/
├── rdcongo_dataset/
├── mauritius_dataset/
├── nigeria_dataset/
├── reunion_dataset/
├── centralafrican_dataset/
└── cameroon_dataset/
```

| Dataset | Language | Status | Path |
|---|---|---|---|
| São Tomé and Príncipe | Forro, Angolar, Lung’Ie | Country index | [saotome_dataset/](saotome_dataset/) |
| Forro | Forro / Santome / Santomense | Extracted from *Dicionário livre santome/português* | [saotome_dataset/forro/](saotome_dataset/forro/) |
| Angolar | Angolar / Ngola | São Tomé creole. Isolated from APiCS, Rougé & Schang, Bandeira 2017, and SciELO 2021. Not Angola Contruy | [saotome_dataset/angolar/](saotome_dataset/angolar/) |
| Lung’Ie | Principense / Lung’Ie | Isolated from APiCS, Rougé & Schang, Araujo 2013, Agostinho & Araujo 2021, and Bandeira 2017 (Lung’Ie column only) | [saotome_dataset/lungie/](saotome_dataset/lungie/) |
| Cabo Verde | Kabuverdianu island varieties | Santiago, Brava, and São Vicente extracted from APiCS; other inhabited islands still empty | [caboverde_dataset/](caboverde_dataset/) |
| Guiné-Bissau | Kriol regional varieties | APiCS 33 is country-level and is not copied into a region folder; region lexicons stay empty until a source names the region | [guinebissau_dataset/](guinebissau_dataset/) |
| Angola | Contruy, Umbundu, Kimbundu, Kikongo | Country index. Not Angolar. Each language is its own folder | [angola_dataset/](angola_dataset/) |
| Seychelles | Seychellois | Country index. Empty until a source names Seychellois | [seychelles_dataset/](seychelles_dataset/) |
| Equatorial Guinea | Annobonese, Pichi | Country index. Annobonese is not Forro. Pichi is not Krio | [equatorialguinea_dataset/](equatorialguinea_dataset/) |
| South Africa | Fanakalo | Country index. Empty until a source names Fanakalo | [southafrica_dataset/](southafrica_dataset/) |
| Ghana | Ghanaian Pidgin | Country index. Not Naija | [ghana_dataset/](ghana_dataset/) |
| Sierra Leone | Krio | Country index. Not Pichi, not Naija | [sierraleone_dataset/](sierraleone_dataset/) |
| Democratic Republic of the Congo | Kituba | Country index. Not Kikongo of Angola | [rdcongo_dataset/](rdcongo_dataset/) |
| Mauritius | Mauritian | Country index. Not Réunion Creole, not Seychellois | [mauritius_dataset/](mauritius_dataset/) |
| Nigeria | Naija | Country index. Not Ghanaian Pidgin, not Krio | [nigeria_dataset/](nigeria_dataset/) |
| Réunion | Réunion Creole | Country index. Not Mauritian, not Seychellois | [reunion_dataset/](reunion_dataset/) |
| Central African Republic | Sango | Country index. Empty until a source names Sango | [centralafrican_dataset/](centralafrican_dataset/) |
| Cameroon | Cameroonian Pidgin | Country index. Not Naija, not Krio | [cameroon_dataset/](cameroon_dataset/) |

## São Tomé and Príncipe

Parent index: [saotome_dataset/dictionary.md](saotome_dataset/dictionary.md)

### Forro

- [saotome_dataset/forro/dictionary.md](saotome_dataset/forro/dictionary.md)
- [saotome_dataset/forro/dictionary.json](saotome_dataset/forro/dictionary.json)
- [saotome_dataset/forro/sources.md](saotome_dataset/forro/sources.md)
- Optional `knowledge.json` in the same folder for Knowledge Base collections
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

## Angola

Parent index: [angola_dataset/dictionary.md](angola_dataset/dictionary.md)

- [angola_dataset/contruy/](angola_dataset/contruy/) — Angola Contruy. Not Angolar.
- [angola_dataset/umbundu/](angola_dataset/umbundu/) — Umbundu (`umb`)
- [angola_dataset/kimbundu/](angola_dataset/kimbundu/) — Kimbundu (`kmb`)
- [angola_dataset/kikongo/](angola_dataset/kikongo/) — Kikongo (`kng`). Not Kituba.

This parent folder is an index, not a merged lexicon. Look up Angolar in [saotome_dataset/angolar/](saotome_dataset/angolar/). Do not copy that lexicon here. Each Angola language stays empty until a source names it.

The file `research/notes/comparative-seed.md` is a small comparative seed. It is not a merged lexicon.

## Seychelles

Parent index: [seychelles_dataset/dictionary.md](seychelles_dataset/dictionary.md)

- [seychelles_dataset/seychellois/](seychelles_dataset/seychellois/) — Seychellois / Seselwa (`crs`). Not Mauritian. Not Réunion Creole.

## Equatorial Guinea

Parent index: [equatorialguinea_dataset/dictionary.md](equatorialguinea_dataset/dictionary.md)

- [equatorialguinea_dataset/annobonese/](equatorialguinea_dataset/annobonese/) — Annobonese / Fa d’Ambô (`fab`). Not Forro.
- [equatorialguinea_dataset/pichi/](equatorialguinea_dataset/pichi/) — Pichi (`fpe`). Not Krio.

## South Africa

Parent index: [southafrica_dataset/dictionary.md](southafrica_dataset/dictionary.md)

- [southafrica_dataset/fanakalo/](southafrica_dataset/fanakalo/) — Fanakalo (`fng`)

## Ghana

Parent index: [ghana_dataset/dictionary.md](ghana_dataset/dictionary.md)

- [ghana_dataset/ghanaianpidgin/](ghana_dataset/ghanaianpidgin/) — Ghanaian Pidgin (`gpe`). Not Naija.

## Sierra Leone

Parent index: [sierraleone_dataset/dictionary.md](sierraleone_dataset/dictionary.md)

- [sierraleone_dataset/krio/](sierraleone_dataset/krio/) — Krio (`kri`). Not Pichi. Not Naija.

## Democratic Republic of the Congo

Parent index: [rdcongo_dataset/dictionary.md](rdcongo_dataset/dictionary.md)

- [rdcongo_dataset/kituba/](rdcongo_dataset/kituba/) — Kituba (`ktu`). Not Kikongo of Angola.

## Mauritius

Parent index: [mauritius_dataset/dictionary.md](mauritius_dataset/dictionary.md)

- [mauritius_dataset/mauritian/](mauritius_dataset/mauritian/) — Mauritian (`mfe`). Not Réunion Creole. Not Seychellois.

## Nigeria

Parent index: [nigeria_dataset/dictionary.md](nigeria_dataset/dictionary.md)

- [nigeria_dataset/naija/](nigeria_dataset/naija/) — Naija (`pcm`). Not Ghanaian Pidgin. Not Krio.

## Réunion

Parent index: [reunion_dataset/dictionary.md](reunion_dataset/dictionary.md)

- [reunion_dataset/reunioncreole/](reunion_dataset/reunioncreole/) — Réunion Creole (`rcf`). Not Mauritian. Not Seychellois.

## Central African Republic

Parent index: [centralafrican_dataset/dictionary.md](centralafrican_dataset/dictionary.md)

- [centralafrican_dataset/sango/](centralafrican_dataset/sango/) — Sango (`sag`)

## Cameroon

Parent index: [cameroon_dataset/dictionary.md](cameroon_dataset/dictionary.md)

- [cameroon_dataset/cameroonianpidgin/](cameroon_dataset/cameroonianpidgin/) — Cameroonian Pidgin (`wes`). Not Naija. Not Krio.

Each of these parent folders is an index, not a merged lexicon. Each language stays empty until a source names it.

## Roadmap log

Named dates only. The intervals below are calendar differences between those dates.

- **23 March 2023** — Project starts. São Tomé and Príncipe: Forro, Angolar, Lung’Ie.
- **22 March 2025** — First version of the ForroVivo app launched. **2 years** after the project start (one day before 23 March 2025).
- **23 April 2025** — Cabo Verde, Angola, and Guinea-Bissau collection starts. **2 years 1 month** after the project start.
  - Cabo Verde: one folder per inhabited island; lexicons empty until a source names the island
  - Angola: one folder per language (Contruy, Umbundu, Kimbundu, Kikongo); not Angolar; lexicons empty until a source names that language
  - Guinea-Bissau: one folder per region; lexicons empty until a source names the region
- **2026** — Continue Cabo Verde, Angola, and Guinea-Bissau from labelled sources. APiCS 30–32 are in the matching Cabo Verde island folders. APiCS 33 (Guinea-Bissau Kriyol) is country-level and is not in a region folder. APiCS 36 (Angolar) stays in `data/saotome_dataset/angolar/`. On **23 April 2026** that collection is **1 year** old, and the project is **3 years 1 month** old.
- **18 August 2026** — ForroVivo app version 5 released to beta, with new countries. **3 years 4 months 26 days** after the project start.
- **20 August 2026** — Country folders created for Seychelles, Equatorial Guinea, South Africa, Ghana, Sierra Leone, the Democratic Republic of the Congo, Mauritius, Nigeria, Réunion, the Central African Republic, and Cameroon. **3 years 4 months 28 days** after the project start. Lexicons stay empty until a source names that language.
