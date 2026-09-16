# Current Sales Entrance v1 — 実装記録（b8e-lab）

> Dreamin' Spiral 🌱 を入口に、**TOP → Service Page → Application** を成立させ、
> Payment Foundation v1（Application 以降・Owner Approved）へ接続する Web 実装の記録。
>
> **設計の正本（Owner Approved Design・Owner Approved Copy）は OS repo の
> `docs/repository-architecture/current-sales-entrance-v1.md`。** 本書は b8e-lab 上の実装事実のみを扱い、Copy を再定義しない。
> Application 以降の実装記録は [payment-foundation-v1.md](payment-foundation-v1.md)。

| 項目 | 内容 |
|---|---|
| Status | 実装済み（未公開）・**Owner Reality Review Gate で停止中** |
| 実装日 | 2026-09-16 |
| Branch | `feature/current-sales-entrance-v1`（`feature/payment-foundation-v1-web` の上に積む） |

---

## 1. New URLs

| URL | File | title | robots | canonical |
|---|---|---|---|---|
| `/dreamin-spiral/3-weeks/` | `dreamin-spiral/3-weeks/index.html` | Dreamin' Spiral 3 Weeks \| B8E | index（noindex なし） | `https://www.b8e.co.jp/dreamin-spiral/3-weeks/` |
| `/dreamin-spiral/my-life/` | `dreamin-spiral/my-life/index.html` | Dreamin' Spiral My Life \| B8E | index（noindex なし） | `https://www.b8e.co.jp/dreamin-spiral/my-life/` |

- Legal / Payment Foundation と同じ `<dir>/index.html` の末尾スラッシュ ディレクトリ URL。既存 route との衝突なし（実装前は 404）
- meta description / og:description は Owner Approved の Proposition のみで構成
- og:image は未設定（Current 名の OGP 画像は存在しない。Payment Foundation の各ページと同じ扱い）
- `sitemap.xml` / `robots.txt` / `vercel.json` は repository に存在せず、今回も追加しない
- 旧 Academy URL への redirect は追加しない

## 2. Service Page 構造

| 3 Weeks | My Life |
|---|---|
| Section 1 Hero（Eyebrow / Title / Lead / CTA） | Section 1 Hero（Eyebrow / Title / Lead / CTA） |
| Section 2 今、こんなことが気になっているなら（list） | Section 2 Lifeは、解決するものではなく、生き様そのもの。 |
| Section 3 日常を生きながら、3週間を一緒に見ていく。（Relation 1 行 + 本文・Owner Reality Review Adjustment で更新） | Section 3 6か月の日常そのものが、My Lifeです。（list + 本文） |
| Section 4 内容（期間 / 対話 / 教材・動画・宿題 / 料金 + 補足） | Section 4 6か月後の答えを、今決めなくていい。 |
| Section 5 この時間で大切にしていること | Section 5 大切にすること |
| Section 6 CTA | Section 6 内容・料金（期間 / セッション / Video / Community / My Page / 料金 + 補足） |
| — | Section 7 CTA |

| CTA | 遷移先 |
|---|---|
| 3 Weeksに申し込む（Hero ／ Section 6） | `/dreamin-spiral/3-weeks/apply/` |
| My Lifeに申し込む（Hero ／ Section 7） | `/dreamin-spiral/my-life/apply/` |

- 内容・料金の表は Payment Foundation の申込ページと同じ `.ds-offer-summary` を再利用
- Application 側の `source_page` hidden 項目には、Service Page 経由の場合 `/dreamin-spiral/<service>/` が記録される（Application のコードは変更していない）

## 3. TOP（`index.html`）

| 箇所 | 変更 |
|---|---|
| `section#dreamin-spiral`（新規・Three Paths の直後） | Heading・Core Copy・Service Family 5 件（Owner Approved Copy） |
| Service Family CTA | 3 Weeks → `/dreamin-spiral/3-weeks/`、My Life → `/dreamin-spiral/my-life/`（文言「詳しく見る」）。Guide / Community / Business Creation は **CTA なし** |
| Three Paths の 3 枚目のカード | 見出し `Dreamin' Spiral Academy` → `Dreamin' Spiral 🌱`、説明文を Core Copy 1 行目へ、link `Academyについて`（→ `academy.html`）→ `Dreamin' Spiral 🌱について`（→ `#dreamin-spiral`）。`path-target` 行は既存のまま |
| Entry Points「自分自身の内側を深めたい」 | link `Academyについて`（→ `academy.html`）→ `Dreamin' Spiral 🌱について`（→ `#dreamin-spiral`）。問いの文は既存のまま |
| meta description | 末尾 `Dreamin' Spiral Academy。` → `Dreamin' Spiral 🌱。` |
| Header / Footer | §4 |

Anchor：TOP 上の既存 id は `paths` のみで、`dreamin-spiral` は衝突しない。

## 4. Header / Footer

- 表示 `Dreamin' Spiral Academy` → `Dreamin' Spiral 🌱`、link 先 `academy.html` → TOP の `#dreamin-spiral`
- 既存の複製方式・ページごとの相対パス表記をそのまま維持（Navigation の共通化はしない）

| ページ群 | ファイル数 | link |
|---|---|---|
| `index.html` | 1 | `#dreamin-spiral` |
| `about.html` / `dx.html` / `dc.html` / `dc-guide.html` / `thanks.html` | 5 | `index.html#dreamin-spiral` |
| `legal/` / `terms/` / `privacy-policy/` | 3 | `../index.html#dreamin-spiral` |
| `dreamin-spiral/*/{apply,thanks,complete}/` | 6 | `/index.html#dreamin-spiral` |
| `dreamin-spiral/{3-weeks,my-life}/`（新規） | 2 | `/index.html#dreamin-spiral` |

