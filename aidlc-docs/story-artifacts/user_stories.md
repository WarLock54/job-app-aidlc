## Story 1: Job Search and Filtering (İş Arama ve Filtreleme)
**As an** Applicant or Guest User,
**I want to** search and filter job postings by keywords and categories,
**So that** I can easily find roles that match my skills and interests.

**Acceptance Criteria:**
* **Given** I am on the home page, **When** I enter a keyword in the search bar (the list filters live as I type, which satisfies "submit"), **Then** I should see a list of jobs matching that keyword by title or company.
* **Given** I am viewing the job list, **When** I select a specific category filter, **Then** the list should update to only show jobs within that category.
* **Given** a search yields no results, **When** the search completes, **Then** I should see a friendly message indicating no jobs were found.

## Story 2: Viewing Job Details (İş Detaylarını Görüntüleme)
**As an** Applicant or Guest User,
**I want to** click on a job posting to view its full details,
**So that** I can read the job description, requirements, and understand the role before applying.

**Acceptance Criteria:**
* **Given** I see a job listing I am interested in, **When** I click anywhere on the job card, including the title, **Then** I am navigated to a dedicated page for that job.
* **Given** I am on the job details page, **Then** I should see the job title, company name, location, full description, and an "Apply" button.

## Story 3: Applying for a Job (İşe Başvurma)
**As an** Applicant,
**I want to** submit an application for a specific job posting,
**So that** I can be considered for the position.

**Acceptance Criteria:**
* **Given** I am logged in as an Applicant and on a job details page, **When** I click "Apply", **Then** I should see an application form.
* **Given** I have filled out the application form, **When** I submit it, **Then** I should see a success confirmation message.
* **Given** I am not logged in (Guest User), **When** I try to click "Apply", **Then** I should be prompted to log in or register first.

## Story 4: User Authentication (Kullanıcı Kimlik Doğrulaması)
**As a** Guest User,
**I want to** register and log in to the system,
**So that** I become an Applicant and can apply for jobs.

**Acceptance Criteria:**
* **Given** I am on the login page, **When** I enter valid credentials, **Then** I am successfully logged in and redirected to the home page or my previous page.
* **Given** I am on the combined Login/Register form, **When** I provide any email and password in Register mode, **Then** a session is created for that identity and I am logged in as an Applicant. (Mock authentication for this workshop: no server-side account persistence or password validation.)
* **Given** I am logged in, **When** I click "Logout", **Then** my session ends and I become a Guest User again.

## Amendment History
- **2026-09-27:** AC-1.1, AC-2.1 and AC-4.2 wording clarified to match the implementation decisions already approved in `aidlc-docs/plans/test_plan.md` ("Decisions (Approved by Onur)", items 2 and 3). No behavior changed — only requirement text updated to remove ambiguity for future test runs.
- **2026-09-27:** Story 3 (AC-3.1, AC-3.2) implemented as originally written. `ApplicationForm.jsx` + `applicationService.js` added; no AC text change was needed. See `traceability_matrix.md`.