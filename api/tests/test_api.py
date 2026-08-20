from fastapi.testclient import TestClient

from api.knowledge import DOCUMENT_COLLECTIONS, KNOWLEDGE_BASE
from api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_root_redirects_to_v1():
    response = client.get("/", follow_redirects=False)
    assert response.status_code == 307
    assert response.headers["location"] == "/v1"


def test_public_api_is_api_forrovivo_com():
    payload = client.get("/v1").json()
    assert payload["platform"] == "ForroVivo"
    assert payload["initiative"] == "Linguistic Research"
    assert payload["founder"] == "Henriques Pontes"
    assert payload["idealist"] == "Henriques Pontes"
    assert payload["cofounders"] == ["Luis Lima"]
    assert payload["host"] == "api.forrovivo.com"
    assert payload["url"] == "https://api.forrovivo.com"
    assert payload["homepage"] == "https://www.forrovivo.com"
    assert payload["github"] == "https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-"
    assert payload["app_store"] == "https://apps.apple.com/app/id6751409176"
    assert payload["docs"] == "https://api.forrovivo.com/docs"
    spec = client.get("/openapi.json").json()
    assert spec["servers"][0]["url"] == "https://api.forrovivo.com"


def test_catalog_lists_isolated_datasets():
    payload = client.get("/v1/datasets").json()
    keys = {item["dataset"] for item in payload["datasets"]}
    assert "saotome/forro" in keys
    assert "saotome/angolar" in keys
    assert "saotome/lungie" in keys
    assert "caboverde/santiago" in keys
    assert "guinebissau/bissau" in keys
    assert "angola/contruy" in keys
    assert "angola/umbundu" in keys
    assert "angola/kimbundu" in keys
    assert "angola/kikongo" in keys
    assert "seychelles/seychellois" in keys
    assert "equatorialguinea/annobonese" in keys
    assert "equatorialguinea/pichi" in keys
    assert "southafrica/fanakalo" in keys
    assert "ghana/ghanaianpidgin" in keys
    assert "sierraleone/krio" in keys
    assert "rdcongo/kituba" in keys
    assert "mauritius/mauritian" in keys
    assert "nigeria/naija" in keys
    assert "reunion/reunioncreole" in keys
    assert "centralafrican/sango" in keys
    assert "cameroon/cameroonianpidgin" in keys
    angola = next(item for item in payload["datasets"] if item["dataset"] == "angola")
    assert angola["kind"] == "index"
    contruy = next(item for item in payload["datasets"] if item["dataset"] == "angola/contruy")
    assert contruy["kind"] == "lexicon"
    assert contruy["language"] == "angola-contruy"
    assert contruy.get("canonical_dataset") in (None, "")


