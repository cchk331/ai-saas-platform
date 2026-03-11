"""Analytics Copilot API - Unit Tests

Rationale: Validates the Text-to-SQL API endpoints return correct
status codes, response structures, governance metadata, and input
validation. Ensures the query endpoint enforces required fields.

Steps:
    1. Test health endpoint returns 200 with service identifier
    2. Test query endpoint accepts POST with question field
    3. Test query endpoint returns SQL and governance metadata
    4. Test query endpoint rejects missing required fields (422)
    5. Test schema endpoint returns table metadata as list
    6. Test schema tables have name and columns fields
    7. Test invalid routes and methods
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
        assert data["status"] == "ok"

    def test_health_has_service_name(self):
        response = client.get("/api/health")
        data = response.json()
        assert data["service"] == "analytics-copilot"


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

    def test_query_returns_governance_metadata(self):
        response = client.post("/api/query", json={
            "question": "Show me revenue by region",
            "role": "analyst"
        })
        data = response.json()
        assert "governance" in data
        assert "pii_excluded" in data["governance"]
        assert data["governance"]["pii_excluded"] is True

    def test_query_returns_confidence_score(self):
        response = client.post("/api/query", json={
            "question": "What is MRR?",
            "role": "analyst"
        })
        data = response.json()
        assert "confidence" in data
        assert isinstance(data["confidence"], float)
        assert 0 <= data["confidence"] <= 1

    def test_query_echoes_question(self):
        question = "Show me churn rate"
        response = client.post("/api/query", json={
            "question": question,
            "role": "analyst"
        })
        data = response.json()
        assert data["question"] == question

    def test_query_requires_question(self):
        response = client.post("/api/query", json={"role": "analyst"})
        assert response.status_code == 422

    def test_query_with_default_role(self):
        response = client.post("/api/query", json={
            "question": "What is revenue?"
        })
        assert response.status_code == 200

    def test_query_get_method_not_allowed(self):
        response = client.get("/api/query")
        assert response.status_code == 405


class TestSchemaEndpoint:
    def test_schema_returns_200(self):
        response = client.get("/api/schema")
        assert response.status_code == 200

    def test_schema_returns_list(self):
        response = client.get("/api/schema")
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

    def test_schema_tables_have_name_and_columns(self):
        response = client.get("/api/schema")
        data = response.json()
        for table in data:
            assert "name" in table
            assert "columns" in table
            assert isinstance(table["name"], str)
            assert isinstance(table["columns"], list)
            assert len(table["columns"]) > 0

    def test_schema_contains_expected_tables(self):
        response = client.get("/api/schema")
        data = response.json()
        table_names = [t["name"] for t in data]
        assert "subscriptions" in table_names
        assert "users" in table_names


class TestInvalidRoutes:
    def test_unknown_route_returns_404(self):
        response = client.get("/api/nonexistent")
        assert response.status_code == 404

    def test_post_to_health_returns_405(self):
        response = client.post("/api/health")
        assert response.status_code == 405
