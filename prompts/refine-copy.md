# Prompt: Refine Copy

> Ready-to-use prompt for copy-only refinement across one or more pages.
> Paste into Claude Code and specify the target page(s).

---

## Instructions for Claude Code

Read the following files before responding:

```
skills/hp-reader.md
skills/hp-guardian.md
docs/b8e-philosophy.md
docs/writing-principles.md
```

Also read the target HTML file(s) specified by the user.

---

## Task

Perform a copy-only refinement pass on the specified page(s).
Do not redesign structure. Do not add or remove sections.

**Step 1 — Tone Audit**
Read the target page(s) and identify every phrase that:
- Sounds like service language or consulting jargon
- Categorizes or pressures the reader
- Uses an assertive declaration where a question or observation would be quieter
- Contradicts the principles in `docs/writing-principles.md`

Present findings as a table:
```
| Location | Current phrase | Issue |
|---|---|---|
```

**Step 2 — Propose Refinements**
For each flagged phrase, propose a quieter alternative.
Do not rewrite whole paragraphs — target the specific phrase.

Present as:
```
| Location | Current | Proposed | Reason |
|---|---|---|---|
```

**Step 3 — Guardian Check**
Run each proposed change through the language alignment check in `skills/hp-guardian.md`.
State: Approved / Revise for each.

**Step 4 — Await Confirmation**
Present the full table of approved refinements.
Wait for explicit user confirmation before writing any changes to HTML files.

**Step 5 — Implement and Log**
Apply only confirmed changes.
Update `docs/improvement-log.md` with a brief entry.

---

## Constraints

- Copy changes only — no structural edits
- Propose the minimum effective change — do not rewrite for its own sake
- Preserve the specific voice of each page (Academy is intimate; DX is grounded; DC is gentle; About is reflective)
