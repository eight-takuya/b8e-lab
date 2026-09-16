# Dreamin' Spiral Payment Foundation v1 — Web 実装記録

> Dreamin' Spiral 3 Weeks / My Life の **Application → Thanks / Next Step → Payment Complete / Start** を
> b8e-lab へ実装した記録。
>
> 設計の正本は OS repo の
> [`docs/repository-architecture/payment-foundation-v1.md`](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/repository-architecture/payment-foundation-v1.md)
> （Owner Approved Design — Canonical）。本書はその **Web 実装側の記録**であり、
> Offer（価格・提供内容）も Stripe Asset Canonical も再定義しない。
>
> Legal Foundation / Form Consent v1.1 の正本は [sales-foundation-v1.md](sales-foundation-v1.md)。

| 項目 | 内容 |
|---|---|
| Status | **実装済み・未公開（PR 段階）。Stripe Payment Link と Formspree endpoint が未接続のため merge しない** |
| Design 承認 | Owner Approved（2026-09-16） |
| 対象 | Application Form 2 本・Thanks / Next Step 2 本・Complete / Start 2 本・`style.css` A11 |
| 前提 | Sales Foundation v1 / Legal Foundation：CLOSED（2026-09-15） |

---

## 1. Public URL（Architect Decision・2026-09-16）

| Page | Public URL（Canonical） | Source |
|---|---|---|
| 3 Weeks Application Form | `https://www.b8e.co.jp/dreamin-spiral/3-weeks/apply/` | `dreamin-spiral/3-weeks/apply/index.html` |
| 3 Weeks Thanks / Next Step | `https://www.b8e.co.jp/dreamin-spiral/3-weeks/thanks/` | `dreamin-spiral/3-weeks/thanks/index.html` |
| 3 Weeks Complete / Start | `https://www.b8e.co.jp/dreamin-spiral/3-weeks/complete/` | `dreamin-spiral/3-weeks/complete/index.html` |
| My Life Application Form | `https://www.b8e.co.jp/dreamin-spiral/my-life/apply/` | `dreamin-spiral/my-life/apply/index.html` |
| My Life Thanks / Next Step | `https://www.b8e.co.jp/dreamin-spiral/my-life/thanks/` | `dreamin-spiral/my-life/thanks/index.html` |
| My Life Complete / Start | `https://www.b8e.co.jp/dreamin-spiral/my-life/complete/` | `dreamin-spiral/my-life/complete/index.html` |

- **末尾スラッシュのディレクトリ URL** を Public Canonical とし、`<dir>/index.html` で配置する。
  Legal Pages（Sales Foundation v1）と同じ方式で、`vercel.json` / Clean URLs を導入していない
- `/dreamin-spiral/<service>/<step>/` の 3 階層のため、`style.css`・Nav・Footer のリンクは
  **すべてルート相対パス**（`/style.css`・`/index.html`・`/terms/` 等）で記述する
- Thanks / Complete は `noindex, follow`。Application Form は index 可
- **Global Nav には追加しない**（5 ページ構成を維持）
- **`/dreamin-spiral/` は本実装で新設**。既存 route との衝突は 0 件（`academy/*`・Legal・ルート直下いずれとも重複しない）
- `apply/` の URL は Architect が明示した `thanks/` `complete/` と同じ
  `/dreamin-spiral/<service>/<step>/` パターンの技術的踏襲。**Architect の確認対象**

## 2. Application Form v1.1

Form 仕様の正本は [sales-foundation-v1.md](sales-foundation-v1.md) §6・§7。本書は実装事実のみを記録する。

| 項目 | 3 Weeks | My Life |
|---|---|---|
| Formspree action | **未接続**（`__PENDING_3WEEKS_ENDPOINT__`） | **未接続**（`__PENDING_MYLIFE_ENDPOINT__`） |
| `_next`（送信後 redirect） | `/dreamin-spiral/3-weeks/thanks/` | `/dreamin-spiral/my-life/thanks/` |
| `form_type` | `dreamin_spiral_3weeks` | `dreamin_spiral_my_life` |
| Required | `name` / `email` / `phone` / `terms_privacy_consent` | 同左 |
| Optional | `message` | `message` / `six_month_intent` |
| Hidden | `_next` / `form_type` / `site_version` / `source_page` / `submitted_at` | 同左 |
| Submit | 3 Weeksに申し込む | My Lifeに申し込む |

