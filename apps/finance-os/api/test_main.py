"""Finance OS API - Unit Tests

Rationale: Validates all API endpoints return correct status codes,
response structure, and data types. Uses FastAPI TestClient for
synchronous testing without starting a server.

Steps:
    1. Test health endpoint returns 200 with status field
    2. Test KPI endpoint returns expected metric keys
    3. Test runway endpoint returns monthly projections
    4. Test close-checklist GET returns task list
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthEndpoint:
    def test_health_returns_200(self):
        response = client.get("/api/health")
        assert response.status_code == 200

    def test_health_has_status_field(self):
        response = client.get("/api/health")
        data = response.json()
        assert "status" in data
        assert data["status"] == "ok"


class TestKPIEndpoint:
    def test_kpis_returns_200(self):
        response = client.get("/api/kpis")
        assert response.status_code == 200

    def test_kpis_returns_list(self):
        response = client.get("/api/kpis")
        data = response.json()
        assert isinstance(data, list)

    def test_kpis_have_required_fields(self):
        response = client.get("/api/kpis")
        data = response.json()
        assert len(data) > 0
        for kpi in data:
            assert "label" in kpi
            assert "value" in kpi


class TestRunwayEndpoint:
    def test_runway_returns_200(self):
        response = client.get("/api/runway")
        assert response.status_code == 200

    def test_runway_has_months(self):
        response = client.get("/api/runway")
        data = response.json()
        assert "months" in data
        assert isinstance(data["months"], list)

    def test_runway_has_balance(self):
        response = client.get("/api/runway")
        data = response.json()
        assert "balance" in data
        assert isinstance(data["balance"], list)

    def test_runway_has_projected(self):
        response = client.get("/api/runway")
        data = response.json()
        assert "projected" in data
        assert isinstance(data["projected"], list)


class TestCloseChecklistEndpoint:
    def test_checklist_returns_200(self):
        response = client.get("/api/close-checklist")
        assert response.status_code == 200

    def test_checklist_returns_list(self):
        response = client.get("/api/close-checklist")
        data = response.json()
        assert isinstance(data, list)

    def test_checklist_items_have_fields(self):
        response = client.get("/api/close-checklist")
        data = response.json()
        assert len(data) > 0
        for item in data:
            assert "task" in item
            assert "done" in item
