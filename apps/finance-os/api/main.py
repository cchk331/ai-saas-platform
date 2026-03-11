"""Finance OS - FastAPI Backend

Rationale: Provides REST endpoints for cash balance, runway forecasting,
and month-end close status. Serves the Finance OS frontend on port 8000.

Endpoints:
  GET  /api/health          - Health check
  GET  /api/kpis             - Dashboard KPI data
  GET  /api/runway           - Cash runway forecast (6-month projection)
  GET  /api/close-checklist  - Month-end close task list
  POST /api/close-checklist  - Update task completion status

Steps to production:
  1. Replace mock data with PostgreSQL queries
  2. Add Plaid integration for live bank balances
  3. Add authentication middleware (JWT)
  4. Add Redis caching for frequently-read KPIs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Finance OS API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "finance-os"}

@app.get("/api/kpis")
def get_kpis():
    return [
        {"label": "Cash Balance", "value": "$284,500", "trend": "12.3%", "trend_up": True},
        {"label": "Monthly Burn", "value": "$42,100", "trend": "5.1%", "trend_up": False},
        {"label": "Runway", "value": "6.8 months", "trend": "0.4 mo", "trend_up": True},
        {"label": "Revenue (MRR)", "value": "$18,200", "trend": "23.5%", "trend_up": True},
    ]

@app.get("/api/runway")
def get_runway():
    return {
        "months": ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        "balance": [320000, 305000, 290000, 275000, 280000, 284500],
        "projected": [284500, 270000, 255000, 240000, 225000, 210000],
    }

@app.get("/api/close-checklist")
def get_checklist():
    return [
        {"task": "Reconcile bank statements", "done": True},
        {"task": "Review accounts payable", "done": True},
        {"task": "Verify revenue recognition", "done": False},
        {"task": "Submit tax estimates", "done": False},
        {"task": "Generate P&L report", "done": False},
    ]
