# Phase 10-A｜Guide / Community Old Academy Cleanup — 実装記録（b8e-lab）

> Guide / Community について、旧 Academy の公開入口を Current URL へ恒久 redirect し、二重入口を解消する Web 実装の記録。
> **設計・判断の正本は OS repo `docs/repository-architecture/old-academy-cleanup-v1.md`。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | 実装中（Production 反映前） |
| 実装日 | 2026-09-16 |
| Branch | `feature/phase-10a-guide-community-redirects` |

## 1. Redirects

`vercel.json` を新規作成し、`redirects` だけを定義した（`cleanUrls`・`trailingSlash`・`headers`・build 設定は追加していない）。
`permanent: true` は Vercel 上 **HTTP 308 Permanent Redirect**。query string は destination へ引き継がれる。

| Old URL | Destination | Type |
|---|---|---|
| `/academy/session.html` | `/dreamin-spiral/guide/` | 308 |
| `/academy/community.html` | `/dreamin-spiral/community/` | 308 |
| `/academy/community-apply.html` | `/dreamin-spiral/community/` | 308 |
| `/academy/community-success.html` | `/dreamin-spiral/community/complete/` | 308 |

- destination はすべて実ファイル（`<dir>/index.html`）で、redirect の対象外。loop / chain は構造上発生しない
- 旧 HTML 4 ファイルは**削除していない**（Vercel の redirect は filesystem より先に評価されるため、到達しない。削除要否は Phase 10-B）
- `academy/thanks.html`（`session.html` の Formspree 送信後ページ）は変更していない

## 2. 変更していないもの

- Current Guide / Community / 3 Weeks / My Life / Payment Foundation / TOP / Legal の HTML・CSS
- `academy.html`・`academy/program.html`・`academy/premium*.html`・`academy/owner-program.html`・`academy/library.html`・`academy/apply.html`・`academy/thanks.html`・`academy/premium-portal.html`・`academy/pdf/*`・関連 assets / OGP
- GAS Booking URL（Guide CTA の遷移先）
