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
| Formspree action | `https://formspree.io/f/mwlpenvp` ✅ | `https://formspree.io/f/xbglradg` ✅ 修正済み（**未検証**） |
| 送信方式 | **AJAX（fetch + `Accept: application/json`）** | 標準 POST（`_next`）。AJAX 未展開 |
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
| 1 | My Life の AJAX 横展開・E2E | 3 Weeks の Owner Reality Review 承認後に実施 |
| 1b | 送信失敗時のエラー文言 | **暫定文言を使用中。Architect 承認待ち**（§9-4） |
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

## 9. Formspree 接続・送信方式（2026-09-16・実測）

### 9-1. Architect Decision — AJAX 方式の採用

Formspree の `_next` hidden field では自前 Thanks Page へ遷移できないことが実測で確認された
（submission は `ok:true` で受理されるが、レスポンスの `next` が Formspree 自身の `/thanks` に上書きされる）。

Dashboard の Thank You redirect 設定には寄せず、**Engineer 側の AJAX 送信**を採用する（Owner の設定作業を増やさないため）。

```
Application Form
↓ fetch(action, { method:'POST', body:FormData, headers:{ Accept:'application/json' } })
↓ response.ok && data.ok !== false
自前 Thanks Page へ window.location.assign()
```

- **redirect 先はルート相対パス** `/dreamin-spiral/3-weeks/thanks/`。
  Production URL をハードコードしないため、**Preview / localhost / Production のどこでも解決する**
- `_next` hidden field は redirect 制御に使わないため **削除**した
- Form の項目・`name` 属性・必須/任意・Consent 仕様は**一切変更していない**

### 9-2. endpoint

| Service | endpoint | 送信方式 | 検証 |
|---|---|---|---|
| 3 Weeks | `mwlpenvp` | AJAX | ✅ 実送信成功・自前 Thanks へ到達 |
| My Life | `xbglradg`（`xbgtradg` は誤りだった） | 標準 POST のまま | ⏸ 未検証（3 Weeks Review 後に横展開） |

### 9-3. 3 Weeks 送信検証

| 確認項目 | 結果 |
|---|---|
| action | `https://formspree.io/f/mwlpenvp` ✅ |
| `_next` の有無 | なし（削除済み）✅ |
| 送信 field | `name` / `email` / `phone` / `message` / `terms_privacy_consent=agreed` / `form_type=dreamin_spiral_3weeks` / `site_version=payment-foundation-v1` / `source_page` / `submitted_at` |
| required validation | 空送信は `checkValidity()=false`（最初の不正は `name`）✅ |
| 送信成功 | ✅ |
| 遷移先 | `/dreamin-spiral/3-weeks/thanks/` ✅（Formspree の `/thanks` には行かない） |
| 既存 Form への誤送信 | なし（`mykleakb` / `xgoqybbl` へは未送信）✅ |

### 9-4. 送信失敗時の挙動（無効 endpoint で実測）

| 確認項目 | 結果 |
|---|---|
| Thanks へ遷移 | **しない** ✅ |
| エラー表示 | `.ds-form-error` を表示 ✅ |
| 入力内容の保持 | `name` / `email` / Consent すべて保持 ✅ |
| 再送信 | ボタンが再度有効化される ✅ |

> ⚠️ **エラー文言は暫定（Architect 承認待ち）。** 既存サイトに再利用できるエラー表現が存在しなかったため
> （`.form-notice` は spam guard 用）、機能要件（利用者が送信失敗を認識できる）を満たす最小の文言を置いている。
> 承認された文言が決まりしだい `ERROR_TEXT` を差し替える。

### 9-5. 3 Weeks Full Sandbox E2E（通し確認・成功）

```
Application（/dreamin-spiral/3-weeks/apply/）
↓ AJAX submission → Formspree 受理
↓ 自前 Thanks（/dreamin-spiral/3-weeks/thanks/）
↓ Stripe Sandbox Checkout（buy.stripe.com/test_…）
↓ Test Payment（4242…）
Complete（/dreamin-spiral/3-weeks/complete/）
```

| 段階 | 結果 |
|---|---|
| Checkout Session | `status=complete` / `payment_status=paid` |
| amount_total | `60000 jpy` ／ `amount_tax=0` |
| metadata | `service=dreamin_spiral_3_weeks`（Payment Link から継承） |
| livemode | `false` |
| after_completion | Complete URL へ redirect 発火 |
| Complete Page | Owner Approved Copy と一致・mobile 375px で横スクロール 0 |

---

## 10. Owner Reality Review Adjustment（3 Weeks・2026-09-16）

Owner が 3 Weeks Sandbox Flow を実際に確認し、以下 3 点を承認した。**この 3 点のみを反映している。**

