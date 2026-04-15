# Improvement Log

> A running record of every significant change to the B8E website.
> Updated after each deployment.

---

## Entry Template

```
---
## [YYYY-MM-DD] — [Short title]

**Scope:** [Which pages or files were changed]
**Triggered by:** [Reader analysis / user request / philosophy review]
**Mode used:** [Reader / Designer / Guardian / Implementer / Deployer]

### Changes
- [file]: [what changed and why]
- [file]: [what changed and why]

### Philosophy notes
[One sentence on how this change serves B8E philosophy]

### Deployed
[ ] Yes — commit: [hash or message]
[ ] No — pending
---
```

---

## Log

---

## 2025-04-15 — Full site redesign from scratch

**Scope:** All pages (index, dx, dc, academy, about), style.css (new), about.html (new)
**Triggered by:** Reader Mode analysis of existing test site; B8E Philosophy Layer applied
**Mode used:** Reader → Designer → Implementer (Guardian integrated into conversation)

### Changes

- `style.css`: Created from scratch. Single shared stylesheet replacing inline CSS duplicated across all pages. Establishes visual language: off-white background (`#f7f6f4`), softened dark (`#1a1a1a`), generous spacing, minimal hierarchy.

- `index.html`: Rebuilt with Being-first structure. Hero replaced service listing. Philosophy section (founder's voice) added. Two-questions self-selection block added. Paths grid replaced card layout. Quiet CTA replaced dark button block. Footer added.

- `dx.html`: Rewritten. Hero reframes DX as an alignment question. "提供価値" and "こんな方" replaced with "伴走という在り方" and resonance questions. CTA softened. Footer added.

- `dc.html`: Rewritten. Intro leads with human feeling ("社員に安心して") rather than system explanation. "どちらにとっても意味のある選択" (sales endorsement) removed. dc-note box added for procedural clarity without disrupting tone.

- `academy.html`: Rewritten. Hero declares the page's nature ("自分の内側に、戻っていく場所"). Dreamin' Engine introduced as philosophy, not feature. Spiral growth explained as deepening. Bridge section added (human presence, founder's voice). Resonance questions replace target-audience list.

- `about.html`: Created new. Hero: "一人の問いが、場所になった。" Founder's path told as a sequence of questions. Three-pillars section explains why DX/DC/Academy share one home. BEAT EIGHT EMOTION name meaning explained. Mission stated as living commitment.

### Philosophy notes
The redesign replaced a persuasion-based structure (service + value + target + CTA) with a resonance-based structure (being + philosophy + question + quiet invitation) across all pages.

### Deployed
[ ] Yes — commit: (pending first deploy from this harness)
[x] No — local development complete

---

## 2025-04-15 — Site-wide tone refinement

**Scope:** index.html, dx.html, dc.html, academy.html, about.html (copy only)
**Triggered by:** Cross-page consistency review
**Mode used:** Implementer (targeted edits)

### Changes

- `index.html`: "どこに当てはまるかわからない方も" → "どれにも当てはまらない気がしても". Footer About link added.
- `dx.html`: "その経験から言えることがあります" → "ひとつ感じていることがあります". "丁寧に扱います" → "のそばに留まります". Footer About link added.
- `dc.html`: "きちんと考えてあげたい" → "一緒に考えたい". Removed sales endorsement line. Softened dc-note.
- `academy.html`: "たいてい、四つのどこかがずれています" → "四つのどこかがずれていることがあります". Footer About link added.
- `about.html`: Removed "現在" from three-pillars intro. Inline styles moved to CSS class.

### Philosophy notes
Removed the last traces of categorizing, assertive, and service-adjacent language. Site now reads as a continuous quiet voice across all pages.

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-04-15 — Harness build + index.html pipeline refinement

**Scope:** index.html (copy refinement); skills/, docs/, prompts/, README.md (new harness infrastructure)
**Triggered by:** Harness-driven Reader → Designer → Guardian → Implementer pipeline run on index.html
**Mode used:** Reader → Designer → Guardian → Implementer → Deployer

### Changes

- `index.html`: Philosophy section — removed conclusion statement ("外側を変えても…"), kept observation only ("変わっていく場面も、戻っていく場面も"). Two-questions — removed `#paths` anchor links (section now mirrors, not navigates); "したい" → "気がする" (recognition, not desire). Paths — "外側に" → "隣に"; "制度的な基盤" → "土台"; link labels renamed to service names. CTA — removed "歓迎します"; closed with "ここから。"

- `README.md`: Replaced single-line placeholder with full harness documentation (pipeline overview, usage guide, prompt reference table).

- `skills/hp-reader.md`: New. Observation-only analysis protocol. Output format: Structure Summary → Page Breakdown → Message Flow → Issues (tagged by type).

- `skills/hp-designer.md`: New. Design-only protocol with 5-point Philosophy Compliance Check. Never implements.

- `skills/hp-guardian.md`: New. Gatekeeper. 5-point compliance check; verdicts: Approved / Revise / Reject. Nothing proceeds without Approved.

- `skills/hp-implementer.md`: New. Translates approved designs to HTML/CSS. Follows existing class names. Never designs.

- `skills/hp-deployer.md`: New. Pre-deploy checklist, git workflow, commit format, rollback protocol.

- `docs/b8e-philosophy.md`: New. Authoritative philosophy reference. Core principles, two-axis model, name meaning, communication style.

- `docs/writing-principles.md`: New. Language guidelines: words to use freely, words to avoid, patterns for hero/resonance/CTA copy.

- `docs/site-structure.md`: New. Page inventory, CSS class documentation, navigation requirements, deployment architecture.

- `prompts/improve-homepage.md`: New. Ready-to-use prompt for index.html improvement cycle.
- `prompts/refine-copy.md`: New. Copy-only refinement pass prompt.
- `prompts/improve-dx-page.md`: New. DX page improvement prompt.
- `prompts/improve-academy-page.md`: New. Academy page improvement prompt.
- `prompts/polish-site-wide.md`: New. Cross-page consistency pass prompt.

### Philosophy notes
The harness encodes the B8E Philosophy Layer as a non-negotiable constraint in every step of the pipeline — Reader observes, Designer resonates, Guardian enforces, Implementer serves. The index.html refinements removed the last instances of the site stating its conclusions rather than creating space for the reader to arrive at them.

### Deployed
[x] Yes — commit: refine: deepen index.html resonance + add improvement harness
[ ] No — pending

---

## 2026-04-15 — Visual tone refinement (style.css only)

**Scope:** `style.css` — visual only, no HTML or content changes
**Triggered by:** Reader analysis of visual inconsistencies; full Reader → Designer → Guardian → Implementer pipeline
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

- `body letter-spacing`: `0.01em` → `0.02em` — Japanese body text breathes more
- `.hero background`: flat `#1a1a1a` → `linear-gradient(160deg, #1e1e1e 0%, #141414 100%)` — barely perceptible depth; removes flatness
- `.hero-copy font-weight`: `400` → `300` — lighter opening line; more space around the first words
- `.philosophy background-color`: `#ffffff` → `#faf9f7` — warms the white panel; unifies with body palette
- `.paths background-color`: `#ffffff` → `#faf9f7` — same; removes competing neutral
- Borders unified: `#ddd`, `#e0e0e0`, `#e8e6e3` → single value `#e6e4e1` across `.question-block`, `.path-card`, `.section-block`, `.resonance-questions`, `.quiet-cta`
- `.section-block h3 font-weight`: `600` → `400` — uppercase labels at 0.78rem read cleaner at regular weight
- `.resonance-questions h3 font-weight`: `600` → `400` — same
- Accent color `#9b7b5c` introduced — muted warm amber, used exclusively in:
  - `.quiet-cta .cta-link` color + border (default and hover)
  - `.back-link:hover` color

### Philosophy notes
The accent color appears only at moments of invitation — the CTA link and the back link on hover. It gives warmth to the reader's choice without decorating the surrounding space. The white panel unification and border consolidation removed the last sources of visual inconsistency in the palette.

### Deployed
[x] Yes — commit: style: visual tone refinement — accent color, warmth, typography
[ ] No — pending

---

## 2026-04-15 — Hero atmosphere refinement (all pages)

**Scope:** `style.css` (.hero), `dx.html` (.dx-hero), `dc.html` (.dc-hero), `academy.html` (.academy-hero), `about.html` (.about-hero) — background CSS only
**Triggered by:** Reader analysis: all heroes reading as flat dark walls; goal: "air, not black"
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

Single consistent change applied to all five hero classes:

```css
background:
  radial-gradient(ellipse at 50% 40%, rgba(255,235,200,0.055) 0%, transparent 58%),
  linear-gradient(180deg, #1c1a17 0%, #111010 100%);
```

Replacing: `background-color: #1a1a1a` (page heroes) and `linear-gradient(160deg, #1e1e1e 0%, #141414 100%)` (index hero).

- Radial layer: warm cream at ~5.5% opacity, centered at 50% 40% — creates imperceptible atmospheric softness around the text position. Invisible as a shape; felt as depth.
- Linear layer: `#1c1a17` (barely warm dark) → `#111010` (near-black), straight down — gives the field direction. Top is slightly less heavy than bottom. Replaces diagonal (160deg) with vertical (180deg).
- No HTML structure changes. No content changes. Mobile breakpoints (padding only) untouched.

### Philosophy notes
The darkness is now a space, not a wall. The change is invisible as technique — it contributes only as quality. The reader arrives in air rather than encountering a surface.

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---
