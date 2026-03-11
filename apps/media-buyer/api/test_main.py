"""Media Buyer API - Unit Tests

Rationale: Validates the Ad Automation API endpoints for campaign
management, alerts, and optimization triggers.

Steps:
    1. Test health endpoint returns 200
    2. Test campaigns endpoint returns campaign list
    3. Test alerts endpoint returns alert data
    4. Test optimize endpoint accepts POST
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
        assert "status" in data


class TestCampaignsEndpoint:
    def test_campaigns_returns_200(self):
        response = client.get("/api/campaigns")
        assert response.status_code == 200

    def test_campaigns_returns_list(self):
        response = client.get("/api/campaigns")
        data = response.json()
        assert isinstance(data, list)

    def test_campaigns_have_required_fields(self):
        response = client.get("/api/campaigns")
        data = response.json()
        assert len(data) > 0
        for campaign in data:
            assert "name" in campaign
            assert "platform" in campaign
            assert "status" in campaign


class TestAlertsEndpoint:
    def test_alerts_returns_200(self):
        response = client.get("/api/alerts")
        assert response.status_code == 200

    def test_alerts_returns_list(self):
        response = client.get("/api/alerts")
        data = response.json()
        assert isinstance(data, list)


class TestOptimizeEndpoint:
    def test_optimize_returns_200(self):
        response = client.post("/api/optimize")
        assert response.status_code == 200

    def test_optimize_returns_result(self):
        response = client.post("/api/optimize")
        data = response.json()
        assert "optimized" in data or "status" in data
