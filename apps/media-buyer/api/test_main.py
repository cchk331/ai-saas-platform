"""Media Buyer API - Unit Tests

Rationale: Validates the Ad Automation API endpoints for campaign
management, alerts, and optimization triggers. Tests cover response
structure, data types, field validation, and error handling.

Steps:
    1. Test health endpoint returns 200 with service identifier
    2. Test campaigns endpoint returns list with required fields
    3. Test campaigns have valid platform and numeric metrics
    4. Test alerts endpoint returns typed alert objects
    5. Test optimize endpoint accepts POST and returns actions
    6. Test invalid routes and methods
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthEndpoint:
    def test_health_returns_200(self):
        response = client.get("/api/health")
        assert response.status_code == 200

    def test_health_has_status(self):
        response = client.get("/api/health")
        data = response.json()
        assert data["status"] == "ok"

    def test_health_has_service_name(self):
        response = client.get("/api/health")
        data = response.json()
        assert data["service"] == "media-buyer"


class TestCampaignsEndpoint:
    def test_campaigns_returns_200(self):
        response = client.get("/api/campaigns")
        assert response.status_code == 200

    def test_campaigns_returns_list(self):
        response = client.get("/api/campaigns")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_campaigns_have_required_fields(self):
        response = client.get("/api/campaigns")
        data = response.json()
        required = ["name", "platform", "status", "spend", "budget", "roas", "cpa"]
        for campaign in data:
            for field in required:
                assert field in campaign, f"Missing field: {field}"

    def test_campaigns_have_valid_platforms(self):
        response = client.get("/api/campaigns")
        data = response.json()
        valid_platforms = {"Meta", "Google", "TikTok"}
        for campaign in data:
            assert campaign["platform"] in valid_platforms

    def test_campaigns_spend_within_budget(self):
        response = client.get("/api/campaigns")
        data = response.json()
        for campaign in data:
            assert campaign["spend"] <= campaign["budget"]

    def test_campaigns_metrics_are_numeric(self):
        response = client.get("/api/campaigns")
        data = response.json()
        for campaign in data:
            assert isinstance(campaign["spend"], (int, float))
            assert isinstance(campaign["roas"], (int, float))
            assert isinstance(campaign["cpa"], (int, float))


class TestAlertsEndpoint:
    def test_alerts_returns_200(self):
        response = client.get("/api/alerts")
        assert response.status_code == 200

    def test_alerts_returns_list(self):
        response = client.get("/api/alerts")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_alerts_have_type_and_message(self):
        response = client.get("/api/alerts")
        data = response.json()
        for alert in data:
            assert "type" in alert
            assert "message" in alert
            assert isinstance(alert["message"], str)

    def test_alerts_have_valid_types(self):
        response = client.get("/api/alerts")
        data = response.json()
        valid_types = {"warning", "success", "info", "error"}
        for alert in data:
            assert alert["type"] in valid_types


class TestOptimizeEndpoint:
    def test_optimize_returns_200(self):
        response = client.post("/api/optimize")
        assert response.status_code == 200

    def test_optimize_returns_status(self):
        response = client.post("/api/optimize")
        data = response.json()
        assert "status" in data
        assert data["status"] == "optimization_triggered"

    def test_optimize_returns_actions_list(self):
        response = client.post("/api/optimize")
        data = response.json()
        assert "actions" in data
        assert isinstance(data["actions"], list)
        assert len(data["actions"]) > 0

    def test_optimize_get_method_not_allowed(self):
        response = client.get("/api/optimize")
        assert response.status_code == 405


class TestInvalidRoutes:
    def test_unknown_route_returns_404(self):
        response = client.get("/api/nonexistent")
        assert response.status_code == 404

    def test_post_to_health_returns_405(self):
        response = client.post("/api/health")
        assert response.status_code == 405
