# Site Structure

> Current state of the b8e-lab website as deployed to https://www.b8e.co.jp/ via GitHub + Vercel.
>
> Academy 配下のページ構成・Notion Knowledge Architecture との対応・実装状況は「Academy Site Map」以降を参照。Dreamin' Spiral Academy の Notion 側構造は [dreamin-spiral-core/docs/06_implementations/academy-knowledge-architecture.md](https://github.com/eight-takuya/dreamin-spiral-core/blob/main/docs/06_implementations/academy-knowledge-architecture.md) を正本とする。

---

## Top-level Pages

| File | URL path | Title | Role |
|---|---|---|---|
| `index.html` | `/` | B8E \| BEAT EIGHT EMOTION | Entry point. Philosophy first, paths second. |
| `dx.html` | `/dx` | DX支援 \| B8E | External transformation via DX consulting |
| `dc.html` | `/dc` | 企業型DC \| B8E | Financial foundation via corporate DC |
| `academy.html` | `/academy` | Dreamin' Spiral Academy \| B8E | Internal transformation via the Academy（Academy入口） |
| `about.html` | `/about` | About \| B8E | Founder's path, company identity, name meaning |

`dc-guide.html` は DC 領域の補助ページ（本ドキュメントの調査対象外。Academy とは無関係）。

---

## Academy Site Map

`academy.html` を入口として、`academy/` 配下にプログラム紹介・導線ページが存在する。

**訂正（実URLで検証済み）:** 本サイトは `vercel.json` を持たず、Vercel の Clean URLs は有効になっていない。全ページ **`.html` 拡張子付きのURLでのみ実在**する（例: `academy.html` → 実在するのは `https://www.b8e.co.jp/academy.html`。`https://www.b8e.co.jp/academy` は404）。以下は実際にHTTPアクセスして確認した実URL。

```
https://www.b8e.co.jp/academy.html                    Academy入口（Program概要）
├─ /academy/program.html     実践の形（Program全体説明・参加導線ハブ）
├─ /academy/session.html     無料ガイドセッション（リード獲得LP）
├─ /academy/apply.html       参加方法を選ぶ（申込フォーム）
├─ /academy/thanks.html      届きました（サンクスページ）
├─ /academy/library.html     人生再起動ガイド（Library PDF配布）
│   └─ /academy/pdf/*.pdf                              PDF実体（7件。うち1件はarchiveと重複）
├─ /academy/community.html   Community Portal（作成途中・Client My Page候補）
└─ /academy/premium.html     Premium（作成途中・Client My Page候補）
```

`academy/community.html` と `academy/premium.html` は、直接URLアクセスは可能（サイトには実在する）だが、サイト内のどこからもリンクされていない。内容的にも Program の紹介LPではなく、Community/Premium参加者向けの **Client My Page（マイページ）の作成途中版**である（詳細は下記「Notion Architecture 対応」参照）。

### 現在の導線（実際にクリックして辿れる経路）

```
academy.html
  ├→ academy/session.html   （無料ガイドセッションへ）
  └→ academy/library.html   （PDF配布へ）

academy/session.html
  ├→ academy/apply.html#consult
  ├→ academy/program.html
  └→ LINE（外部・lin.ee）

academy/program.html
  ├→ academy/session.html
  ├→ academy/library.html
  ├→ Stripe Checkout（外部・buy.stripe.com ×2リンク）
  └→ LINE（外部）

academy/apply.html
  ├→ academy/program.html
  ├→ academy/session.html
  ├→ Stripe Checkout（外部 ×2リンク）
  └→ 送信後 → academy/thanks.html（Formspree経由）

academy/community.html   ← どこからもリンクされていない（Client My Page 作成途中）
academy/premium.html     ← どこからもリンクされていない（Client My Page 作成途中）
```

**Formspree連携:** `academy/apply.html` のフォーム（`action="https://formspree.io/f/xgoqybbl"`）は送信後 `https://www.b8e.co.jp/academy/thanks.html` にリダイレクトする（`_next` hidden field）。これにより本番ドメイン `www.b8e.co.jp` が現行の実装先であることを確認済み（旧「Wixが本番」という記述は本ドキュメントで訂正した。下記「Deployment」参照）。

**Stripe決済:** `program.html` / `apply.html` に2本の Stripe Checkout リンクが埋め込み済み（Community用・Premium用と推測されるプラン別リンク）。決済導線自体は実装済みだが、`community.html` / `premium.html` の紹介ページとは接続されていない。

---

## Page Role

| Page | 役割 |
|---|---|
| `academy.html` | Academy入口。Programの概要・思想・Session/Libraryへの導線 |
| `academy/program.html` | 実践の形。Program全体説明であり、実質的な参加導線ハブ（Session/Library/Stripe決済/LINEへの集約点） |
| `academy/session.html` | 無料ガイドセッション。リード獲得のためのLP |
| `academy/apply.html` | 参加方法を選ぶ。Formspree連携の申込フォーム |
| `academy/thanks.html` | 届きました。申込完了後のサンクスページ |
| `academy/library.html` | 人生再起動ガイド。Library PDF（7件）の配布ページ |
| `academy/community.html` | Community参加者向け Client My Page の作成途中版（Journey / Group Session / Personal Session / Archive Content / Schedule構成）。Program紹介LPではない。現状どこからもリンクされていない |
| `academy/premium.html` | Premium参加者向け Client My Page の作成途中版（6か月の旅路・Month Overview構成）。Program紹介LPではない。`feature/premium-ux-improvement` ブランチで作業中 |

---

## Notion Architecture 対応

