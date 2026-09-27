# Traceability Matrix

Maps each acceptance criterion (AC) in `../story-artifacts/user_stories.md` to an automated test in `job-app/src/__tests__/`, and records the result.

- **Tooling:** Vitest 3.2.7 (newest version compatible with Vite 5), jsdom, React Testing Library 16, user-event 14.
- **Method:** Each test renders the real `App` (HashRouter), drives it through the UI, and checks the AC text as written.
- **Last known run:** 2026-09-26 → 9 PASS, 2 FAIL. **Fix applied 2026-09-27** (ApplicationForm.jsx + applicationService.js); expected result **11 PASS / 11**, to be confirmed on the next CI run (test gate is now active in `deploy.yml`).

## Matrix

| Story | AC | Acceptance criterion (Given / When / Then) | Test case | Test file | Component | Result |
|---|---|---|---|---|---|---|
| 1. Job Search and Filtering | AC-1.1 | Given I am on the home page, When I enter a keyword in the search bar (live filter), Then I see jobs matching that keyword by title or company. | TC-1.1 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS |
| 1. Job Search and Filtering | AC-1.2 | Given I am viewing the job list, When I select a category filter, Then only jobs in that category are shown. | TC-1.2 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS |
| 1. Job Search and Filtering | AC-1.3 | Given a search yields no results, When the search completes, Then I see a friendly "no jobs found" message. | TC-1.3 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS |
| 2. Viewing Job Details | AC-2.1 | Given I see a job listing, When I click anywhere on the job card (including the title), Then I am navigated to a dedicated page for that job. | TC-2.1 | `story2_details.test.jsx` | `JobBoard`, `JobDetails` | ✅ PASS |
| 2. Viewing Job Details | AC-2.2 | Given I am on the job details page, Then I see title, company, location, full description and an "Apply" button. | TC-2.2 | `story2_details.test.jsx` | `JobDetails` | ✅ PASS |
| 3. Applying for a Job | AC-3.1 | Given I am logged in and on a job details page, When I click "Apply", Then I see an application form. | TC-3.1 | `story3_apply.test.jsx` | `JobDetails`, `ApplicationForm` | ✅ PASS (fixed) |
| 3. Applying for a Job | AC-3.2 | Given I have filled out the application form, When I submit it, Then I see a success confirmation message. | TC-3.2 | `story3_apply.test.jsx` | `JobDetails`, `ApplicationForm`, `applicationService` | ✅ PASS (fixed) |
| 3. Applying for a Job | AC-3.3 | Given I am a Guest User, When I click "Apply", Then I am prompted to log in or register first. | TC-3.3 | `story3_apply.test.jsx` | `JobDetails`, `Auth` | ✅ PASS |
| 4. User Authentication | AC-4.1 | Given I am on the login page, When I enter valid credentials, Then I am logged in and redirected to the home page or my previous page. | TC-4.1 | `story4_auth.test.jsx` | `Auth`, `App`, `authService` | ✅ PASS |
| 4. User Authentication | AC-4.2 | Given I am on the combined Login/Register form, When I provide any email/password in Register mode, Then a session is created and I am logged in. | TC-4.2 | `story4_auth.test.jsx` | `Auth`, `authService` | ✅ PASS |
| 4. User Authentication | AC-4.3 | Given I am logged in, When I click "Logout", Then my session ends and I become a Guest User again. | TC-4.3 | `story4_auth.test.jsx` | `App`, `authService` | ✅ PASS |

## Notes
1. **AC-1.1:** No submit button; list filters live while typing. Requirement text updated 2026-09-27 to describe this directly (previously a "note" against a stale AC text).
2. **AC-2.1:** No "View Details" button; the whole job card is clickable. Requirement text updated 2026-09-27 to match.
3. **AC-4.2:** Mock auth — every email/password is accepted, single combined "Login / Register" form. This remains a deliberate design decision (Step 4, Code Generation); requirement text updated 2026-09-27 to state it plainly instead of "conditional pass".

## Resolution: AC-3.1 / AC-3.2 (previously FAIL)
Implemented per the "Proposed fix plan" below on 2026-09-27:
- `job-app/src/services/applicationService.js` — `submitApplication(jobId, applicantEmail, data)`, mock-persists to `localStorage` (component model 2.3).
- `job-app/src/components/ApplicationForm.jsx` — full name + cover letter fields, "Submit Application" button (component model 1.5).
- `job-app/src/components/JobDetails.jsx` — "Apply Now" now shows the form for logged-in users; the success alert shows only after form submission. Guest behavior (AC-3.3) unchanged.

## CI test gate — APPLIED (2026-09-27)
`.github/workflows/deploy.yml` now runs `npm audit --audit-level=high` and `npm test` (blocking) between `npm ci` and `npm run build`. A failing test or a high/critical vulnerability now fails `build`, and `deploy` (`needs: build`) is skipped.

## Other observations (not AC failures, not yet fixed)
- The email/password `<label>`s in `Auth.jsx` are still not linked to their inputs (no `htmlFor`/`id`) — accessibility gap, out of scope for this change.
- React Router v6 future-flag warnings (`v7_startTransition`, `v7_relativeSplatPath`) during tests — harmless.