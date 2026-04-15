# Prompt: Improve Homepage

> Ready-to-use prompt for improving index.html.
> Paste into Claude Code to begin.

---

## Instructions for Claude Code

Read the following files before responding:

```
skills/hp-reader.md
skills/hp-designer.md
skills/hp-guardian.md
docs/b8e-philosophy.md
docs/writing-principles.md
docs/site-structure.md
index.html
style.css
```

---

## Task

You are working on the B8E website homepage (`index.html`).

**Step 1 — Reader Mode**
Analyze the current state of `index.html` using the protocol in `skills/hp-reader.md`.
Produce the full Reader Mode output before proceeding.

**Step 2 — Designer Mode**
Based on your Reader analysis and guided by `docs/b8e-philosophy.md` and `docs/writing-principles.md`, design an improved version of the homepage using `skills/hp-designer.md`.

Focus on:
- Does the hero land on Being, not service?
- Does the philosophy section carry the founder's voice naturally?
- Do the two-questions and paths create self-selection without pressure?
- Is the CTA the quietest possible invitation?

**Step 3 — Guardian Review**
Before presenting the design, run it through the philosophy compliance check in `skills/hp-guardian.md`.
State your verdict explicitly.

**Step 4 — Await Approval**
Present the design. Wait for explicit user confirmation before implementing any changes to `index.html`.

---

## Constraints

- Do not add new sections not already in the current design
- Do not change the page's HTML structure — refine copy and tone only unless structure is explicitly requested
- All changes must be implementable within the existing CSS classes in `style.css`
- Log the improvement in `docs/improvement-log.md` after implementation
