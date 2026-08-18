# Angolar sources

This dataset documents **Angolar / Ngola** only. In this repository it is the principal Angola-related creole. The lexicon is here, not in `data/angola/`.

Translation pairs: Angolar → Portuguese, Angolar → English.

Do not use Forro, Lung’Ie, Cabo Verdean, or Guinea-Bissau files to fill missing Angolar entries.

Spoken location in the cited surveys: São Tomé. The autonym *Ngola* and the ethnonym Angolares refer to Angola. That is not a licence to insert Kimbundu, Umbundu, or Angolan Portuguese.

## Sources used in this folder

### Maurer 2013 (APiCS Angolar)

- **Author:** Maurer, Philippe
- **Year:** 2013
- **Title:** APiCS survey: Angolar
- **URL:** https://apics-online.info/surveys/36
- **Source type:** academic language survey
- **Language documented:** Angolar
- **Confidence for cited forms:** high

### Rougé & Schang 2012

- **Authors:** Rougé, Jean-Louis; Schang, Emmanuel
- **Year:** 2012
- **Title:** Histoire des créoles et génétique: le cas de l’angolar
- **Publication:** Sciences et Techniques du Langage 9
- **Source type:** academic article
- **Use for Angolar:** only forms explicitly labelled Angolar
- **Do not use:** Forro forms from the same comparison tables as Angolar translations

### Comparative seed

- **Local file:** `dictionary.md`
- **Role:** first isolation of Angolar JSON blocks already traced to the sources above

This folder was then grown from the APiCS Angolar survey (glossed lexicon, numerals, pronouns, stative verbs, serial verbs) and from Angolar-labelled lines in Rougé & Schang. Portuguese is recorded only when that source gives a Portuguese equivalent. English is recorded when APiCS gives an English gloss. Forro comparison columns were not copied.

A later Rougé pass added Angolar-labelled items that were not already headwords, including `tava`, negation `wa`, `dhanela`, and `kike`. French interlinear glosses stay in `notes`. Forro `fa` / `xigada` from the same pages were not copied.

A later pass added further Angolar items from APiCS example interlinear glosses, only when the English lemma also occurs in the example translation. Grammatical labels were not stored as dictionary senses. `kota` ‘to cut’ and `kota` ‘side’ are kept as separate sourced entries.

Spoken APiCS Angolar recordings are in `Audio/` and linked from matching entries. The survey file `Audio/36_gt.mp3` is a glossed-text recording, not a citation form for every word.

Bandeira 2017 Chapter 5 cognate tables were then ingested using only the Angolar (AN) column. Santome, Lung’Ie, Fa d’Ambô, and reconstructed protoforms were not copied.

### Bandeira, Agostinho & Freitas 2021

- **Authors:** Bandeira, Manuele; Agostinho, Ana Lívia; Freitas, Shirley
- **Year:** 2021
- **Title:** Phonetic-phonological aspects of modern Angolar
- **Publication:** Alfa 65, e13177
- **DOI:** https://doi.org/10.1590/1981-5794-e13177
- **License:** CC BY 4.0
- **Use for Angolar:** Angolar column of anatomy and numeral tables; minimal-pair glosses labelled Angolar; further labelled running-text examples (phonology section) that were not already headwords
- **Do not use:** Santome or Lung’Ie columns from the same tables
- **Disputed item:** Angolar ‘two’ as `[ˈdosʊ]` here versus APiCS/Maurer `rôthu`. Both are kept. Angolar `kobo` `[ˈkɔbɔ]` is ‘buraco’ in the Portuguese version of this article and ‘whole’ in the English version; both glosses are kept on that entry.
- **Spelling disagreement:** fieldwork `xitaka` versus Maurer `xtaka` ‘estaca’. Both are kept.

A later pass added remaining labelled Angolar lexical items from the same article’s running examples (for example `dhende`, `vende`, `lixi`, `longô`, `bixikleta`), without copying Santome comparison forms.

### Bandeira & Araujo 2022

- **Authors:** Bandeira, Manuele; Araujo, Gabriel Antunes de
- **Year:** 2022
- **Title:** A estratégia reflexiva no protocrioulo do Golfo da Guiné
- **Publication:** DELTA
- **URL:** https://www.scielo.br/j/delta/a/bDqJqcYWZZJg5YsYH8RcqJG/
- **Use for Angolar:** Angolar-labelled cells and examples only (`ôngê`, `ubwa` ‘tipo de cerca’, `kuma` ‘como’, `foka`, `foga` ‘afogar’)
- **Do not use:** Santome, Lung’Ie, or Fa d’Ambô cells; reconstructed protoforms

### Bandeira 2017

- **Author:** Bandeira, Manuele
- **Year:** 2017
- **Title:** Reconstrução fonológica e lexical do protocrioulo do Golfo da Guiné
- **Work type:** tese de doutorado, Universidade de São Paulo
- **DOI:** https://doi.org/10.11606/t.8.2017.tde-05042017-134159
- **Use for Angolar:** Angolar phonology chapter, and the Angolar (AN) column of Chapter 5 cognate tables
- **Do not use:** Santome (ST), Lung’Ie (LI), or Fa d’Ambô (FA) cells, nor reconstructed protoforms (PGG)
- **Headwords:** practical spelling from the thesis phonetic form (the PDF uses SAMPA); IPA is retained

## Not used as Angolar evidence

- `Dicionário livre santome/português` (Forro / Santome)
- Forro ethnonyms such as `ngola` in the Santome dictionary
- Analogy from Forro palatal *x* to Angolar *si*

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Angolar database."
}
```
