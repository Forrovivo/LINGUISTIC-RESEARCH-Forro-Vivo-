# Kabuverdianu of São Vicente sources

This dataset documents **Kabuverdianu of São Vicente** only (Barlavento).

Translation pairs: Kabuverdianu of São Vicente → Portuguese, Kabuverdianu of São Vicente → English.

Do not fill missing entries from other Cabo Verdean island folders.
Do not treat Guinea-Bissau Kriol as this variety.

## Sources used in this folder

### Dominika Swolkien 2013 (APiCS São Vicente)

- **Author:** Dominika Swolkien
- **Year:** 2013
- **Title:** APiCS survey and structure dataset: Cape Verdean Creole of São Vicente
- **APiCS language ID:** 32
- **Survey URL:** https://apics-online.info/surveys/32
- **Structure dataset URL:** https://apics-online.info/contributions/32
- **License:** CC BY 4.0 (APiCS / Max Planck Institute for Evolutionary Anthropology)
- **Source type:** academic language survey
- **Language documented:** Cape Verdean Creole of São Vicente
- **What was extracted:** survey italic+quoted gloss pairs, and content-word leftovers from example interlinear glosses
- **Portuguese:** word-level Portuguese is null in this pass. Portuguese free translations of examples are stored as example translations when APiCS gives them
- **English:** from the APiCS gloss
- **Not used:** grammatical labels, personal names, Portuguese etymons in the survey, other Cabo Verdean island datasets, Guinea-Bissau Kriyol (APiCS 33), Casamance (APiCS 34), Santome (35), Angolar (36), Principense (37)
- **Confidence for cited forms:** high

Published source: Michaelis, Maurer, Haspelmath & Huber (eds.) 2013. Atlas of Pidgin and Creole Language Structures Online. Leipzig: MPI EVA. https://apics-online.info/

Spoken APiCS São Vicente recordings are in `Audio/`. The survey file `Audio/32_gt.mp3` is a glossed-text recording, not a citation form for every word.

## Not used as São Vicente evidence

- Other folders under `data/caboverde_dataset/`
- `data/guinebissau_dataset/`
- `data/saotome_dataset/forro/`, `data/saotome_dataset/angolar/`, `data/saotome_dataset/lungie/`
- Portuguese of Cabo Verde
- APiCS lects that are not this island (including the Santiago acrolect lect 1301, which is not a separate island folder)

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Kabuverdianu of São Vicente database."
}
```
