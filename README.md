# Pammi.app — marketing site

Static landing page built from the HTML prototype (`public/index.html`).
Served by a small Node HTTP server for **DigitalOcean App Platform**.

```bash
npm run build
npm start
# → http://localhost:8080
```

## DigitalOcean App Platform

Use a **Web Service** (Dockerfile detected automatically). Existing App Platform
env vars are reused as Docker build args:

| Variable | Purpose |
|----------|---------|
| `VITE_TRY_NOW_URL` | Primary “Book a Demo” CTA URL |
| `VITE_STAFF_APP_URL` | Fallback → `{url}/register` if try-now unset |
| `VITE_GA_MEASUREMENT_ID` | GA4 Measurement ID (`G-…`) |
| `VITE_GA_PROPERTY_ID` | GA4 property id (reference) |

| Setting | Value |
|---------|--------|
| Build | Dockerfile (auto) |
| Run command | `npm start` / `node server.js` |
| HTTP port | `8080` (or `$PORT`) |

## Project layout

```
public/index.html   # Landing page (from pammi-landing-page.html)
scripts/build.js    # Copies public → dist + injects GA / CTA config
server.js           # Production static server
Dockerfile          # Multi-stage DO / container image
```
