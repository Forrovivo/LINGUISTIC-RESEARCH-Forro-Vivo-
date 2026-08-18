# Kabuverdianu of Fogo sources

This dataset documents **Kabuverdianu of Fogo** only (Sotavento).

Translation pairs: Kabuverdianu of Fogo → Portuguese, Kabuverdianu of Fogo → English.

Do not fill missing entries from other Cabo Verdean island folders.
Do not treat Guinea-Bissau Kriol as this variety.

## Sources used in this folder

### Raimundo Tavares Lopes 2014 (Fogo column)

- **Author:** Raimundo Tavares Lopes
- **Year:** 2014
- **Title:** Descrição isocrónica contrastiva das variedades das ilhas do Fogo e de Santiago
- **In:** Jürgen Lang (ed.), *A variação geográfica do crioulo caboverdiano*. Erlangen: FAU University Press
- **Open URL:** https://open.fau.de/server/api/core/bitstreams/4f768ade-9b04-45fb-9d8d-3465c886e17e/content
- **License:** CC BY-NC-ND (authors retain rights; do not relicense the extract)
- **Source type:** peer-reviewed chapter (Uni-CV master’s description)
- **Language documented:** Fogo, in contrast with Santiago
- **What was extracted:** Fogo-labelled lexical differences and Fogo-labelled phonological forms
- **Portuguese:** from the meaning column printed for the Fogo lemma
- **English:** null in this pass (the chapter glosses in Portuguese)
- **Not used:** Santiago comparison forms, other island folders, Guinea-Bissau Kriol
- **Confidence for cited forms:** high

### Ana Karina Tavares Moreira 2020 (Fogo thesis)

- **Author:** Ana Karina Tavares Moreira
- **Year:** 2020
- **Title:** Documentação e descrição gramatical e lexical do crioulo afro-português da ilha do Fogo (República de Cabo Verde, África Ocidental)
- **Type:** doctoral thesis, INALCO
- **Open URL:** https://theses.hal.science/tel-03207383
- **License:** HAL open thesis; cite the author; original terms retained
- **Language documented:** Fogo
- **What was extracted:** Fogo column of the Swadesh list, Fogo-labelled exclusive vocabulary, fossilized Portuguese forms, proto-creole leftovers, and Fogo cells in African-origin tables
- **Portuguese:** from the meaning column printed for the Fogo lemma
- **English:** from the Swadesh English column when that table prints it; otherwise null
- **Not used:** Santiago comparison forms, Guinea-Bissau and Casamance comparison cells, other island folders
- **Confidence for cited forms:** high

### Ulisdete Rodrigues de Souza 2007 (Fogo examples)

- **Author:** Ulisdete Rodrigues de Souza Rodrigues
- **Year:** 2007
- **Title:** Fonologia do caboverdiano: das variedades insulares à unidade nacional
- **Open URL:** https://repositorio.unb.br/handle/10482/6605
- **License:** UnB open thesis; cite the author; original terms retained
- **What was extracted:** Fogo-labelled syllable and accent examples that name a Portuguese gloss
- **Not used:** Santiago, Santo Antão, and São Vicente cells in the same tables

## Not used as Fogo evidence

- Other folders under `data/caboverde_dataset/`
- `data/guinebissau_dataset/`
- `data/saotome_dataset/forro/`, `data/saotome_dataset/angolar/`, `data/saotome_dataset/lungie/`
- Portuguese of Cabo Verde
- APiCS languages 30 (Santiago), 31 (Brava), and 32 (São Vicente)
- [Kriolish translations](https://kriolish.com/#/dictionaries/translations) — crowd-sourced Barlavento vs Sotavento clusters, not a named single island
- Pires, Hutchison & Gonçalves *Disonariu Kabuverdianu* (Sotavento draft without island labels)

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Kabuverdianu of Fogo database."
}
```
