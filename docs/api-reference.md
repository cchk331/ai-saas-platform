# API Reference

All three products expose FastAPI backends with automatic OpenAPI docs at `/docs`.

## Finance OS (Port 8000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check. Returns `{"status": "ok"}` |
| GET | `/api/kpis` | KPI cards: cash balance, burn rate, MRR, runway |
| GET | `/api/runway` | Runway forecast with monthly balance projections |
| GET | `/api/close-checklist` | Month-end close task list with completion status |

### Example: GET /api/kpis
```json
[
  {"label": "Cash Balance", "value": "$284,500", "trend": "12.3%"},
  {"label": "Monthly Burn", "value": "$42,100", "trend": "5.1%"}
]
```

## Analytics Copilot (Port 8001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/query` | Submit natural language question, get SQL + results |
| GET | `/api/schema` | Available tables and columns for governance |

### Example: POST /api/query
```json
// Request
{"question": "What were total sales last month?", "role": "analyst"}

// Response
{"sql": "SELECT SUM(amount)...", "results": [{"total": 142500}], "confidence": 0.94}
```

## Media Buyer (Port 8002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/campaigns` | All campaigns with spend, ROAS, CPA, platform |
| GET | `/api/alerts` | AI-generated optimization alerts |
| POST | `/api/optimize` | Trigger bid/budget optimization across campaigns |

### Example: GET /api/campaigns
```json
[
  {"name": "Summer Sale", "platform": "Meta", "status": "Active", "roas": 3.2, "cpa": 12.40}
]
```

## Authentication

All APIs currently use mock data. Production endpoints will require:
- Bearer token authentication via `Authorization` header
- Role-based access control (RBAC) per endpoint
- Rate limiting: 100 req/min per API key

## Error Handling

All APIs return standard HTTP status codes:
- `200` - Success
- `400` - Bad request (malformed input)
- `422` - Validation error (missing required fields)
- `500` - Internal server error
