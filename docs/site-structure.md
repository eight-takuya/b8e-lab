# Site Structure

> Current state of the b8e-lab website as deployed to https://www.b8e.co.jp/ via GitHub + Vercel.

---

## Pages

| File | URL path | Title | Role |
|---|---|---|---|
| `index.html` | `/` | B8E \| BEAT EIGHT EMOTION | Entry point. Philosophy first, paths second. |
| `dx.html` | `/dx` | DX支援 \| B8E | External transformation via DX consulting |
| `dc.html` | `/dc` | 企業型DC \| B8E | Financial foundation via corporate DC |
| `academy.html` | `/academy` | Dreamin' Spiral Academy \| B8E | Internal transformation via the Academy |
| `about.html` | `/about` | About \| B8E | Founder's path, company identity, name meaning |

---

## Stylesheet

| File | Role |
|---|---|
| `style.css` | Single shared stylesheet for all pages. No external dependencies. |

---

## Page Structure (all pages)

```
<header class="site-header">     — B8E wordmark + BEAT EIGHT EMOTION tagline
<nav class="site-nav">           — Links to all 5 pages; .current on active page
<main>
  [hero section]                 — Page-specific hero with dark background
  [page content]                 — .page-content wrapper (max-width: 720px)
    .page-intro                  — Opening paragraphs (philosophy-first)
    .section-block(s)            — Content sections separated by top border
    .resonance-questions         — Questions that mirror the reader's state
    .quiet-cta                   — Soft contact invitation
    .back-link                   — ← TOP (service pages only)
<footer class="site-footer">     — Brand, nav links, copyright
```

---

## CSS Class Reference

### Layout
| Class | Purpose |
|---|---|
| `.page-content` | Center column, max-width 720px, large padding |
| `.page-intro` | Opening text block, larger font, generous line-height |

### Sections
| Class | Purpose |
|---|---|
| `.section-block` | Content section with top border separator |
| `.resonance-questions` | Question list, mirrors reader's inner state |
| `.quiet-cta` | Contact invitation, text-link only, no button |
| `.back-link` | ← TOP link, appears after quiet-cta |

### TOP page only
| Class | Purpose |
|---|---|
| `.hero` | Full-width dark hero (TOP page) |
| `.philosophy` | White background text block |
| `.two-questions` | Two-column self-selection block |
| `.paths` | Three-column service path grid |
| `.path-card` | Individual path within paths grid |
| `.question-block` | Individual question within two-questions |

### Hero variants (service pages)
| Class | Purpose |
|---|---|
| `.dx-hero` | DX page hero |
| `.dc-hero` | DC page hero |
| `.academy-hero` | Academy page hero |
| `.about-hero` | About page hero |

All hero variants share: dark background, `.hero-label` (small uppercase), `.hero-copy` (light weight, generous line-height).

### Footer
| Class | Purpose |
|---|---|
| `.site-footer` | Dark footer wrapper |
| `.site-footer-inner` | Two-column grid: brand + nav |
| `.footer-brand` | Company name + one-line description |
| `.footer-links` | Column of page links |
| `.footer-bottom` | Copyright line |

---

## Navigation Completeness

All 5 pages must appear in both the `<nav>` and the footer `<nav>`:
- TOP
- DX支援
- 企業型DC
- Dreamin' Spiral Academy
- About
- お問い合わせ (mailto link, footer only)

---

## Deployment

- **Repository**: GitHub (`main` branch)
- **Hosting**: Vercel (auto-deploys on push to `main`)
- **Live URL**: https://www.b8e.co.jp/
- **Public site platform**: The current live www.b8e.co.jp runs on Wix (separate from this repo). This b8e-lab repo is the redesigned static site in development.
