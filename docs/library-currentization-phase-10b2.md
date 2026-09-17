# Phase 10-B2｜Library Currentization — 実装記録（b8e-lab）

> 旧 Academy Library を **Dreamin' Spiral 🌱 Library**（日々の気づきや実践に使える、無料の Resource 集）として Current URL へ移行する Web 実装の記録。
> **後続の変更（2026-09-17）：** Library の Current-facing wording は Library Wording Currentization で「自分に気づくガイドとワーク。／ 日々の中で、自分に気づくための小さなガイドやワークをまとめています。」へ変更された（本書の「Resource」表記は当時の実装記録として保持）。記録：[dreamin-spiral-home-v1.md](dreamin-spiral-home-v1.md) §4
>
> **設計・判断の正本は OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §14。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **CLOSED（2026-09-17）。** Owner Approved（Current Library Page画面 ・ awakening-guide.pdf ・ 8-page Overview画面 ・ Cover Before / After比較画面）→ Production 公開済み（PR #98 `68d6ce9`）・ Production Validation 済み。正本：OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §14（OS PR #232 `a6d4f95` ・ closeout #233） |
| 実装日 | 2026-09-16 |
| Branch | `feature/phase-10b2-library-currentization` |

## 1. New URLs

| URL | File | title | robots | canonical |
|---|---|---|---|---|
| `/dreamin-spiral/library/` | `dreamin-spiral/library/index.html` | Dreamin' Spiral 🌱 Library \| B8E | index | `https://www.b8e.co.jp/dreamin-spiral/library/` |
| `/dreamin-spiral/library/pdf/<file>.pdf` | `dreamin-spiral/library/pdf/*.pdf`（7 件） | — | — | — |

- Header / Footer は Guide ・ Community Service Page と同一。og:image なし（他の `/dreamin-spiral/*` と同じ）
- Resource 一覧は TOP の Service Family と同じ `.ds-family-list` / `.ds-family-item` を再利用。`.page-content` 内では汎用の `.section-block h3` が `.ds-family-name` より優先され見出しが小さな大文字表示になるため、`style.css` A12 に `.ds-service-section` スコープの 2 ルールだけを追加し TOP と同じ見え方に揃えた（他ページへの影響なし：`.ds-service-section` 内で `.ds-family-*` を使うのは本ページのみ）
- TOP の Service Family ・ Header / Footer には Library を追加していない（Library は Service ではない。Navigation 追加は Owner 判断）

## 2. Page 構造

| Section | 内容 |
|---|---|
| Hero | Eyebrow `DREAMIN' SPIRAL LIBRARY` ／ Title ／ Lead（Owner Approved Copy）。CTA なし |
| Resources（`#resources`） | 7 件。各 Resource の title と説明文は旧 `/academy/library.html` の公開済み文言をそのまま使用（新しい説明文は作っていない）。link「PDFを開く」（新しいタブ） |
| Quiet Link | 「話してみたいことがある方へ」→ `Dreamin' Spiral Guide`（`/dreamin-spiral/guide/`） |

旧ページの「Guide」「Prescriptions & Practices」の区分見出しと `#guide` anchor は使っていない（Dreamin' Spiral Guide service との混同を避けるため）。

## 3. PDF

| File（`/dreamin-spiral/library/pdf/`） | Source | Branding |
|---|---|---|
| `awakening-guide.pdf` | OS `pptx/library/00-awakening-guide/build.js`（2026-09-17 Current Edition として再構成し、同日 Reading Weight / Typography Tuning ・ 表紙の光量調整。旧版は source なし） | 表紙：Dreamin' Spiral 🌱 ／ 最終ページ footer：B8E Library \| Dreamin' Spiral 🌱 |
| `being-love-trust-joy.pdf` | OS `pptx/library/01-being-love-trust-joy/build.js` | 再生成：Dreamin' Spiral 🌱 |
| `breathing-practice-3min.pdf` | OS `pptx/library/02-breathing-practice-3min/build.js` | 再生成：Dreamin' Spiral 🌱 |
| `prescription-release-should.pdf` | OS `pptx/library/03-prescription-release-should/build.js` | 再生成：Dreamin' Spiral 🌱 |
| `prescription-paradox-words.pdf` | OS `pptx/library/04-prescription-paradox-words/build.js` | 再生成：Dreamin' Spiral 🌱 |
| `inner-weather-reality.pdf` | OS `pptx/library/05-inner-weather-reality/build.js` | 再生成：Dreamin' Spiral 🌱 |
| `night-letter.pdf` | OS `pptx/library/06-night-letter/build.js` | 再生成：Dreamin' Spiral 🌱 |

## 4. Redirects（`vercel.json`・308）

| Old URL | Destination |
|---|---|
| `/academy/library.html` | `/dreamin-spiral/library/` |
| `/academy/pdf/<file>.pdf`（上表 7 件） | `/dreamin-spiral/library/pdf/<file>.pdf` |

- `/academy/pdf/archive/*` は redirect せず、200 のまま（Historical・どこからも link しない）
- 旧 `academy/library.html` ・ `academy/pdf/*.pdf` の source file は削除していない（redirect が先に評価されるため配信されない。Phase 10-B3）

## 5. Production Validation（2026-09-17）

| 項目 | 結果 |
|---|---|
| `/dreamin-spiral/library/` | 200 ・ main と byte 一致 ・ canonical 自身 ・ index ・ Resource 7 件 ・ 表示テキストに Academy 0 件 ・ 375px で横スクロールなし ・ link は keyboard で focus 可能 |
| `/dreamin-spiral/library/pdf/*.pdf`（7 件） | すべて 200 ・ `application/pdf` ・ main と byte 一致 ・ Academy / エイト 0 件 |
| `/academy/library.html` ・ `/academy/pdf/*.pdf`（7 件） | すべて 308 → Current ・ 1 hop ・ 正しいファイル |
| `/academy/pdf/archive/*` | 200 のまま（Historical ・ 非掲載） |
| Regression | TOP ・ Guide ・ Community ・ 3 Weeks ・ My Life ・ Legal は main と byte 一致、Phase 10-A redirect 308 ・ Premium 404 は不変 |
