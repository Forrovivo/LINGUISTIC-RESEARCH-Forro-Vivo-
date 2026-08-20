# Cabo Verdean Creole sources

This parent folder is an **index of island varieties**. It does not hold a merged Kabuverdianu word list.

ISO 639-3 for the language cluster: **kea**.

Collection of these island folders starts on **23 April 2025**, which is **2 years 1 month** after the project start of **23 March 2023**.

Each inhabited island is isolated:

- `santiago/` — Santiago / Santiagu / Badiu
- `fogo/` — Fogo
- `maio/` — Maio
- `brava/` — Brava
- `saovicente/` — São Vicente
- `santoantao/` — Santo Antão
- `saonicolau/` — São Nicolau
- `sal/` — Sal
- `boavista/` — Boa Vista

Do not copy between island folders. Do not treat Guinea-Bissau Kriol as Cabo Verdean.

Sources for a headword must name the island or variety. A form labelled only “Cape Verdean” with no island stays out of the island files until the variety is identified.

APiCS Online labels three Cabo Verdean languages:

- Language 30 — Cape Verdean Creole of Santiago (Lang 2013) → `santiago/`
- Language 31 — Cape Verdean Creole of Brava (Baptista 2013) → `brava/`
- Language 32 — Cape Verdean Creole of São Vicente (Swolkien 2013) → `saovicente/`

Those three extracts stay in their island folders. They are not copied to other islands. APiCS has no separate language for Fogo, Maio, Santo Antão, São Nicolau, Sal, or Boa Vista.

Open island-labelled chapters in Lang (ed.) 2014 (*A variação geográfica do crioulo caboverdiano*, FAU, CC BY-NC-ND) supply Fogo (Lopes), Maio (Moreira), Santo Antão (Baptista), and Boa Vista lemmas quoted from Costa & Duarte 1886. Moreira 2020 adds a Fogo grammar and lexicon. Swolkien 2015 adds São Vicente leftovers. Lang 2018 adds Santiago grammar lemmas. Swolkien & Cobbinah 2019 adds Santo Antão fieldwork. Souza 2007 adds Fogo- and Santo Antão-labelled phonology examples. Lopes 2012 and Zanoli 2014 add São Nicolau-labelled forms.

Sal stays empty until a source names that island as the variety of a lemma. Lang (ed.) 2014 notes that Sal still mixes immigrant island varieties. Wikipedia Sal pages were not used.

The Lang et al. Santiago dictionary now has a CC BY 4.0 reprint catalogued at Open FAU; the PDF was not retrieved in this pass because the repository presented a bot-challenge page. It remains Santiago-only evidence when an extract is obtained.

## Not used as Cabo Verdean evidence

- `data/saotome_dataset/forro/`, `data/saotome_dataset/angolar/`, `data/saotome_dataset/lungie/`
- `data/guinebissau_dataset/`
- Portuguese of Cabo Verde
- [Kriolish translations](https://kriolish.com/#/dictionaries/translations) — crowd-sourced English→Creole for Barlavento vs Sotavento groups, not a named single island. The founders describe it as a crowd-sourced expression site. Unsourced crowd-sourced dictionaries are not island evidence. Do not copy a cluster form into every island in that cluster.
- Wikipedia and social/AI lists
- Generic “Cape Verdean” phrase lists that do not name an island
- Pires, Hutchison & Gonçalves *Disonariu Kabuverdianu* (Sotavento draft without island labels)

## Missing-term protocol

Use the `TERM_NOT_FOUND` object in the island folder that was queried. Do not fall back to another island.
