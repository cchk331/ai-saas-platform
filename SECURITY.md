# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main | Yes |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.** Instead:

1. Email security concerns to the repository owner via GitHub
2. Include a description of the vulnerability and steps to reproduce
3. Allow 48 hours for an initial response

## Security Practices

### Code
- CodeQL scans run on every push to `main` and every pull request
- Dependencies are pinned to specific versions in `requirements.txt`
- No secrets are stored in source code (see `.env.example`)

### API
- CORS is configured per-product (not `*` in production)
- Input validation via Pydantic models on all POST endpoints
- Rate limiting planned for production deployment

### Infrastructure
- GitHub Codespaces provide isolated development environments
- Docker containers isolate services in development
- PostgreSQL connections use least-privilege roles

### Data
- No PII is stored in the demo/mock layer
- Production will enforce encryption at rest (PostgreSQL) and in transit (TLS)
- API keys and tokens stored only in environment variables, never committed
