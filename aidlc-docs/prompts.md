# Prompts

Prompts used during the AI-DLC workflow, in order.

> **Source:** AWS AI-DLC Workshop Series – Workshop 2: Job Application Website with CDK.
> Each prompt was run separately and allowed to complete before moving to the next one.
> After every plan file was produced, the plan was reviewed/edited and then approved with the
> approval prompt shown under each step.

---

## 0. Setup

```
We will work on building an application today. For every front end and backend component we will create a project folder. All documents will reside in the aidlc-docs folder. Throughout our session I'll ask you to plan your work ahead and create an md file for the plan. You may work only after I approve said plan. These plans will always be stored in aidlc-docs/plans folder. You will create many types of documents in the md format. Requirement, features changes documents will reside in aidlc-docs/requirements folder. User stories must be stored in the aidlc-docs/story-artifacts folder. Architecture and Design documents must be stored in the aidlc-docs/design-artifacts folder. All prompts in order must be stored in the aidlc-docs/prompts.md file. Confirm your understanding of this prompt. Create the necessary folders and files for storage, if they do not exist already.
```

---

## 1. Inception – Intent to User Stories

```
Your Role: You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below. Plan for the work ahead and write your steps in a Markdown file: user_stories_plan.md with checkboxes for each step in the plan. List your Deliverables in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build user stories for the high level requirement as described here: A job application management site that allows:
- Applicants to search, view, and apply to job postings

Write the user stores to a user_stories.md file
```

**Approval (after reviewing `user_stories_plan.md`):**
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

---

## 2. Inception – User Stories to Units

```
Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Group these user stories in user_stories.md into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units are loosely coupled with each other. For each unit, write the respective user stories and acceptance criteria in a units.md file.
```

**Approval (after reviewing `units_plan.md`):**
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

---

## 3. Construction – Units to Domain/Component Model

```
Your Role: You are an experienced software architect and engineer. Before you start the task as mentioned below, please do the planning and write your steps in in a Markdown file named component_model_plan.md with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in the units.md file. Design the component model to implement all the user stories. This model shall contain all the components, the attributes, the behaviors and how the components interact to implement the user stories. The components should be at a business level, do not generate any codes yet. Write the component model into a Markdown file: component_model.md.
```

**Approval (after reviewing `component_model_plan.md`):**
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

---

## 4. Construction – Code Generation

```
Your Role: You are an experienced software engineer. Before you start the task as mentioned below, please do the planning and write your steps in the markdown file react_app_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to component design in the component_model.md file and the units.md file.
Generate a simple and intuitive React Vite web application for the Login and applicant view job listing component in an job-app folder
Use modern design styling for the UX with Bootstrap CDN: icons, color theme, responsive layout, intuitive visual hierarchy, CSS for hover effects
Choose a creative professional color theme avoiding default blue (e.g. green, blue, teal, gray, purple, orange, teal etc.)
Use simple mock authentication for now with authentication state persisting across all pages and components
Populate the page with some sample jobs (50+) for local testing.
Build the React application and attempt to resolve any errors. Install any tools you need.
Do not run the npm dev server, only use npm-install and npm-run-build. We will deploy the app separately
```

**Approval (after reviewing `react_app_plan.md`):**
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

---

## 5. Operations – Deployment (GitHub Actions & Pages)

> **Deviation from the workshop:** The original workshop Step 5 deploys with **AWS CDK**
> (private S3 bucket + CloudFront with Origin Access Control, us-west-2). That prompt was **not used**.
> After comparing alternatives (AWS CDK, Azure Terraform, Firebase Hosting, GitHub Actions),
> **GitHub Actions + GitHub Pages** was chosen because it is free and provides CI/CD out of the box.
> The plan is in `plans/github_deployment_plan.md`.

### 5.1 Status summary (new Claude Code session)
```
Bu projede AWS AI-DLC metodolojisini uyguluyoruz. Önce aidlc-docs klasörünü, prompts.md dosyasını ve aidlc-docs/plans altındaki planları oku. Nerede kaldığımızı özetle. Sıradaki adım github_deployment_plan.md planının onaylanıp uygulanması. Henüz hiçbir şey uygulama, sadece özetle.
```

### 5.2 Continue session
```
claude --continue
```

### 5.3 Plan approval and execution
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified. All 4 questions are answered in the "Decisions" section of github_deployment_plan.md.
```

### 5.4 Repository creation (Step 6 – sent as a prompt without `!`; Claude Code took it as approval and ran it after the auto-mode permission block)
```
"/c/Program Files/GitHub CLI/gh.exe" repo create job-app-aidlc --public --source=. --remote=origin
```

### 5.5 Upgrade workflow to Node 22
```
Workflow'daki Node sürümünü 22'ye yükselt, plan dosyasında da güncelle. Commit, push et ve workflow'un başarılı olduğunu doğrula.
```

### 5.6 Documentation – fill prompts.md
```
prompts.md içindeki TODO bölümünü doldur. Workshop promptlarını sırasıyla ekle; her plandan sonra "I updated the plan file..." onay cümlesini gönderdiğimi de belirt. Workshop'taki Step 5 (AWS CDK) yerine GitHub Actions/Pages kullandığımızı not düş. Sonra commit ve push et.
```

### 5.7 Review manually updated prompts.md
```
prompts.md dosyasını manuel güncelledim. Kontrol et, commit ve push yap, workflow'un başarılı olduğunu doğrula.
```

### 5.8 Fix prompts.md gaps and add requirements folder
```
Evet, üç eksiği de düzelt:
1. prompts.md bölüm 5'e bu oturumdaki eksik promptları sırasıyla ekle (claude --continue, Node 22 yükseltme, prompts.md güncelleme ve bu prompt).
2. 5.3 başlığını düzelt: komut ! olmadan prompt olarak gönderildi ve Claude Code onay olarak alıp çalıştırdı.
3. aidlc-docs/requirements klasörünü oluştur. Setup promptunun gerektirdiği bu klasör boş kalmasın; içine user stories ve deployment kararlarına referans veren kısa bir README.md koy.
Sonra commit, push et ve workflow'un başarılı olduğunu doğrula.
```

---

## 6. Construction – QA / Acceptance Criteria Verification

```
Your Role: You are an experienced QA engineer. Before you start the task below, plan your work in aidlc-docs/plans/test_plan.md with checkboxes for each step. List your Deliverables. If any step needs my clarification, add a note to get my confirmation. Do not make critical decisions on your own. After my approval, execute the plan one step at a time and mark checkboxes as done.

Your Task: Verify that every acceptance criterion in aidlc-docs/story-artifacts/user_stories.md is actually satisfied by the job-app.
- Create a traceability matrix (story → acceptance criterion → test case) in aidlc-docs/design-artifacts/traceability_matrix.md
- Write automated tests with Vitest + React Testing Library in job-app, one test per acceptance criterion
- Run the tests and report which criteria pass and which fail. Do not fix the app code without my approval.
- Propose (do not apply yet) adding a test step to .github/workflows/deploy.yml so deployment is blocked if tests fail
```

**Approval (after reviewing `test_plan.md`; answers recorded in its "Decisions" section):**
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

---

**Result:** Live site → https://warlock54.github.io/job-app-aidlc/