**変更していないもの：`academy.html` と `academy/*` の 13 ファイル（計 14 ファイル）。**
Historical Protection（`/academy/*`・`academy.html` を変更しない）に従い、これらの Header / Footer は
`Dreamin' Spiral Academy` → `academy.html` のまま残っている。

Mobile：専用メニューはなく、既存どおり折り返し表示。`Dreamin' Spiral 🌱` の link のみ `white-space: nowrap` とし、🌱 だけが次の行に分かれないようにした（属性セレクタで当該 link だけに限定）。

## 5. CSS（`style.css`）

- **A12. Dreamin' Spiral 🌱 Current Sales Entrance v1** を末尾に追加。既存ルールの変更・削除は 0 行
- Service Page の Hero は `.ds-service-hero` として A12 内で定義（値は A1 Hero variants の Deep Indigo と同じ）。
  Academy 用 CSS（A1〜A9）への新たな依存を増やさない
- Readability：本文 `#555`、見出し `#2a2a2a`、補足 `#666`（背景 `#f7f6f4` に対し AA 4.5:1 以上）。Eyebrow（`#8c8680`）と accent（`#9b7b5c` / `#c9a882`）は意図的な階層として維持

## 6. Guide / Community / Business Creation

| Service | 接続 | 理由（既存 Current Asset の有無） |
|---|---|---|
| Guide | **未接続（CTA なし）** | 公開中の関連ページは `academy/session.html`（無料ガイドセッション）のみ。Academy 文脈の Historical Page であり、Brand Architecture 上 Guide は「旧 Free Guide Session の Identity の再設計」で単純 Rename ではない。Guide の Offer も未確定 |
| Community | **未接続（CTA なし）** | 公開中の販売ページは `academy/community.html` → `community-apply.html`（Current Community Subscription）。Academy 文脈の Historical Page で、Current Brand の Copy ではない。Subscription にも触れないため接続しない |
| Business Creation | **未接続（CTA なし）** | Current の公開ページは存在しない（`academy/owner-program.html` は Historical） |

## 7. Validation（ローカル静的配信 `python3 -m http.server` で実測・2026-09-16）

| 項目 | 結果 |
|---|---|
| TOP：Dreamin' Spiral 🌱 Section | Heading / Core Copy / Service Family 5 件を表示。TOP 本文に `Academy` の文字列 0 件 |
| TOP：CTA | 3 Weeks → `/dreamin-spiral/3-weeks/`、My Life → `/dreamin-spiral/my-life/`。他 3 件は CTA なし |
| Header / Footer | 対象 17 ファイルすべて `Dreamin' Spiral 🌱`。About の Nav から `index.html#dreamin-spiral` へ遷移し Section 先頭へ到達 |
| 3 Weeks Service Page | Hero + 5 Sections・`60,000円（税込）`・「3週間のリアリティとセッション」・英語表記（Dialogue / Reality）0 件・CTA 2 件 → `/apply/` |
| My Life Service Page | Hero + 6 Sections・「Lifeは、解決するものではなく、生き様そのもの。」・6か月内容・`600,000円（税込）`・CTA 2 件 → `/apply/` |
| Full Preview Sales Flow（3 Weeks） | TOP → Section → 詳しく見る → Service Page → 申し込む → Application（`source_page=/dreamin-spiral/3-weeks/`）→ Confirmation → Formspree（`mwlpenvp`）→ Thanks（Stripe Sandbox link 変更なし） |
| Full Preview Sales Flow（My Life） | 同上（`xbglradg`）→ Thanks（Stripe Sandbox link 変更なし） |
| Mobile（375px） | 横スクロールなし。TOP の Service 行は縦積み、内容表は 1 列、Nav の 🌱 は分離しない |
| Payment Foundation 6 ページ | 差分は Header / Footer の link 2 行のみ（Form・JS・Thanks・Complete・Stripe・Formspree は 0 行） |
| Historical | `academy.html` / `academy/*` の差分 0。Stripe / Formspree の URL 差分 0 |

Validation 送信は test 値（`sales-entrance-test@example.com`・本文に `[TEST]`）で 3 Weeks / My Life 各 1 件。

## 7-1. Owner Reality Review Adjustment（3 Weeks Section 3・2026-09-16）

- 5 段階の縦型 Flow（`<ol class="ds-service-flow">`）を削除し、見出し・本文を Owner Approved Copy に置換
- Relation は「セッション ⇄ 日常のリアリティ」の 1 行（`.ds-service-relation`・accent 色・小さな文字）
- 見出しは `.ds-phrase`（inline-block）で語句単位に折り返す（Mobile で「く。」だけが次行に残るのを防ぐ。文言は不変）
- `style.css`：`.ds-service-flow` 系 3 ルールを削除し、`.ds-service-relation` / `.ds-phrase` を追加（A12 内・他 Section のルールは不変）
- Validation：Desktop / Mobile（375px）で横スクロールなし、旧見出し・旧 Flow・`Dialogue`・`Reality` 0 件
- 設計の正本：OS repo `current-sales-entrance-v1.md` §16-9

## 8. 残っている旧表記（今回の Scope 外・事実のみ）

- `about.html` 本文 2 箇所（「DX支援、企業型DC、Dreamin' Spiral Academyです。」・会社情報の事業内容行）
- `academy.html` / `academy/*` 14 ファイルの Header / Footer と本文（Historical Protection）
- `docs/site-structure.md` の Top-level Pages 表の `academy.html` 行（Historical な記述として保持）
