# Mock Personal Information API

A dependency-free Node.js API that returns 20 **synthetic, fictional** personal-information records. It is designed for API/tool integration tests, not for real people or production identity data.

## Requirements
- Node.js 18 or newer
- No npm dependencies required

## Run locally
```bash
npm start
```
The API listens on `http://localhost:3000`.

## Endpoints
- `GET /` — API info and endpoint list
- `GET /health` — health check
- `GET /api/people` — all 20 mock records
- `GET /api/people?limit=5` — first 5 records
- `GET /api/people?city=Austin` — filter by city
- `GET /api/people?search=engineer` — search names, email, role, company, or city
- `GET /api/people/1` — fetch one record by ID
- Unknown IDs return HTTP 404

Every response includes `mockData: true` or an equivalent marker. All emails use `example.com`; phone numbers use fictional 555-01xx examples. Do not replace mock records with real personal data.

## cURL examples
Run these in a second terminal while the server is running:
```bash
curl -i http://localhost:3000/health
curl -s http://localhost:3000/api/people
curl -s 'http://localhost:3000/api/people?limit=5'
curl -s 'http://localhost:3000/api/people?city=Austin'
curl -s 'http://localhost:3000/api/people?search=engineer'
curl -s http://localhost:3000/api/people/3
curl -i http://localhost:3000/api/people/999
```

## Test with a hosted API
After deploying, replace `https://YOUR-API-HOST` with your service URL:
```bash
curl -i https://YOUR-API-HOST/health
curl -s https://YOUR-API-HOST/api/people
curl -s 'https://YOUR-API-HOST/api/people?limit=5'
curl -s https://YOUR-API-HOST/api/people/1
```

## Docker
Build and run:
```bash
docker build -t mock-personal-info-api .
docker run --rm -p 3000:3000 mock-personal-info-api
```

## Deploy to Render
1. Push this folder to a Git repository.
2. In Render, create a **Web Service** from that repository.
3. Select Docker as the runtime.
4. Deploy. The app uses Render's `PORT` environment variable.
5. Test `https://YOUR-API-HOST/health` and `/api/people`.

This API is read-only and requires no API key. Do not expose real or sensitive personal information. If you later add write endpoints or real data, add authentication, authorization, validation, and rate limiting first.
"# test-docker" 
