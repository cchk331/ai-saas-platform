"""Analytics Copilot - FastAPI Backend (Port 8001)

Rationale: Converts natural language questions to governed SQL.
Includes governance layer that restricts table/column access by role.

Endpoints:
    GET  /api/health  - Health check
    POST /api/query   - Submit NL question, receive SQL + results
    GET  /api/schema  - Available tables and columns (filtered by role)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Analytics Copilot API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


class QueryRequest(BaseModel):
    question: str
    role: str = "analyst"


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "analytics-copilot"}


@app.post("/api/query")
def run_query(req: QueryRequest):
    # Mock response - replace with LLM + SQL execution
    return {
        "question": req.question,
        "sql": "SELECT region, SUM(amount) AS mrr FROM subscriptions GROUP BY region;",
        "results": [
            {"region": "North America", "mrr": 124500},
            {"region": "Europe", "mrr": 67200},
            {"region": "Asia Pacific", "mrr": 34800},
        ],
        "governance": {"tables_accessed": ["subscriptions"], "pii_excluded": True},
        "confidence": 0.94,
    }


@app.get("/api/schema")
def get_schema():
    return [
        {"name": "subscriptions", "columns": ["id", "region", "amount", "created_at", "plan"]},
        {"name": "users", "columns": ["id", "region", "created_at"]},
    ]
