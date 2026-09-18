# Dreamin' Spiral Business Creation Public Page v1 — 実装記録（b8e-lab）

> Dreamin' Spiral Business Creation の Service Page `/dreamin-spiral/business-creation/` の Web 実装の記録。
> **意味 ・ Offer ・ Public Entry の正本は OS repo**（`constitution/brand-architecture/business-creation-architecture.md` §9.5 ・
> `docs/repository-architecture/dreamin-spiral-offer-definition.md` §5 ・ `docs/repository-architecture/business-creation-legal-design-v1.md` §17 ・ §18）。
> 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **PREVIEW IMPLEMENTED ／ OWNER REALITY REVIEW PENDING** |
| Production | **NOT RELEASED**（main へ merge していない） |
| 実装日 | 2026-09-18 |
| Branch | `feature/business-creation-public-page-v1` |
| Copy | Business Creation Public Page v1 Information Architecture / Copy（Owner Approved） |

## 1. New Page

| File | URL | title | robots | canonical |
|---|---|---|---|---|
| `dreamin-spiral/business-creation/index.html` | `/dreamin-spiral/business-creation/` | Dreamin' Spiral Business Creation \| B8E | index | `https://www.b8e.co.jp/dreamin-spiral/business-creation/` |

- description ・ og:description: 「Businessを一緒に創り、その後も自分で創り育て続けられるCreation Systemを手にする伴走サービス。」
- og:image なし（既存 `/dreamin-spiral/*` と同じ。新しい OG image は作っていない）
- Header / Footer は既存 Service Page と同じ（Business Creation 個別の link は追加していない）

## 2. Sections（Approved Information Architecture の順）

| # | Section | 使った既存 pattern |
|---|---|---|
| 1 | Hero（Businessを、一緒に創る。） | `.ds-service-hero` ・ `.ds-service-eyebrow` ・ `.ds-service-title` ・ `.ds-service-lead` ×2 ・ `.ds-service-cta` |
| 2 | Starting Reality（今、どこにいても。そこから始められます。） | `.ds-service-list`（4 つの Starting Reality。card にしない） |
| 3 | 創るのは、Businessだけではありません。 | 本文 ＋ 明確に読ませる一文 `.ds-service-statement` |
| 4 | 現実（リアリティ）から始まるCreation。 | 本文 ＋ `.ds-service-statement` |
| 5 | Technologyは、必要な分だけ。 | 本文 ＋ 外部費用の一文 `.ds-service-note` |
| 6 | 構想を、現実の仕組みへ。（Partner） | 本文 ＋ Partner の肩書き ・ 名前 ・ 説明（text のみ） |
| 7 | Business Creationについて（内容・料金） | `.ds-service-list`（共通の内容）・ `.ds-offer-summary`（6か月 ／ 12か月を同じ表の並列の行）・ `.ds-service-note` ×2 |
| 8 | まず、今の現実（リアリティ）から話してみませんか。 | 本文 ・ `.ds-service-cta` ・ Secondary link ・ `.ds-service-note` |

- 狭い画面で語句の途中で折り返さないよう、既存の `.ds-phrase` で文を包んだ。文言は変えていない
- Relation line 候補（現実を見る → 創る → 現実に出す → フィードバック → また創る）は **載せていない。** 3 Weeks の Owner Reality Review（2026-09-16）で段階的な縦型 Flow を廃止した先例があり、process chart 化しない指示に従った。本文の Approved Copy で同じ意味を伝えている（Owner Reality Review で追加を判断できる）

## 3. CTA

| CTA | 表示 | 行き先 |
|---|---|---|
| Primary（Hero ・ Final） | Business Creationについて話してみる | **なし（Preview 用の扱い）**。Business Creation 専用 Inquiry Form が未実装のため、link ではない要素（`span.ds-service-cta` ・ `role="link"` ・ `aria-disabled="true"`）として置いた。見え方は既存の `.ds-service-cta` と同じ。仮の Formspree endpoint ・ general contact form ・ Guide への接続は作っていない |
| Secondary（Hero） | Guide（無料）について見る | `/dreamin-spiral/guide/` |
| Secondary（Final） | まずGuide（無料）で話してみる | `/dreamin-spiral/guide/` |

- **Production 公開前に、Primary CTA を Inquiry Form への link に置き換えること**（Production Launch Gate: Public Page ／ Inquiry Form ／ 特定商取引法に基づく表記 ／ 利用規約 ／ プライバシーポリシー の整合・OS `business-creation-legal-design-v1.md` §18）
- Guide は Optional の Secondary path。Primary の見え方にしない

## 4. 載せていないもの

- 分割の詳細 ・ 追加6か月の価格 ・ 中途終了 ／ 返金の計算 ・ Remote のセキュリティ詳細 ・ IP 条項（Legal Design v1 §17）
- Stripe Payment Link ・ 決済 button ・ 振込先
- 外部 SaaS の価格
- Portrait（Current repo に Owner Approved の画像がない。Partner は text のみ）

## 5. Home ・ TOP

| Page | 変更 |
|---|---|
| `dreamin-spiral/index.html`（Home） | Business Creation item に「詳しく見る」→ `/dreamin-spiral/business-creation/`（他の item と同じ `aria-label` 付き）。「link を置かない」旨の comment を更新 |
| `index.html`（TOP `#dreamin-spiral`） | Business Creation item に「詳しく見る」→ `/dreamin-spiral/business-creation/`。「CTA を置かない」旨の comment を更新 |

## 6. CSS

`style.css` に Business Creation 用の scoped rule のみ追加した（既存 selector の値は変更していない）。

| Selector | 用途 |
|---|---|
| `.ds-service-section .ds-service-statement` | 本文中の明確に読ませる一文（Guide の既存 `.ds-offer-summary + .ds-service-statement` と同じ色。Guide の見え方は変わらない） |
| `.ds-service-secondary`（Hero ／ section） | 静かな Secondary link |
| `.ds-service-profile` ・ `-title` ・ `-name` | Partner の肩書き ・ 名前 |

## 7. Change History

| Date | 内容 |
|---|---|
| 2026-09-18 | **新規作成。** Public Page v1 を Preview として実装。Owner Reality Review 待ち。Production 未公開 |
