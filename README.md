<div align="center">

# ForroVivo Linguistic Research

**Open dictionary data for living creoles.**  
No invented words. No mixed languages. Missing beats guessing.

[![Website](https://img.shields.io/badge/🌐_Website-forrovivo.com-16a34a?style=for-the-badge)](https://www.forrovivo.com)
[![API](https://img.shields.io/badge/⚡_API-api.forrovivo.com-2563eb?style=for-the-badge)](https://api.forrovivo.com)
[![App Store](https://img.shields.io/badge/📱_App_Store-ForroVivo-111111?style=for-the-badge)](https://apps.apple.com/app/id6751409176)
[![License](https://img.shields.io/badge/📜_License-CC_BY_4.0_+_source_terms-f59e0b?style=for-the-badge)](LICENSE)

[![Forro](https://img.shields.io/badge/🇸🇹_Forro-cri-22c55e)](data/saotome_dataset/forro/)
[![Angolar](https://img.shields.io/badge/🇸🇹_Angolar-aoa-f97316)](data/saotome_dataset/angolar/)
[![Lung’Ie](https://img.shields.io/badge/🇸🇹_Lung’Ie-pre-a855f7)](data/saotome_dataset/lungie/)
[![Kabuverdianu](https://img.shields.io/badge/🇨🇻_Kabuverdianu-kea-0ea5e9)](data/caboverde_dataset/)
[![Kriol](https://img.shields.io/badge/🇬🇼_Kriol-pov-14b8a6)](data/guinebissau_dataset/)
[![Angola Contruy](https://img.shields.io/badge/🇦🇴_Angola_Contruy-contruy-dc2626)](data/angola_dataset/contruy/)
[![Umbundu](https://img.shields.io/badge/🇦🇴_Umbundu-umb-ca8a04)](data/angola_dataset/umbundu/)
[![Kimbundu](https://img.shields.io/badge/🇦🇴_Kimbundu-kmb-b45309)](data/angola_dataset/kimbundu/)
[![Kikongo](https://img.shields.io/badge/🇦🇴_Kikongo-kng-92400e)](data/angola_dataset/kikongo/)
[![Seychellois](https://img.shields.io/badge/🇸🇨_Seychellois-crs-38bdf8)](data/seychelles_dataset/seychellois/)
[![Annobonese](https://img.shields.io/badge/🇬🇶_Annobonese-fab-fb7185)](data/equatorialguinea_dataset/annobonese/)
[![Pichi](https://img.shields.io/badge/🇬🇶_Pichi-fpe-f43f5e)](data/equatorialguinea_dataset/pichi/)
[![Fanakalo](https://img.shields.io/badge/🇿🇦_Fanakalo-fng-64748b)](data/southafrica_dataset/fanakalo/)
[![Ghanaian Pidgin](https://img.shields.io/badge/🇬🇭_Ghanaian_Pidgin-gpe-eab308)](data/ghana_dataset/ghanaianpidgin/)
[![Krio](https://img.shields.io/badge/🇸🇱_Krio-kri-84cc16)](data/sierraleone_dataset/krio/)
[![Kituba](https://img.shields.io/badge/🇨🇩_Kituba-ktu-65a30d)](data/rdcongo_dataset/kituba/)
[![Mauritian](https://img.shields.io/badge/🇲🇺_Mauritian-mfe-06b6d4)](data/mauritius_dataset/mauritian/)
[![Naija](https://img.shields.io/badge/🇳🇬_Naija-pcm-15803d)](data/nigeria_dataset/naija/)
[![Réunion Creole](https://img.shields.io/badge/🇷🇪_Réunion-rcf-7c3aed)](data/reunion_dataset/reunioncreole/)
[![Sango](https://img.shields.io/badge/🇨🇫_Sango-sag-c026d3)](data/centralafrican_dataset/sango/)
[![Cameroonian Pidgin](https://img.shields.io/badge/🇨🇲_Cameroonian_Pidgin-wes-0f766e)](data/cameroon_dataset/cameroonianpidgin/)

</div>

> **30-second version**  
> **LIVLU TECHNOLOGIES LTD** = the operator. **Research** = this open pillar (datasets + API). Sister pillars: **Open Knowledge** (site) and **Learning** (ForroVivo App).  
> Click a language. Or hit the API. If a word is not attested, you get `TERM_NOT_FOUND` — not a guess.

Jump:

[![Start](https://img.shields.io/badge/1-Start-16a34a)](#start-here)
[![Goal](https://img.shields.io/badge/2-Africa_goal-0ea5e9)](#creole-languages-of-africa)
[![Languages](https://img.shields.io/badge/3-Languages-22c55e)](#languages)
[![Rules](https://img.shields.io/badge/4-House_rules-ef4444)](#house-rules)
[![Stack](https://img.shields.io/badge/5-Tech-2563eb)](#technology-stack)
[![Map](https://img.shields.io/badge/6-Folders-a855f7)](#repository-layout)
[![API](https://img.shields.io/badge/7-API-0ea5e9)](#dictionary-api)
[![KB](https://img.shields.io/badge/8-Knowledge_Base-db2777)](#knowledge-base)
[![Roadmap](https://img.shields.io/badge/9-Roadmap-f59e0b)](#collection-roadmap)
[![Help](https://img.shields.io/badge/10-Contribute-111111)](#contributing)

---

<a id="start-here"></a>

## Place in LIVLU TECHNOLOGIES

**LIVLU TECHNOLOGIES** runs three individual team projects toward one goal. This repository is the **Research** pillar: attested lexicons + a read-only API. It is the open-licence surface.

Open Knowledge (website) and Learning (ForroVivo App) live in separate repositories. Not here. Do not merge those histories into this repo.

| 🟢 Open Knowledge | 🟣 Research (this repo) | 🔵 API | ⚫ Learning |
|---|---|---|---|
| [forrovivo.com](https://www.forrovivo.com) | [This repo](https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-) | [api.forrovivo.com](https://api.forrovivo.com) | [App Store](https://apps.apple.com/app/id6751409176) |

**Project started:** 23 March 2023  
**Founder and idealist:** Henriques Pontes  
**Linguistic Research co-founder:** Luis Lima

---

<a id="creole-languages-of-africa"></a>

## 🌍 Goal — Creole languages of Africa

Include **attested** data for each language below. One language, one box. No copying. Missing stays `TERM_NOT_FOUND`.

|  | Language | ISO | In this repo |
|---|---|---|---|
| 🇦🇴 | **Angola** | `ao` | [`data/angola_dataset/`](data/angola_dataset/) — Contruy, Umbundu, Kimbundu, Kikongo. **Not** Angolar `aoa` |
| 🇸🇹 | **Saotomense** / Forro | `cri` | [`data/saotome_dataset/forro/`](data/saotome_dataset/forro/) |
| 🇸🇨 | **Seychellois** | `crs` | [`data/seychelles_dataset/seychellois/`](data/seychelles_dataset/seychellois/) — empty until a source names Seychellois. **Not** Mauritian, **not** Réunion Creole |
| 🇬🇶 | **Annobonese** / Fa d’Ambô | `fab` | [`data/equatorialguinea_dataset/annobonese/`](data/equatorialguinea_dataset/annobonese/) — empty until a source names Annobonese. **Not** Forro |
| 🇿🇦 | **Fanakalo** | `fng` | [`data/southafrica_dataset/fanakalo/`](data/southafrica_dataset/fanakalo/) — empty until a source names Fanakalo |
| 🇬🇶 | **Pichi** | `fpe` | [`data/equatorialguinea_dataset/pichi/`](data/equatorialguinea_dataset/pichi/) — empty until a source names Pichi. **Not** Krio |
| 🇬🇭 | **Ghanaian Pidgin** | `gpe` | [`data/ghana_dataset/ghanaianpidgin/`](data/ghana_dataset/ghanaianpidgin/) — empty until a source names Ghanaian Pidgin. **Not** Naija |
| 🇨🇻 | **Kabuverdianu** | `kea` | [`data/caboverde_dataset/`](data/caboverde_dataset/) — one island, one folder |
| 🇸🇱 | **Krio** | `kri` | [`data/sierraleone_dataset/krio/`](data/sierraleone_dataset/krio/) — empty until a source names Krio. **Not** Pichi, not Naija |
| 🇨🇩 | **Kituba** | `ktu` | [`data/rdcongo_dataset/kituba/`](data/rdcongo_dataset/kituba/) — empty until a source names Kituba. **Not** Kikongo of Angola |
| 🇲🇺 | **Mauritian** | `mfe` | [`data/mauritius_dataset/mauritian/`](data/mauritius_dataset/mauritian/) — empty until a source names Mauritian. **Not** Réunion Creole, not Seychellois |
| 🇳🇬 | **Naija** | `pcm` | [`data/nigeria_dataset/naija/`](data/nigeria_dataset/naija/) — empty until a source names Naija. **Not** Ghanaian Pidgin, not Krio |
| 🇬🇼 | **Guinea-Bissau Creole** / Kriol | `pov` | [`data/guinebissau_dataset/`](data/guinebissau_dataset/) — one region, one folder |
| 🇸🇹 | **Principense** / Lung’Ie | `pre` | [`data/saotome_dataset/lungie/`](data/saotome_dataset/lungie/) |
| 🇷🇪 | **Réunion Creole** | `rcf` | [`data/reunion_dataset/reunioncreole/`](data/reunion_dataset/reunioncreole/) — empty until a source names Réunion Creole. **Not** Mauritian, not Seychellois |
| 🇨🇫 | **Sango** | `sag` | [`data/centralafrican_dataset/sango/`](data/centralafrican_dataset/sango/) — empty until a source names Sango |
| 🇨🇲 | **Cameroonian Pidgin** | `wes` | [`data/cameroon_dataset/cameroonianpidgin/`](data/cameroon_dataset/cameroonianpidgin/) — empty until a source names Cameroonian Pidgin. **Not** Naija, not Krio |

Angolar / Ngola (`aoa`) stays in [`data/saotome_dataset/angolar/`](data/saotome_dataset/angolar/). It is **not** Angola (`ao`).

---

<a id="languages"></a>

## 🗺️ Languages

Each language is its **own** box. Looking similar ≠ same word. Do not copy between folders.

|  | Language | Autonym | ISO | Open it | Pairs |
|---|---|---|---|---|---|
| 🇸🇹 | **Forro** / Santome | *lungwa santome* | `cri` | [`data/saotome_dataset/forro/`](data/saotome_dataset/forro/) | Forro ↔ PT, Forro ↔ EN |
| 🇸🇹 | **Angolar** / Ngola | *n'golá* | `aoa` | [`data/saotome_dataset/angolar/`](data/saotome_dataset/angolar/) | Angolar ↔ PT, Angolar ↔ EN |
| 🇸🇹 | **Lung’Ie** / Principense | *lung’Ie* | `pre` | [`data/saotome_dataset/lungie/`](data/saotome_dataset/lungie/) | Lung’Ie ↔ PT, Lung’Ie ↔ EN |
| 🇨🇻 | **Kabuverdianu** | island varieties | `kea` | [`data/caboverde_dataset/`](data/caboverde_dataset/) | that island ↔ PT / EN |
| 🇬🇼 | **Kriol** / Kiriol | regional varieties | `pov` | [`data/guinebissau_dataset/`](data/guinebissau_dataset/) | that region ↔ PT / EN |
| 🇦🇴 | **Angola Contruy** | Angola (country) | — | [`data/angola_dataset/contruy/`](data/angola_dataset/contruy/) | Angola Contruy ↔ PT / EN |
| 🇦🇴 | **Umbundu** | *umbundu* | `umb` | [`data/angola_dataset/umbundu/`](data/angola_dataset/umbundu/) | Umbundu ↔ PT / EN |
| 🇦🇴 | **Kimbundu** | *kimbundu* | `kmb` | [`data/angola_dataset/kimbundu/`](data/angola_dataset/kimbundu/) | Kimbundu ↔ PT / EN |
| 🇦🇴 | **Kikongo** | *kikongo* | `kng` | [`data/angola_dataset/kikongo/`](data/angola_dataset/kikongo/) | Kikongo ↔ PT / EN |
| 🇸🇨 | **Seychellois** | *seselwa* | `crs` | [`data/seychelles_dataset/seychellois/`](data/seychelles_dataset/seychellois/) | Seychellois ↔ PT / EN |
| 🇬🇶 | **Annobonese** / Fa d’Ambô | *fa d’ambô* | `fab` | [`data/equatorialguinea_dataset/annobonese/`](data/equatorialguinea_dataset/annobonese/) | Annobonese ↔ PT / EN |
| 🇬🇶 | **Pichi** | *pichi* | `fpe` | [`data/equatorialguinea_dataset/pichi/`](data/equatorialguinea_dataset/pichi/) | Pichi ↔ PT / EN |
| 🇿🇦 | **Fanakalo** | *fanakalo* | `fng` | [`data/southafrica_dataset/fanakalo/`](data/southafrica_dataset/fanakalo/) | Fanakalo ↔ PT / EN |
| 🇬🇭 | **Ghanaian Pidgin** | Ghanaian Pidgin | `gpe` | [`data/ghana_dataset/ghanaianpidgin/`](data/ghana_dataset/ghanaianpidgin/) | Ghanaian Pidgin ↔ PT / EN |
| 🇸🇱 | **Krio** | *krio* | `kri` | [`data/sierraleone_dataset/krio/`](data/sierraleone_dataset/krio/) | Krio ↔ PT / EN |
| 🇨🇩 | **Kituba** | *kituba* | `ktu` | [`data/rdcongo_dataset/kituba/`](data/rdcongo_dataset/kituba/) | Kituba ↔ PT / EN |
| 🇲🇺 | **Mauritian** | *morisien* | `mfe` | [`data/mauritius_dataset/mauritian/`](data/mauritius_dataset/mauritian/) | Mauritian ↔ PT / EN |
| 🇳🇬 | **Naija** | *naija* | `pcm` | [`data/nigeria_dataset/naija/`](data/nigeria_dataset/naija/) | Naija ↔ PT / EN |
| 🇷🇪 | **Réunion Creole** | *kréol rénioné* | `rcf` | [`data/reunion_dataset/reunioncreole/`](data/reunion_dataset/reunioncreole/) | Réunion Creole ↔ PT / EN |
| 🇨🇫 | **Sango** | *sängö* | `sag` | [`data/centralafrican_dataset/sango/`](data/centralafrican_dataset/sango/) | Sango ↔ PT / EN |
| 🇨🇲 | **Cameroonian Pidgin** | *kamtok* | `wes` | [`data/cameroon_dataset/cameroonianpidgin/`](data/cameroon_dataset/cameroonianpidgin/) | Cameroonian Pidgin ↔ PT / EN |

**Brain sticky notes**

- Table above = **in this repo now.** Country folders for the Africa list are indexes; lexicons stay empty until a source names that language.
- São Tomé trio = Gulf of Guinea creoles. **Not** mutually intelligible.
- Cabo Verde + Guinea-Bissau = Upper Guinea creoles. **Not** the same language.
- Cabo Verde = **one island, one folder**. Guinea-Bissau = **one region, one folder**.
- [`data/angola_dataset/`](data/angola_dataset/) = Angola **index**. Contruy, Umbundu, Kimbundu, Kikongo = **one language, one folder**. **Not** Angolar.
- Umbundu is not Kimbundu. Kikongo of Angola is not Kituba.
- Annobonese is not Forro. Pichi is not Krio. Naija is not Ghanaian Pidgin. Mauritian is not Seychellois. Réunion Creole is not Mauritian.
- Portuguese is **not** a creole. São Toméan Portuguese is not Forro, Angolar, or Lung’Ie.

---

<a id="house-rules"></a>

## 📏 House rules

One line each. Stick them on the fridge.

| ✅ Do | ❌ Don’t |
|---|---|
| Cite a source for every field | Invent a translation |
| Keep the source spelling | “Normalize” one language into another |
| Leave a gap empty | Fill it from another creole because it *looks* close |
| Record disagreements | Silently pick a winner |
| Return `TERM_NOT_FOUND` | Creolize Portuguese to fake a hit |

1. **No invented words.** Form, gloss, example, sound, culture — cited or out.
2. **Isolation.** Islands are not interchangeable. Regions are not interchangeable. Kabuverdianu is not Guinea-Bissau Kriol. Krio is not Pichi. Naija is not Ghanaian Pidgin. Mauritian is not Seychellois. Annobonese is not Forro. Angola (`ao`) is not Angolar (`aoa`). Umbundu is not Kimbundu. Kikongo is not Kituba.
3. **Missing is honest.** Empty is better than a guess.

Full rules: [methodology](docs/methodology.md) · [collection prompt](research/notes/collection-prompt.md)

---

<a id="technology-stack"></a>

## 🛠️ Technology Stack

This repo = datasets + a GET-only API.  
ForroVivo.com and the App Store app = other codebases.

| Layer | What we use |
|---|---|
| 📚 Lexicons | JSON + Markdown in `data/` on GitHub |
| 🧠 Knowledge Base | Optional `knowledge.json` per isolated folder |
| 🧪 Validation | JSON Schema in `schema/` |
| 🔊 Audio | MPEG, linked from matching entries |
| ⚡ API | Cloudflare Worker (`api/src`) · same `/v1` contract |
| 📦 Host | Cloudflare Workers; DNS `api.forrovivo.com` |
| 🔗 Data origin | This GitHub repository (`raw.githubusercontent.com`) |
| 📜 Contract | OpenAPI → [`api/openapi.yaml`](api/openapi.yaml) |
| 🧠 Runtime | Edge indexes over the **real** GitHub `dictionary.json` files |
| ✅ Tests | pytest against local files (Python FastAPI) |
| 🧰 Scripts | `validate-data` · `import-data` · `build-index` |

[requirements.txt](api/requirements.txt) · [TECH_REPORT.md](TECH_REPORT.md) · [TECH_REPORT_v2.0.md](TECH_REPORT_v2.0.md)

---

<a id="repository-layout"></a>

## 📁 Repository layout

```text
.
├── api/                 ⚡ read-only API (Cloudflare Worker + Python tests)
├── data/
│   ├── saotome_dataset/         🇸🇹 Forro, Angolar, Lung’Ie
│   ├── caboverde_dataset/       🇨🇻 one folder per island
│   ├── guinebissau_dataset/     🇬🇼 one folder per region
│   ├── angola_dataset/          🇦🇴 Contruy, Umbundu, Kimbundu, Kikongo
│   ├── seychelles_dataset/      🇸🇨 Seychellois
│   ├── equatorialguinea_dataset/ 🇬🇶 Annobonese, Pichi
│   ├── southafrica_dataset/     🇿🇦 Fanakalo
│   ├── ghana_dataset/           🇬🇭 Ghanaian Pidgin
│   ├── sierraleone_dataset/     🇸🇱 Krio
│   ├── rdcongo_dataset/         🇨🇩 Kituba
│   ├── mauritius_dataset/       🇲🇺 Mauritian
│   ├── nigeria_dataset/         🇳🇬 Naija
│   ├── reunion_dataset/         🇷🇪 Réunion Creole
│   ├── centralafrican_dataset/  🇨🇫 Sango
│   └── cameroon_dataset/        🇨🇲 Cameroonian Pidgin
├── docs/                📖 how the work is done
├── research/            📚 sources, PDFs, notes
├── schema/              🧪 JSON Schema
├── scripts/             🧰 validate / import / index
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

Parent folders are **indexes**, not a blender. Map: [data/index.md](data/index.md)

| Folder | Isolation |
|---|---|
| `data/saotome_dataset/` | Three languages. Do not mix them. |
| `data/caboverde_dataset/` | Unnamed “Cape Verdean” stays **out** of island folders. |
| `data/guinebissau_dataset/` | Unnamed “Guinea-Bissau Kriol” stays **out**. No Casamance. |
| `data/angola_dataset/` | One language, one folder. Contruy is not Umbundu. Kikongo is not Kituba. Not Angolar. |
| `data/seychelles_dataset/` | Seychellois only. Not Mauritian. Not Réunion Creole. |
| `data/equatorialguinea_dataset/` | Annobonese is not Forro. Pichi is not Krio. Do not copy between them. |
| `data/southafrica_dataset/` | Fanakalo only. |
| `data/ghana_dataset/` | Ghanaian Pidgin only. Not Naija. |
| `data/sierraleone_dataset/` | Krio only. Not Pichi. Not Naija. |
| `data/rdcongo_dataset/` | Kituba only. Not Kikongo of Angola. |
| `data/mauritius_dataset/` | Mauritian only. Not Réunion Creole. Not Seychellois. |
| `data/nigeria_dataset/` | Naija only. Not Ghanaian Pidgin. Not Krio. |
| `data/reunion_dataset/` | Réunion Creole only. Not Mauritian. Not Seychellois. |
| `data/centralafrican_dataset/` | Sango only. |
| `data/cameroon_dataset/` | Cameroonian Pidgin only. Not Naija. Not Krio. |

Forro comes from *Dicionário livre santome/português*. Angolar and Lung’Ie come from sources that name those languages. Cabo Verde, Guinea-Bissau, Angola Contruy, Umbundu, Kimbundu, Kikongo, and the other country folders grow only when a source names that language.

---

<a id="dictionary-api"></a>

## ⚡ Dictionary API

**Public host:** https://api.forrovivo.com  
GET only. Loads real JSON. Does not invent. Does not merge. Does not write.

```bash
curl "https://api.forrovivo.com/v1/saotome/forro/lookup?headword=kume"
```

| Try | Path |
|---|---|
| 🏠 | `/v1` |
| 🧠 | `/v1/kb` |
| 🗺️ | `/v1/languages` |
| 📋 | `/v1/datasets` |
| 🇸🇹 Forro | `/v1/saotome/forro/lookup?headword=` |
| 🟠 Angolar | `/v1/saotome/angolar/lookup?headword=` |
| 🟣 Lung’Ie | `/v1/saotome/lungie/lookup?headword=` |
| 🇨🇻 island | `/v1/caboverde/{island}/lookup?headword=` |
| 🇬🇼 region | `/v1/guinebissau/{region}/lookup?headword=` |
| ➡️ Angola Contruy | `/v1/angola/contruy/lookup?headword=` |
| 🟡 Umbundu | `/v1/angola/umbundu/lookup?headword=` |
| 🟤 Kimbundu | `/v1/angola/kimbundu/lookup?headword=` |
| 🟥 Kikongo | `/v1/angola/kikongo/lookup?headword=` |
| 🇸🇨 Seychellois | `/v1/seychelles/seychellois/lookup?headword=` |
| 🇬🇶 Annobonese | `/v1/equatorialguinea/annobonese/lookup?headword=` |
| 🇬🇶 Pichi | `/v1/equatorialguinea/pichi/lookup?headword=` |
| 🇿🇦 Fanakalo | `/v1/southafrica/fanakalo/lookup?headword=` |
| 🇬🇭 Ghanaian Pidgin | `/v1/ghana/ghanaianpidgin/lookup?headword=` |
| 🇸🇱 Krio | `/v1/sierraleone/krio/lookup?headword=` |
| 🇨🇩 Kituba | `/v1/rdcongo/kituba/lookup?headword=` |
| 🇲🇺 Mauritian | `/v1/mauritius/mauritian/lookup?headword=` |
| 🇳🇬 Naija | `/v1/nigeria/naija/lookup?headword=` |
| 🇷🇪 Réunion Creole | `/v1/reunion/reunioncreole/lookup?headword=` |
| 🇨🇫 Sango | `/v1/centralafrican/sango/lookup?headword=` |
| 🇨🇲 Cameroonian Pidgin | `/v1/cameroon/cameroonianpidgin/lookup?headword=` |
| 🔎 Search | `/v1/search?dataset=saotome/forro&q=` |

`/v1/saotome`, `/v1/caboverde`, `/v1/guinebissau`, `/v1/angola`, and the other country keys = indexes → `TERM_NOT_FOUND`.  
`/v1/angola/contruy` = Angola Contruy, **not** Angolar. Search never hops folders.

Run it locally:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
PYTHONPATH=. uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

Playground: https://api.forrovivo.com/docs · [OpenAPI](api/openapi.yaml) · [API guide](docs/api.md)

---

<a id="knowledge-base"></a>

## 🧠 Knowledge Base

Same isolation as the dictionary. Not a website. Not a merged encyclopedia.

| Collection | Path | What it is |
|---|---|---|
| Languages | `/v1/languages` | Isolated lexicons (Forro, Angolar, islands, regions, Angola languages) |
| Entries | `/v1/{dataset}/entries` | Headwords from that folder only |
| Grammar | `/v1/{dataset}/grammar` | Grammar notes with a citation |
| Expressions | `/v1/{dataset}/expressions` | Attested expressions |
| Proverbs | `/v1/{dataset}/proverbs` | Attested proverbs |
| Culture | `/v1/{dataset}/culture` | Culture notes tied to that language |
| Food | `/v1/{dataset}/food` | Food notes from a source |
| Music | `/v1/{dataset}/music` | Music notes from a source |
| Dance | `/v1/{dataset}/dance` | Dance notes from a source |
| Folklore | `/v1/{dataset}/folklore` | Folklore from a source |
| Stories | `/v1/{dataset}/stories` | Stories from a source |
| Places | `/v1/{dataset}/places` | Places named by a source |
| Sources | `/v1/{dataset}/sources` | Bibliography for that folder |
| Search | `/v1/{dataset}/search?q=` | Search **inside** that folder |

Map: [`/v1/kb`](https://api.forrovivo.com/v1/kb).  
Records live in `knowledge.json` next to `dictionary.json`. If the file is missing, the collection is empty — not guessed.

Lookup already walks that graph for a word:

```text
kume
  means → Portuguese concept
  means → English concept (when the source has one)
  belongs to → Forro
  related to → grammar / culture (when cited)
  appears in → proverb (when cited)
  documented by → source
```

`/v1/search` without `dataset=` is rejected. `/v1/grammar` (and the other top-level collection paths) list **counts per folder**, not a blended document.

---

## Collection roadmap

Named dates only. These gaps are calendar math between those dates. Not a live clock.

| Project started | First ForroVivo app version | Cabo Verde, Angola, Guinea-Bissau started | Continue those three |
|---|---|---|---|
| 23 March 2023 | 22 March 2025 | 23 April 2025 | 23 April 2026 |
| Start | **2 years** later | **2 years 1 month** later | **3 years 1 month** later |

From 23 March 2023 to 22 March 2025 is **2 years** (one day before 23 March 2025).  
From 22 March 2025 to 23 April 2025 is **1 month 1 day**.  
From 23 March 2023 to 23 April 2025 is **2 years 1 month**.  
From 23 April 2025 to 23 April 2026 is **1 year**.  
From 23 March 2023 to 23 April 2026 is **3 years 1 month**.  
From 23 March 2023 to 18 August 2026 is **3 years 4 months 26 days**.  
From 23 April 2026 to 18 August 2026 is **3 months 26 days**.

```mermaid
gantt
    title Time span to 18 August 2026
    dateFormat YYYY-MM-DD
    axisFormat %b %Y
    section Sao Tome first
    Forro, Angolar, Lung Ie           :done, stp, 2023-03-23, 2025-04-23
    section App
    First ForroVivo app version       :milestone, app1, 2025-03-22, 0d
    Version 5 beta, new countries     :milestone, app5, 2026-08-18, 0d
    section Cabo Verde, Angola, Guinea-Bissau
    Island, alias, and region folders :active, cvg, 2025-04-23, 2026-04-23
```

São Tomé collection for Forro, Angolar, and Lung’Ie began with the project on **23 March 2023**. That work is not delayed to 2025. The first version of the ForroVivo app launched on **22 March 2025**. Twenty-five months of São Tomé work first, then twelve months of Cabo Verde, Angola, and Guinea-Bissau collection, through **23 April 2026**. Version 5 of the ForroVivo app was released to beta on **18 August 2026**, with new countries.

```mermaid
timeline
    title Roadmap log
    23 March 2023 : Project starts : Sao Tome and Principe (Forro, Angolar, Lung Ie)
    22 March 2025 : First ForroVivo app version launched : 2 years later
    23 April 2025 : Cabo Verde, Angola, Guinea-Bissau start : 2 years 1 month later
    23 April 2026 : Continue those three : 1 year into that collection : 3 years 1 month since project start
    18 August 2026 : ForroVivo app version 5 released to beta : new countries : 3 years 4 months 26 days later
    20 August 2026 : Remaining African country folders created : lexicons empty until labelled : 3 years 4 months 28 days later
```

| Date | What started | Time since 23 March 2023 | Status |
|---|---|---|---|
| 23 March 2023 | Project. São Tomé and Príncipe (Forro, Angolar, Lung’Ie). | Start | Under way |
| 22 March 2025 | First version of the ForroVivo app launched. | 2 years later | Shipped |
| 23 April 2025 | Cabo Verde (by island), Angola (Contruy, Umbundu, Kimbundu, Kikongo), Guinea-Bissau (by region). | 2 years 1 month later | Folders ready; lexicons grow from labelled sources |
| 2026 / 23 April 2026 | Continue Cabo Verde, Angola, and Guinea-Bissau from labelled sources only. | 3 years 1 month later (on 23 April 2026) | Collection year |
| 18 August 2026 | ForroVivo app version 5 released to beta, with new countries. | 3 years 4 months 26 days later | Beta |
| 20 August 2026 | Country folders for Seychelles, Equatorial Guinea, South Africa, Ghana, Sierra Leone, the Democratic Republic of the Congo, Mauritius, Nigeria, Réunion, the Central African Republic, and Cameroon. | 3 years 4 months 28 days later | Folders ready; lexicons grow from labelled sources |

Cabo Verdean Kabuverdianu is **not** Guinea-Bissau Kriol.  
Angola Contruy is **not Angolar**. Umbundu is not Kimbundu. Kikongo of Angola is not Kituba. Angolar stays in `data/saotome_dataset/angolar/`.

---

## 📚 Documentation

| File | When you need it |
|---|---|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Adding a real entry |
| [docs/methodology.md](docs/methodology.md) | Isolation + verification |
| [docs/data-model.md](docs/data-model.md) | Entry shape |
| [docs/api.md](docs/api.md) | HTTP paths, including the Knowledge Base |
| [research/sources/README.md](research/sources/README.md) | Bibliography |
| [TECH_REPORT.md](TECH_REPORT.md) | v1.0 technical baseline (datasets + API) |
| [TECH_REPORT_v2.0.md](TECH_REPORT_v2.0.md) | v2.0 incremental report (Worker, KB, indexes) |
| [data/index.md](data/index.md) | Dataset map |

---

<a id="contributing"></a>

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bring **attested** data. Leave guesses at the door.

- [ ] Right creole, island, or region folder
- [ ] Source on every new field
- [ ] Examples copied from the source (not invented)
- [ ] Disagreements marked, not hidden
- [ ] No website UI, no App Store app code, no write APIs that invent translations

Wikipedia, social media, unsourced lists, and generated text are **not** enough on their own.

---

## 📜 License

**Operator:** LIVLU TECHNOLOGIES LTD · **Pillar:** Research  

**This is the open-source LIVLU TECHNOLOGIES pillar.** Open Knowledge and Learning (ForroVivo App) remain proprietary under the LIVLU EULA.

Project materials (this README, rules, structure, our notes) = [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).  
That is **our** work. Cited dictionaries keep **their** licenses.

| Material | Rights |
|---|---|
| *Dicionário livre santome/português* (Araujo & Hagemeijer, 2013) | CC BY-NC. Credit them. Non-commercial only. |
| APiCS Online (Michaelis et al., 2013), including Santome audio | CC BY 4.0. Cite Hagemeijer and the APiCS editors. |
| Other academic publications | Publisher / author terms. Cite. Not CC BY 4.0. |

> ForroVivo Linguistic Research, available under CC BY 4.0. Includes material from Araujo & Hagemeijer (2013), *Dicionário livre santome/português*, CC BY-NC.

Full text: [LICENSE](LICENSE)

Product policies: [Privacy](https://www.forrovivo.com/legal/privacy) · [Terms](https://www.forrovivo.com/legal/terms) · [Company](https://www.forrovivo.com/legal/company) · [EULA](https://www.forrovivo.com/legal/eula)  
Contact: support@forrovivo.com | geral@forrovivo.com
