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
[x] Yes — commit: style: hero atmosphere — air not black, all pages
[ ] No — pending

---

## 2026-04-15 — Typography and spacing refinement

**Scope:** `style.css` only — line-height and margin-top values; no HTML or content changes
**Triggered by:** Reader analysis of rhythm inversion — resonance questions (most contemplative text) had tightest spacing (8px); hero had same line-height as body
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

12 properties adjusted. All in `style.css`.

- `body line-height`: `1.9` → `2.0` — align with `p` rule; clean shared baseline
- `p line-height`: `2.0` → `2.1` — slight lift for all unstyled paragraphs
- `.hero-copy line-height`: `2.0` → `2.2` — opening words at font-weight 300 can hold more vertical space
- `.hero-copy letter-spacing`: `0.04em` → `0.05em` — marginally more expansive; felt not seen
- `.philosophy p line-height`: `2.2` → `2.3` — the site's most considered text; one step further
- `.philosophy p + p margin-top`: `24px` → `32px` — more pause between separate thoughts
- `.question-block p line-height`: `1.9` → `2.0` — raised to body baseline
- `.path-card p line-height`: `1.8` → `1.95` — raised from system's tightest value toward body
- `.section-block p + p margin-top`: `16px` → `24px` — content paragraphs need pause between thoughts
- `.resonance-questions p + p margin-top`: `8px` → `16px` — each line must land before the next arrives
- `.page-intro p + p margin-top`: `20px` → `28px` — intro sets the page tone; more pause
- `.quiet-cta p line-height`: `2.0` → `2.2` — invitation breathes at the philosophy register

### Philosophy notes
The rhythm hierarchy now matches the contemplative weight of each section: hero and philosophy breathe the most; footer text remains compact. The resonance questions — the site's most important mirror text — finally have room between them.

### Deployed
[x] Yes — commit: style: typography and spacing refinement — rhythm and immersion
[ ] No — pending

---

## 2026-04-16 — Logo redesign: lemniscate mark + V1 typography (all pages)

**Scope:** `style.css` (logo CSS), all 5 HTML files (header h1 replacement)
**Triggered by:** Logo redesign request — existing h1 at font-weight 600 contradicted site philosophy
**Mode used:** Designer → Implementer (three variations presented, V3 + V1 selected)

### Changes

- `style.css`: replaced `.site-header h1` bold rule with new wordmark style (font-weight 200, 0.36em tracking, warm `#c0b8ad`). Added `.logo-mark` (inline-flex column) and `.logo-lemniscate` (48×19px, opacity 0.6). Dimmed tagline to `#424039`.
- All 5 HTML files: replaced `<h1>B8E</h1>` with `.logo-mark` containing inline SVG lemniscate + `<h1>B8E</h1>`.
- SVG: figure-8 lemniscate, viewBox 0 0 80 32, two ellipses (rx 18, ry 10) meeting at center (40,16). stroke `#c9a882`, stroke-width 1.1, opacity 0.6. `aria-hidden="true"` — h1 text provides semantic identity.

### Philosophy notes
The logo no longer announces itself. The lemniscate (∞) appears at 60% opacity — barely a shape. The wordmark at font-weight 200 is the quietest text on the site. A reader scrolling through will discover the mark rather than be greeted by it. EIGHT = ∞ is now visible in the header, not merely encoded in the name.

### Deployed
[x] Yes — commit: design: lemniscate logo mark — V3 + V1 typography, all pages
[ ] No — pending

---

## 2026-04-16 — Scroll experience refinement

**Scope:** `style.css` (spacing + fade CSS), new `scroll.js`, all 5 HTML files (script tag + hero padding)
**Triggered by:** Explicit scroll refinement request — "scrolling should feel like breathing, not navigation"
**Mode used:** Implementer (direct implementation, goals specified by user)

### Changes

**Spacing (style.css):**
- `p line-height`: `2.1` → `2.2`
- `.hero padding`: `88px 40px` → `112px 40px` — initial pause before first content
- `.philosophy padding`: `64px 40px` → `80px 40px`
- `.two-questions padding`: `64px 40px` → `80px 40px`
- `.paths padding`: `64px 40px` → `80px 40px`
- `.page-content > * + * margin-top`: `56px` → `72px` — breathing room between service page blocks

**Page hero padding (HTML inline CSS):**
- `.dx-hero`, `.dc-hero`, `.about-hero`: `96px → 120px`
- `.academy-hero`: `104px → 120px`

**Fade-in CSS (style.css, section 16):**
- `.fade-in { opacity: 0.12; transition: opacity 1.6s ease; }`
- `.fade-in.is-visible { opacity: 1; }`
- `@media (prefers-reduced-motion: reduce)` — disables animation for accessibility

**scroll.js (new):**
- IntersectionObserver: `threshold: 0.07`, `rootMargin: 0px 0px -32px 0px`
- Targets: `.philosophy-inner`, `.two-questions-inner`, `.paths-grid`, `.section-block`, `.page-intro`, `.resonance-questions`, `.quiet-cta`
- Elements visible in initial viewport (top < 92% of innerHeight) receive no animation
- Elements below fold: `.fade-in` class added; fade from `0.12 → 1` on entry
- Feature-detected: no-op if IntersectionObserver unavailable
- Observes each element once, then unobserves (no re-trigger)

### Philosophy notes
The fade targets only inner content containers — not section backgrounds. Backgrounds remain solid; only text/content surfaces arrive gently. The reader does not notice the animation; they notice that each thought seems to arrive at the right moment.

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-05-20 — DC page bridge and trust structure

**Scope:** `dc.html`, `style.css`, `docs/improvement-log.md`
**Triggered by:** User request — dc page lacked bridge from world-view to concrete situation; small-business owners and solo directors couldn't immediately recognize themselves
**Mode used:** Implementer

