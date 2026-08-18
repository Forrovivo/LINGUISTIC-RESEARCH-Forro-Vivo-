# Lung’Ie sources

This dataset documents **Lung’Ie / Principense** only.

Translation pairs: Lung’Ie → Portuguese, Lung’Ie → English.

Do not use Forro or Angolar files to fill missing Lung’Ie entries.

## Sources used in this folder

### Maurer 2013 (APiCS Principense)

- **Author:** Maurer, Philippe
- **Year:** 2013
- **Title:** APiCS survey: Principense
- **URL:** https://apics-online.info/surveys/37
- **Source type:** academic language survey
- **Language documented:** Principense (Lung’Ie)
- **Confidence for cited forms:** high

### Rougé & Schang 2012

- **Authors:** Rougé, Jean-Louis; Schang, Emmanuel
- **Year:** 2012
- **Title:** Histoire des créoles et génétique: le cas de l’angolar
- **Use for Lung’Ie:** only forms explicitly labelled lung’ie / Príncipe

### Comparative seed

- **Local file:** `dictionary.md`
- **Role:** first isolation of Lung’Ie JSON blocks already traced to the sources above

This folder was then grown from the APiCS Principense survey (glossed lexicon, numerals, pronouns, serial verbs, derivation) and from Lung’Ie-labelled lines in Rougé & Schang (including Principense `e bi fa`). Portuguese is recorded only when the source gives a Portuguese equivalent. Forro and Angolar forms were not copied. APiCS `vika` ‘come’ and Rougé `bi` ‘come’ are both kept, with separate sources.

A later pass added further Lung’Ie items from APiCS example interlinear glosses (English lemma must also occur in the translation), from the Lung’Ie-only phonology chapter of Bandeira 2017, and from the Lung’Ie (LI) column of that thesis’s Chapter 5 cognate tables. Santome, Angolar, Fa d’Ambô, and protoforms were not copied. Agostinho 2015 was not used for new glossary rows because the 2021 published glossary is the fuller ALUSTP source already ingested.

Spoken APiCS Principense recordings are in `Audio/` and linked from matching entries. The survey file `Audio/37_gt.mp3` is a glossed-text recording, not a citation form for every word.

### Araujo 2013 (Principense–Portuguese thesis)

- **Author:** Araujo, Vanessa Pinheiro de
- **Year:** 2013
- **Title:** Um dicionário principense-português
- **Work type:** dissertação de mestrado, Universidade de São Paulo
- **DOI:** https://doi.org/10.11606/d.8.2013.tde-11062013-101052
- **Language documented:** Principense (Lung’Ie)
- **Orthography:** ALUSTP
- **Use:** only clean `headword [ipa] pos. Portuguese gloss` lines from the open thesis extract
- **English:** null (source is Principense/Portuguese)

### Agostinho & Araujo 2021

- **Authors:** Agostinho, Ana Lívia; Araujo, Gabriel Antunes de
- **Year:** 2021
- **Title:** Lung’Ie, lunge no: método para aprender lung’Ie
- **Publisher:** São Paulo, FFLCH/USP
- **DOI:** https://doi.org/10.11606/9786587621500
- **License:** CC BY-NC-SA 4.0
- **Language documented:** Lung’Ie
- **Orthography:** ALUSTP
- **What was extracted:** Lung’Ie–Portuguese glossary only
- **What was not used:** reverse Portuguese–Lung’Ie glossary (would duplicate the same items)

### Other open academic papers (Lung’Ie column only)

- Bandeira, Manuele. 2017. *Reconstrução fonológica e lexical do protocrioulo do Golfo da Guiné*. Tese de doutorado, USP. DOI: https://doi.org/10.11606/t.8.2017.tde-05042017-134159. Use: Lung’Ie phonology chapter and the Lung’Ie (LI) column of Chapter 5 only. Do not use Santome, Angolar, or Fa d’Ambô cells.
- Bandeira, Agostinho & Freitas 2021, *Phonetic-phonological aspects of modern Angolar* (Alfa / SciELO): Lung’Ie anatomy column only. DOI: https://doi.org/10.1590/1981-5794-e13177
- Balduino, Agostinho & Araujo, *Processos de nasalização em lung’Ie* (Alfa / SciELO): Lung’Ie phonetic examples with English glosses as printed. https://www.scielo.br/j/alfa/a/zJ4wnTYQXtM4RMsVLS9qMPC/

## Not used as Lung’Ie evidence

- *Dicionário livre santome/português* (Forro / Santome), including the Forro word `lungw'ie` ‘língua da Ilha do Príncipe’
- Angolar forms from Rougé & Schang comparison tables
- Forro `bi` as a substitute for Lung’Ie `vika`

## Missing-term protocol

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Lung’Ie database."
}
```
