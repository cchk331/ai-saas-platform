"""Finance OS API - Unit Tests

Rationale: Validates all API endpoints return correct status codes,
response structure, data types, and edge cases. Uses FastAPI TestClient
for synchronous testing without starting a server.

Steps:
    1. Test health endpoint returns 200 with status field
    2. Test KPI endpoint returns expected metric keys and data types
    3. Test runway endpoint returns monthly projections with correct lengths
    4. Test close-checklist GET returns task list with required fields
    5. Test invalid routes return 404
    6. Test response content-type is JSON
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

    def test_health_has_service_name(self):
        response = client.get("/api/health")
        data = response.json()
        assert data["service"] == "finance-os"

    def test_health_response_is_json(self):
        response = client.get("/api/health")
        assert response.headers["content-type"] == "application/json"


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

    def test_kpis_have_trend_fields(self):
        response = client.get("/api/kpis")
        data = response.json()
        for kpi in data:
            assert "trend" in kpi
            assert "trend_up" in kpi
            assert isinstance(kpi["trend_up"], bool)

    def test_kpis_contains_expected_metrics(self):
        response = client.get("/api/kpis")
        data = response.json()
        labels = [kpi["label"] for kpi in data]
        assert "Cash Balance" in labels
        assert "Monthly Burn" in labels
        assert "Runway" in labels


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

    def test_runway_arrays_same_length(self):
        response = client.get("/api/runway")
        data = response.json()
        assert len(data["months"]) == len(data["balance"])
        assert len(data["months"]) == len(data["projected"])

    def test_runway_balance_values_are_numeric(self):
        response = client.get("/api/runway")
        data = response.json()
        for val in data["balance"]:
            assert isinstance(val, (int, float))


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
            assert isinstance(item["done"], bool)
            assert isinstance(item["task"], str)

    def test_checklist_has_incomplete_tasks(self):
        response = client.get("/api/close-checklist")
        data = response.json()
        incomplete = [item for item in data if not item["done"]]
        assert len(incomplete) > 0


class TestInvalidRoutes:
    def test_unknown_route_returns_404(self):
        response = client.get("/api/nonexistent")
        assert response.status_code == 404

    def test_wrong_method_returns_405(self):
        response = client.post("/api/health")
        assert response.status_code == 405
