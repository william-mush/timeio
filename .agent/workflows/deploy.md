---
description: Auto-deploy workflow for timeio - commits and pushes without approval
---

// turbo-all

# Deploy Changes

This workflow commits and pushes all changes automatically.

## Steps

1. Stage all changes
```bash
git add -A
```

2. Commit with a descriptive message
```bash
git commit -m "<commit message>"
```

3. Push to main
```bash
git push origin main
```

## Notes
- All git operations are auto-approved for this project
- Builds are safe to auto-run
- Use this workflow when the user says "deploy", "push", or "commit"