| # | 内容 | 対象 | 結果 |
|---|---|---|---|
| 1 | 利用規約 / プライバシーポリシーを別タブで開く | `3-weeks/apply/`・`my-life/apply/` | ✅ `target="_blank" rel="noopener"` |
| 2 | Stripe Product Description の意味の切れ目に改行 | Stripe **Sandbox** Product | ✅ 保存済み。**Checkout 表示は未確認**（§10-2） |
| 3 | Complete Page の「最初のDialogueの日程」→「最初のセッションの日程」 | `3-weeks/complete/` | ✅ 反映済み |

### 10-1. Legal Links

- `rel` は既存サイト規約に合わせて **`noopener`**（repo 内 22 箇所で使用）
- **URL・Legal 文書内容・Consent 文言はいずれも変更していない**
- 入力保持を実測：別タブ遷移後にブラウザバックしても `name` / `email` / Consent がすべて保持される
- My Life 側は**同じ Technical Fix のみ**適用（Business Copy / Full Flow には触れていない）

### 10-2. Stripe Product Description（Checkout 表示は未確認）

Sandbox Product `prod_VGe5W1b9Gzp6LW` の description を改行入りで更新し、**API 上は改行が保存されている**
（`'…3週間。\nZoom 60分 × 3回。'`）。

**Checkout 上での改行表示は確認できていない。** 理由は §10-3 の Sandbox Account 側の問題であり、
description の内容とは無関係（未変更の My Life Payment Link でも同じ事象が発生する）。

Product Name / Price / Price ID / `tax_behavior` / Payment Link はいずれも**変更していない**。

### 10-3. ⛔ Sandbox Checkout が停止中（Engineer では解消できない）

Sandbox Account `acct_1TN7OX5pPQTx6Vir` が **requirements past due** となり、決済が無効化された。

```
charges_enabled              : false
requirements.disabled_reason : requirements.past_due
requirements.currently_due   : ["company.name"]
```

- 両 Payment Link の Checkout が `Something went wrong / The page you were looking for could not be found.`
- **API 上の Asset はすべて正常**（Product active / Price active / Payment Link active / line_items qty=1 amount=60000）
- **未変更の My Life Payment Link でも同じ事象**が起きるため、今回の description 変更が原因ではない
- 解消には Sandbox Account の business information（`company.name`）の入力が必要。
  これは Account-wide 設定であり **Engineer の Scope 外**（Owner 操作）

### 10-4. 再 Validation 結果

| 段階 | 結果 |
|---|---|
| Legal links 別タブ属性 | ✅ `target="_blank" rel="noopener"`・URL 変更なし |
| Consent 仕様 | ✅ `terms_privacy_consent` / `agreed` / required・文言変更なし |
| 入力保持 | ✅ 戻っても `name` / `email` / Consent を保持 |
| Application → Formspree | ✅ 送信成功 |
| → 自前 Thanks | ✅ `/dreamin-spiral/3-weeks/thanks/` へ到達 |
| Complete Copy | ✅ 「最初のセッションの日程」／ページ内に `Dialogue` の語 **0 件** |
| Complete のその他 Copy | ✅ 変更なし（3 段落そのまま） |
| **Stripe Checkout 以降** | ⛔ **未実施**（§10-3 により到達不能） |

---

## Change History

| Date | 内容 |
|---|---|
| 2026-09-16 | **Owner Reality Review Adjustment 3 点を反映**（Legal links 別タブ／Stripe Description 改行／Complete Copy Dialogue→セッション）。Application → Formspree → Thanks と Complete Copy は再 Validation 済み。**Stripe Checkout は Sandbox Account の requirements past due により停止中**（§10-3） |
| 2026-09-16 | **3 Weeks を AJAX 送信方式へ変更し、Full Sandbox E2E（Application → Formspree → Thanks → Stripe → Test Payment → Complete）を通しで成功。** My Life は endpoint を `xbglradg` へ修正のみ（横展開は 3 Weeks Owner Review 後） |
| 2026-09-16 | Formspree endpoint を両 Form へ接続。3 Weeks（`mwlpenvp`）は受理を確認、My Life（`xbgtradg`）は FORM_NOT_FOUND。`_next` が Formspree 側で上書きされる事象を §9 に記録 |
| 2026-09-16 | **Owner Reality Review 第1回を反映。** 申込 Form の「お名前」「電話番号」に入力例を追加。Complete Page 本文から `contact@b8e.co.jp` の表示を削除 |
| 2026-09-16 | Sandbox Payment Link を Thanks Page へ接続。Sandbox E2E（3 Weeks のテスト決済 → redirect）を実測して記録 |
| 2026-09-16 | 新規作成。Application Form 2 本・Thanks / Next Step 2 本・Complete / Start 2 本・`style.css` A11 を実装。Formspree endpoint と Stripe Payment Link は未接続 |
