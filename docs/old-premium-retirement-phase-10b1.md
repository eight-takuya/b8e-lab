# Phase 10-B1｜Old Premium Retirement — 実装記録（b8e-lab）

> 旧 Dreamin' Spiral Academy Premium が公開販売導線として購入可能なまま残っていた状態を終了させる Web 実装の記録。
> **設計・判断の正本は OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §12。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **CLOSED（2026-09-16）。** Production 反映済み（PR #96 `85fbebd`）・3 ページとも 404 を確認。正本：OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §12（Phase 10-B2 ・ B3 NOT STARTED） |
| 実装日 | 2026-09-16 |
| Branch | `feature/phase-10b1-old-premium-retirement`（PR #96） |

## 1. 退役方法

- Canonical に退役ページの Standard はなく、custom 404 page もないため、**ファイル削除 → Vercel 標準 404** とした
- Premium は My Life の単純 Rename ではない（Brand Architecture §6）ため、**redirect は設定しない**（`vercel.json` 変更なし）
- 順序：旧 Premium Live Payment Link（`plink_1TNRkl8tXYwNlHqEmZAjjhiK`）を inactive 化 → 本変更（`premium-success.html` を Payment Link より先に消さない）

| Old URL | Before | After |
|---|---|---|
| `/academy/premium.html` | 200（index・Premium LP） | 404 |
| `/academy/premium-apply.html` | 200（index・Stripe Payment Link） | 404 |
| `/academy/premium-success.html` | 200（noindex・Stripe redirect 先） | 404 |

## 2. 削除した asset

| File | 使用元（削除前） |
|---|---|
| `assets/ogp/generated/premium.png` | `premium.html`・`premium-success.html` のみ |
| `assets/ogp/generated/premium-apply.png` | `premium-apply.html` のみ |

保持：`assets/community/bg_v01.png`（`premium-portal.html` が使用）・`assets/line-qr-black.png`・`apply.png`（他ページが使用）・OGP Master PPTX・`style.css` の Premium 系 class（`premium-portal.html` と共用。Phase 10-B3）。

## 3. 既知の影響（Phase 10-B3 で扱う）

旧 Academy ページに残る Premium への link は 404 になる：`academy.html`・`academy/program.html`・`academy/apply.html`・`academy/owner-program.html`・`academy/premium-portal.html`。Current ページ（TOP ・ Guide ・ Community ・ 3 Weeks ・ My Life ・ Legal）からの link は 0 件。

## 4. 変更していないもの

My Life ・ Business Creation ・ Community ・ Guide ・ 3 Weeks ・ Payment Foundation ・ Legal ・ `academy.html` ・ `program.html` ・ `owner-program.html` ・ `library.html` ・ PDF ・ `vercel.json`。

## 5. Production Validation（2026-09-16）

| 項目 | 結果 |
|---|---|
| `/academy/premium.html` ・ `premium-apply.html` ・ `premium-success.html` | 404（redirect なし） |
| `premium.png` ・ `premium-apply.png` | 404 |
| Current pages | TOP ・ My Life（Service / apply / thanks / complete）・ 3 Weeks ・ Guide ・ Community ・ Community Complete ・ Legal が main と byte 一致 |
| Phase 10-A redirects | 4 件とも 308 |
| 対象外 `/academy/*` ・ PDF | 200 |
