# Phase 10-B3｜Remaining Academy Shell Cleanup — 実装記録（b8e-lab）

> 旧 Dreamin' Spiral Academy の Public Shell（入口 ・ 3 入口モデル ・ 申込 ・ サンクス ・ Portal prototype ・ archive PDF）を退役し、redirect 済み source file と Academy 専用 CSS ・ asset を物理的に整理した Web 実装の記録。
> **設計 ・ 判断の正本は OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §15。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | 実装済み ・ Preview 検証待ち |
| 実装日 | 2026-09-17 |
| Branch | `feature/phase-10b3-academy-shell-cleanup` |

## 1. Public URL final state

| URL | Before | After | 変更 |
|---|---|---|---|
| `/academy.html` | 200 | **308 → `/#dreamin-spiral`** | `vercel.json` に redirect 追加 ・ file 削除 |
| `/academy/program.html` | 200 | 404 | file 削除（redirect なし） |
| `/academy/owner-program.html` | 200 | 404 | file 削除（redirect なし。Business Creation へ redirect しない） |
| `/academy/apply.html` | 200 | 404 | file 削除 |
| `/academy/thanks.html` | 200 | 404 | file 削除 |
| `/academy/premium-portal.html` | 200 | 404 | file 削除 |
| `/academy/session.html` ・ `community.html` ・ `community-apply.html` ・ `community-success.html` ・ `library.html` | 308 | 308（不変） | source file 削除。redirect は `vercel.json` に独立 |
| `/academy/pdf/<file>.pdf`（7） | 308 | 308（不変） | source file 削除 |
| `/academy/pdf/archive/<file>.pdf`（7） | 200 | 404 | file 削除（OS repo `content/library/archive/` と byte 一致を確認済み） |
| `/academy/premium*.html`（3） | 404 | 404 | Phase 10-B1 で退役済み |

`/#dreamin-spiral` の fragment は Vercel redirect の `destination` にそのまま含め、ブラウザは TOP の `section#dreamin-spiral` へ移動する。

## 2. Files deleted

- HTML（11）：`academy.html`、`academy/program.html` ・ `owner-program.html` ・ `apply.html` ・ `thanks.html` ・ `premium-portal.html` ・ `session.html` ・ `community.html` ・ `community-apply.html` ・ `community-success.html` ・ `library.html`
- PDF（14）：`academy/pdf/*.pdf`（7 ・ redirect 済み source）、`academy/pdf/archive/*.pdf`（7）
- OGP（8）：`assets/ogp/generated/academy.png` ・ `program.png` ・ `owner-program.png` ・ `apply.png` ・ `session.png` ・ `community.png` ・ `community-apply.png` ・ `library.png`
- Asset（5）：`assets/academy/premium/month01/content01-thumbnail.png` ・ `content02-thumbnail.png`、`assets/community/bg_v01.png` ・ `thumbnail_v01.png`、`assets/line-qr-black.png`
- untracked の `academy/.DS_Store`（Finder metadata）も削除し、`academy/` ・ `assets/academy/` ・ `assets/community/` ディレクトリは無くなった

削除前の確認：残る tracked file（`docs/` ・ README 類を除く）からの参照 0。`dreamin-spiral/guide/index.html` ・ `dreamin-spiral/library/index.html` の HTML comment に旧 URL の記述が残るが、表示 ・ 動作には関係しないため変更していない。

Kept：`assets/ogp/generated/top.png` ・ `about.png`、`assets/ogp/master/OGP_Template_Master.pptx`、`assets/brand/`、`assets/dc/`（DC 領域 ・ 対象外）、`scroll.js`、Current Library PDF 7 件。

## 3. about.html

| 箇所 | Before | After |
|---|---|---|
| 「なぜ、この三つが一つの場所にあるのか」 | DX支援、企業型DC、Dreamin' Spiral Academyです。 | DX支援、企業型DC、Dreamin' Spiral 🌱です。 |
| 会社情報 | DX支援 / PJ推進支援 / 企業型DC導入支援 / Dreamin' Spiral Academy | DX支援 / PJ推進支援 / 企業型DC導入支援 / Dreamin' Spiral 🌱 |

文言は名称のみ変更。375px で「す。」だけが次の行に残らないよう、名称部分を既存の `.ds-phrase`（語句単位で折り返す）で包んだ（375px ・ 320px ・ desktop で確認）。

## 4. CSS（`style.css`）

| 項目 | 値 |
|---|---|
| Rules before | 585（4,272 行） |
| Rules removed | 327（selector の class が現行 21 ページのどこにも無い rule） |
| Grouped selector の partial edit | 2（`.academy-hero, .program-hero, .apply-hero, .thanks-hero, .library-hero, .session-hero, .owner-program-hero` の desktop / 600px → `.thanks-hero` のみ残す） |
| Rules after | 258（1,771 行） |
| 空になった `@media` block | 25 を削除 |
| 空になった section comment | 53 を削除。残る共用部分の見出しを「Shared page components」に更新 |

判定方法：現行 21 ページ（HTML comment を除く）の `class` 属性 ＋ `scroll.js` が付与する `fade-in` ・ `is-visible` を「使用中 class」とし、selector に未使用 class を 1 つでも含むものを「一致し得ない selector」とした（`:not()` ・ `:has()` 等は style.css に無い）。section 単位では削除していない。

Regression 検証（local static server ・ Chromium ・ reduced motion）：

- 現行 21 ページ × desktop 1280px ／ mobile 375px の **全要素の computed style（主要 40 property ＋ `::before` ／ `::after`）が main と完全一致**
- full-page screenshot の pixel 差分は About の名称変更 2 箇所のみ（他 40 枚は差分 0）
- 削除した selector は現行ページの要素に一致し得ないため、`:hover` ／ `:focus` 状態の style にも影響しない

## 5. Other

- `vercel.json`：redirect 12 → 13（先頭に `/academy.html` を追加）
- `README.md`：Site Files から `academy.html` を外し `dreamin-spiral/` を記載
- `docs/site-structure.md` ・ `assets/ogp/README.md` ・ `docs/improvement-log.md`：Phase 10-B3 を追記（過去の記述は当時の記録として保持）
- Formspree form（旧 `session.html` の inquiry form）：到達不能。今回は disable していない（Owner Action ／ Later）
