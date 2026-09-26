# Prompts

Prompts used during the AI-DLC workflow, in order.

## 1-4. User Stories, Units, Component Model, React Code Generation

> TODO: The original prompts for these stages were not recorded. Add them here.

Known fragment (was left at the end of `plans/user_stories_plan.md`):

```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified.
```

## 5. Deployment - GitHub Actions & Pages

### 5.1 Status summary
```
Bu projede AWS AI-DLC metodolojisini uyguluyoruz. Önce aidlc-docs klasörünü, prompts.md dosyasını ve aidlc-docs/plans altındaki planları oku. Nerede kaldığımızı özetle. Sıradaki adım github_deployment_plan.md planının onaylanıp uygulanması. Henüz hiçbir şey uygulama, sadece özetle.
```

### 5.2 Plan approval and execution
```
I updated the plan file. Please take my changes and comments into consideration then follow the plan as specified. All 4 questions are answered in the "Decisions" section of github_deployment_plan.md.
```

### 5.3 Repository creation (Step 6)
```
"/c/Program Files/GitHub CLI/gh.exe" repo create job-app-aidlc --public --source=. --remote=origin
```