Dreamin' Spiral Academy の Notion Knowledge Architecture（`Fields > 🎓 Dreamin' Spiral Academy`）と、本サイトの実装ページの対応表。Notion側の構造は [academy-knowledge-architecture.md](https://github.com/eight-takuya/dreamin-spiral-core/blob/main/docs/06_implementations/academy-knowledge-architecture.md) を参照。

| Web Page | Notion配置場所 |
|---|---|
| `academy.html` | 🌐 Web / Platform > LP（Academy Top） |
| `academy/program.html` | 🌐 Web / Platform > LP（Program） |
| `academy/session.html` | 🌐 Web / Platform > LP（Session） |
| `academy/apply.html` | 🌐 Web / Platform > LP（Apply） |
| `academy/thanks.html` | 🌐 Web / Platform > LP（Thanks） |
| `academy/library.html` | 🌐 Web / Platform > LP（Library）※PDF実体7件は教材資産として 📚 Contents Library 側の棚卸し対象（本ドキュメントの調査対象外） |
| `academy/community.html` | 🌐 Web / Platform > Client My Page（Community Portal Page。作成途中／要導線設計） |
| `academy/premium.html` | 🌐 Web / Platform > Client My Page（Premium Portal Page。作成途中／要導線設計） |
| （設計のみ・未実装） | 🌐 Web / Platform > Client My Page（Community Portal Design / Premium Portal Design） |

`academy/community.html` ・ `academy/premium.html` は、当初 🏫 Programs 側（各Programの紹介ページ）に対応すると考えていたが、実際には Client My Page の作成途中版であることが判明し、Notion側も Web / Platform > Client My Page 配下へ再配置した（2026年7月）。

Notion側との同期は `dreamin-spiral-core/scripts/notion-setup/sync-academy-existing-assets.js`（初回棚卸し）→ `rebuild-web-platform-toggles.js`（トグル構造化）→ `fix-web-platform-lp-clientmypage.js`（library.html追加・Community/Premium再配置）で実施済み（2026年7月）。

---

## Status

| Page / 機能 | Status | 備考 |
|---|---|---|
| `academy.html` | ✅ Released | 本番稼働中 |
| `academy/program.html` | ✅ Released | 本番稼働中。参加導線ハブとして機能 |
| `academy/session.html` | ✅ Released | 本番稼働中 |
| `academy/apply.html` | ✅ Released | Formspree連携済み・本番稼働中 |
| `academy/thanks.html` | ✅ Released | 本番稼働中 |
| `academy/library.html` + PDF 7件 | ✅ Released | 本番稼働中 |
| Stripe Checkout連携（Community/Premium） | ✅ Released | `program.html` / `apply.html` に埋め込み済み |
| `academy/community.html`（Client My Page 作成途中） | 🚧 In Progress | ページ自体は実装済みだが、サイト内のどこからもリンクされていない（導線未接続） |
| `academy/premium.html`（Client My Page 作成途中） | 🚧 In Progress | `feature/premium-ux-improvement` ブランチで作業中。導線未接続 |
| Community/Premium Portal Design（設計ドキュメント） | ✅ Released（設計のみ） | `dreamin-spiral-core/docs/session-library/{community,premium}/portal/` に存在。実装（ログイン等）は別途 |
| Community / Premium Portal ページへの導線接続 | 📅 Planned | 未着手 |
| Client My Page（認証・ログイン機能） | 📅 Planned | 実装未着手 |

---

## Future

- **Client My Page** — ログイン・マイページ機能。`academy/community.html` / `academy/premium.html` はその作成途中版として既に存在するが認証機能はない。Portal 設計ドキュメント（`community/portal/`・`premium/portal/`。Community側は認証アーキテクチャの設計を含む）も別途存在
- **Community / Premium Portal ページの導線接続** — 参加者が実際に辿り着けるよう、ログイン後の導線を設計する（現状は孤立ページ）
- **Premium UX改善** — 現在進行中の `feature/premium-ux-improvement` ブランチでの作業

---

## Stylesheet

| File | Role |
|---|---|
| `style.css` | Single shared stylesheet for all pages. No external dependencies. |

## Shared Script

| File | Role |
|---|---|
| `scroll.js` | IntersectionObserver によるスクロール時フェードイン演出。全ページ共通で読み込む。ルーティング・状態管理は行わない |

**Components について:** このリポジトリはフレームワーク（React/Vue等）を使わない静的HTMLサイトであり、再利用可能な「コンポーネント」システムは存在しない。ヘッダー・ナビゲーション・フッターは各HTMLファイルに個別に複製されている（テンプレート共通化は未導入）。

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
| `.community-hero-title` / `.community-hero-copy` | Community page hero |
| `.premium-hero-title` / `.premium-hero-copy` | Premium page hero |

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

All 5 top-level pages must appear in both the `<nav>` and the footer `<nav>`:
- TOP
- DX支援
- 企業型DC
- Dreamin' Spiral Academy
- About
- お問い合わせ (mailto link, footer only)

**既知のギャップ:** `academy/community.html` と `academy/premium.html`（Client My Page 作成途中版）は、上記のグローバルナビとは別に、Academy内部の導線（`academy.html` / `academy/program.html`）からもリンクされていない。ページ自体は実装済みだが、サイト構造上は到達経路のない孤立ページになっている。

---

## Deployment

- **Repository**: GitHub (`main` branch)
- **Hosting**: Vercel (auto-deploys on push to `main`)
- **Live URL**: https://www.b8e.co.jp/
- **本番ドメインの実装先:** `academy/apply.html` のフォーム送信先（Formspreeの `_next` パラメータ）が `https://www.b8e.co.jp/academy/thanks.html` を指しており、本リポジトリの実装が現在の本番ドメインで稼働していることを確認済み（旧版のこのドキュメントにあった「現行の www.b8e.co.jp はWixで別運用」という記述は事実確認により削除した）
