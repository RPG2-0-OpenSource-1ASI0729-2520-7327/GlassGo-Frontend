# GlassGo-Frontend
This repository contains the **Frontend Open Source Application Development** of **GlassGo**, developed by **RPG Startup** as part of the course *1ASI0729 – Open Source Application Development* at UPC.

---

## 🧱 Stack
- **i18n** for internationalization (EN default, ES available)
- **Chart.js** for dashb oard analytics

---

## ⚙️ Project Structure
```
src/
 ├─ app/
 │  ├─ main.ts
 │  ├─ router/
 │  ├─ stores/
 │  └─ components/
 ├─ features/
 │  ├─ identity-access/
 │  ├─ profiles-preferences/
 │  ├─ payments-subscriptions/
 │  ├─ service-planning/
 │  ├─ service-execution-monitoring/
 │  ├─ dashboard-analytics/
 │  ├─ loyalty-engagement/
 │  └─ system-administration/
 ├─ assets/
 └─ public/
```

---

## 🚀 Run Locally
```bash
npm install
npm start
```

Example `.env`:
```
VITE_API_BASE_URL=http://localhost:3000
```
---

## Run Fake API (json-server)
```bash
cd server
npx json-server --watch db.json --port 3000
```

---

## 🌿 Branching Model
We use **GitFlow**:
- `main` → stable production-ready releases
- `develop` → integration branch
- `feature/*` → per bounded context or UI module
- `release/*` → pre-release branches
- `hotfix/*` → emergency fixes

---

## 🧩 Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
- `feat:` → new feature or component
- `fix:` → bug fix
- `style:` → visual or CSS adjustment
- `refactor:` → code refactor
- `chore:` → config or dependency updates
- `docs:` → README or inline documentation

**Examples**
```
feat: add login component to identity-access
fix: correct form validation on payment module
style: adjust dashboard cards layout and update primary color
refactor: move user session logic from router guard to auth service
chore: update config and dependencies
docs: add setup instructions and env examples in README
```

---

## 🧪 Testing & Linting
```bash
npm run lint
npm run test
```

---

## 🌍 Deployment
- Dev environment: `localhost:5173`
- Production: via GitHub Pages / Vercel / Netlify (depending on TF1 delivery)

---

## 👥 Authors
Team **RPG Startup**
- Jarod Jack Cespedes Pillco - u202318588
- Guillermo Arturo Howard Robles – u202222275
- David Ignacio Vivar Cesar – u202414424
- Mike Dylan Guillen Giraldo – u202211881
