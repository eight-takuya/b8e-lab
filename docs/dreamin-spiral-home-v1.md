# Dreamin' Spiral 🌱 Home v1 — 実装記録（b8e-lab）

> Dreamin' Spiral 🌱 の Canonical Home `/dreamin-spiral/` を新設した Web 実装の記録。
> **設計 ・ 意味の正本は OS repo `docs/repository-architecture/dreamin-spiral-home-v1.md`。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | Preview 実装済み ・ **OWNER REVIEW PENDING** |
| 実装日 | 2026-09-17 |
| Branch | `feature/dreamin-spiral-home-v1` |

## 1. New Page

| File | URL | title | robots | canonical |
|---|---|---|---|---|
| `dreamin-spiral/index.html` | `/dreamin-spiral/` | Dreamin' Spiral 🌱 \| B8E | index | `https://www.b8e.co.jp/dreamin-spiral/` |

- Header / Footer / Hero / section は Library ・ Community と同じ構成（`body.ds-page` ・ `.ds-service-hero` ・ `.page-content` ・ `.section-block.ds-service-section` ・ `.ds-service-cta`）
- Service Family は TOP と同じ `.ds-family-list` / `.ds-family-item`（Library と同じ `.ds-service-section` 内の再利用ルール）。番号なし。Business Creation の item に `<a>` を置かない
- 「詳しく見る」4 件には、読み上げで行き先が分かるよう `aria-label`（例「Dreamin' Spiral Guide について詳しく見る」）を付けた。表示文言は Approved Copy のまま
- og:image なし（既存 `/dreamin-spiral/*` と同じ）
- 狭い画面で 1〜2 文字だけが次行に残らないよう、既存の `.ds-phrase`（語句単位で折り返す inline-block）で一部の文を包んだ。文言は変えていない

| Section | Links |
|---|---|
| Hero | なし |
| Dreamin' Spiral 🌱とは | なし |
| 今、気になっているところから。 | なし |
| Service Family | Guide → `/dreamin-spiral/guide/` ・ 3 Weeks → `/dreamin-spiral/3-weeks/` ・ Community → `/dreamin-spiral/community/` ・ My Life → `/dreamin-spiral/my-life/` ・ Business Creation → なし |
| Dreamin' Spiral 🌱 Library | 「Libraryを見る」→ `/dreamin-spiral/library/` |
| Closing | 「Guide（無料）について見る」→ `/dreamin-spiral/guide/` |

## 2. Existing Files

| File | 変更 |
|---|---|
| `index.html` | `section#dreamin-spiral` の Lead 直後に `<a class="ds-service-cta" href="/dreamin-spiral/">Dreamin' Spiral 🌱について</a>` を追加。Header / Footer link |
| 現行 21 ページ（TOP ・ About ・ DX ・ DC ・ DC Guide ・ thanks ・ Guide ・ Community ・ Community Complete ・ Library ・ 3 Weeks 4 ・ My Life 4 ・ Legal ・ Terms ・ Privacy） | Header ・ Footer の `Dreamin' Spiral 🌱` link の `href` のみ（`index.html#dreamin-spiral` 等 → `/dreamin-spiral/`、計 42 箇所）。他の文言 ・ CTA ・ Stripe ・ Formspree ・ GAS link は不変 |
| `style.css` | ① Header / Footer の Dreamin' Spiral 🌱 link の `white-space: nowrap` selector を `[href$="#dreamin-spiral"]` → `[href="/dreamin-spiral/"]`（href 変更に追随）② `.ds-home-family .ds-family-item:first-child { border-top: none; padding-top: 0; }`（見出しのない Service Family section で区切り線が二重にならないように。Home のみ） |
| `vercel.json` | `/academy.html` の destination：`/#dreamin-spiral` → `/dreamin-spiral/`（他の redirect 12 件は不変） |

TOP の path card ・「どこから始めますか」の「Dreamin' Spiral 🌱について」（`#dreamin-spiral` への page 内 link）は変更していない。

## 3. Local Validation（Chromium）

- 1280 ／ 375 ／ 320px：横 scroll なし、1〜2 文字だけの行なし
- 見出し：h1 → h2 ×2 → h3 ×5（Service）→ h2 ×2。空 link 0。Business Creation の link 0
- Keyboard：Header 5 → 詳しく見る 4 → Libraryを見る → Guide（無料）について見る の順に focus、focus ring 表示
- Regression：Home 以外の現行 20 ページ × 1280 ／ 375px の computed style ・ screenshot が main と一致（Header / Footer の nowrap も維持）。TOP は追加 link 分のみ差分