def test_forro_lookup_kume_from_real_data():
    response = client.get("/v1/saotome/forro/lookup", params={"headword": "kume"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["dataset"] == "saotome/forro"
    assert payload["count"] >= 1
    assert all(entry["language"] == "forro" for entry in payload["entries"])
    assert all(entry["headword"] == "kume" for entry in payload["entries"])
    assert payload["entries"][0]["translation_pt"]
    graph = payload["entries"][0]["graph"]
    assert graph["word"]["headword"] == "kume"
    assert graph["belongs_to"]["language"] == "forro"
    assert graph["belongs_to"]["dataset"] == "saotome/forro"
    assert any(item["language"] == "pt" and item["concept"] for item in graph["means"])
    assert all(item["language"] in {"pt", "en"} for item in graph["means"])
    assert graph["documented_by"][0]["source"]


def test_word_graph_stays_inside_one_language():
    forro = client.get("/v1/saotome/forro/lookup", params={"headword": "kume"}).json()["entries"][0]["graph"]
    angolar = client.get("/v1/saotome/angolar/lookup", params={"headword": "m'me"}).json()["entries"][0]["graph"]
    assert forro["belongs_to"]["language"] == "forro"
    assert angolar["belongs_to"]["language"] == "angolar"
    assert forro["belongs_to"]["dataset"] != angolar["belongs_to"]["dataset"]
    english = [item for item in forro["means"] if item["language"] == "en"]
    if english:
        assert english[0]["concept"]
    for edge in forro["related_to"] + forro["appears_in"]:
        assert edge.get("from") in {"entry", "knowledge"}
        if edge.get("from") == "knowledge":
            assert "/saotome/forro/" in (edge.get("path") or "")


def test_angolar_lookup_does_not_return_forro_kume():
    response = client.get("/v1/saotome/angolar/lookup", params={"headword": "kume"})
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"
    assert "Angolar" in response.json()["message"]


def test_angolar_eat_is_mme():
    response = client.get("/v1/saotome/angolar/lookup", params={"headword": "m'me"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["entries"][0]["language"] == "angolar"
    assert payload["entries"][0]["headword"] == "m'me"


def test_angola_contruy_is_not_angolar():
    meta = client.get("/v1/angola/contruy").json()
    assert meta["kind"] == "lexicon"
    assert meta["language"] == "angola-contruy"
    assert meta["language_name"] == "Angola Contruy"
    assert "canonical_dataset" not in meta
    response = client.get("/v1/angola/contruy/lookup", params={"headword": "n'golá"})
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"
    assert "Angola Contruy" in response.json()["message"]
    angolar = client.get("/v1/saotome/angolar/lookup", params={"headword": "n'golá"})
    assert angolar.status_code == 200
    assert angolar.json()["entries"][0]["language"] == "angolar"


def test_angola_index_is_not_a_merged_lexicon():
    response = client.get("/v1/angola/lookup", params={"headword": "n'golá"})
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"
    assert "language folder" in response.json()["message"]


def test_angola_bantu_languages_stay_isolated():
    umbundu = client.get("/v1/angola/umbundu").json()
    kimbundu = client.get("/v1/angola/kimbundu").json()
    kikongo = client.get("/v1/angola/kikongo").json()
    assert umbundu["language"] == "umbundu"
    assert umbundu["iso_639_3"] == "umb"
    assert kimbundu["language"] == "kimbundu"
    assert kimbundu["iso_639_3"] == "kmb"
    assert kikongo["language"] == "kikongo"
    assert kikongo["iso_639_3"] == "kng"
    missing = client.get("/v1/angola/umbundu/lookup", params={"headword": "n'golá"})
    assert missing.status_code == 404
    assert "Umbundu" in missing.json()["message"]
    kimbundu_miss = client.get("/v1/angola/kimbundu/lookup", params={"headword": "n'golá"})
    assert kimbundu_miss.status_code == 404
    assert "Kimbundu" in kimbundu_miss.json()["message"]
    kikongo_miss = client.get("/v1/angola/kikongo/lookup", params={"headword": "n'golá"})
    assert kikongo_miss.status_code == 404
    assert "Kikongo" in kikongo_miss.json()["message"]


def test_parent_index_is_not_a_merged_lexicon():
    response = client.get("/v1/caboverde/lookup", params={"headword": "Ago"})
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"
    assert "island folder" in response.json()["message"]


def test_santiago_lookup_stays_on_santiago():
    response = client.get("/v1/caboverde/santiago/lookup", params={"headword": "Ago"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["dataset"] == "caboverde/santiago"
    assert all(entry["language"] == "caboverde-santiago" for entry in payload["entries"])


def test_empty_island_returns_term_not_found():
    response = client.get("/v1/caboverde/sal/lookup", params={"headword": "Ago"})
    assert response.status_code == 404
    assert "Sal" in response.json()["message"]


def test_unknown_dataset():
    response = client.get("/v1/saotome/unknown/lookup", params={"headword": "kume"})
    assert response.status_code == 404
    assert response.json()["code"] == "DATASET_NOT_FOUND"


def test_saotome_index_is_not_a_merged_lexicon():
    response = client.get("/v1/saotome/lookup", params={"headword": "kume"})
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"


def test_search_stays_inside_one_dataset():
    response = client.get("/v1/saotome/forro/entries", params={"q": "kume", "limit": 20})
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1
    assert all(entry["language"] == "forro" for entry in payload["entries"])


def test_entry_id_lookup():
    listed = client.get("/v1/saotome/forro/lookup", params={"headword": "kume"}).json()
    entry_id = listed["entries"][0]["id"]
    response = client.get(f"/v1/saotome/forro/entries/{entry_id}")
    assert response.status_code == 200
    assert response.json()["entry"]["id"] == entry_id


def test_knowledge_base_map():
    payload = client.get("/v1").json()
    assert payload["version"] == "2.3.0"
    assert payload["knowledge_base"].endswith("/v1/kb")
    mapped = client.get("/v1/kb").json()
    ids = [item["id"] for item in mapped["collections"]]
    assert ids == list(KNOWLEDGE_BASE)


def test_languages_catalog_is_not_a_merged_lexicon():
    payload = client.get("/v1/languages").json()
    keys = {item["dataset"] for item in payload["languages"]}
    assert "saotome/forro" in keys
    assert "saotome/angolar" in keys
    assert "angola/contruy" in keys
    assert "angola/umbundu" in keys
    assert "angola/kimbundu" in keys
    assert "angola/kikongo" in keys
    assert "seychelles/seychellois" in keys
    assert "equatorialguinea/annobonese" in keys
    assert "equatorialguinea/pichi" in keys
    assert "nigeria/naija" in keys
    assert "rdcongo/kituba" in keys
    assert "angola" not in keys
    assert "saotome" not in keys
    assert "caboverde" not in keys
    assert "nigeria" not in keys
    assert "rdcongo" not in keys
    forro = next(item for item in payload["languages"] if item["dataset"] == "saotome/forro")
    assert forro["collections"]["proverbs"].endswith("/v1/saotome/forro/proverbs")
    assert set(forro["knowledge"]) == set(DOCUMENT_COLLECTIONS)


def test_knowledge_collections_stay_empty_until_sourced():
    for name in DOCUMENT_COLLECTIONS:
        response = client.get(f"/v1/saotome/forro/{name}")
        assert response.status_code == 200
        payload = response.json()
        assert payload["dataset"] == "saotome/forro"
        assert payload["collection"] == name
        assert payload["total"] == 0
        assert payload["items"] == []


def test_parent_index_has_no_merged_knowledge():
    response = client.get("/v1/saotome/proverbs")
    assert response.status_code == 404
    assert response.json()["code"] == "TERM_NOT_FOUND"


def test_angola_knowledge_is_not_angolar():
    payload = client.get("/v1/angola/contruy/proverbs").json()
    assert payload["dataset"] == "angola/contruy"
    assert payload["language"] == "angola-contruy"
    assert payload["total"] == 0
    missing = client.get("/v1/angola/contruy/proverbs/n-gola")
    assert missing.status_code == 404
    assert "Angola Contruy" in missing.json()["message"]
    parent = client.get("/v1/angola/proverbs")
    assert parent.status_code == 404
    assert parent.json()["code"] == "TERM_NOT_FOUND"


def test_new_country_folders_stay_empty_and_isolated():
    seychelles = client.get("/v1/seychelles").json()
    assert seychelles["kind"] == "index"
    assert seychelles["language"] == "seychelles"
    missing = client.get("/v1/seychelles/seychellois/lookup", params={"headword": "kume"})
    assert missing.status_code == 404
    assert missing.json()["code"] == "TERM_NOT_FOUND"
    assert "Seychellois" in missing.json()["message"]
    parent = client.get("/v1/seychelles/lookup", params={"headword": "kume"})
    assert parent.status_code == 404
    assert parent.json()["code"] == "TERM_NOT_FOUND"
    kituba = client.get("/v1/rdcongo/kituba").json()
    assert kituba["language"] == "kituba"
    assert kituba["kind"] == "lexicon"
    kikongo = client.get("/v1/angola/kikongo").json()
    assert kikongo["language"] == "kikongo"
    naija = client.get("/v1/nigeria/naija/lookup", params={"headword": "kume"})
    krio = client.get("/v1/sierraleone/krio/lookup", params={"headword": "kume"})
    assert naija.status_code == 404
    assert krio.status_code == 404
    assert naija.json()["message"] != krio.json()["message"]
    pichi = client.get("/v1/equatorialguinea/pichi").json()
    annobonese = client.get("/v1/equatorialguinea/annobonese").json()
    assert pichi["language"] == "pichi"
    assert annobonese["language"] == "annobonese"
    assert pichi["dataset"] != annobonese["dataset"]


def test_isolated_search_requires_a_dataset():
    response = client.get("/v1/search", params={"q": "kume"})
    assert response.status_code == 400
    assert response.json()["code"] == "DATASET_REQUIRED"
    found = client.get("/v1/search", params={"dataset": "saotome/forro", "q": "kume"})
    assert found.status_code == 200
    payload = found.json()
    assert payload["dataset"] == "saotome/forro"
    assert payload["total"] >= 1
    assert all(hit["collection"] != "entries" or hit["item"]["language"] == "forro" for hit in payload["results"])
    angolar = client.get("/v1/saotome/angolar/search", params={"q": "kume"})
    assert angolar.status_code == 200
    assert all(hit["item"].get("language") != "forro" for hit in angolar.json()["results"])


def test_sources_and_entries_indexes_do_not_merge_records():
    sources = client.get("/v1/sources").json()
    assert sources["collection"] == "sources"
    assert all("path" in item and item["path"].startswith("/v1/") for item in sources["datasets"])
    forro_sources = client.get("/v1/saotome/forro/sources").json()
    assert forro_sources["dataset"] == "saotome/forro"
    assert forro_sources["total"] >= 1
    assert all(item["language"] == "forro" for item in forro_sources["items"])
