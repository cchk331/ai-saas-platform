"""Analytics Copilot API - Unit Tests

Rationale: Validates the Text-to-SQL API endpoints return correct
status codes and response structures.

Steps:
    1. Test health endpoint returns 200
    2. Test query endpoint accepts POST with question field
    3. Test schema endpoint returns table metadata
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


class TestQueryEndpoint:
    def test_query_returns_200(self):
        response = client.post("/api/query", json={
            "question": "What was total revenue last month?",
            "role": "analyst"
        })
        assert response.status_code == 200

    def test_query_returns_sql(self):
        response = client.post("/api/query", json={
            "question": "How many users signed up?",
            "role": "analyst"
        })
        data = response.json()
        assert "sql" in data
        assert "results" in data

    def test_query_requires_question(self):
        response = client.post("/api/query", json={"role": "analyst"})
        assert response.status_code == 422


class TestSchemaEndpoint:
    def test_schema_returns_200(self):
        response = client.get("/api/schema")
        assert response.status_code == 200

    def test_schema_returns_list(self):
        response = client.get("/api/schema")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
