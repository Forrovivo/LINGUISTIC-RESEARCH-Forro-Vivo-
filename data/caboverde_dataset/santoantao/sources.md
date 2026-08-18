# Kabuverdianu of Santo Antão sources

This dataset documents **Kabuverdianu of Santo Antão** only (Barlavento).

Translation pairs: Kabuverdianu of Santo Antão → Portuguese, Kabuverdianu of Santo Antão → English.

Do not fill missing entries from other Cabo Verdean island folders.
Do not treat Guinea-Bissau Kriol as this variety.

## Sources used in this folder

### Swolkien & Cobbinah 2019

- **Authors:** Dominika Swolkien; Alexander Yao Cobbinah
- **Year:** 2019
- **Title:** Cape Verdean Creole – Santo Antão: what we know so far
- **Journal:** *Journal of Ibero-Romance Creoles* 9(1)
- **Open URL:** https://media.voog.com/0000/0034/5140/files/JIRC9_7_Swolkien_Cobbinah.pdf
- **Also:** https://eciencia.cv/bitstreams/2cdfcfba-c512-4e2c-b035-b167e703f185/download
- **License:** cite the authors; original journal terms retained
- **Language documented:** Santo Antão (fieldwork in Cabo da Ribeira and Vila das Pombas)
- **What was extracted:** Santo Antão-labelled glossed lemmas from the phonology tables and examples
- **English:** from the paper’s gloss
- **Portuguese:** null unless the paper also prints a Portuguese translation of the lemma
- **Not used:** São Vicente, São Nicolau, and Santiago comparison columns
- **Confidence for cited forms:** high

### Maria do Céu dos Santos Baptista 2014 (Santo Antão)

- **Author:** Maria do Céu dos Santos Baptista
- **Year:** 2014
- **Title:** Descrição fonológica da variedade da ilha de Santo Antão
- **In:** Jürgen Lang (ed.), *A variação geográfica do crioulo caboverdiano*. Erlangen: FAU University Press
- **Open URL:** https://open.fau.de/server/api/core/bitstreams/4f768ade-9b04-45fb-9d8d-3465c886e17e/content
- **License:** CC BY-NC-ND (authors retain rights; do not relicense the extract)
- **What was extracted:** Santo Antão-labelled minimal pairs and harmony examples with a printed lemma and Portuguese gloss
- **Not used:** Santiago remarks used only as contrast; lemmas already stored from Swolkien & Cobbinah 2019 when the sense is the same

### Ulisdete Rodrigues de Souza 2007 (Santo Antão examples)

- **Author:** Ulisdete Rodrigues de Souza Rodrigues
- **Year:** 2007
- **Title:** Fonologia do caboverdiano: das variedades insulares à unidade nacional
- **Open URL:** https://repositorio.unb.br/handle/10482/6605
- **What was extracted:** Santo Antão-labelled syllable and accent examples that name a Portuguese gloss
- **Not used:** Fogo, Santiago, and São Vicente cells in the same tables

## Not used as Santo Antão evidence

- Other folders under `data/caboverde_dataset/`
- `data/guinebissau_dataset/`
- `data/saotome_dataset/forro/`, `data/saotome_dataset/angolar/`, `data/saotome_dataset/lungie/`
- Portuguese of Cabo Verde
- APiCS languages 30 (Santiago), 31 (Brava), and 32 (São Vicente)
- [Kriolish translations](https://kriolish.com/#/dictionaries/translations) — crowd-sourced Barlavento vs Sotavento clusters, not a named single island
- Fernandes 1991 Barlavento dictionary, unless a cell is explicitly Santo Antão and an open licensed extract exists
- Luís Romano Santo Antão glossary (1967/1973), unless an open licensed extract exists

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Kabuverdianu of Santo Antão database."
}
```
