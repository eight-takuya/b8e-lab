# b8e-lab

B8E website improvement harness — a Claude Code-based agent system for continuously reading, designing, guarding, implementing, and deploying improvements to the B8E website while preserving its philosophy.

---

## What This Is

This repository contains the B8E website (static HTML/CSS) and a structured harness for improving it over time using Claude Code.

The harness enforces a philosophy-first workflow:

```
Read → Design → Guard → Implement → Deploy
```

Every change passes through this pipeline. No code reaches production without Guardian approval.

---

## Site Files

```
index.html    — TOP page
dx.html       — DX支援
dc.html       — 企業型DC
academy.html  — Dreamin' Spiral Academy
about.html    — Company & Founder
style.css     — Shared stylesheet
```

**Deployment:** GitHub (`main` branch) → Vercel → https://www.b8e.co.jp/

---

## Harness Structure

```
b8e-lab/
├── skills/
│   ├── hp-reader.md       — Observe and analyze the site (As-Is)
│   ├── hp-designer.md     — Design improvements (To-Be)
│   ├── hp-guardian.md     — Review designs for philosophy alignment
│   ├── hp-implementer.md  — Implement approved designs into HTML/CSS
│   ├── hp-deployer.md     — Deploy to GitHub + Vercel
│   └── hp-improvement/
│       └── b8e_hp_skill.md — Combined Reader + Designer reference
├── docs/
│   ├── b8e-philosophy.md    — Core principles (non-negotiable)
│   ├── site-structure.md    — Page structure, CSS classes, deployment
│   ├── writing-principles.md — Language and copy guidelines
│   └── improvement-log.md   — Running log of all changes
└── prompts/
    ├── improve-homepage.md    — Improve index.html
    ├── refine-copy.md         — Copy-only refinement pass
    ├── improve-dx-page.md     — Improve dx.html
    ├── improve-academy-page.md — Improve academy.html
    └── polish-site-wide.md   — Cross-page consistency pass
```

---

## How to Use in Claude Code

### Starting a new improvement session

1. Open Claude Code in the `b8e-lab` directory
2. Choose a prompt from `prompts/` that matches your goal
3. Paste the prompt contents into Claude Code
4. Claude will follow the Read → Design → Guard → Implement flow

### Quick reference — which prompt to use

| Goal | Prompt |
|---|---|
| Improve the TOP page | `prompts/improve-homepage.md` |
| Refine copy on any page | `prompts/refine-copy.md` |
| Improve the DX page | `prompts/improve-dx-page.md` |
| Improve the Academy page | `prompts/improve-academy-page.md` |
| Full site consistency pass | `prompts/polish-site-wide.md` |

### Manual pipeline invocation

You can also invoke individual skills directly:

```
"Use hp-reader to analyze academy.html."

"Use hp-designer to redesign the DX hero section based on this analysis: [paste analysis]"

"Use hp-guardian to review this design proposal: [paste design]"

"Use hp-implementer to apply this approved design to dx.html: [paste design]"

"Use hp-deployer to deploy the current changes."
```

---

## The Pipeline

### 1. hp-reader
Reads and analyzes the current site. Produces structured output: structure summary, page breakdown, message flow, identified issues.
**Never suggests improvements.**

### 2. hp-designer
Takes Reader output and designs improvements aligned with B8E philosophy. Produces: concept, new structure, section design, messaging examples, CTA design.
**Never implements.**

### 3. hp-guardian
Reviews the design proposal. Outputs one of: Approved / Revise / Reject.
**Nothing proceeds without Approved.**

### 4. hp-implementer
Translates approved design into HTML and CSS changes. Follows code quality rules in the skill file.
**Never designs on its own.**

### 5. hp-deployer
Stages, commits, and pushes changes to GitHub. Vercel auto-deploys to production.
**Never skips pre-deploy checklist.**

---

## Philosophy

All improvements are guided by the B8E Philosophy Layer (`docs/b8e-philosophy.md`):

- **Being over Doing** — lead with presence, not service
- **Resonance over Persuasion** — let the reader feel, not be convinced
- **Natural Flow over Forced Structure** — every section earns its place
- **Alignment → Flow → Creation** — inner alignment before outer action
- **Truth is felt, not imposed** — create space, not pressure

If a proposed change contradicts these principles, it does not proceed.

---

## Logging

Every significant change is recorded in `docs/improvement-log.md`.
Use the template at the top of that file for each new entry.
Log before deploying — not after.

---

## Deployment

```bash
git add [changed files]
git commit -m "scope: description"
git push origin main
```

Vercel auto-deploys within ~60 seconds of push to `main`.
Verify at https://www.b8e.co.jp/
