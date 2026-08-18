# Forro sources

This dataset documents **Forro / Santome / Santomense** only.

Translation pairs: Forro → Portuguese, Forro → English.

Do not use these sources to fill Angolar or Lung’Ie entries.

## Priority 1 — Araujo & Hagemeijer 2013

### Araujo & Hagemeijer 2013

- **Authors:** Araujo, Gabriel Antunes de; Hagemeijer, Tjerk
- **Year:** 2013
- **Title:** Dicionário livre santome/português — Livlu-nglandji santome/putugêji
- **Place / publisher:** São Paulo: Hedra
- **Source type:** published bilingual dictionary
- **Language documented:** Santome (Forro)
- **Orthography:** ALUSTP
- **Published work:** Araujo, Gabriel Antunes de; Hagemeijer, Tjerk. 2013. *Dicionário livre santome/português — Livlu-nglandji santome/putugêji*. São Paulo: Hedra. CC BY-NC.
- **What was extracted:** headword, IPA, part of speech, Portuguese gloss, cross-references (`Cf.`)
- **What was not invented:** English glosses, etymology, extra example sentences, Angolar or Lung’Ie forms
- **Confidence for extracted Forro fields:** high
- **Verification status:** verified against the published dictionary extract; that extract is fully ingested in `dictionary.json` and is no longer kept as a separate text file

English is `null` in this dataset because this source is Santome/Portuguese. Ordinary Portuguese-to-English meaning is not treated as extra Forro evidence.

Page numbers are `null` because the text extract does not preserve pagination.

### Bandeira 2017

- **Author:** Bandeira, Manuele
- **Year:** 2017
- **Title:** Reconstrução fonológica e lexical do protocrioulo do Golfo da Guiné
- **Work type:** tese de doutorado, Universidade de São Paulo
- **DOI:** https://doi.org/10.11606/t.8.2017.tde-05042017-134159
- **Use for Forro:** Santome phonology chapter, and the Santome (ST) column of Chapter 5 cognate tables
- **Do not use:** Angolar (AN), Lung’Ie (LI), or Fa d’Ambô (FA) cells, nor reconstructed protoforms (PGG)
- **Headwords:** practical spelling from the thesis phonetic form (the PDF uses SAMPA); IPA is retained
- **English:** null (source glosses in Portuguese)
- **Cleanup:** syllable-break dots from phonetic cells were not kept as headwords

## Other local sources used with language isolation

### Rougé & Schang 2012

- **Authors:** Rougé, Jean-Louis; Schang, Emmanuel
- **Year:** 2012
- **Title:** Histoire des créoles et génétique: le cas de l’angolar
- **Publication:** Sciences et Techniques du Langage 9
- **Source type:** academic article
- **Use for Forro:** only when a form is explicitly labelled Forro / santomé
- **Do not use:** Angolar, Lung’Ie, or Fa d’Ambô forms as Forro translations

Forro-labelled items that were not already ALUSTP headwords were added, including `xinja`, `xinjila`, `ska`, `nunka`, `naie`, and `xigada`. French glosses stay in `notes`; they are not stored as Portuguese. Spellings that differ from ALUSTP (`xinja` vs `xindja`, `naie` vs `nai`, `ska` vs `saka` / `xka`) are kept as separate sourced forms. Angolar comparison columns were not copied. The local text extract of this article is fully ingested and is no longer kept as a separate file.

## APiCS Santome audio (linked on matching entries)

- **Authors / editors:** Hagemeijer, Tjerk (Santome data); Michaelis, Susanne Maria; Maurer, Philippe; Haspelmath, Martin; Huber, Magnus (eds.)
- **Year:** 2013
- **Title:** Atlas of Pidgin and Creole Language Structures Online — Santome (language 35)
- **URL:** https://apics-online.info/contributions/35
- **License:** CC BY 4.0
- **Local files:** `data/saotome_dataset/forro/Audio/`
- **What was copied:** Santome example recordings (`35_*.mp3`) and the glossed-text recording (`35_gt.mp3`)
- **What was linked:** only tokens that match a Forro headword (including documented spelling variants such as APiCS `stlivi` ~ ALUSTP `xtlivi`, `alha` ~ `alya`)
- **What was not done:** Angolar or Principense audio was not copied into this folder
- **English / Portuguese:** APiCS example translations stay in English; Portuguese is null unless a Forro source already had it

The survey file `Audio/35_gt.mp3` is a spoken glossed text. It is not attached to every dictionary word.

## Other published reference sources

- ALUSTP (2010). Unified orthography proposal for the native languages of São Tomé and Príncipe

Do not copy Angolar or Principense APiCS chapters into this folder.

### Bandeira & Araujo 2022

- **Authors:** Bandeira, Manuele; Araujo, Gabriel Antunes de
- **Year:** 2022
- **Title:** A estratégia reflexiva no protocrioulo do Golfo da Guiné
- **URL:** https://www.scielo.br/j/delta/a/bDqJqcYWZZJg5YsYH8RcqJG/
- **Use for Forro:** the labelled Santome example *Ubwê mu sa dizandadu* on the existing headword `ubwê`
- **Do not use:** Angolar `ôngê` or Lung’Ie `igbê` / `ibê` from the same article

### Later open-web pass (Santome cells already present)

Bandeira, Araujo & Finbow 2021 (*Journal of Language Contact*) Santome-labelled reflexes (`plasa`, `klosu`, `petu` ‘perto’, `plôkô`) were already headwords in Araujo & Hagemeijer 2013 or Bandeira 2017. Araujo et al. 2013 (*Fa d’ambô: língua crioula de Ano Bom*) was read for Santome comparison cells only; those Santome forms were already in this folder. Fa d’Ambô examples were not filed here.

Balduino, Agostinho, Araujo & Christofoletti 2015 (*A nasalidade vocálica em santome e lung’Ie*, PAPIA) is an open Santome + Lung’Ie source; the USP PDF did not download in this pass, so it was not newly extracted. Hagemeijer 2009 (*As línguas de S. Tomé e Príncipe*) remains open at the University of Lisbon repository, but the PDF timed out and was not extracted.

## Missing-term protocol

If a requested Forro term is not in `dictionary.json` / `dictionary.md`:

```json
{
  "status": "error",
  "code": "TERM_NOT_FOUND",
  "message": "Translation not available in the verified Forro database."
}
```
