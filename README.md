# GlassGo-Frontend
This repository contains the **Frontend Open Source Application Development** of **GlassGo**, developed by **RPG Startup** as part of the course *1ASI0729 – Open Source Application Development* at UPC.

---

## 🚀 Stack
- **Angular 17** with standalone components and signals
- **Leaflet** for interactive maps and route visualization  
- **i18n** for internationalization (EN default, ES available)
- **Chart.js** for dashboard analytics
- **JSON Server** for development API simulation

---

## 🏗️ Project Structure (Domain-Driven Design)
```
src/app/
 ├─ shared/                    # Common utilities and components
 ├─ analytics/                 # Dashboard & Analytics BC
 ├─ planning/                  # Service Planning BC  
 └─ Execution/                 # Service Execution BC
    ├─ domain/
    │  └─ model/
    │     ├─ tracking-info.ts      # Core tracking entity
    │     └─ coordinate.ts         # Geographic data models
    ├─ infrastructure/
    │  ├─ tracking-api.ts          # API communication
    │  └─ tracking-assembler.ts    # Data transformation
    ├─ application/
    │  └─ tracking.store.ts        # State management with signals
    └─ presentation/
       ├─ components/
       │  └─ tracking-map/         # Interactive Leaflet map
       └─ views/
          └─ tracking/             # Main tracking interface
```

---

## 🗺️ **NEW: Interactive Tracking Maps**

### Features
✅ **Real-time route visualization** with Leaflet maps  
✅ **Custom markers** for origin, checkpoints, and destination  
✅ **Route polylines** showing vehicle path  
✅ **Animated current location** marker with pulse effect  
✅ **Interactive popups** with timestamp and location details  
✅ **Responsive design** for mobile and desktop

### Tracking Interface
- **Search by tracking number**: Enter any tracking ID to find shipments
- **Live tracking list**: View all shipments currently in transit  
- **Map visualization**: Interactive map showing complete route and current position
- **Detailed information**: Driver, vehicle, ETA, and route distance

### Sample Tracking Numbers
- `6091228592056` → Miraflores (16 km)
- `6091222839502` → Arequipa (1020 km)  
- `6091228512345` → Chiclayo (770 km)
- `6091223452986` → San Borja (8 km)

---

## 🚀 Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Fake API (json-server)
```bash
cd server
npx json-server --watch db.json --port 3000
```

### 3. Start Development Server
```bash
npm start
```

### 4. Access the Application
- **Main app**: `http://localhost:4200`
- **Tracking page**: `http://localhost:4200/tracking`
- **API endpoints**: `http://localhost:3000`

---

## 🎯 Key Features

### 📍 **Tracking System**
- Real-time vehicle location tracking
- Interactive route maps with Leaflet
- Multiple tracking statuses (Pending, In Transit, Delivered, Delayed, Cancelled)
- Search functionality by tracking number
- Detailed shipment information display

### 📊 **Analytics Dashboard** 
- Performance metrics and KPIs
- Chart.js visualizations
- Real-time data updates

### 📦 **Order Planning**
- Create and manage delivery orders
- Product catalog management
- Delivery information tracking

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
feat: add interactive tracking map with Leaflet integration
fix: correct route visualization on tracking component
style: improve tracking card layout and mobile responsiveness  
refactor: move tracking logic to domain layer following DDD
chore: add leaflet dependencies and map assets
docs: update README with tracking features and setup instructions
```

---

## 🌐 Branching Model
We use **GitFlow**:
- `main` → stable production-ready releases
- `develop` → integration branch  
- `feature/*` → per bounded context or UI module
- `release/*` → pre-release branches
- `hotfix/*` → emergency fixes

---

## 🧪 Testing & Linting
```bash
npm run lint
npm run test
npm run build
```

---

## 🚀 Deployment
- **Development**: `localhost:4200`
- **API Server**: `localhost:3000` 
- **Production**: GitHub Pages / Vercel / Netlify

---

## 📚 Architecture Notes

### Domain-Driven Design (DDD)
- **Bounded Contexts**: Analytics, Planning, Execution
- **Domain Entities**: Rich models with business logic
- **Infrastructure Layer**: API communication and data transformation
- **Application Layer**: State management with Angular Signals
- **Presentation Layer**: Standalone Angular components

### State Management
- **Angular Signals** for reactive state
- **Computed values** for derived data
- **Store pattern** for complex state logic

### Map Integration
- **Leaflet** for interactive maps
- **Custom markers** and route visualization
- **Responsive design** for all devices
- **Real-time updates** capability

---

## 👥 Authors
Team **RPG Startup**
- Jarod Jack Cespedes Pillco - u202318588
- Guillermo Arturo Howard Robles – u202222275  
- David Ignacio Vivar Cesar – u202414424
- Mike Dylan Guillen Giraldo – u202211881
