# Plan: CI/CD - Deploy with GitHub Actions & Pages

## Objective
Publish the Job Application React (Vite) project to a GitHub repository and establish an automated CI/CD pipeline using GitHub Actions to deploy it directly to GitHub Pages. All GitHub operations are done from the terminal via GitHub CLI (`gh`). No manual steps on the GitHub website.

## Decisions (Approved by Onur)
- **Repo root:** the workshop folder (`workshop_Job_Application_with_CDK`), containing both `aidlc-docs/` and `job-app/`.
- **Repo name:** `job-app-aidlc`, **public** (required for free GitHub Pages).
- **Default branch:** `main`.
- **Tooling:** GitHub CLI (`gh`) is installed and authenticated. The AI creates the repo, pushes, and configures Pages from the terminal.
- **Vite base path:** keep `base: './'` (works with HashRouter under any sub-path). Do NOT change it to the repo name.
- **Workflow location:** repo root `.github/workflows/deploy.yml` (GitHub ignores workflows in subfolders). Build runs with `working-directory: job-app`.

## Steps
- [x] **Step 1: Pre-flight Checks**
  - Run `git --version`, `gh --version`, `gh auth status` and confirm all succeed.
  - Get the GitHub username: `gh api user --jq .login`.
  - Verify the app builds locally: `npm ci` and `npm run build` inside `job-app/`.
  - If any check fails, stop and report to me.

- [x] **Step 2: Add .gitignore**
  - Create `.gitignore` at the repo root with at least: `node_modules/`, `dist/`, `.env`, `*.log`, `.DS_Store`.

- [x] **Step 3: Verify Vite Configuration**
  - Confirm `job-app/vite.config.js` has `base: './'` and the app uses HashRouter. No change unless something is broken.

- [x] **Step 4: Create GitHub Actions Workflow**
  - Create `.github/workflows/deploy.yml` at the **repo root**.
  - Trigger: `push` to `main` + `workflow_dispatch`.
  - Permissions: `contents: read`, `pages: write`, `id-token: write`.
  - Concurrency group `pages`, cancel-in-progress: false.
  - Build job: `actions/checkout`, `actions/setup-node` (Node 20, npm cache with `cache-dependency-path: job-app/package-lock.json`), `npm ci` + `npm run build` with `working-directory: job-app`, `actions/configure-pages`, `actions/upload-pages-artifact` with `path: job-app/dist`.
  - Deploy job: `actions/deploy-pages`, environment `github-pages`.
  - Use current major versions of all actions.

- [x] **Step 5: Git Init & First Commit**
  - `git init -b main`
  - `git add .` then check `git status`. Make sure `node_modules/` and `dist/` are NOT staged.
  - `git commit -m "Initial commit: AI-DLC job application site with GitHub Pages CI/CD"`

- [x] **Step 6: Create GitHub Repository (without pushing yet)**
  - `gh repo create job-app-aidlc --public --source=. --remote=origin`
  - If the repo name already exists, stop and ask me for a new name.

- [x] **Step 7: Enable GitHub Pages (Source: GitHub Actions)**
  - `gh api -X POST repos/<username>/job-app-aidlc/pages -f build_type=workflow`
  - If Pages already exists, use `-X PUT` instead.
  - Verify: `gh api repos/<username>/job-app-aidlc/pages`.

- [x] **Step 8: Push & Monitor Deployment**
  - `git push -u origin main`
  - Watch the workflow: `gh run list --limit 1` then `gh run watch <run-id>`.
  - Keep me updated with the status. If it fails, show the logs (`gh run view <run-id> --log-failed`), fix, commit, push again.

- [x] **Step 9: Verify the Live Site**
  - Site URL: `https://<username>.github.io/job-app-aidlc/`
  - Verify with `curl -I <URL>` (expect HTTP 200) and check that the returned HTML references the built JS/CSS assets.
  - Report the final URL to me.

- [x] **Step 10: Documentation Housekeeping**
  - Mark completed steps as `[x]` in ALL previous plan files (user_stories, units, component_model, react_app).
  - Remove the stray prompt line at the end of `user_stories_plan.md`.
  - Fix unit numbering mismatch between `units_plan.md` and `units.md`.
  - Fill `aidlc-docs/prompts.md` with all prompts used so far, in order.
  - Commit and push these changes (this also re-triggers the deployment, which is fine).

## Deliverables
- `.gitignore` at repo root.
- `.github/workflows/deploy.yml` at repo root.
- Public GitHub repository `job-app-aidlc` with code pushed to `main`.
- GitHub Pages enabled with GitHub Actions as source.
- Successful workflow run and live site URL verified with curl.
- Updated plan checkboxes and populated `prompts.md`.