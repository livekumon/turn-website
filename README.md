# Pammi.app — marketing site

React (Vite) landing page for **Pammi.app**.

```bash
npm install
npm run dev
```

## DigitalOcean App Platform

Use a **Web Service** (Dockerfile detected automatically) or Node buildpack:

| Setting | Value |
|---------|--------|
| Build command | `npm install --include=dev && npm run build` |
| Run command | `npm start` |
| HTTP port | `8080` (or `$PORT`) |

Build-time env (no trailing slash):

```env
VITE_STAFF_APP_URL=https://your-staff.ondigitalocean.app
```

## Palette

| Token | Hex |
|-------|-----|
| Ink | `#10201D` |
| Paper | `#F6F1E6` |
| Teal | `#1F5C52` |
| Signal | `#FF5A1F` |
| Mist | `#B9C4BE` |
