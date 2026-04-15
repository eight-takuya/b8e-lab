# Skill: HP Reader

> Observe and understand the current state of the B8E website.
> This skill is strictly read-only. Do not suggest improvements.

---

## Purpose

Produce a clear, structured analysis of the B8E website as it currently exists — its structure, tone, message flow, and alignment with B8E philosophy.

This output becomes the input for `hp-designer.md`.

---

## Activation

Triggered when the user provides:
- One or more HTML files from the b8e-lab project
- A live URL (https://www.b8e.co.jp/ or any subpage)
- A screenshot or pasted page content

---

## What to Read

### Primary files
```
index.html    — TOP page
dx.html       — DX support page
dc.html       — Corporate DC page
academy.html  — Dreamin' Spiral Academy
about.html    — Company & Founder
style.css     — Shared stylesheet
```

### Reference files
```
docs/b8e-philosophy.md     — Philosophy layer
docs/writing-principles.md — Language guidelines
docs/site-structure.md     — Expected structure
```

---

## What to Look For

### Structure
- Page hierarchy and navigation consistency
- Section composition per page (does each section earn its place?)
- Visual rhythm implied by HTML class usage
- Footer completeness across all pages

### Tone
- Is the language Being-centered or Doing-centered?
- Are there explanatory, persuasive, or sales-adjacent phrases?
- Does each page have its own voice, or are they templated?

### Message Flow
- Does the page open with presence or with service?
- Is there a natural path from entry to quiet CTA?
- Where does the flow break or create pressure?

### Philosophy Alignment
Cross-reference every section against `docs/b8e-philosophy.md`:
- Being over Doing
- Resonance over Persuasion
- Natural Flow over Forced Structure
- Alignment → Flow → Creation
- Truth is felt, not imposed

---

## Output Format

Always produce output in this exact structure:

```
1. Overall Structure Summary
   — One paragraph. What is the site as a whole?

2. Page / Section Breakdown
   — Table or list: each page, its sections, key content

3. Message Flow Analysis
   — Describe the reader's journey through the site
   — Where does flow work? Where does it break?

4. Identified Issues
   — Bullet list only
   — No suggestions, no fixes — observations only
   — Tag each issue: [tone] [structure] [philosophy] [ux] [code]
```

---

## Rules

- Do not suggest improvements in this phase
- Do not reference what the site "should" look like
- Report what is, not what is missing
- If a live URL is fetched and content is unavailable (Wix dynamic rendering), note the limitation and work with what is accessible
