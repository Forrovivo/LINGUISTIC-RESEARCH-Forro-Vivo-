# Kabuverdianu of Santiago sources

This dataset documents **Kabuverdianu of Santiago** only (Sotavento).

Translation pairs: Kabuverdianu of Santiago → Portuguese, Kabuverdianu of Santiago → English.

Do not fill missing entries from other Cabo Verdean island folders.
Do not treat Guinea-Bissau Kriol as this variety.

## Sources used in this folder

### Jürgen Lang 2013 (APiCS Santiago)

- **Author:** Jürgen Lang
- **Year:** 2013
- **Title:** APiCS survey and structure dataset: Cape Verdean Creole of Santiago
- **APiCS language ID:** 30
- **Survey URL:** https://apics-online.info/surveys/30
- **Structure dataset URL:** https://apics-online.info/contributions/30
- **License:** CC BY 4.0 (APiCS / Max Planck Institute for Evolutionary Anthropology)
- **Source type:** academic language survey
- **Language documented:** Cape Verdean Creole of Santiago
- **What was extracted:** survey italic+quoted gloss pairs, and content-word leftovers from example interlinear glosses
- **Portuguese:** word-level Portuguese is null in this pass. Portuguese free translations of examples are stored as example translations when APiCS gives them
- **English:** from the APiCS gloss
- **Not used:** grammatical labels, personal names, Portuguese etymons in the survey, other Cabo Verdean island datasets, Guinea-Bissau Kriyol (APiCS 33), Casamance (APiCS 34), Santome (35), Angolar (36), Principense (37)
- **Confidence for cited forms:** high

Published source: Michaelis, Maurer, Haspelmath & Huber (eds.) 2013. Atlas of Pidgin and Creole Language Structures Online. Leipzig: MPI EVA. https://apics-online.info/

Spoken APiCS Santiago recordings are in `Audio/`. The survey file `Audio/30_gt.mp3` is a glossed-text recording, not a citation form for every word.

### Jürgen Lang 2018 (Santiago grammar)

- **Author:** Jürgen Lang
- **Year:** 2018
- **Title:** Gramática do Crioulo da ilha de Santiago (Cabo Verde) (obra em curso)
- **Open URL:** https://open.fau.de/server/api/core/bitstreams/5127b811-6c7e-42f3-91a3-634cf638bc5c/content
- **License:** Author copyright (German UrhG); cite the author; do not relicense the extract
- **Source type:** academic grammar of Santiago
- **Language documented:** Santiago
- **What was extracted:** dictionary-style lemmas printed with a part-of-speech label and a Portuguese gloss
- **Portuguese:** from the gloss printed next to the lemma
- **English:** null in this pass (the grammar glosses in Portuguese)
- **Not used:** incomplete line-wrapped captures, other island folders
- **Confidence for cited forms:** high

### Jürgen Lang (ed.) 2014 (Santiago comparative cells)

- **Author:** Jürgen Lang
- **Year:** 2014
- **Title:** A variação geográfica do crioulo caboverdiano (Santiago-labelled comparative forms)
- **Open URL:** https://open.fau.de/server/api/core/bitstreams/4f768ade-9b04-45fb-9d8d-3465c886e17e/content
- **License:** CC BY-NC-ND (authors retain rights; do not relicense the extract)
- **What was extracted:** Santiago-labelled (S) comparative lemmas with a printed Portuguese gloss
- **Not used:** Fogo, Maio, Santo Antão, São Vicente, São Nicolau, and Boa Vista columns in the same tables
- **Confidence for cited forms:** high

## Not used as Santiago evidence

- Other folders under `data/caboverde_dataset/`
- `data/guinebissau_dataset/`
- `data/saotome_dataset/forro/`, `data/saotome_dataset/angolar/`, `data/saotome_dataset/lungie/`
- Portuguese of Cabo Verde
- APiCS lects that are not this island (including the Santiago acrolect lect 1301, which is not a separate island folder)
- [Kriolish translations](https://kriolish.com/#/dictionaries/translations) — crowd-sourced Barlavento vs Sotavento clusters, not a named single island
- Lang, Martina Brüser, André dos Reis Santos et al. 2002. *Dicionário do Crioulo de Santiago* — an unchanged CC BY 4.0 reprint is catalogued at Open FAU (handle openfau/23377); the PDF was not retrieved in this pass because the repository presented a bot-challenge page
- Quint & Vieira Semedo 2021 (*Lidil*) — Santiago-labelled, but the printed lemma glosses are French; they were not stored as Portuguese or English

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Kabuverdianu of Santiago database."
}
```