### Changes

- `dc.html`: Added "こんな経営者の方へ" section as first block in page-content — five concrete situations (法人化・小規模・社長一人・採用・長期安心) using `.resonance-questions` styling so tone stays consistent. Modified page-intro to open with empathy about executives putting their own future on hold ("経営者は、会社のことを考え続けている"). Updated resonance-questions to include owner's personal perspective as first item. Added FAQ section (社長一人でも、小規模法人、個人事業主、iDeCoとの違い、社会保険料) inside `.section-block` with new `.faq-items`/`.faq-item` classes. Updated quiet-cta copy to lower consultation barrier ("情報交換ベースで。小規模でも使えるか…そういった問いから話せます"). Added `<meta name="description">` and FAQPage JSON-LD structured data for SEO. Removed dead `.dc-note` CSS.

- `style.css`: Added section 18 — `.faq-items`, `.faq-item`, `.faq-q`, `.faq-a`. FAQ items separated by `#f0eeeb` border; question at `#444`, answer at `#777`.

### Philosophy notes
The page now builds a bridge from world-view to specific situation. Readers who are solo directors or small-company owners can recognize themselves before the philosophical content — the invitation becomes more accessible without losing the quiet B8E tone.

### Deployed
[x] Yes — commit: improve dc page bridge and trust structure
[ ] No — local

---

## 2026-05-21 — Add dc-guide.html LP to b8e site

**Scope:** `dc-guide.html` (new), `assets/dc/` (new), `dc.html` (guide link added)
**Triggered by:** User request — migrate completed LP from dc-growth-system repo to b8e-lab as `/dc-guide.html`
**Mode used:** Implementer

### Changes

- `dc-guide.html`: Ported from `dc-growth-system/lp/vercel-ready/dc-guide.html`. Changes from source: image paths updated to `/assets/dc/` (3 places); CTA `href="/contact"` changed to `mailto:contact@b8e.co.jp` (2 places); footer nav updated to match b8e-lab nav structure (TOP/DX支援/企業型DC/Academy/About/お問い合わせ); Vercel Insights script added; residual `<!-- VERCEL: -->` migration comments removed. Global `style.css` is intentionally NOT linked — the page uses its own complete design system to avoid CSS conflicts.

- `assets/dc/`: New directory. Three images copied from dc-growth-system (img-01-asset-flow.png 1.4MB, img-02-social-insurance.png 1.9MB, img-03-welfare.png 2.3MB).

- `dc.html`: Added `.guide-link-block` section (CSS in inline `<style>`) between FAQ and quiet-cta. Points to `/dc-guide.html`. Navigation flow: dc.html（思想・入口）→ dc-guide.html（制度整理LP）→ contact.

### Philosophy notes
dc-guide.html is a standalone LP with its own design language — it does not inherit B8E's site-wide CSS. The connection to the site is maintained through the header back-link (`← 企業型DCについて`) and footer navigation.

### Deployed
[x] Yes — commit: add dc-guide landing page to b8e site
[ ] No — PR pending review

---

## 2026-05-21 — Fix dc-guide SP table and Formspree contact flow

**Scope:** `dc-guide.html` only
**Triggered by:** Vercel Preview review — compare table was horizontally scrolling on SP; CTA used mailto which fails on PC browsers
**Mode used:** Implementer

### Changes

- `dc-guide.html` CSS: Added `.compare-cards` section (hidden by default). Added `@media (max-width: 768px)` block that hides `.table-scroll` and shows `.compare-cards` as flex column of 3 cards (NISA / iDeCo / 企業型DC). 企業型DC card gets `border-color: var(--gold)` and gold header for light emphasis without being sales-heavy. Added `.dc-contact-form` section with B8E-style form (transparent inputs, bottom-border only, gold focus ring, text-link submit button).

- `dc-guide.html` HTML: Added `.compare-cards` block (3 `.ccard` elements) immediately after `.table-scroll`. Replaced 2 `<a class="cta-btn-*" href="mailto:...">` buttons + `.cta-promises` + `.cta-flow` with a Formspree `<form>` (action `https://formspree.io/f/mykleakb`, `_next` → `https://b8e.co.jp/thanks.html`) + `.cta-note` text. Fields: name（任意）/ email（必須）/ message（任意）. Submit: 「少し話してみる」.

### Philosophy notes
The form now matches the B8E site's existing contact experience — transparent inputs, bottom border, text-link submit. The DC card in the comparison carries emphasis through a gold border, not a sales badge. The change removes the mailto fallback that broke desktop browser flows.

### Deployed
[x] Yes — commit: fix dc guide mobile table and formspree contact flow
[ ] No — PR pending review

---

## 2026-05-21 — Consolidate DC contact form into dc-guide page

**Scope:** `dc.html` only
**Triggered by:** User request — duplicate contact forms on dc.html and dc-guide.html; consolidate to dc-guide.html as single contact point
**Mode used:** Implementer

### Changes

- `dc.html`: Removed the `<!-- Quiet CTA — improved -->` block (Formspree `<form>`, `.form-note`, `.contact-form`). Updated `<!-- Guide link -->` block to become the sole CTA at the page end — new text: "制度の詳細・比較・問い合わせフォームは、こちらに整理しています。" / link text: "企業型DCについて、もう少し整理してみる →" / href: `/dc-guide.html`. Role split: dc.html = empathy/entry point; dc-guide.html = detail + FAQ + contact form.

### Philosophy notes
A single contact form on dc-guide.html keeps the entry page (dc.html) as a pure reading experience — no form pressure, no decision moment. The guide page receives readers who are already curious.

### Deployed
[ ] Yes — commit: consolidate dc contact form into guide page
[x] No — PR pending review

---
