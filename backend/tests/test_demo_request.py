"""Backend tests for Xenon Ophthalmics demo request API."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or "https://trusting-buck-13.preview.emergentagent.com"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_create_demo_request_persists(client):
    unique_email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "first_name": "TEST_Jane",
        "last_name": "Doe",
        "email": unique_email,
        "phone": "+1 555 0100",
        "organization": "TEST_Practice",
        "profession": "Optometrist",
        "practice_size": "2–4 providers",
        "preferred_date": "2026-02-01",
        "preferred_time": "Morning (8am–12pm)",
        "message": "TEST message",
    }
    r = client.post(f"{API}/demo-request", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["email"] == unique_email
    assert data["first_name"] == "TEST_Jane"
    assert data["profession"] == "Optometrist"
    assert "_id" not in data

    # Verify via GET
    r2 = client.get(f"{API}/demo-request")
    assert r2.status_code == 200
    lst = r2.json()
    assert isinstance(lst, list)
    emails = [x["email"] for x in lst]
    assert unique_email in emails
    match = next(x for x in lst if x["email"] == unique_email)
    assert match["id"] == data["id"]
    assert "_id" not in match


def test_create_demo_request_minimal(client):
    """Only first_name, last_name, email required by model."""
    unique_email = f"TEST_min_{uuid.uuid4().hex[:6]}@example.com"
    r = client.post(f"{API}/demo-request", json={
        "first_name": "TEST_A",
        "last_name": "B",
        "email": unique_email,
    })
    assert r.status_code == 200
    d = r.json()
    assert d["email"] == unique_email
    assert d["profession"] == ""


def test_create_demo_request_missing_fields(client):
    """Missing required field should return 422."""
    r = client.post(f"{API}/demo-request", json={"email": "x@y.com"})
    assert r.status_code == 422


def test_list_demo_requests_shape(client):
    r = client.get(f"{API}/demo-request")
    assert r.status_code == 200
    lst = r.json()
    assert isinstance(lst, list)
    if lst:
        item = lst[0]
        for k in ("id", "first_name", "last_name", "email", "created_at"):
            assert k in item
        assert "_id" not in item
