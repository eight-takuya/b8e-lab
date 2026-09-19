# Dreamin' Spiral Business Creation Public Page v1 — 実装記録（b8e-lab）

> Dreamin' Spiral Business Creation の Service Page `/dreamin-spiral/business-creation/` の Web 実装の記録。
> **意味 ・ Offer ・ Public Entry の正本は OS repo**（`constitution/brand-architecture/business-creation-architecture.md` §9.5 ・
> `docs/repository-architecture/dreamin-spiral-offer-definition.md` §5 ・ `docs/repository-architecture/business-creation-legal-design-v1.md` §17 ・ §18）。
> 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **OWNER APPROVED**（Owner Reality Review #1 ・ #2 COMPLETE・Copy Revision APPLIED）。Primary CTA は **Business Creation Dialogue Form（GAS・Production）** へ接続（§3） |
| Production | **LIVE**（2026-09-19・PR #104 merge・法的ページ（PR #107）と Business Creation の受付開始の後に公開） |
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
| 1 | Hero（あなたのBusinessを、一緒に創る。） | `.ds-service-hero` ・ `.ds-service-eyebrow` ・ `.ds-service-title` ・ `.ds-service-lead` ×2 ・ `.ds-service-cta` |
| 2 | Starting Reality（今、どこにいても。そこから始められます。） | `.ds-service-list`（4 つの Starting Reality。card にしない） |
| 3 | 創るのは、Businessだけではありません。 | 本文 ＋ 明確に読ませる一文 `.ds-service-statement` |
| 4 | 現実（リアリティ）から始まるCreation。 | 本文 ＋ `.ds-service-statement` |
| 5 | テクノロジーは、必要な分だけ。 | 本文 ＋ 外部費用の一文 `.ds-service-note` |
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
- **2026-09-18 更新:** Inquiry Form v1 の Preview 実装に合わせ、Primary CTA（Hero ・ Final）を `<a href="/dreamin-spiral/business-creation/inquiry/">` へ接続した（Preview branch のみ）。Inquiry Form の実装記録は [business-creation-inquiry-form-v1.md](business-creation-inquiry-form-v1.md)
- **2026-09-18 更新（Dialogue Entry Integration・Architect Decision）:** Formspree の Inquiry Form → Thanks → 日程調整（name ／ email の二重入力）をやめ、Primary CTA（Hero ・ Final）を GAS の **Business Creation Dialogue Form**（Step 1 Reality → Step 2 90分の対話日時 → 予約確定）へ接続した。
  `/dreamin-spiral/business-creation/inquiry/` ・ `/thanks/` は Production 未公開のまま削除（Superseded）。意味の正本: OS `constitution/brand-architecture/business-creation-architecture.md` §9.5.3、実装: dreamin-spiral-academy `integrations/free-guide-session-console-gas/DialogueIntake.gs`
- **Transition View（2026-09-18）:** Primary CTA を押した瞬間に「Business Creationの対話ページを開いています。／今、気になっていることを、そのまま聞かせてください。」を出してから Dialogue Form へ移動する（`/gas-transition.js`・OS Vercel → GAS Transition Standard v1・実装記録 [vercel-gas-transition-v1.md](vercel-gas-transition-v1.md)）
- **Production Gate（2026-09-19 更新）:** href は **Production の Dialogue Form**（Guide の Production Web App・M5 で Phase 1 版へ更新済み・URL 不変の `?page=booking&type=business_creation_initial`）。
  Production の Business Creation guard が OFF の間、この行き先は「現在ご予約を受け付けていません」だけを表示する（予約できない）。公開は guard ON と同時（OS Production Migration v1 M6）

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

## 7. Owner Reality Review #1 — Copy Revision（Owner Approved・2026-09-18）

Owner は Preview 全体を「その他は、とてもいい感じ」と確認。一般の読者に理解負荷を与える英語表記だけを、自然な日本語へ整えた。
**Business ／ Creation ／ Creation System は Business Creation の Core language として残す。** 機械的な全置換はしていない（文脈ごとに判断）。

| 箇所 | Before | After |
|---|---|---|
| Hero H1 | Businessを、一緒に創る。 | **あなたのBusinessを、一緒に創る。** |
| Hero Lead | そして、その後も自分でBusinessを創り、 | そして、その後も自分でBusinessを**創り続け**、 |
| Starting Reality（1 ・ 2） | Offer ／ OfferやService | 商品・サービス |
| Starting Reality（3） | WebsiteやServiceはある。 | Webサイトやサービスはある。 |
| Starting Reality の結び | 今ここからCreationを始めるためのStarting Realityです。 | ここからCreationを始めるための**現在地**です。 |
| 創るものの例示 | Offer、Website、申込、決済、Portal、Content、Operation、AI活用。 | 商品・サービス、Webサイト、申込、決済、クライアント専用ページ、発信コンテンツ、ビジネスの運営やサービスの運用、AI活用。 |
| Technology 見出し | Technologyは、必要な分だけ。 | **テクノロジーは、必要な分だけ。** |
| Technology 本文 | …GAS、Website、Automationなども、 | …GAS、Webサイト、Automationなども、 |

- 公開ページの表示文言のみの変更。OS の Canonical 概念（Starting Reality ・ Offer Definition ・ Creation Portal ／ Workspace 等）・ 技術用語 ・ HTML comment ・ CSS class は変えていない
- 「Creation Portal / Workspace」（内容・料金の提供内容）・ Automation は Owner の変更指定がないため維持
- Layout ・ CSS ・ CTA ・ 料金 ・ Guide の Secondary path ・ Partner ・ Final CTA ・ SEO は変更なし
- 狭い画面（320 ／ 375px）で語句の途中や 1〜2 文字だけで折り返さないよう、既存の `.ds-phrase` の区切りだけを調整した（文言は不変）
- Production：**NOT RELEASED**

## 8. Change History

| Date | 内容 |
|---|---|
| 2026-09-18 | **新規作成。** Public Page v1 を Preview として実装。Owner Reality Review 待ち。Production 未公開 |
| 2026-09-18 | Owner Reality Review #1 の Copy Revision（Owner Approved）を Preview に反映（§7）。Owner Reality Review #2 待ち。Production 未公開 |
| 2026-09-18 | Owner Reality Review #2：**APPROVED**（`2aac8bd`）。Release path：PR #104 を Business Creation Public Entrance 全体の release branch として保持し、Public Page 単独では merge しない（main merge ＝ Vercel Production 自動反映のため）。以後は additive commit のみ（`e243cfc` → `2aac8bd` の amend ＋ force-push は Engineer の process slip として記録済み・内容の欠落なし） |
| 2026-09-18 | Primary CTA を Inquiry Form（Preview）へ接続（§3） |
| 2026-09-18 | Primary CTA を Business Creation Dialogue Form（GAS・Safe Review）へ接続。Inquiry Form ／ Thanks は Superseded として削除（Production 未公開）。Production Gate に CTA の URL 置き換えを追加（§3） |
| 2026-09-18 | Primary CTA に Vercel → GAS Transition View を適用（§3） |
| 2026-09-19 | Primary CTA（2 件）を Safe Review の Dialogue Form から **Production の Dialogue Form**（Guide の Production Web App・`&type=business_creation_initial`）へ置き換え（M6 準備・未 merge） |
| 2026-09-19 | **Production Live**（PR #104 merge）。Status ・ Production 欄を現在の状態へ（M7 の古い記載の整理） |
