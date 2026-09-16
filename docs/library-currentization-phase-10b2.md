# Phase 10-B2｜Library Currentization — 実装記録（b8e-lab）

> 旧 Academy Library を **Dreamin' Spiral 🌱 Library**（日々の気づきや実践に使える、無料の Resource 集）として Current URL へ移行する Web 実装の記録。
> **設計・判断の正本は OS repo `docs/repository-architecture/old-academy-cleanup-v1.md` §14。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | Owner Reality Review 待ち（Preview） |
| 実装日 | 2026-09-16 |
| Branch | `feature/phase-10b2-library-currentization` |

## 1. New URLs

| URL | File | title | robots | canonical |
|---|---|---|---|---|
| `/dreamin-spiral/library/` | `dreamin-spiral/library/index.html` | Dreamin' Spiral 🌱 Library \| B8E | index | `https://www.b8e.co.jp/dreamin-spiral/library/` |
| `/dreamin-spiral/library/pdf/<file>.pdf` | `dreamin-spiral/library/pdf/*.pdf`（7 件） | — | — | — |

- Header / Footer は Guide ・ Community Service Page と同一。og:image なし（他の `/dreamin-spiral/*` と同じ）
- **CSS 変更なし。** Resource 一覧は TOP の Service Family と同じ `.ds-family-list` / `.ds-family-item` を再利用
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
| `awakening-guide.pdf` | repo 内に source なし（Google 書き出しの画像 PDF） | 旧ファイルと同一。表紙画像に「B8E ACADEMY / エイト」 |
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
