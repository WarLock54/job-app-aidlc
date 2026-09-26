# Architectural Units

This document groups the user stories into highly cohesive and loosely coupled units that can be developed independently.

## Unit 1: Identity & Access (IAM)
**Description:** Manages user registration, authentication, and session management.

### Associated Stories
* **Story 4: User Authentication**
  * *Acceptance Criteria:*
    * Given I am on the login page, When I enter valid credentials, Then I am successfully logged in and redirected to the home page or my previous page.
    * Given I am on the registration page, When I provide a valid email and password, Then my account is created and I am logged in.
    * Given I am logged in, When I click "Logout", Then my session ends and I become a Guest User again.

## Unit 2: Job Catalog & Discovery
**Description:** Handles the core functionality of searching, filtering, and displaying job postings to users.

### Associated Stories
* **Story 1: Job Search and Filtering**
  * *Acceptance Criteria:*
    * Given I am on the home page, When I enter a keyword in the search bar and submit, Then I should see a list of jobs matching that keyword.
    * Given I am viewing the job list, When I select a specific category filter, Then the list should update to only show jobs within that category.
    * Given a search yields no results, When the search completes, Then I should see a friendly message indicating no jobs were found.
* **Story 2: Viewing Job Details**
  * *Acceptance Criteria:*
    * Given I see a job listing I am interested in, When I click on the job title or a "View Details" button, Then I am navigated to a dedicated page for that job.
    * Given I am on the job details page, Then I should see the job title, company name, location, full description, and an "Apply" button.

## Unit 3: Application Management
**Description:** Manages the process of users applying for specific job postings.

### Associated Stories
* **Story 3: Applying for a Job**
  * *Acceptance Criteria:*
    * Given I am logged in as an Applicant and on a job details page, When I click "Apply", Then I should see an application form.
    * Given I have filled out the application form, When I submit it, Then I should see a success confirmation message.
    * Given I am not logged in (Guest User), When I try to click "Apply", Then I should be prompted to log in or register first.