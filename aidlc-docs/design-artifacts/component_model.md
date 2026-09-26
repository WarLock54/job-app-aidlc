# Domain & Component Model

This document outlines the business-level components, their attributes, behaviors, and interactions required to implement the units defined in `units.md`.

## 1. Frontend Components (User Interface)

### 1.1 App Shell
* **Description:** The main layout wrapper providing global navigation and routing context.
* **Attributes:** `navigationLinks`, `themeSettings`.
* **Behaviors:** `renderHeader()`, `renderFooter()`, `navigate(route)`.

### 1.2 Auth Component
* **Description:** Handles user login and registration forms.
* **Attributes:** `email`, `password`, `isLoginMode`, `validationErrors`.
* **Behaviors:** `toggleMode()`, `submitCredentials()`, `displayError()`.
* **Interactions:** Uses `Auth Service` to validate and persist user sessions.

### 1.3 Job Board Component
* **Description:** The main view for searching, filtering, and browsing jobs.
* **Attributes:** `searchKeyword`, `selectedCategory`, `jobsList`, `isLoading`.
* **Behaviors:** `handleSearchInput()`, `handleCategoryFilter()`, `renderJobCards()`.
* **Interactions:** Calls `Job Catalog Service` to fetch and filter job data.

### 1.4 Job Details Component
* **Description:** Displays the full description of a single job.
* **Attributes:** `jobId`, `jobData`.
* **Behaviors:** `loadJobDetails()`, `triggerApply()`.
* **Interactions:** Calls `Job Catalog Service` for specific job data. Checks `Auth Service` before allowing application.

### 1.5 Application Component
* **Description:** The form presented to an applicant when applying for a role.
* **Attributes:** `applicantData` (mocked from session), `coverLetter`, `jobId`.
* **Behaviors:** `submitForm()`, `showSuccessMessage()`.
* **Interactions:** Submits data via `Application Service`.

---

## 2. Domain Services (Business Logic & Data Layer)
*(Note: For this workshop, these services will operate via mock state persistence in the browser.)*

### 2.1 Auth Service (Identity & Access Unit)
* **Attributes:** `currentUser` (Applicant or Guest), `sessionToken`.
* **Behaviors:** 
  * `login(email, password)`: Authenticates user and sets session.
  * `register(email, password)`: Creates a new user profile.
  * `logout()`: Clears the current session.
  * `getCurrentUser()`: Returns current session state for role-based access.

### 2.2 Job Catalog Service (Job Catalog & Discovery Unit)
* **Attributes:** `mockJobDatabase` (Array of job postings).
* **Behaviors:**
  * `getAllJobs()`: Retrieves the full list of available jobs.
  * `searchJobs(keyword, category)`: Returns a filtered list based on criteria.
  * `getJobById(id)`: Returns full details for a specific job.

### 2.3 Application Service (Application Management Unit)
* **Attributes:** `mockApplicationsDatabase`.
* **Behaviors:**
  * `submitApplication(jobId, applicantId, data)`: Records a new application and returns a confirmation status.

---

## 3. Component Interactions (Workflows)

1. **Browsing Jobs:** The user loads the app -> `App Shell` mounts `Job Board` -> `Job Board` calls `Job Catalog Service.getAllJobs()` -> UI renders job cards.
2. **Filtering:** User enters keyword -> `Job Board` updates state and calls `Job Catalog Service.searchJobs()` -> UI updates list.
3. **Applying (Not Logged In):** User clicks "Apply" on `Job Details` -> Component checks `Auth Service.getCurrentUser()` -> Returns false -> `App Shell` redirects to `Auth Component`.
4. **Applying (Logged In):** User clicks "Apply" on `Job Details` -> Component checks `Auth Service` -> Returns true -> Opens `Application Component` -> User submits -> `Application Service.submitApplication()` is called -> Success message shown.