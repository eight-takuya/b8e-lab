# Prompt: Polish Site-Wide

> Ready-to-use prompt for a cross-page consistency and refinement pass.
> Use after individual page improvements to ensure the site reads as one experience.

---

## Instructions for Claude Code

Read all of the following files before responding:

```
skills/hp-reader.md
skills/hp-guardian.md
docs/b8e-philosophy.md
docs/writing-principles.md
docs/site-structure.md
index.html
dx.html
dc.html
academy.html
about.html
style.css
```

---

## Task

Perform a site-wide consistency and polish pass. Do not redesign individual pages. Focus on the experience of moving through the site as a whole.

---

**Step 1 — Cross-Page Tone Audit**

Read all five pages as a single continuous experience.
Identify:

```
[ ] Tone inconsistencies — where one page sounds different from the others
[ ] Repeated phrases that have become formulaic across pages
[ ] Any page that still contains persuasive, explanatory, or heavy language
[ ] Pacing breaks — sections that feel rushed or too dense relative to the others
```

**Step 2 — Navigation Audit**

Verify:
```
[ ] All 5 pages appear in every site-nav
[ ] .current class is correct on each page
[ ] All 5 pages + contact link appear in every footer nav
[ ] Back-link exists on service pages (dx, dc, academy, about)
[ ] No broken or inconsistent href values
```

**Step 3 — Structure Audit**

Check across all pages:
```
[ ] Hero label + copy structure is consistent
[ ] Section headings use the same visual weight and labeling style
[ ] Resonance questions have the same rhythm (short declarative lines)
[ ] CTA format is consistent: 1–2 lines + one text link
[ ] Footer layout and content is identical across all pages
```

**Step 4 — CSS Audit**

Review `style.css`:
```
[ ] No duplicate rules
[ ] No unused classes
[ ] Page-specific hero variants follow the same pattern
[ ] Mobile breakpoints are consistent
```

**Step 5 — Propose Refinements**

List specific changes needed as a table:

```
| File | Location | Issue | Proposed fix |
|---|---|---|---|
```

**Step 6 — Guardian Check**
Run proposed changes through `skills/hp-guardian.md`.

**Step 7 — Await Confirmation**
Present findings and proposals. Wait for explicit approval before implementing.

**Step 8 — Implement and Log**
Apply confirmed changes.
Update `docs/improvement-log.md` with a site-wide polish entry.

---

## Constraints

- Do not redesign pages — audit and align only
- Do not add new content
- Treat each page's individual voice as intentional (Academy is intimate; DX is grounded; DC is gentle; About is reflective)
- The goal is not uniformity — it is coherence
