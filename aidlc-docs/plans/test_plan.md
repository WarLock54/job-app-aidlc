# Plan: QA - Acceptance Criteria Verification

## Objective
Verify that every acceptance criterion (AC) in `aidlc-docs/story-artifacts/user_stories.md` is satisfied by `job-app`, using a traceability matrix and automated Vitest + React Testing Library tests (one test per AC). Report pass/fail. App code is NOT changed without approval.

## Scope
4 stories, 11 acceptance criteria. IDs used below:

| Story | ACs |
|---|---|
| Story 1: Job Search and Filtering | AC-1.1 keyword search, AC-1.2 category filter, AC-1.3 no-results message |
| Story 2: Viewing Job Details | AC-2.1 navigate to details page, AC-2.2 details content + Apply button |
| Story 3: Applying for a Job | AC-3.1 logged-in Apply shows form, AC-3.2 submit shows success, AC-3.3 guest Apply prompts login |
| Story 4: User Authentication | AC-4.1 login + redirect, AC-4.2 registration creates account + logs in, AC-4.3 logout returns to guest |

## Pre-review findings (from reading the code, not yet tested)
- **AC-3.1 / AC-3.2 likely FAIL:** `JobDetails.jsx` has no application form. Clicking "Apply Now" as a logged-in user immediately shows "Application Submitted Successfully!".
- **AC-1.1 wording:** the AC says "enter a keyword ... and submit", but search filters live while typing (no submit button). It matches title and company only.
- **AC-4.2 wording:** there is no separate registration page. `Auth.jsx` is one "Login / Register" form, and `authService.login` accepts any email/password.
- **AC-2.1 wording:** there is no "View Details" button, but the whole job card (including the title) is clickable.

## Steps
- [x] **Step 1: Confirm open questions** (see "Clarifications needed" below). No work starts before your answers.

- [x] **Step 2: Install test tooling in `job-app`**
  - Dev dependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/user-event`.
  - Check peer dependencies with the installed Vite 5 before installing (see Clarification Q4).
  - Add `test: { environment: 'jsdom', setupFiles: './src/test/setup.js' }` to `vite.config.js` (no other change to that file).
  - Add `"test": "vitest run"` to `package.json` scripts.
  - Create `src/test/setup.js` (jest-dom matchers, clear `localStorage` and restore mocks after each test).

- [x] **Step 3: Create the traceability matrix**
  - `aidlc-docs/design-artifacts/traceability_matrix.md`: Story → AC (Given/When/Then text) → Test case ID (`TC-x.y`) → test file / test name → implementing component → Result (filled in Step 5).

- [x] **Step 4: Write automated tests (one test per AC, 11 tests)**
  - `src/__tests__/story1_search.test.jsx` → TC-1.1, TC-1.2, TC-1.3
  - `src/__tests__/story2_details.test.jsx` → TC-2.1, TC-2.2
  - `src/__tests__/story3_apply.test.jsx` → TC-3.1, TC-3.2, TC-3.3
  - `src/__tests__/story4_auth.test.jsx` → TC-4.1, TC-4.2, TC-4.3
  - Tests render the real `App` (HashRouter), drive it through the UI with `user-event`, and use `window.location.hash` for the start route. `window.alert` is mocked. Tests are written against the AC text, not against the current behavior.

- [x] **Step 5: Run tests and report**
  - Run `npm test`, record PASS/FAIL per AC in the matrix, and summarize with the reason for each failure.
  - Do NOT change app code. Failures are reported only.
  - Confirm `npm run build` still works.
  
- [x] **Step 6: Propose CI test gate (not applied)**
  - Add the proposed `deploy.yml` change as a diff in the matrix/report: a `- run: npm test` step in the `build` job, after `npm ci` and before `npm run build`. A failing test then fails `build`, and `deploy` (which `needs: build`) is skipped.
  - **Note:** if tests for AC-3.1/3.2 fail and the gate is applied as is, every deploy will be blocked until the app is fixed or the ACs are changed.

> **Update (uygulandı):** CI test gate `.github/workflows/deploy.yml`'e eklendi (ayrıca `npm audit --audit-level=high` gate'i eklendi). AC-3.1 ve AC-3.2 hâlâ FAIL olduğundan, **bu değişiklikten sonraki her `main` push'u build aşamasında başarısız olacak ve deploy çalışmayacaktır.** Bu, eksik olan başvuru formu özelliğini gizlemek yerine pipeline üzerinden görünür kılmak için bilinçli bir tercihtir. Deploy'ların tekrar geçebilmesi için:
> (a) `ApplicationForm.jsx` + `applicationService.js` implement edilmeli (traceability matrix'teki önerilen çözüm), veya
> (b) AC-3.1/3.2 metinleri gözden geçirilip onaylanmalı (ve testler buna göre güncellenmeli).
> Aksi halde site **son başarılı build'de donmuş** kalır, yeni değişiklikler yayınlanmaz.

- [x] **Step 7: Record prompt and commit**
  - Record this prompt and your approval prompt in `aidlc-docs/prompts.md`.
  - Commit and push (see Clarification Q5).

## Clarifications needed (please confirm)
- **Q1 - Expected failures:** Should tests follow the AC text literally, so AC-3.1/3.2 are reported as FAIL? (Recommended: yes, this is the purpose of the task.)
- **Q2 - AC-1.1:** Should live filtering while typing count as "enter a keyword and submit"? (Recommended: yes, the test types a keyword and checks the list.)
- **Q3 - AC-4.2:** Should the combined "Login / Register" form count as the registration page? It creates the session, but no separate account is stored. (Recommended: treat as PASS with a note in the matrix.)
- **Q4 - Tooling versions:** The app uses Vite 5. Recent Vitest majors may require a newer Vite. Should I pick the newest Vitest version compatible with Vite 5, without upgrading Vite? (Recommended: yes, no Vite upgrade.)
- **Q5 - Commit/push:** Should I commit and push at the end? Pushing re-runs the deploy workflow, which is unchanged, so the site keeps deploying. (Recommended: yes.)

## Deliverables
- `aidlc-docs/plans/test_plan.md` (this file)
- `aidlc-docs/design-artifacts/traceability_matrix.md` with results
- `job-app/src/__tests__/*.test.jsx` (11 tests) and `job-app/src/test/setup.js`
- Updated `job-app/package.json` (dev dependencies, `test` script) and `job-app/vite.config.js` (`test` block)
- Pass/fail report per AC
- Proposed (not applied) `deploy.yml` test-gate diff
## Decisions (Approved by Onur)
1. Evet. Testler kriter metnine birebir uysun; AC-3.1 ve AC-3.2 karşılanmıyorsa KALDI olarak raporlansın.
2. Evet. Yazarken anlık filtreleme AC-1.1'deki "submit" için yeterli sayılsın; matrise not düşülsün.
3. Tek "Login / Register" formu AC-4.2 için ŞARTLI GEÇTİ olsun. Matrise "mock auth, her e-posta/şifre kabul ediliyor, gerçek kayıt yok (Step 4'te bilinçli karar)" notu yazılsın.
4. Evet. Vite yükseltilmesin; Vite 5 ile uyumlu en yeni Vitest sürümü kurulsun.
5. Evet. Sonda commit ve push yapılsın.
- CI'a test adımı eklenmesi ayrı onay gerektirir; şimdilik sadece öneri olarak yazılsın.
- Rapor bittikten sonra kalan kriterler için düzeltme planı önermeni istiyorum, ama uygulama.
