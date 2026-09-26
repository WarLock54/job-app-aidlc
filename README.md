# Job Application Site – AI-DLC Workshop

🔗 **Live site:** https://warlock54.github.io/job-app-aidlc/

A job application site where applicants can search, view, and apply to job postings. The project was built end to end, from intent to production, using the **AWS AI-DLC (AI-Driven Development Life Cycle)** methodology with an AI assistant (Claude Code).

## Tech Stack

| Area | Used |
|---|---|
| Application | React 18, Vite 5, React Router (HashRouter) |
| UI | Bootstrap 5 (CDN), Bootstrap Icons, custom theme (teal / dark gray / orange) |
| Data & Auth | Mock services (50+ sample jobs, localStorage-based session) |
| Testing | Vitest 3.2.7, React Testing Library, jsdom |
| CI/CD | GitHub Actions → GitHub Pages |
| Tooling | Git, GitHub CLI, Claude Code |

## AI-DLC Process

Every stage followed the same cycle: **the AI writes a plan → the plan is reviewed and decisions are added → approval → the AI executes it step by step and checks off each step.** All plans are in `aidlc-docs/plans/`, and all prompts are recorded in order in `aidlc-docs/prompts.md`.

| # | Stage | Plan | Output |
|---|---|---|---|
| 0 | Setup | – | `aidlc-docs/` folder structure |
| 1 | Inception – User Stories | `user_stories_plan.md` | `story-artifacts/user_stories.md` (2 personas, 4 stories, 11 acceptance criteria) |
| 2 | Inception – Units | `units_plan.md` | `design-artifacts/units.md` (Identity & Access, Job Catalog & Discovery, Application Management) |
| 3 | Construction – Component Model | `component_model_plan.md` | `design-artifacts/component_model.md` |
| 4 | Construction – Code Generation | `react_app_plan.md` | `job-app/` React application |
| 5 | Operations – Deployment | `github_deployment_plan.md` | `.github/workflows/deploy.yml`, GitHub Pages |
| 6 | QA – Acceptance Testing | `test_plan.md` | `design-artifacts/traceability_matrix.md`, `job-app/src/__tests__/` |

> **Deviation from the workshop:** The original workshop Step 5 deploys with AWS CDK (S3 + CloudFront). This project uses **GitHub Actions + GitHub Pages** instead, because it is free and provides CI/CD out of the box.

## Testing Process

### Goal
A successful build and an HTTP 200 response do not prove that features work correctly. So **one automated test was written for every acceptance criterion** in `user_stories.md`. The tests were written to match **the criterion text as written**, not the app's current behavior.

### Method
- Each test renders the real `App` component and interacts with it through the UI like a user (clicking, typing).
- Each criterion maps to one test, and each test maps to a component. This mapping is kept in `aidlc-docs/design-artifacts/traceability_matrix.md`.
- Tests are not included in the production bundle; the live site is unaffected.

### Result: 9 / 11 passed

| Story | Acceptance criterion | Result |
|---|---|---|
| 1. Job search & filtering | AC-1.1 Search by keyword | ✅ Pass (note: live filtering instead of submit) |
| | AC-1.2 Filter by category | ✅ Pass |
| | AC-1.3 Message when no results | ✅ Pass |
| 2. Job details | AC-2.1 Navigate to details page | ✅ Pass (note: the whole card is clickable) |
| | AC-2.2 Details content | ✅ Pass |
| 3. Apply | AC-3.1 Application form | ❌ Fail |
| | AC-3.2 Success message on form submission | ❌ Fail |
| | AC-3.3 Login prompt for guest users | ✅ Pass |
| 4. Authentication | AC-4.1 Login | ✅ Pass |
| | AC-4.2 Registration | ⚠️ Conditional pass |
| | AC-4.3 Logout | ✅ Pass |

### Known gaps (intentionally left as is)
- **AC-3.1 / AC-3.2:** There is no application form. A logged-in user who clicks "Apply Now" sees a success message immediately. The Application Component and Application Service designed in `component_model.md` were never implemented. The testing process exposed this gap between design and implementation.
- **AC-4.2:** There is no separate registration page. A single "Login / Register" form exists, and the mock auth accepts any email/password. This was a deliberate decision made in Step 4.
- **Accessibility:** Labels in the login form are not associated with their input fields.
- **CI test gate:** The `npm test` step has not been added to `deploy.yml` yet. With the two failing criteria, adding it would block every deployment.

A proposed fix (`applicationService.js` + `ApplicationForm.jsx`) is recorded in the traceability matrix and can be implemented later through a separate plan–approval cycle.

## Running Locally

```bash
cd job-app
npm ci
npm run build   # production build (dist/)
npm test        # acceptance criteria tests
```

## Deployment

Every push to the `main` branch is automatically built by GitHub Actions and published to GitHub Pages. Check the **Actions** tab in the repository for status.

## Project Structure

```
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── aidlc-docs/
│   ├── prompts.md                 # All prompts, in order
│   ├── plans/                     # Plan file for each stage
│   ├── requirements/
│   ├── story-artifacts/           # User stories
│   └── design-artifacts/          # Units, component model, traceability matrix
└── job-app/                       # React + Vite app and its tests
```
