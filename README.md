Purpose: I built and deployed a job application website end to end to learn the AI-DLC (AI-Driven Development Life Cycle) methodology, where AI does the work under human direction and approval.

What I used: React + Vite + Bootstrap for the app, Claude Code as the AI assistant, Git and GitHub CLI for version control, and GitHub Actions + GitHub Pages for free automated CI/CD deployment.

The logic: At every stage the AI first writes a plan, I review and edit it, and only after my approval does the AI execute it step by step, so the human keeps control of every critical decision.

How I applied AI-DLC in this project
Setup: I defined a documentation structure (aidlc-docs with plans, requirements, story-artifacts, design-artifacts, and prompts.md) so every decision and artifact is traceable.
Inception – User Stories: Acting as a product manager, the AI turned my one-line intent ("applicants search, view, and apply to jobs") into user stories with acceptance criteria.
Inception – Units: Acting as an architect, the AI grouped the stories into three loosely coupled units (Identity & Access, Job Catalog & Discovery, Application Management) that separate teams could build independently.
Construction – Component Model: The AI designed business-level components, their attributes and behaviors, and how they interact, before any code was written.
Construction – Code Generation: The AI generated the React app from the component model, with a custom theme, mock authentication, and 50+ sample jobs, and verified it with a successful build.
Operations – Deployment: Instead of the workshop's AWS CDK path, I chose GitHub Actions + Pages. The AI created the repo, the workflow, and the Pages configuration from the terminal, then verified the live site with curl.
Human-in-the-loop throughout: Each stage followed the same cycle: plan file → my review and edits (in a "Decisions" section) → approval prompt → step-by-step execution with checkboxes marked as done.
Traceability: All prompts were recorded in prompts.md, and plan inconsistencies were cleaned up, so anyone can follow how the project was built from intent to production.
