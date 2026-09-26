# Traceability Matrix

Maps each acceptance criterion (AC) in `../story-artifacts/user_stories.md` to an automated test in `job-app/src/__tests__/`, and records the result.

- **Tooling:** Vitest 3.2.7 (newest version compatible with Vite 5), jsdom, React Testing Library 16, user-event 14.
- **Method:** Each test renders the real `App` (HashRouter), drives it through the UI, and checks the AC text as written, not the current behavior.
- **Run:** `cd job-app && npm test`, run on 2026-09-26. Result: **9 PASS, 2 FAIL** (11 tests).

## Matrix

| Story | AC | Acceptance criterion (Given / When / Then) | Test case | Test file | Component | Result |
|---|---|---|---|---|---|---|
| 1. Job Search and Filtering | AC-1.1 | Given I am on the home page, When I enter a keyword in the search bar and submit, Then I see jobs matching that keyword. | TC-1.1 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS (note 1) |
| 1. Job Search and Filtering | AC-1.2 | Given I am viewing the job list, When I select a category filter, Then only jobs in that category are shown. | TC-1.2 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS |
| 1. Job Search and Filtering | AC-1.3 | Given a search yields no results, When the search completes, Then I see a friendly "no jobs found" message. | TC-1.3 | `story1_search.test.jsx` | `JobBoard` | ✅ PASS |
| 2. Viewing Job Details | AC-2.1 | Given I see a job listing, When I click the job title or a "View Details" button, Then I am navigated to a dedicated page for that job. | TC-2.1 | `story2_details.test.jsx` | `JobBoard`, `JobDetails` | ✅ PASS (note 2) |
| 2. Viewing Job Details | AC-2.2 | Given I am on the job details page, Then I see title, company, location, full description and an "Apply" button. | TC-2.2 | `story2_details.test.jsx` | `JobDetails` | ✅ PASS |
| 3. Applying for a Job | AC-3.1 | Given I am logged in and on a job details page, When I click "Apply", Then I see an application form. | TC-3.1 | `story3_apply.test.jsx` | `JobDetails` | ❌ FAIL |
| 3. Applying for a Job | AC-3.2 | Given I have filled out the application form, When I submit it, Then I see a success confirmation message. | TC-3.2 | `story3_apply.test.jsx` | `JobDetails` | ❌ FAIL |
| 3. Applying for a Job | AC-3.3 | Given I am a Guest User, When I click "Apply", Then I am prompted to log in or register first. | TC-3.3 | `story3_apply.test.jsx` | `JobDetails`, `Auth` | ✅ PASS |
| 4. User Authentication | AC-4.1 | Given I am on the login page, When I enter valid credentials, Then I am logged in and redirected to the home page or my previous page. | TC-4.1 | `story4_auth.test.jsx` | `Auth`, `App`, `authService` | ✅ PASS |
| 4. User Authentication | AC-4.2 | Given I am on the registration page, When I provide a valid email and password, Then my account is created and I am logged in. | TC-4.2 | `story4_auth.test.jsx` | `Auth`, `authService` | ⚠️ CONDITIONAL PASS (note 3) |
| 4. User Authentication | AC-4.3 | Given I am logged in, When I click "Logout", Then my session ends and I become a Guest User again. | TC-4.3 | `story4_auth.test.jsx` | `App`, `authService` | ✅ PASS |

## Notes
1. **AC-1.1:** There is no submit button; the list filters live while typing. Per the approved decision, live filtering counts as "submit". Search matches title and company only.
2. **AC-2.1:** There is no "View Details" button. The whole job card, including the title, is clickable, which satisfies the "click on the job title" option.
3. **AC-4.2:** Mock auth: every email/password is accepted and there is no real registration, only one combined "Login / Register" form (deliberate decision in Step 4, Code Generation). The test confirms the session is created and the user is logged in.

## Failure details
- **AC-3.1 / AC-3.2:** `JobDetails.jsx` has no application form. For a logged-in user, "Apply Now" sets `applied = true` and immediately shows "Application Submitted Successfully!". Both tests fail at `expect(document.querySelector('form')).not.toBeNull()`. The `Application Component` and `Application Service` from `component_model.md` (1.5, 2.3) were never implemented.

## Other observations (not AC failures)
- The email/password `<label>`s in `Auth.jsx` are not linked to their inputs (no `htmlFor`/`id`), so tests query the inputs by type. This is an accessibility gap.
- React Router v6 prints future-flag warnings (`v7_startTransition`, `v7_relativeSplatPath`) during tests. They are harmless.

## Proposed CI test gate (NOT applied)
Adding a test step to the `build` job in `.github/workflows/deploy.yml` makes `build` fail when a test fails. `deploy` (`needs: build`) is then skipped:

```diff
       - run: npm ci

+      - run: npm test
+
       - run: npm run build
```

⚠️ While AC-3.1/3.2 fail, applying this gate as is blocks every deployment. It should be applied after the fix below, or together with it.

## Proposed fix plan for failing criteria (NOT applied)
To be written as a separate plan file after approval:

1. **Application Service** (`src/services/applicationService.js`): `submitApplication(jobId, applicant, data)` stores the application in `localStorage` and returns a confirmation (component model 2.3).
2. **Application Component** (`src/components/ApplicationForm.jsx`): form with the applicant email (from session, read-only), a required cover letter `<textarea>` and a "Submit Application" button. On submit it calls the service and reports success (component model 1.5).
3. **`JobDetails.jsx`:** for a logged-in user, "Apply Now" shows the form instead of the success message. The success alert is shown only after the form is submitted. Guest behavior (AC-3.3) stays unchanged.
4. **Verify:** TC-3.1 and TC-3.2 turn green, the other 9 tests stay green, and `npm run build` passes. Then apply the CI gate above.
5. **Optional (AC-4.2 → full PASS):** add a Login/Register mode toggle (component model 1.2 `toggleMode()`) and store registered users in `localStorage`. This needs a separate decision because mock auth was a deliberate choice.
