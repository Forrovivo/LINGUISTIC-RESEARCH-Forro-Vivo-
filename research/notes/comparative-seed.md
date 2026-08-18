# Comparative dictionary seed: Forro, Angolar, Lung'Ie

**Project started:** 23 March 2023  

Data collection only. Not app code. Not a complete lexicon.

This file is a **verified seed** for three isolated dictionaries:

| Language | Autonym in sources | ISO 639-3 | Isolation |
|---|---|---|---|
| Forro (Santomeense / Santomé) | *lungwa santome*, Santome | cri | Forro ↔ PT, Forro ↔ EN |
| Angolar (Ngola) | *n'golá*, *Ngola* | aoa | Angolar ↔ PT, Angolar ↔ EN |
| Principense (Lung'Ie) | *lung’Ie* (language of the island) | pre | Lung'Ie ↔ PT, Lung'Ie ↔ EN |

The three languages are related Gulf of Guinea Portuguese-lexifier creoles. They are **not mutually intelligible**. Cognates must stay in separate language blocks. Never copy a Forro form into Angolar or Lung'Ie, and never “creolize” Portuguese to fill a gap.

## Retrieval agent (zero hallucination)

Use one language at a time. Do not mix lexicons.

```
# ROLE & OBJECTIVE
You are a strict, zero-hallucination Data Retrieval Agent.
Your ONLY function is to retrieve exact translations from the verified database in this file.

# CORE DIRECTIVE
NEVER invent, guess, or extrapolate a translation. These are low-resource languages.
Statistical guessing leads to critical inaccuracies. If the exact term is not in the
verified database for the requested language, refuse.

# EXECUTION RULES
1. EXACT MATCH REQUIREMENT: output only words, phrases, examples, or rules that exist
   in this file for the requested language.
2. NO PORTUGUESE INTERPOLATION: do not creolize Portuguese to fill gaps.
3. STRICT ISOLATION: never mix Forro (Santomeense / Santomé), Angolar (Ngola),
   Lung'Ie, or standard Portuguese lexicon in the same answer field.
4. METADATA FIDELITY: if cultural context or phonetics are requested, return exactly
   what is in the database. Do not add external commentary.
5. SPELLING FIDELITY: keep the source spelling. Do not rewrite Angolar or Lung'Ie
   into ALUSTP unless that spelling is itself in a cited source.

# FALLBACK PROTOCOL (MISSING DATA)
If the requested term is not in the verified database for that language, output
exactly one of the following, with no apologies or filler:

Forro:
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Forro database."}

Angolar:
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Angolar database."}

Lung'Ie:
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

## Verified sources used

Local files:

- `Dicionario livre santome.txt`: Araujo, Gabriel Antunes de; Hagemeijer, Tjerk. *Dicionário livre santome/português*. ALUSTP Forro (Santome) entries, phonetics, Portuguese glosses, examples.
- `Forro lan.txt`: Rougé, Jean-Louis; Schang, Emmanuel. 2012. “Histoire des créoles et génétique: le cas de l’angolar.” *Sciences et Techniques du Langage* 9, 67-97. Forro vs Angolar pairs, plus some Lung'Ie cognates.

Published web sources:

- Hagemeijer, Tjerk. 2013. APiCS survey: Santome. https://apics-online.info/surveys/35
- Maurer, Philippe. 2013. APiCS survey: Angolar. https://apics-online.info/surveys/36
- Maurer, Philippe. 2013. APiCS survey: Principense. https://apics-online.info/surveys/37
- APiCS datapoints 35-49, 35-101, 36-49, 36-101, 37-49, 37-50, 37-100, 37-101
- ALUSTP (2010): unified orthography for Santome, Angolar, and Lung'Ie. Used here for Forro spellings from Araujo and Hagemeijer. Angolar and Lung'Ie spellings follow Maurer / APiCS unless a source uses ALUSTP.

Not used as a source: app code, `dictionary.csv`, invented examples, blog paraphrases.

## Field schema

Each concept has three isolated language objects. Helper PT and EN never appear inside a creole example field.

```json
{
  "id": "eat",
  "concept_pt": "comer",
  "concept_en": "eat",
  "forro": {
    "form": "",
    "ipa": "",
    "pos": "",
    "pt": "",
    "en": "",
    "example": "",
    "example_pt": "",
    "example_en": "",
    "cultural_context": null,
    "source": ""
  },
  "angolar": { },
  "lungie": { }
}
```

If a language has no attested form, that object is the `TERM_NOT_FOUND` JSON, not a guessed cognate.

Portuguese glosses in `Dicionario livre santome.txt` have no English in that source. English in Forro rows is the ordinary meaning of that Portuguese gloss (comer = eat). It is not extra Forro.

---

## Language identity

### Forro (Santomeense / Santomé)

```json
{
  "language": "forro",
  "form": "santome",
  "ipa": "sɐ̃tɔˈmɛ",
  "pos": "n.",
  "pt": "1. Santome. A língua santome de São Tomé e Príncipe. 2. Forro. Grupo étnico de São Tomé e Príncipe.",
  "en": "Santome. The Forro language of São Tomé and Príncipe. Also the Forro ethnic group.",
  "example": null,
  "cultural_context": "Rougé and Schang 2012: forro in Portuguese means freed person. lungwa santomé means the language of São Tomé. dialetu (from Portuguese dialecto) is another local label.",
  "source": "Dicionario livre santome.txt: santome; lungwa. Rougé and Schang 2012: 70-71."
}
```

Related Forro form: `lungwa` [ˈlũgwa] n. idioma, língua (*Dicionario livre santome.txt*).

### Angolar (Ngola)

```json
{
  "language": "angolar",
  "form": "n'golá",
  "ipa": null,
  "pos": "n.",
  "pt": "Angolar. Autónimo da língua e da comunidade.",
  "en": "Angolar. Autonym of the language and community.",
  "example": "Tepu nakulu, no Ngola ka zi kai no kota mionga.",
  "example_pt": "Antigamente, nós Angolares fazíamos casas na beira-mar. (gloss APiCS / Maurer)",
  "example_en": "In old times, we Angolares used to build houses by the sea. (APiCS gloss of Maurer 1995)",
  "cultural_context": "Maroon creole of western and south-eastern São Tomé. Main villages: Santa Catarina, São João dos Angolares, Ribeira Peixe. Fishing community. About 15 percent of the lexicon is Bantu, mostly Kimbundu (Maurer 1992, APiCS). Forro label for the group: ngola (Dicionario livre santome.txt). Do not treat that Forro ethnonym as an Angolar headword.",
  "source": "APiCS Angolar survey (Maurer 2013); example (20) Tepu nakulu, no Ngola ka zi kai no kota mionga."
}
```

### Lung'Ie (Principense)

```json
{
  "language": "lungie",
  "form": "lung’Ie",
  "ipa": null,
  "pos": "n.",
  "pt": "Língua da ilha do Príncipe. Ie é a designação nativa de Príncipe.",
  "en": "The language of the island. Ie is the native name of Príncipe.",
  "example": null,
  "cultural_context": "Endangered. APiCS: fewer than one hundred native speakers with good active command, mostly older, on Príncipe, São Tomé, and in Portugal. Taught in schools on Príncipe after 2009 (Agostinho). ALUSTP is the official unified spelling proposal.",
  "source": "APiCS Principense survey (Maurer 2013)."
}
```

---

## Core lexicon

### eat / comer

**Forro**

```json
{
  "language": "forro",
  "form": "kume",
  "ipa": "kuˈmɛ",
  "pos": "v.",
  "pt": "Comer.",
  "en": "Eat.",
  "example": "Non ka kume pixi.",
  "example_pt": "Comemos peixe / Comeremos peixe.",
  "example_en": "We eat fish / We will eat fish.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: kume; ka. APiCS Santome 35-49: Inen ska kume. They are eating."
}
```

Also n. `kume` comida / food (*Dicionario livre santome.txt*).

**Angolar**

```json
{
  "language": "angolar",
  "form": "m'me",
  "ipa": null,
  "pos": "v.",
  "pt": "Comer. (Maurer: de português comer)",
  "en": "Eat. (Maurer: from Portuguese comer)",
  "example": "A na ta ngê ki m'me minhu wa.",
  "example_pt": "Não se sabe quem comeu o milho.",
  "example_en": "One doesn't know who ate the maize.",
  "cultural_context": "APiCS notes m'me < Portuguese comer, with syllabic nasal.",
  "source": "APiCS Angolar 36-101. Maurer 1995: 58."
}
```

Rougé and Schang 2012 also write Angolar `me` in `e me lotho` he ate rice. Keep both spellings tagged to their sources. Do not merge them.

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "kume",
  "ipa": null,
  "pos": "v.",
  "pt": "Comer.",
  "en": "Eat.",
  "example": "Ine sa kume.",
  "example_pt": "Eles estão a comer.",
  "example_en": "They are eating.",
  "cultural_context": null,
  "source": "APiCS Principense 37-49. Also: Amanhan n ka kume ki Zwan. Tomorrow I will eat with Zwan. (APiCS 37-50)"
}
```

### rice / arroz

**Forro**

```json
{
  "language": "forro",
  "form": "lôsô",
  "ipa": "ˈloso",
  "pos": "n.",
  "pt": "Arroz.",
  "en": "Rice.",
  "example": "e kume loso",
  "example_pt": "Ele comeu arroz. /il/comer/arroz/",
  "example_en": "He ate rice.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: lôsô. Example from Rougé and Schang 2012: 81 (older spelling loso)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "lotho",
  "ipa": null,
  "pos": "n.",
  "pt": "Arroz.",
  "en": "Rice.",
  "example": "e me lotho",
  "example_pt": "Ele comeu arroz. /il/manger/riz/",
  "example_en": "He ate rice.",
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 81-82."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### fish / peixe

**Forro**

```json
{
  "language": "forro",
  "form": "pixi",
  "ipa": "ˈpiʃi",
  "pos": "n.",
  "pt": "Peixe.",
  "en": "Fish.",
  "example": "Non ka kume pixi.",
  "example_pt": "Comemos peixe / Comeremos peixe.",
  "example_en": "We eat fish / We will eat fish.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: pixi; ka."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "kikiê",
  "ipa": null,
  "pos": "n.",
  "pt": "Peixe.",
  "en": "Fish.",
  "example": "Mungu kikiê na the wa.",
  "example_pt": "Amanhã não há peixe.",
  "example_en": "Tomorrow there is no fish. (APiCS: tomorrow fish neg exist neg)",
  "cultural_context": "Fishing is central in published Angolar descriptions (APiCS; Rougé and Schang 2012).",
  "source": "APiCS Angolar survey example (40)."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "pêxi",
  "ipa": null,
  "pos": "n.",
  "pt": "Peixe.",
  "en": "Fish.",
  "example": "Amanhan n sa kume pêxi fa.",
  "example_pt": "Amanhã eu não comerei peixe.",
  "example_en": "Tomorrow I won't eat fish.",
  "cultural_context": null,
  "source": "APiCS Principense 37-101."
}
```

### house / casa

**Forro**

```json
{
  "language": "forro",
  "form": "ke",
  "ipa": "ˈkɛ",
  "pos": "n.",
  "pt": "1. Casa. 2. Ninho.",
  "en": "House. Nest.",
  "example": "N xka be mu ke.",
  "example_pt": "Estou a ir para casa.",
  "example_en": "I am going home.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: ke; xka. APiCS Santome: Ke sa ji mu. The house is mine."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "kai",
  "ipa": null,
  "pos": "n.",
  "pt": "Casa.",
  "en": "House.",
  "example": "Peru tha kai.",
  "example_pt": "Pedro está em casa. (APiCS copula example)",
  "example_en": "Pedro is at home. (APiCS: Peru tha kai)",
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 79 (kai vs Forro ké). APiCS Angolar example (35)."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "kaxi",
  "ipa": null,
  "pos": "n.",
  "pt": "Casa.",
  "en": "House.",
  "example": "kaxi me",
  "example_pt": "a minha casa",
  "example_en": "my house",
  "cultural_context": null,
  "source": "APiCS Principense survey: kaxi me 'my house'. Rougé and Schang 2012: 79 note kaxi at Príncipe."
}
```

### three / três

**Forro**

```json
{
  "language": "forro",
  "form": "tlêxi",
  "ipa": "ˈtleʃi",
  "pos": "num.",
  "pt": "Três.",
  "en": "Three.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: tlêxi. Rougé and Schang 2012: 76-77 (PT três > Forro tlêxi)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "têêsi",
  "ipa": null,
  "pos": "num.",
  "pt": "Três.",
  "en": "Three.",
  "example": "Siga têêsi ria",
  "example_pt": "Chegar três dias (início de exemplo APiCS, truncado na fonte).",
  "example_en": "Arrive three days (APiCS example (14) is truncated in the survey text).",
  "cultural_context": "Rougé and Schang 2012: most Angolar numerals except ua, dothu, teesi, mêthentu, thentu, miri are Bantu (kwana four, tano five, thamano six).",
  "source": "Rougé and Schang 2012: 74, 76. APiCS Angolar example (14)."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### so / thus / assim

**Forro**

```json
{
  "language": "forro",
  "form": "axi",
  "ipa": "aˈʃi",
  "pos": "adv.",
  "pt": "Assim.",
  "en": "Thus. In this way.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: axi. Rougé and Schang 2012: 76-77 (PT assim > Forro axi / Angolar asi)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "asi",
  "ipa": null,
  "pos": "adv.",
  "pt": "Assim.",
  "en": "Thus. In this way.",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 77."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### sweet / doce

**Forro**

```json
{
  "language": "forro",
  "form": "doxi",
  "ipa": "ˈdɔʃi",
  "pos": "adj. / n.",
  "pt": "adj. 1. Agradável. 2. Belo. 3. Bom. 4. Delicioso. 5. Doce. n. 1. Bolo. 2. Doce.",
  "en": "Pleasant, beautiful, good, delicious, sweet. Also cake, sweet (noun).",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: doxi. Rougé and Schang 2012: 76-77 (PT doce > Forro doxi / Angolar dosi)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "dosi",
  "ipa": null,
  "pos": "adj.",
  "pt": "Doce.",
  "en": "Sweet.",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 77."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### mosquito / mosquito

**Forro**

```json
{
  "language": "forro",
  "form": "mixkitu",
  "ipa": "miʃˈkitu",
  "pos": "n.",
  "pt": "Mosquito.",
  "en": "Mosquito.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: mixkitu. Rougé and Schang 2012: 77 (PT mosquito > Forro mixkitu / Angolar nsikitu)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "n’sikitu",
  "ipa": null,
  "pos": "n.",
  "pt": "Mosquito.",
  "en": "Mosquito.",
  "example": null,
  "cultural_context": "Rougé and Schang 2012 discuss ôfu as a competing Angolar word for mosquito in purity debates. ôfu is not entered here as the default translation. APiCS: n’sikitu < Portuguese mosquito.",
  "source": "APiCS Angolar phonology (n’sikitu). Rougé and Schang 2012: 77, 93 (nsikitu)."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### fisherman / pescador

**Forro**

```json
{
  "language": "forro",
  "form": "pixkadô",
  "ipa": "piʃkaˈdo",
  "pos": "n.",
  "pt": "Pescador.",
  "en": "Fisherman.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: pixkadô. Rougé and Schang 2012: 77 (PT pescador > Forro pixkadô / Angolar pisikarô)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "pisikarô",
  "ipa": null,
  "pos": "n.",
  "pt": "Pescador.",
  "en": "Fisherman.",
  "example": "Ê (tha) pisikarô.",
  "example_pt": "Ele é pescador.",
  "example_en": "He is a fisherman.",
  "cultural_context": "APiCS and Rougé and Schang describe Angolares as a fishing people.",
  "source": "Rougé and Schang 2012: 77. APiCS Angolar example (34)."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "pixikadô",
  "ipa": null,
  "pos": "n.",
  "pt": "Pescador. (derivado de pixika pescar)",
  "en": "Fisherman. (from pixika to fish)",
  "example": null,
  "cultural_context": null,
  "source": "APiCS Principense survey, derivation section: pixikadô 'fisher' < pixika 'fish'."
}
```

### write / escrever

**Forro**

```json
{
  "language": "forro",
  "form": "xklêvê",
  "ipa": "ʃkleˈve",
  "pos": "v.",
  "pt": "1. Escrever. 2. Descrever. 3. Desenhar.",
  "en": "Write. Describe. Draw.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: xklêvê. Rougé and Schang 2012: 77 (PT escrever > *siklêvê > Forro xklêvê / Angolar sikêvê)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "sikêvê",
  "ipa": null,
  "pos": "v.",
  "pt": "Escrever.",
  "en": "Write.",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 77. APiCS Angolar: i sikêvê 'to write'."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### take / pegar

**Forro**

```json
{
  "language": "forro",
  "form": "toma",
  "ipa": "tɔˈma",
  "pos": "v.",
  "pt": "1. Pegar. 2. Receber. 3. Retirar. 4. Tirar. 5. Tomar.",
  "en": "Take. Receive. Remove. Drink/take.",
  "example": "Ê ka toma labu bana moxka.",
  "example_pt": "(exemplo APiCS Santome; gloss inglês na fonte)",
  "example_en": "APiCS Santome survey lists: Ê ka toma labu bana moxka.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: toma. Rougé and Schang 2012: 75 (PT tomar > Forro toma)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "tua",
  "ipa": null,
  "pos": "v.",
  "pt": "Pegar. Também: fixar um ponto de referência na costa quando se está no mar.",
  "en": "Take. Also: take a coastal landmark as a bearing when at sea.",
  "example": "Têtêuga Ø tua taba pega.",
  "example_pt": "(exemplo APiCS; tartaruga / tábua)",
  "example_en": "APiCS Angolar example (19): Têtêuga Ø tua taba pega.",
  "cultural_context": "Rougé and Schang 2012: navigation and fishing terms are often specific to Angolar.",
  "source": "Rougé and Schang 2012: 75. APiCS Angolar example (19)."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### seed / graine (Bini ikpe)

Attested comparative set in Rougé and Schang 2012: 75. Bini *ikpe* 'seed'.

**Forro**

```json
{
  "language": "forro",
  "form": "ukwê",
  "ipa": null,
  "pos": "n.",
  "pt": "Grão / semente (étimo bini ikpe, na fonte francesa).",
  "en": "Seed / grain (Bini etymon ikpe, in the French source).",
  "example": null,
  "cultural_context": "Rougé and Schang: Angolar often keeps initial i- where Forro has u-.",
  "source": "Rougé and Schang 2012: 75."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ikwê",
  "ipa": null,
  "pos": "n.",
  "pt": "Grão / semente (étimo bini ikpe).",
  "en": "Seed / grain (Bini etymon ikpe).",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 75."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "ikpê",
  "ipa": null,
  "pos": "n.",
  "pt": "Grão / semente (étimo bini ikpe). Fonte: lung’ie.",
  "en": "Seed / grain (Bini etymon ikpe). Source labels this lung’ie.",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 75."
}
```

### beach / praia

**Forro**

```json
{
  "language": "forro",
  "form": "ple",
  "ipa": null,
  "pos": "n.",
  "pt": "Praia.",
  "en": "Beach.",
  "example": null,
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: ple [ˈplɛ] Praia. Rougé and Schang 2012: 79 (ple vs Angolar paaya)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "paaya",
  "ipa": null,
  "pos": "n.",
  "pt": "Praia.",
  "en": "Beach.",
  "example": null,
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 79."
}
```

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### child / criança

**Forro**

```json
{
  "language": "forro",
  "form": "mina",
  "ipa": "ˈmina",
  "pos": "n.",
  "pt": "1. Criança. 2. Filha. 3. Filho. 4. Menina. 5. Menino. 6. Pequeno.",
  "en": "Child. Daughter. Son. Girl. Boy. Small.",
  "example": "N na tê mina fa.",
  "example_pt": "Não tenho filhos.",
  "example_en": "I do not have children.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: mina; na."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "n'na",
  "ipa": null,
  "pos": "n.",
  "pt": "Criança. Também diminutivo.",
  "en": "Child. Also diminutive marker.",
  "example": "n'na ome / n'na mengai",
  "example_pt": "filho / filha",
  "example_en": "son / daughter",
  "cultural_context": "APiCS: n'na < Portuguese menina. Diminutive: n'na parô little basket.",
  "source": "APiCS Angolar survey, noun phrase section."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "minu",
  "ipa": null,
  "pos": "n.",
  "pt": "Criança, menina. Também diminutivo.",
  "en": "Child, girl. Also diminutive marker.",
  "example": "minu jinela",
  "example_pt": "janela pequena",
  "example_en": "small window",
  "cultural_context": null,
  "source": "APiCS Principense survey: minu 'child, girl', minu jinela 'small window'."
}
```

### man / homem

**Forro**

```json
{
  "language": "forro",
  "form": "ome",
  "ipa": "ˈɔmɛ",
  "pos": "n.",
  "pt": "1. Homem. 2. Macho.",
  "en": "Man. Male.",
  "example": "Ome se na fla kuma ê sa kunhadu bô fa.",
  "example_pt": "(APiCS Santome, negação)",
  "example_en": "APiCS Santome (21): Ome se na fla kuma ê sa kunhadu bô fa.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: ome. APiCS Santome example (21)."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ome",
  "ipa": null,
  "pos": "n.",
  "pt": "Homem.",
  "en": "Man.",
  "example": "ome si-dhe",
  "example_pt": "aquele homem",
  "example_en": "that man",
  "cultural_context": null,
  "source": "APiCS Angolar survey: ome 'man' vs mengai 'woman'."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "omi",
  "ipa": null,
  "pos": "n.",
  "pt": "Homem.",
  "en": "Man.",
  "example": "omi ũa ve",
  "example_pt": "um homem velho",
  "example_en": "an old man",
  "cultural_context": null,
  "source": "APiCS Principense survey: omi ũa ve [man one old] 'an old man'."
}
```

### one / a / um, uma

**Forro**

```json
{
  "language": "forro",
  "form": "ũa",
  "ipa": "ˈũa",
  "pos": "art. / num.",
  "pt": "Um. Uma.",
  "en": "One. A / an.",
  "example": "Kasô sa ũa bluku.",
  "example_pt": "O cão é tão mau. (acepção advérbio no dicionário livre)",
  "example_en": "The dog is so bad. (adverb sense in Dicionario livre)",
  "cultural_context": "Same form is also an intensifier tão in Dicionario livre santome.txt. Keep senses separate.",
  "source": "Dicionario livre santome.txt: ũa art./num./adv."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ũa",
  "ipa": null,
  "pos": "art. / num.",
  "pt": "Um. Artigo indefinido.",
  "en": "One. Indefinite article.",
  "example": "ũa thoya",
  "example_pt": "uma história",
  "example_en": "a story",
  "cultural_context": "APiCS: no definite article. Indefinite article = numeral ũa.",
  "source": "APiCS Angolar survey. Also: M bê ũa buru ngai-ru."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "ũa",
  "ipa": null,
  "pos": "art. / num.",
  "pt": "Um. Uma.",
  "en": "One. A / an.",
  "example": "omi ũa ve",
  "example_pt": "um homem velho",
  "example_en": "an old man",
  "cultural_context": null,
  "source": "APiCS Principense survey."
}
```

---

## Grammar particles (keep isolated)

### imperfective / future marker `ka`

**Forro**

```json
{
  "language": "forro",
  "form": "ka",
  "ipa": "ˈka",
  "pos": "part.",
  "pt": "1. Partícula de modo. 2. Partícula aspectual (habitual / futuro).",
  "en": "Mood particle. Habitual / future aspect particle.",
  "example": "Non ka kume pixi.",
  "example_pt": "Comemos peixe / Comeremos peixe.",
  "example_en": "We eat fish / We will eat fish.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: ka. APiCS Santome Table 4."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ka",
  "ipa": null,
  "pos": "part.",
  "pt": "Imperfectivo / futuro.",
  "en": "Imperfective / future.",
  "example": "Ê kata.",
  "example_en": "S/he sang. (zero perfective, contrast with ka / thêka)",
  "example_pt": "Ele/ela cantou. (perfectivo zero, contraste)",
  "cultural_context": null,
  "source": "APiCS Angolar 36-49 and Table 7. Rougé and Schang 2012: 80: E ka bi."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "ka",
  "ipa": null,
  "pos": "part.",
  "pt": "Habitual, estado atual, futuro. Allomorfo a.",
  "en": "Habitual, current state, and future. Allomorph a.",
  "example": "Amanhan n ka kume ki Zwan.",
  "example_pt": "Amanhã eu comerei com o Zwan.",
  "example_en": "Tomorrow I will eat with Zwan.",
  "cultural_context": "In negated clauses ka is replaced by sa, except some counterfactuals (APiCS 37-50).",
  "source": "APiCS Principense 37-50. Maurer 2009: 83."
}
```

### progressive

**Forro**

```json
{
  "language": "forro",
  "form": "xka",
  "ipa": "ˈʃka",
  "pos": "part.",
  "pt": "Partícula preverbal do progressivo aspectual. Variantes: saka, ska, sa ka.",
  "en": "Preverbal progressive particle. Variants: saka, ska, sa ka.",
  "example": "N xka be mu ke.",
  "example_pt": "Estou a ir para casa.",
  "example_en": "I am going home.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: xka; saka. APiCS Santome 35-49: Inen ska kume. They are eating."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "thêka",
  "ipa": null,
  "pos": "part.",
  "pt": "Progressivo. Variantes: thaka, tha.",
  "en": "Progressive. Variants: thaka, tha.",
  "example": "Ê thêka kata.",
  "example_pt": "Ele está a cantar.",
  "example_en": "He is singing.",
  "cultural_context": null,
  "source": "APiCS Angolar 36-49. Rougé and Schang 2012: 80 write thaka or theka."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "sa",
  "ipa": null,
  "pos": "part.",
  "pt": "Progressivo. Também substitui ka em frases negativas.",
  "en": "Progressive. Also replaces ka in negated sentences.",
  "example": "Ine sa kume.",
  "example_pt": "Eles estão a comer.",
  "example_en": "They are eating.",
  "cultural_context": null,
  "source": "APiCS Principense 37-49."
}
```

### past / anterior

**Forro**

```json
{
  "language": "forro",
  "form": "tava",
  "ipa": "ˈtava",
  "pos": "part. / v.",
  "pt": "Partícula temporal. Também passado de sa ser/estar.",
  "en": "Past particle. Also past of copula sa.",
  "example": "N tava ka vivê nala.",
  "example_pt": "Eu estava a viver lá.",
  "example_en": "I was living there.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: tava. APiCS Santome 35-49: Inen tava ka kume. They were eating."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ta",
  "ipa": null,
  "pos": "part.",
  "pt": "Passado. APiCS: Angolar não combina ta com verbos dinâmicos para pluperfeito.",
  "en": "Past. APiCS: Angolar does not combine ta with dynamic verbs for pluperfect.",
  "example": "Ê ta ka kata.",
  "example_pt": "Ele estava a cantar.",
  "example_en": "He was singing.",
  "cultural_context": null,
  "source": "APiCS Angolar 36-49. Rougé and Schang 2012: 80 tava or ta."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "tava",
  "ipa": null,
  "pos": "part.",
  "pt": "Passado.",
  "en": "Past.",
  "example": "Ine tava sa kume.",
  "example_pt": "Eles estavam a comer.",
  "example_en": "They were eating.",
  "cultural_context": null,
  "source": "APiCS Principense 37-49."
}
```

### negation

**Forro**

```json
{
  "language": "forro",
  "form": "na … fa",
  "ipa": "na / fa",
  "pos": "neg.",
  "pt": "Negação descontínua. na pré-verbal, fa (ou fô enfático) no fim da oração.",
  "en": "Discontinuous negation. Preverbal na, clause-final fa (emphatic fô).",
  "example": "N na sêbê fa.",
  "example_pt": "Não sei.",
  "example_en": "I do not know.",
  "cultural_context": null,
  "source": "Dicionario livre santome.txt: na, fa. APiCS Santome 35-101. Rougé and Schang 2012: 81 e na kume loso fa."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "na … wa",
  "ipa": null,
  "pos": "neg.",
  "pt": "Negação descontínua. na pré-verbal, wa no fim.",
  "en": "Discontinuous negation. Preverbal na, final wa.",
  "example": "e na me lotho wa",
  "example_pt": "Ele não comeu arroz.",
  "example_en": "He did not eat rice.",
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 82. APiCS Angolar 36-101: A na ta ngê ki m'me minhu wa."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "fa",
  "ipa": null,
  "pos": "neg.",
  "pt": "Negador de SV em posição final. na só em orações pa (finais / desiderativas). Não há na … fa como no Forro.",
  "en": "Verb-phrase-final negator. na only in purposive/desiderative pa-clauses. No Santome-style na … fa.",
  "example": "Ê vê Pedu fa.",
  "example_pt": "Ele não viu o Pedu.",
  "example_en": "He didn’t see Pedu.",
  "cultural_context": null,
  "source": "APiCS Principense 37-100. Maurer 2009: 133. Also: Amanhan n sa kume ki Zwan fa."
}
```

Rougé and Schang 2012: 82: Príncipe uses only `fa` (`e bi fa` he did not come).

### relative marker

**Forro**

```json
{
  "language": "forro",
  "form": "ku",
  "ipa": null,
  "pos": "rel.",
  "pt": "Relativo sujeito e objeto.",
  "en": "Subject and object relative.",
  "example": "kume xi ku ê kume",
  "example_pt": "a comida que ele/ela come",
  "example_en": "the food s/he eats",
  "cultural_context": null,
  "source": "APiCS Santome example (3). Rougé and Schang 2012: 83 ku. Note: Dicionario livre also lists ku as com / with. Keep senses tagged."
}
```

**Angolar**

```json
{
  "language": "angolar",
  "form": "ki / ma",
  "ipa": null,
  "pos": "rel.",
  "pt": "ki relativo sujeito. ma relativo objeto.",
  "en": "ki subject relative. ma object relative.",
  "example": "m kunse ome ki pia mina e",
  "example_pt": "Eu conheço o homem que olhou para esta rapariga.",
  "example_en": "I know the man who looked at this girl.",
  "cultural_context": null,
  "source": "Rougé and Schang 2012: 83-84. Object: m kunse na ma zoze pia."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "ki",
  "ipa": null,
  "pos": "rel.",
  "pt": "Relativo.",
  "en": "Relative.",
  "example": "Omi xila, ki sa dôtô, ê vika fa.",
  "example_pt": "Aquele homem, que é médico, não veio.",
  "example_en": "That man, who is a doctor, did not come. (APiCS: Omi xila, ki sa dôtô, ê vika fa.)",
  "cultural_context": null,
  "source": "APiCS Principense survey example (22). Rougé and Schang 2012: 83 ki in lung'ie."
}
```

### want / querer

**Forro**

```json
{
  "language": "forro",
  "form": "mêsê",
  "ipa": null,
  "pos": "v.",
  "pt": "Querer, amar. (APiCS: stative)",
  "en": "Want, love. (APiCS: stative)",
  "example": "Sun na mêsê pa sun ba nala ku mosu sun se fô.",
  "example_pt": "Ele não quer ir para lá com o filho.",
  "example_en": "He doesn’t want to go there with his son.",
  "cultural_context": null,
  "source": "APiCS Santome 35-101. Hagemeijer 2007: 178."
}
```

Do not use Forro noun `mese` mestre from *Dicionario livre santome.txt* as this verb.

**Angolar**

```json
{
  "language": "angolar",
  "form": "mêthê",
  "ipa": null,
  "pos": "v.",
  "pt": "Querer.",
  "en": "Want.",
  "example": "Kwa ê Ø mêthê?",
  "example_en": "APiCS Angolar example (18): Kwa ê Ø mêthê?",
  "example_pt": "(interrogativa APiCS; não interpolar português extra)",
  "cultural_context": null,
  "source": "APiCS Angolar example (18)."
}
```

**Lung'Ie**

```json
{
  "language": "lungie",
  "form": "mêsê",
  "ipa": null,
  "pos": "v.",
  "pt": "Querer.",
  "en": "Want.",
  "example": "M mêsê pa txi sa dôtô.",
  "example_pt": "Eu quero que tu sejas médico.",
  "example_en": "I want you to be a doctor. (APiCS: M mêsê pa txi sa dôtô.)",
  "cultural_context": null,
  "source": "APiCS Principense survey example (23)."
}
```

---

## Pronouns (subject)

Sources: APiCS Santome Table 3, APiCS Principense Table 4. Angolar subject forms below are only those that appear in cited examples (ê, n, no, bô). Full Angolar pronoun tables exist in Maurer 1995 and Lorenzino 1998 and are not copied here.

| Person | Forro | Angolar (attested in cited examples) | Lung'Ie |
|---|---|---|---|
| 1sg | n / ami | n / m | in ~ un ~ n ~ m / ami |
| 2sg | bô ~ ô | bô | txi / atxi |
| 3sg | ê | ê | ê / êli |
| 1pl | non | no | no ~ non |
| 3pl | inen ~ nen | (not filled) | ine ~ ina |

If a cell is empty, return `TERM_NOT_FOUND` for that language. Do not copy Forro `inen` into Angolar.

---

## Cultural context (only from sources)

### Forro fishing camp `txada`

```json
{
  "language": "forro",
  "form": "txada",
  "ipa": "ˈtʃada",
  "pos": "n.",
  "pt": "Acampamento montado nas praias pelos pescadores para a pesca de peixe-voador na gravana. Cf. xada.",
  "en": "Beach camp set up by fishermen for flying-fish season in the gravana dry season.",
  "example": null,
  "cultural_context": "Rougé and Schang 2012: 91: annual Angolar migrations to fish flying fish in the north-west of the island. Forro name txada, Angolar name siada.",
  "source": "Dicionario livre santome.txt: txada. Rougé and Schang 2012: 91."
}
```

**Angolar** `siada`: same cultural fact, different language form (Rougé and Schang 2012: 91).

**Lung'Ie**

```json
{"status": "error", "code": "TERM_NOT_FOUND", "message": "Translation not available in the verified Lung'Ie database."}
```

### Sound correspondence (do not teach as interchangeable)

Rougé and Schang 2012: Forro palatal `x` often matches Angolar `si` (axi/asi, doxi/dosi, mixkitu/nsikitu). This is historical correspondence, not permission to convert Forro into Angolar in the UI.

---

## Gaps (do not fill)

These concepts appear in one language in the sources above and must stay refused in the others until a cited form is added:

- Forro `punda` because: Angolar `da` (Rougé and Schang 2012: 84). Lung'Ie: not in this file.
- Forro `ple` beach vs Angolar `paaya`. Lung'Ie: not in this file.
- Angolar `mengai` woman. Forro woman is not copied from that row. Use *Dicionario livre* Forro `mwala` only if you add that entry from that source.
- Lung'Ie `vika` come (APiCS). Do not label it as Forro `bi`.

APiCS and Maurer 1995 / 2009 contain many more items. Add them only with a source line. Never complete a triple by analogy.

## How to grow this file

1. Pick one concept.
2. Find the form in a named source.
3. Copy the example exactly.
4. Fill PT and EN isolation fields.
5. Leave the other languages as `TERM_NOT_FOUND` until they have their own citation.
6. Keep Angolar (Ngola) examples out of Forro UI, and Lung'Ie examples out of both.

Primary next sources to mine, still unpublished in this seed:

- Maurer 1995, *L’angolar* (grammar, texts, vocabulary)
- Maurer 2009, *Principense* (grammar, texts, PR-English word list)
- Agostinho, *Fonologia e método pedagógico do lung'le* (Lung'Ie/Portuguese glossary, ALUSTP)
- Araujo and Hagemeijer 2013 remainder of *Dicionário livre santome/português*
