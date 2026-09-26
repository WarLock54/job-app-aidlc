# Plan: Deployment - Deploy with Firebase Hosting

## Objective
Deploy the Single Page Application (SPA) to Firebase Hosting using the Firebase CLI for instant global CDN distribution.

## Steps
- [ ] **Step 1: Authenticate**
  - Run `firebase login` to authenticate the terminal session.
- [ ] **Step 2: Initialize Hosting**
  - Navigate to the `job-app` directory and run `firebase init hosting`.
  - Select an existing project or create a new one.
- [ ] **Step 3: Configure Hosting Parameters**
  - Set the public directory to `dist`.
  - Configure as a single-page app (rewrite all URLs to `/index.html`).
  - Decline automatic GitHub builds for this manual rollout.
- [ ] **Step 4: Deploy**
  - Execute `firebase deploy`.
  - Verify the live application using the provided `web.app` or `firebaseapp.com` Hosting URL.