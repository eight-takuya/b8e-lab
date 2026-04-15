# Skill: HP Deployer

> Deploy implemented changes to production via GitHub and Vercel.
> This skill does not implement. It ships approved, implemented code.

---

## Purpose

Push implemented site changes to the main branch on GitHub, triggering an automatic Vercel deployment to the live B8E site.

---

## Deployment Architecture

```
b8e-lab (local)
    ↓  git push
GitHub (main branch)
    ↓  auto-deploy (Vercel integration)
https://www.b8e.co.jp/  (live site)
```

Vercel is connected to the GitHub repository and deploys automatically on every push to `main`.

---

## Activation

Triggered when the user confirms that:
1. Implementation is complete
2. All quality checks in `hp-implementer.md` have passed
3. Local changes look correct

---

## Pre-Deploy Checklist

Run through this before every push:

```
[ ] All changed files are saved
[ ] No broken links (href targets exist)
[ ] Navigation is consistent across all 5 pages
[ ] style.css has no syntax errors
[ ] No console errors expected (no JS in this site)
[ ] improvement-log.md has been updated with this change
```

---

## Deployment Steps

### 1. Stage changed files
Only stage the files that were part of this improvement cycle.
Never use `git add .` blindly — stage by filename.

```bash
git add index.html dx.html style.css   # example
```

### 2. Commit with a meaningful message
Follow this format:
```
[scope]: brief description of change

- detail one
- detail two
```

Examples:
```
refine: soften CTA tone across all service pages

- replace "丁寧に扱います" with "のそばに留まります" (dx)
- remove sales endorsement from dc intro
- align footer nav across all pages
```

```
design: rebuild index.html with Being-first structure

- new hero with philosophy copy
- two-questions section for self-selection
- paths grid replacing card layout
- quiet CTA replacing dark block
```

### 3. Push to main
```bash
git push origin main
```

### 4. Verify Vercel deployment
- Check Vercel dashboard or wait ~60 seconds
- Open https://www.b8e.co.jp/ and confirm changes are live
- Check at least: TOP page, one service page, footer

### 5. Log the deployment
Update `docs/improvement-log.md` with the deployment entry.

---

## Rollback

If the live site shows unexpected issues after deploy:

```bash
git revert HEAD
git push origin main
```

This creates a new commit that undoes the last change — it does not force-push or destroy history.

---

## Rules

- Never force-push to main (`git push --force` is prohibited)
- Never commit credentials, `.env` files, or API keys
- Never deploy without completing the pre-deploy checklist
- If the deployment fails in Vercel, check the build log before attempting a fix
