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
| `index.html` | `section#dreamin-spiral` の Lead 直後に `<a class="ds-service-cta" href="/dreamin-spiral/">Dreamin' Spiral 🌱について</a>` を追加。Header / Footer link。既存の「Dreamin' Spiral 🌱について」2 箇所（3 つの道の path card ・「どこから始めますか」）の href を `#dreamin-spiral` → `/dreamin-spiral/`（Final Tuning）。3 Weeks の説明文を `.ds-phrase` 2 つで包む（Final Tuning） |
| 現行 21 ページ（TOP ・ About ・ DX ・ DC ・ DC Guide ・ thanks ・ Guide ・ Community ・ Community Complete ・ Library ・ 3 Weeks 4 ・ My Life 4 ・ Legal ・ Terms ・ Privacy） | Header ・ Footer の `Dreamin' Spiral 🌱` link の `href` のみ（`index.html#dreamin-spiral` 等 → `/dreamin-spiral/`、計 42 箇所）。他の文言 ・ CTA ・ Stripe ・ Formspree ・ GAS link は不変 |
| `style.css` | ① Header / Footer の Dreamin' Spiral 🌱 link の `white-space: nowrap` selector を `[href$="#dreamin-spiral"]` → `[href="/dreamin-spiral/"]`（href 変更に追随）② `.ds-home-family .ds-family-item:first-child { border-top: none; padding-top: 0; }`（見出しのない Service Family section で区切り線が二重にならないように。Home のみ） |
| `vercel.json` | `/academy.html` の destination：`/#dreamin-spiral` → `/dreamin-spiral/`（他の redirect 12 件は不変） |

### Final Tuning（Owner Review 前・Owner / Architect 採用）

- **TOP link 統一：** TOP の「Dreamin' Spiral 🌱について」3 箇所（path card ・ `section#dreamin-spiral` の Lead 直後 ・「どこから始めますか」）をすべて `/dreamin-spiral/` に統一。同じ label で異なる destination は残っていない。`section#dreamin-spiral`（summary ・ Service Family）は不変
- **TOP mobile「3週間。」：** 375 ／ 320px で `.ds-family-desc`（幅 327 ／ 272px）の末尾が「3週 ／ 間。」「気づ ／ く3週間。」と分断されていた。文言は変えず、Home と同じく `<span class="ds-phrase">「気になる」や「悩み」から</span><span class="ds-phrase">自分に気づく3週間。</span>` で語句単位の折り返しにした（CSS 追加なし）。行数は 2 行のまま
- **320px phrase wrapping refinement：** 320px で TOP `section#dreamin-spiral` の Lead（「…感覚／を入口に、」→「に、」、「…伴走で／す。」）と Guide 説明文（「…話してみ／る。」）に 1〜2 文字の行が残っていた。文言は変えず、Home と同じ区切りの `.ds-phrase`（「「気になること」や」「現実の中で生まれる感覚を入口に、」／「人生や仕事を」「創っていくための伴走です。」／「今、気になっていることから」「話してみる。」）で包んだ（CSS 変更なし）。1280px は差分 0、Lead ・ 各 item の高さは 1280 ／ 375 ／ 320px とも不変。375px では Lead 1 行目の折り返し位置のみ「…感覚／を入口に、」→「…や／現実の中で生まれる感覚を入口に、」に変わる（行数 ・ 高さは同じ）

## 3. Local Validation（Chromium）

- 1280 ／ 375 ／ 320px：横 scroll なし、1〜2 文字だけの行なし
- 見出し：h1 → h2 ×2 → h3 ×5（Service）→ h2 ×2。空 link 0。Business Creation の link 0
- Keyboard：Header 5 → 詳しく見る 4 → Libraryを見る → Guide（無料）について見る の順に focus、focus ring 表示
- Regression：Home 以外の現行 20 ページ × 1280 ／ 375px の computed style ・ screenshot が main と一致（Header / Footer の nowrap も維持）。TOP は追加 link 分のみ差分
- Final Tuning 後：TOP ・ About ・ Home ・ Guide ・ 3 Weeks ・ Community ・ My Life ・ Library × 1280 ／ 375 ／ 320px を Tuning 前と比較し、差分は TOP mobile の 3 Weeks 説明文の範囲のみ（1280px は差分 0）。横 scroll なし
