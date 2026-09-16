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
| Formspree action | `https://formspree.io/f/mwlpenvp` ✅ 受理確認済み | `https://formspree.io/f/xbgtradg` ⚠️ **FORM_NOT_FOUND** |
| `_next`（送信後 redirect） | `/dreamin-spiral/3-weeks/thanks/` | `/dreamin-spiral/my-life/thanks/` |
| `form_type` | `dreamin_spiral_3weeks` | `dreamin_spiral_my_life` |
| Required | `name` / `email` / `phone` / `terms_privacy_consent` | 同左 |
| 入力例（placeholder） | `name`＝`例）山田　太郎`（姓名の両方を促す・全角スペース区切り）／ `phone`＝`例）090-1234-5678`（ハイフン表記を提示） | 同左 |
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
- Stripe CTA は現在 **Sandbox の Payment Link**（`buy.stripe.com/test_…`）に接続している。
  **Owner Reality Review 承認後、Live Payment Link へ差し替えてから merge する**
- Stripe ブロックには「Stripeでは、お申し込み時と同じメールアドレスをご入力ください。」を表示する
- **銀行振込先は本 Web 実装の `.ds-bank` 定義を Current Configuration とする。**
  OS repo の Canonical Specification へ口座情報そのものを複製しない

## 4. Complete / Start

- Stripe Payment Link の `after_completion = redirect` の到達先
- **銀行振込ユーザーはここを経由しない**（Owner が入金確認 → Owner から Start 案内）
- **本文に送信元メールアドレスを表示しない。** `contact@b8e.co.jp` は受信専用の group address で、
  実際の連絡の送信元にならないため（Owner Review 反映・2026-09-16）
- Footer の「お問い合わせ」`mailto:contact@b8e.co.jp` は受信窓口として維持（Legal Pages も変更なし）
- `academy@b8e.co.jp` は使用していない
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
| 1 | My Life の Formspree endpoint | ⚠️ `xbgtradg` が **FORM_NOT_FOUND**。Owner による ID 確認 / Form 有効化が必要 |
| 1b | Thanks Page への redirect | ⚠️ **`_next` が効かない**。Formspree が自身の `/thanks` へ上書きする（§9） |
| 2 | Stripe Payment Link × 2 | **Sandbox 接続済み。** Owner Reality Review → Live Provisioning 後に Live URL へ差し替え |
| 3 | Service Page 本文 | 未作成。Business Copy が Canonical に不足するため Architect / Owner へ返している |
| 4 | Service Page → Application Form の導線 | Service Page 未作成のため未接続 |
| 5 | 銀行振込ユーザー向けの「この後どうなるか」の一文 | Owner Approved Copy が存在しないため記載していない |

---

## 8. Sandbox 接続状態（Owner Reality Review 用）

| Service | Thanks Page の Stripe CTA | Complete Page（redirect 先） |
|---|---|---|
| 3 Weeks | `https://buy.stripe.com/test_00w4gseyMdC5bhKbU7eAg00` | Preview の `/dreamin-spiral/3-weeks/complete/` |
| My Life | `https://buy.stripe.com/test_fZudR29es9lP4Tmf6jeAg01` | Preview の `/dreamin-spiral/my-life/complete/` |

- Sandbox の `after_completion` は **Vercel Preview URL** を指している（本番 Complete URL はこの PR が merge されるまで存在しないため）
- Live Payment Link は **本番 Complete URL** を指す別 Resource として Phase 6 で新規作成する
- Vercel Preview は Deployment Protection 下にあるため、Review は **Vercel にログイン済みのブラウザ**で行う

---

## 9. Formspree 接続検証（2026-09-16・実測）

### 9-1. endpoint の受理状況

| Service | endpoint | POST 結果 | 判定 |
|---|---|---|---|
| 3 Weeks | `mwlpenvp` | `{"next":"/thanks","ok":true}` | ✅ **受理される**（submission は Formspree に届く） |
| My Life | `xbgtradg` | `{"error":"Form not found","errors":[{"code":"FORM_NOT_FOUND"}]}`（3回とも同一） | ⛔ **endpoint が無効** |

### 9-2. `_next` が効かない（両 Form 共通の仕様問題）

3 Weeks は `ok:true` で受理されるが、レスポンスの `next` が **`/thanks`（Formspree 自身のページ）** に上書きされ、
HTML の `_next` hidden field（`/dreamin-spiral/3-weeks/thanks/`）は**無視される**。

Formspree の現行仕様では、送信後のリダイレクト先は
**Form ごとの Settings タブ（「Thank You」redirect）** で設定する方式であり、
この機能は **Personal / Professional / Business プラン**で提供される。

- 既存の `academy/session.html`（`xgoqybbl`）は `_next` で `/academy/thanks.html` へ遷移する前提で実装されている。
  **同じ事象が起きていないかは未検証**（Historical Form への試験送信を避けたため）
- 解消方法は §9-3

### 9-3. 未解決事項（Owner / Architect 判断が必要）

| # | 事象 | 選択肢 |
|---|---|---|
| 1 | `xbgtradg` が FORM_NOT_FOUND | Owner が endpoint ID を再確認、または Form を有効化する |
| 2 | `_next` が無視される | (a) Owner が各 Form の Settings タブで Thank You redirect に Thanks URL を設定する（プラン要件あり）／ (b) Engineer 側で AJAX 送信（`Accept: application/json` + JS redirect）へ変更する（全プランで動作するが、送信方式の変更のため Architect 判断） |

---

## Change History

| Date | 内容 |
|---|---|
| 2026-09-16 | Formspree endpoint を両 Form へ接続。3 Weeks（`mwlpenvp`）は受理を確認、My Life（`xbgtradg`）は FORM_NOT_FOUND。`_next` が Formspree 側で上書きされる事象を §9 に記録 |
| 2026-09-16 | **Owner Reality Review 第1回を反映。** 申込 Form の「お名前」「電話番号」に入力例を追加。Complete Page 本文から `contact@b8e.co.jp` の表示を削除 |
| 2026-09-16 | Sandbox Payment Link を Thanks Page へ接続。Sandbox E2E（3 Weeks のテスト決済 → redirect）を実測して記録 |
| 2026-09-16 | 新規作成。Application Form 2 本・Thanks / Next Step 2 本・Complete / Start 2 本・`style.css` A11 を実装。Formspree endpoint と Stripe Payment Link は未接続 |
