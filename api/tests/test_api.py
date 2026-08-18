from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_public_api_is_api_forrovivo_com():
    payload = client.get("/v1").json()
    assert payload["platform"] == "ForroVivo"
    assert payload["initiative"] == "Linguistic Research"
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
    assert "angola" in keys
    angola = next(item for item in payload["datasets"] if item["dataset"] == "angola")
    assert angola["kind"] == "alias"
    assert angola["canonical_dataset"] == "saotome/angolar"


def test_forro_lookup_kume_from_real_data():
    response = client.get("/v1/saotome/forro/lookup", params={"headword": "kume"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["dataset"] == "saotome/forro"
    assert payload["count"] >= 1
    assert all(entry["language"] == "forro" for entry in payload["entries"])
    assert all(entry["headword"] == "kume" for entry in payload["entries"])
    assert payload["entries"][0]["translation_pt"]


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


def test_angola_alias_serves_angolar_without_a_second_lexicon():
    meta = client.get("/v1/angola").json()
    assert meta["kind"] == "alias"
    assert meta["canonical_dataset"] == "saotome/angolar"
    response = client.get("/v1/angola/lookup", params={"headword": "n'golá"})
    assert response.status_code == 200
    assert response.json()["canonical_dataset"] == "saotome/angolar"
    assert response.json()["entries"][0]["language"] == "angolar"


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
