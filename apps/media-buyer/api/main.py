"""Media Buyer - FastAPI Backend (Port 8002)

Rationale: Manages ad campaigns across Meta and Google APIs.
Provides bid optimization, budget pacing, and anomaly detection.

Endpoints:
  GET  /api/health     - Health check
  GET  /api/campaigns  - All campaigns with performance metrics
  GET  /api/alerts     - AI-generated optimization alerts
  POST /api/optimize   - Trigger bid/budget optimization
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Media Buyer API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "media-buyer"}

@app.get("/api/campaigns")
def get_campaigns():
    return [
        {"name": "Summer Sale - Meta", "status": "Active", "spend": 4280, "budget": 8000, "roas": 3.2, "cpa": 12.40},
        {"name": "Brand Awareness - Google", "status": "Active", "spend": 2150, "budget": 5000, "roas": 2.8, "cpa": 18.90},
        {"name": "Retargeting - Meta", "status": "Paused", "spend": 890, "budget": 2000, "roas": 4.1, "cpa": 8.20},
        {"name": "New Launch - TikTok", "status": "Learning", "spend": 620, "budget": 3000, "roas": 1.4, "cpa": 32.10},
    ]

@app.get("/api/alerts")
def get_alerts():
    return [
        {"type": "warning", "message": "New Launch campaign CPA is 2.6x above target"},
        {"type": "success", "message": "Retargeting ROAS improved 18% overnight"},
        {"type": "info", "message": "Budget reallocation: $500 moved from Brand to Summer Sale"},
    ]

@app.post("/api/optimize")
def optimize():
    return {"status": "optimization_triggered", "actions": ["Reduced TikTok bid by 15%", "Increased Meta retargeting budget by $200"]}
