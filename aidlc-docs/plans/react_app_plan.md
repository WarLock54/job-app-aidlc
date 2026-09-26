# Plan: React Code Generation

## Objective
Generate a simple, intuitive React Vite web application in a `job-app` folder covering Login and Job Listing components, utilizing a modern, non-blue color theme and mock authentication.

## Steps
- [ ] **Step 1: Application Scaffold & Tooling**
  - Define package.json and vite.config.js for a standard React Vite setup.
- [ ] **Step 2: Styling & Theming**
  - Integrate Bootstrap CDN in `index.html`.
  - Create `index.css` defining a creative professional theme (e.g., Teal/Purple/Dark Gray palette) and hover effects.
- [ ] **Step 3: Mock Services & Data**
  - Create `services/mockData.js` containing 50+ sample jobs (various titles, companies, locations, descriptions).
  - Create `services/authService.js` for local mock state persistence (localStorage).
- [ ] **Step 4: React Components Construction**
  - Build `App.jsx` with routing/state management.
  - Build `Auth.jsx` (Login/Registration view).
  - Build `JobBoard.jsx` (List, Search, Filter).
  - Build `JobDetails.jsx` (Job specifics, Apply button logic).
- [ ] **Step 5: Build Instructions**
  - Provide terminal commands to run `npm install` and `npm run build` strictly.

## Deliverables
- `job-app/` directory containing all React source code.
- Instructions for building the static assets.