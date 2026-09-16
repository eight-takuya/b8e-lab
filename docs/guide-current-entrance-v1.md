# Guide Current Entrance v1 — 実装記録（b8e-lab）

> Dreamin' Spiral Guide を Current Service として HP から利用できるようにする Web 実装の記録（Phase 7）。
> **設計の正本（Owner Approved Design・Copy）は OS repo `docs/repository-architecture/guide-current-entrance-v1.md`。** 本書は b8e-lab 上の実装事実のみを扱う。
> Booking System の表記変更は `dreamin'-spiral-academy` PR #133（`integrations/free-guide-session-console-gas/`）。

| 項目 | 内容 |
|---|---|
| Status | 実装済み（未公開）・**Owner Reality Review Gate で停止中** |
| 実装日 | 2026-09-16 |
| Branch | `feature/guide-current-entrance-v1` |

## 1. New URL

| URL | File | title | robots | canonical |
|---|---|---|---|---|
| `/dreamin-spiral/guide/` | `dreamin-spiral/guide/index.html` | Dreamin' Spiral Guide \| B8E | index（noindex なし） | `https://www.b8e.co.jp/dreamin-spiral/guide/` |

- 3 Weeks / My Life と同じ `<dir>/index.html` 方式。実装前は 404 で route collision なし
- og:image なし（3 Weeks / My Life と同じ）。`sitemap.xml` / `robots.txt` / `vercel.json` は存在せず追加しない
- Header / Footer は 3 Weeks Service Page と完全一致（`Dreamin' Spiral 🌱` → TOP `#dreamin-spiral`）

## 2. Page 構造

| Section | 内容 |
|---|---|
| 1 Hero | Eyebrow / Title / Lead / CTA「Guide（無料）に申し込む」 |
| 2 こんな時に | まとまっていなくても大丈夫です。（list 5 件） |
| 3 Guideで大切にすること | 答えを出すための時間ではありません。 |
| 4 内容 | 形式 / 時間 45分 / 料金 無料 / 内容（`.ds-offer-summary`）＋「営業面談ではありません。」 |
| 5 Final CTA | 今、少し話してみたいことがあれば。＋ CTA |

- CTA 2 件の遷移先：既存 Booking System `https://script.google.com/macros/s/AKfycbwhwbdcfjjDJ__Cv-J7veUDJerr26FxK1E1OSFXZNdDyBQ4Ty6knD9CkWXyV6-Fqj3zcA/exec?page=booking`（`/academy/session.html` と同じ deployment・同じタブで開く）
- 「営業面談ではありません。」は補足（`#666`）より淡くせず、本文より濃い `#2f2b27` で表示（`.ds-service-statement`・A12 に 1 ルール追加）
- Mobile で Hero Lead の「す。」だけが改行で残らないよう、既存 `.ds-phrase` で語句単位に折り返す（文言は不変）

## 3. TOP

- Dreamin' Spiral Guide に「詳しく見る」→ `/dreamin-spiral/guide/` を追加（3 Weeks / My Life と同じ markup・同じ見た目）。Copy は変更なし
- Community / Business Creation は変更なし

## 4. Validation（ローカル静的配信で実測・2026-09-16）

| 項目 | 結果 |
|---|---|
| TOP | Guide / 3 Weeks / My Life に「詳しく見る」（同じ色・同じ表現）。Community / Business Creation は CTA なしのまま |
| Guide Page | h1 1 件 → h2 4 件。Copy 一致。旧表記（Academy / 無料ガイドセッション / First Touch / Front Door）0 件 |
| CTA | 2 件とも Booking System（`page=booking`）。Booking URL は HTTP 200・title「無料ガイドセッション 日程選択」（Booking 側の表記変更は未 deploy） |
| Contrast（背景 `#f7f6f4`） | 本文 6.90 ／「営業面談ではありません。」13.0 ／ CTA は既存 accent `#9b7b5c`（3.61・3 Weeks / My Life と同じ） |
| Keyboard | Tab で Header → CTA の順に移動、CTA で `:focus-visible` のフォーカスリング表示 |
| Mobile（375px） | 横スクロールなし・内容表 1 列・Hero Lead の孤立文字なし |
| Regression | 3 Weeks / My Life / Payment Foundation / `/academy/*` のファイル差分 0 |
