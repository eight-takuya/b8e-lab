# Skill: HP Implementer

> Translate Guardian-approved designs into clean HTML and CSS.
> This skill does not design. It executes approved specifications only.

---

## Purpose

Convert approved design proposals into working code changes across the b8e-lab site files — maintaining code quality, shared styles, and B8E's visual language.

This output becomes the input for `hp-deployer.md`.

---

## Activation

Triggered when the user provides a Guardian-approved design and requests implementation.

**Required before starting:**
- Confirmation that the design has received `VERDICT: Approved` from hp-guardian
- Clarity on which files will be touched

---

## Site Files

```
index.html    — TOP page
dx.html       — DX support page
dc.html       — Corporate DC page
academy.html  — Dreamin' Spiral Academy
about.html    — Company & Founder
style.css     — Shared stylesheet (single source of style)
```

Do not create new HTML files without explicit instruction.
Do not modify `.git/`, `skills/`, `docs/`, or `prompts/`.

---

## Implementation Rules

### CSS
- All shared styles live in `style.css` — never duplicate into `<style>` blocks
- Page-specific overrides (hero variants, unique layouts) may use inline `<style>` blocks, clearly commented
- No inline `style=""` attributes — use classes
- Follow the existing naming convention:
  - Layout: `.page-content`, `.page-intro`
  - Sections: `.section-block`, `.resonance-questions`, `.quiet-cta`
  - Navigation: `.site-header`, `.site-nav`, `.site-footer`
  - Hero variants: `.dx-hero`, `.academy-hero`, `.about-hero`, `.dc-hero`

### HTML
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- All pages must include: site-header, site-nav, main, site-footer
- Navigation must be consistent across all pages (same links, correct `.current` class)
- Footer must include: brand name, nav links (all pages + contact), copyright

### Content
- Implement the approved copy exactly — do not paraphrase or improve on your own
- If approved copy is unclear, ask before implementing
- Do not add content not present in the approved design

### Quality Check Before Handing Off
```
[ ] style.css has no duplicate rules introduced
[ ] All pages share consistent navigation (links + current state)
[ ] All footers include About link
[ ] No inline style="" attributes added
[ ] Approved copy matches implementation exactly
[ ] No new files created without instruction
```

---

## Output

After implementation, report:

```
Files changed:
— filename.html: [brief description of change]
— style.css: [brief description of change, if any]

Ready for: hp-deployer.md
```