- Consent は **Form Consent v1.1**（1 つの必須チェックボックス・`terms_privacy_consent=agreed`・
  `/terms/` と `/privacy-policy/` へリンク）
- `source_page` は `document.referrer` の pathname、`submitted_at` は ISO 8601 をページ末尾の script が設定する
- **既存 Formspree endpoint（`mykleakb` / `xgoqybbl`）は用途が異なるため流用していない**
- **Form 内では支払い方法を選ばせない。** 支払い方法の選択は Thanks / Next Step で行う

## 3. Thanks / Next Step

- Stripe と銀行振込を **`.ds-payment-choice` の 2 カラムに並列配置**（≤600px で 1 カラム）。
  順序・装飾で優劣を示さない
- Deadline / Scarcity / Pressure 表現は置いていない
- Stripe CTA は **未接続**（`__PENDING_STRIPE_PAYMENT_LINK_3WEEKS__` / `__PENDING_STRIPE_PAYMENT_LINK_MYLIFE__`）。
  Sandbox 検証時に Sandbox URL、Production 接続時に Live URL へ差し替える
- Stripe ブロックには「Stripeでは、お申し込み時と同じメールアドレスをご入力ください。」を表示する
- **銀行振込先は本 Web 実装の `.ds-bank` 定義を Current Configuration とする。**
  OS repo の Canonical Specification へ口座情報そのものを複製しない

## 4. Complete / Start

- Stripe Payment Link の `after_completion = redirect` の到達先
- **銀行振込ユーザーはここを経由しない**（Owner が入金確認 → Owner から Start 案内）
- 連絡元は `contact@b8e.co.jp`。`academy@b8e.co.jp` は使用していない
- Scheduling System・Onboarding UI は新規構築していない

## 5. style.css

`A11. Dreamin' Spiral Application / Payment` を末尾に追加した。**既存ルールは 1 行も変更していない。**

追加クラス: `.ds-offer-summary` / `.ds-apply-form` / `.ds-field` / `.ds-field-note` / `.ds-required` /
`.ds-consent` / `.ds-payment-choice` / `.ds-payment-block` / `.ds-payment-amount` / `.ds-bank` / `.ds-next-list`

既存の `.thanks-hero` / `.hero-label` / `.hero-copy` / `.page-content` / `.section-block` /
`.thanks-message` / `.apply-form` / `.cta-link` / `.form-note` はそのまま再利用している。

## 6. Historical Protection

本実装で以下は **一切変更していない**。

- `academy/*`（Premium / Community / Session / Owner Program 等の Historical ページと Stripe Link）
- `thanks.html`（B8E 本体問い合わせ）・`academy/thanks.html`（Session）
- Legal Pages（`/privacy-policy/` `/terms/` `/legal/`）
- Global Nav・既存 Footer・既存 CSS ルール
- `academy@b8e.co.jp`

Historical ページの HTML をコピー流用していない（構造上の参考に留めた）。

## 7. 未接続・未確定（merge 前に解消が必要）

| # | 項目 | 状態 |
|---|---|---|
| 1 | Formspree endpoint × 2 | **Owner Gate.** Formspree Dashboard での Form 作成が必要 |
| 2 | Stripe Payment Link × 2 | Sandbox Provisioning → Owner Reality Review → Live Provisioning 後に接続 |
| 3 | Service Page 本文 | 未作成。Business Copy が Canonical に不足するため Architect / Owner へ返している |
| 4 | Service Page → Application Form の導線 | Service Page 未作成のため未接続 |
| 5 | 銀行振込ユーザー向けの「この後どうなるか」の一文 | Owner Approved Copy が存在しないため記載していない |

---

## Change History

| Date | 内容 |
|---|---|
| 2026-09-16 | 新規作成。Application Form 2 本・Thanks / Next Step 2 本・Complete / Start 2 本・`style.css` A11 を実装。Formspree endpoint と Stripe Payment Link は未接続 |
