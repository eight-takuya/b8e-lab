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
| Status | **Production 公開済み（2026-09-16・PR #86 merge `412c84d`）。** Stripe CTA は Live Payment Link。Close 判定は OS repo `payment-foundation-v1.md` §13-12 |
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
| Formspree action | `https://formspree.io/f/mwlpenvp` ✅ | `https://formspree.io/f/xbglradg` ✅ |
| 送信方式 | **AJAX（fetch + `Accept: application/json`）** | **AJAX（3 Weeks Pattern を横展開）** |
| 送信成功後の遷移先（ルート相対） | `/dreamin-spiral/3-weeks/thanks/` | `/dreamin-spiral/my-life/thanks/` |
| `_next` hidden field | **削除済み**（redirect 制御に使わない） | **削除済み** |
| `form_type` | `dreamin_spiral_3weeks` | `dreamin_spiral_my_life` |
| Required | `name` / `email` / `phone` / `terms_privacy_consent` | 同左 |
| 入力例（placeholder） | `name`＝`例）山田　太郎`（姓名の両方を促す・全角スペース区切り）／ `phone`＝`例）090-1234-5678`（ハイフン表記を提示） | 同左 |
| Optional | `message` | `message` / `six_month_intent` |
| Hidden | `form_type` / `site_version` / `source_page` / `submitted_at` | 同左 |
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
- Stripe CTA は **Live Payment Link** に接続している（2026-09-16・§14）。Sandbox Payment Link は検証用に Stripe 側へ残し、Web からは接続しない
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
`.ds-consent` / `.ds-form-error` / `.ds-confirm` / `.ds-confirm-actions` / `.ds-payment-choice` / `.ds-payment-block` / `.ds-payment-amount` /
`.ds-bank` / `.ds-next-list`

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
| 1b | 送信失敗時のエラー文言 | **暫定文言を使用中。Architect 承認待ち**（§9-4） |
| 2 | Stripe Payment Link × 2 | ✅ **Live 接続済み**（§14）。Production Review（Owner）待ち |
| 3 | Service Page 本文 | 未作成。Business Copy が Canonical に不足するため Architect / Owner へ返している |
| 4 | Service Page → Application Form の導線 | Service Page 未作成のため未接続 |
| 5 | 銀行振込ユーザー向けの「この後どうなるか」の一文 | Owner Approved Copy が存在しないため記載していない |

---

## 8. Sandbox 接続状態（Owner Reality Review 用）

> **Historical（2026-09-16 時点）。** Thanks Page の Stripe CTA は §14 で Live Payment Link へ差し替え済み。

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

## 11. Owner Approved Pattern の確定と My Life 横展開（2026-09-16）

### 11-1. 3 Weeks — Owner Approved Pattern（確定）

Owner が通常ブラウザで Stripe Checkout まで確認し、**Flow 全体を承認**した。
以下を Payment Foundation v1 の **Owner Approved Pattern** として確定する。

| 層 | 確定内容 |
|---|---|
| Application | Canonical Form v1.1 ／ Legal links は**別タブ**（`target="_blank" rel="noopener"`）／**AJAX submission** ／ `_next` は redirect 制御に使わない |
| Thanks | Stripe と銀行振込を**並列**表示 ／ Pressure・Scarcity・Deadline を置かない |
| Stripe | `Dreamin' Spiral 3 Weeks` ／ 60,000 JPY ／ one-time ／ `tax_behavior=inclusive` ／ `automatic_tax=false` ／ `quantity=1` ／ `metadata service=dreamin_spiral_3_weeks` |
| Stripe Description | **`「気になる」や「悩み」から自分に気づく3週間。｜Zoom 60分 × 3回。`**（Final） |
| Complete | 「最初の**セッション**の日程」／ 公開画面に `Dialogue` を使わない |

**Description の経緯：** 改行（`\n`）は API には保存されるが、**Stripe Checkout の表示上は維持されず一続きになる**ことを
Owner が実機で確認した。そのため Owner Approved Final Copy として **全角縦棒 `｜` による区切り**を採用した。

### 11-2. My Life — 横展開の内容

| 項目 | 内容 |
|---|---|
| Formspree endpoint | `https://formspree.io/f/xbglradg`（誤記 `xbgtradg` は不使用） |
| 送信方式 | **AJAX**（3 Weeks と同一実装） |
| 遷移先 | `/dreamin-spiral/my-life/thanks/`（ルート相対） |
| `_next` | 削除 |
| Legal links | **別タブ**（`target="_blank" rel="noopener"`） |
| Complete Copy | `最初のDialogueについて` → **`最初のセッションについて`** |

**Business Copy は新規創作していない。** 3 Weeks で Owner が確定した言い換えの適用と、Technical Pattern の横展開のみ。

### 11-3. My Life Sandbox Asset（retrieve validation・不一致 0 件）

| 項目 | 値 |
|---|---|
| Product | `prod_VGe5rKegivpnJE` ／ `Dreamin' Spiral My Life` ／ `自分そのものから、自分の人生を生きる6か月の伴走。` |
| Price | `price_1UG6nJ5pPQTx6Vir4FGeOBzy` ／ `jpy` `600000` `one_time` `tax_behavior=inclusive` |
| Payment Link | `plink_1UG6pr5pPQTx6Vir6W75gxgv` ／ `automatic_tax=false` ／ `quantity=1` ／ `metadata service=dreamin_spiral_my_life` ／ `active=true` ／ `livemode=false` |

**既存 Asset をそのまま使用し、再作成していない。**

### 11-4. My Life Sandbox E2E 結果

| 段階 | 結果 |
|---|---|
| required validation | ✅ 空送信を阻止（最初の不正は `name`） |
| `six_month_intent` | ✅ 項目あり・placeholder 一致・任意 |
| Legal links 別タブ | ✅ `target="_blank" rel="noopener"` |
| endpoint | ✅ `xbglradg` |
| Formspree submission | ✅ 成功 |
| 送信 field | `name` / `email` / `phone` / `message` / `six_month_intent` / `terms_privacy_consent=agreed` / `form_type=dreamin_spiral_my_life` / `site_version` / `source_page` / `submitted_at` |
| 既存 Form への誤送信 | ✅ なし |
| → 自前 Thanks | ✅ `/dreamin-spiral/my-life/thanks/` |
| Thanks 表示 | ✅ 600,000円（税込）×2 ／ Stripe・銀行振込が並列 ／ Pressure なし |
| Stripe Asset | ✅ Canonical と不一致 0 件 |
| **Stripe Checkout → Test Payment → Complete** | ⏸ **Engineer 環境では未検証**（§10-3 の `ERR_BLOCKED_BY_CLIENT`）。Checkout の HTML はサーバーから正常に返っている（約 576KB） |
| Complete Copy | ✅ 「最初のセッションについて」／`Dialogue` **0 件**／My Page・Community の記載あり |
| Complete mobile 375px | ✅ 横スクロール 0 |

`Dialogue` は `dreamin-spiral/` 配下の公開ページ全体で **0 件**。

---

## 12. Owner Reality Review Adjustment（2026-09-16）

### 12-1. 可読性調整 — 全 6 ページの Read-only 調査結果

背景 `#f7f6f4` に対する WCAG AA（通常テキスト 4.5:1）で判定した。

| selector | 色 | 比 | 意味役割 | 判定 |
|---|---|---|---|---|
| `.thanks-message .thanks-note` | `#aaa` | **2.15** | 申込受付確認・支払い案内 | ❌ → **`#666`（5.32）** |
| `.form-note` | `#aaa !important` | **2.15** | Stripe 補足・振込手数料 | ❌ → **`#666`（5.32）** |
| `.thanks-message p` | `#555` | 6.90 | 本文 | ✅ 維持 |
| `.section-block p` | `#555` | 6.90 | 本文 | ✅ 維持 |
| `.ds-payment-block p` ／ `.ds-offer-summary dd` ／ `.ds-next-list li` ／ `.ds-consent label` ／ `.apply-form input` | `#444` | 9.02 | 本文・入力値 | ✅ 維持 |
| `.ds-bank dd` | `#2f2b27` | 13.0 | 振込先の値 | ✅ 維持 |
| `.ds-bank dt` ／ `.ds-offer-summary dt` ／ `.ds-required` | `#9b7b5c` | 3.61 | **accent（ラベル・バッジ）** | — 対象外 |
| `::placeholder` | `#bbb` | 1.78 | **意図的に淡い** | — 対象外 |
| `.hero-label` | `#8c8680` | — | **eyebrow（濃紺背景上）** | — 対象外 |
| `.ds-field-note` | 宣言 `#8d8781` | — | 項目補足文 | — **実表示は `.section-block p` の `#555`（6.90）に上書きされており既に十分**。宣言値は変更していない |

**スコープ方法：** `.thanks-note` と `.form-note` はサイト全体（`index` / `dx` / `dc` / `dc-guide` / `academy/*` 計 9 ファイル）で共用しているため、
**6 ページの `<body>` に `ds-page` を付与し `.ds-page` 配下だけにスコープ**した。
前回の `.ds-complete-note` は `.ds-page .thanks-note` が担うため撤去し、重複スタイルを増やしていない。

**非波及の実測：** `academy/premium-success.html` ・ `index.html` とも `body.ds-page` を持たず `rgb(170,170,170)`（`#aaa`）のまま。

`color` 以外（font-size / font-weight / margin / line-height / layout / spacing / accent）は一切変更していない。

### 12-2. 3 Weeks — 申込前の確認ステップ

```
入力 → Validation → 確認 → 「修正する」 / 「この内容で申し込む」 → Formspree → Thanks
```

- 入力ステップ `#ds-step-input` と確認ステップ `#ds-step-confirm` を同一ページ内で切り替える（**reload しない**）
- 確認表示：お名前 ／ メールアドレス ／ 電話番号 ／ 今、気になっていることや、話してみたいこと ／ 利用規約およびプライバシーポリシー（`同意済み`）
- hidden 項目（`form_type` / `source_page` / `submitted_at` / `site_version`）は**表示しない**
- **「修正する」** … 入力ステップへ戻す。DOM をそのまま残すため**全値と Consent が保持される**
- **「この内容で申し込む」** … `disabled` で二重送信を防止 → Formspree へ AJAX → **成功時のみ Thanks**。失敗時は確認ステップに留まり再送信可能
- Formspree の endpoint・送信方式・field 構成は**変更なし**（`_next` は不使用のまま）

### 12-3. Email / Phone Validation

**方針：** 入力欄は 1 つ（二重入力なし）。送信前に前後空白を `trim`。
メッセージは**ブラウザ標準**を使い、独自のエラーコピーを作っていない（`pattern` 属性のみ）。

| 項目 | ルール |
|---|---|
| Email | `type="email"` + `required` + `pattern="[^\s@]+@[^\s@]+\.[^\s@]+"`（TLD のドットを要求） |
| Phone | `type="tel"` + `required` + `pattern="(?:\+81(?=(?:\D*\d){9,10}\D*$)[\d\s\(\)\-]+\|(?=(?:\D*\d){10,11}\D*$)[\d\s\(\)\-]+)"` |

Phone は **数字・ハイフン・半角スペース・括弧・`+81` を許容**し、**桁数だけ**で判定する
（国内 10〜11 桁 ／ `+81` は国番号の後 9〜10 桁）。**キャリア接頭辞や市外局番のルールは実装していない。**
placeholder は変更していない。

**検証結果（実ブラウザ・`checkValidity()`）**

| Email | 判定 | Phone | 判定 |
|---|---|---|---|
| `takuya.nakamura@b8e.co.jp` | ✅ 通過 | `080-1234-5678` | ✅ 通過 |
| `user+test@example.com` | ✅ 通過 | `08012345678` | ✅ 通過 |
| `abc` | ✅ 弾く | `03-6868-5470` | ✅ 通過 |
| `abc@` | ✅ 弾く | `+81 80 1234 5678` | ✅ 通過 |
| `@example.com` | ✅ 弾く | `090 1234 5678` ／ `(03) 6868-5470` ／ `0120-123-456` | ✅ 通過 |
| `abc@example` | ✅ 弾く | `123` ／ 19 桁の数字列 ／ `あいうえお` ／ `abc-defg-hijk` ／ 空 | ✅ 弾く |

Email 6 件・Phone 13 件すべて期待どおり。**一般的な正しい形式を弾いていない。**

### 12-4. 3 Weeks E2E 再検証

| 段階 | 結果 |
|---|---|
| Application 表示・Legal links 別タブ | ✅ |
| trim（前後空白） | ✅ 確認画面・送信値とも trim 後 |
| Validation | ✅ 上表のとおり |
| 入力 → 確認ステップ | ✅ 入力ステップが隠れ確認ステップが表示 |
| 確認表示（名前 / メール / 電話 / メッセージ / 同意済み） | ✅ |
| 「修正する」 | ✅ 入力へ戻り **全値 + Consent を保持**（URL 変化なし・reload なし） |
| 「この内容で申し込む」 | ✅ Formspree 送信成功 → `/dreamin-spiral/3-weeks/thanks/` |
| Thanks 文字色 | ✅ `thanks-note` / `form-note` とも 5.32 |
| Complete 文字色 | ✅ 5.32 ／「最初のセッション」／`Dialogue` 0 件 |

Stripe Sandbox Asset は**今回操作しておらず**、Canonical のまま（Description は `｜` 区切りの Final Copy）。

### 12-5. My Life の今回スコープ

**文字色の Technical Adjustment のみ**（`thanks-note` / `form-note` とも 5.32 を実測）。
確認ステップ・Email / Phone Validation・Application Flow 変更・Full E2E 再実行は**未実施**。
3 Weeks Owner Review 後に横展開する。

### 12-6. 未承認の暫定文言（Architect へ返却中）

| 文言 | 箇所 |
|---|---|
| `入力内容の確認` | 確認ステップの見出し |
| `同意済み` | 確認ステップの Consent 表示 |
| `送信できませんでした。お手数ですが、もう一度お試しください。` | 送信失敗時（既存・Owner Approved Error Copy として使用） |

前 2 件は機能上必要な最小ラベル。承認文言が決まりしだい差し替える。

---

## 13. 3 Weeks Owner Approved Pattern の My Life 横展開（2026-09-16）

3 Weeks は Application → Confirmation → Formspree → Thanks → Stripe Sandbox → Complete まで
**Owner Reality Review 完了・全項目 OK（Owner Approved）**。同 Pattern を My Life へ横展開した。

### 13-1. 横展開の方法（差分を生まないため 3 Weeks から抽出）

| 対象 | 方法 | 3 Weeks との差 |
|---|---|---|
| Email / Phone の `pattern` | 3 Weeks の HTML から**そのまま抽出** | **完全一致**（`diff` で確認） |
| 2 ステップ JS | 3 Weeks の script をそのまま複製 | **3 行のみ**：`THANKS` の遷移先 ／ `six_month_intent` の trim ／ 確認表示 |
| 確認ステップ | 3 Weeks と同構造 | `この6か月を、どんな時間として過ごしてみたいですか？` の行を追加 |
| 文言 | `入力内容の確認` ／ `同意済み` ／ Error Copy | 3 Weeks Owner Approved のものをそのまま使用 |

### 13-2. ⚠️ 横展開中に発見した潜在欠陥と修正（3 Weeks / My Life 共通）

**事象：** 前後空白の除去（trim）が、値によっては実行されなかった。

**原因：** ブラウザは `submit` イベントの**前に**標準 Validation を実行する。
そのため **前後空白だけが原因で `pattern` に一致しない値**は、JS の trim に到達する前に弾かれていた。

| 入力 | trim 前 | trim 後 |
|---|---|---|
| `" +81 80 1234 5678 "` | ❌ 不正 | ✅ 正常 |
| `" 080-1234-5678 "` | ✅（文字クラスが空白を許容） | ✅ |

`type="email"` は HTML 仕様上ブラウザが値の前後空白を自動除去するため影響なし。`type="tel"` / `type="text"` は除去されない。
3 Weeks の前回 E2E は国内形式で検証したため顕在化していなかった。

**修正：** `<form>` に **`novalidate`** を付与し、JS 側で **trim → `reportValidity()`** の順に実行する。
**利用者に見える挙動（ブラウザ標準のメッセージ表示）は変わらない。**
Owner Approved Pattern の仕様（前後空白除去）へ実装を合わせる**欠陥修正**であり、UX / Business の変更ではない。

**3 Weeks の回帰確認：** 空白付き `+81` が確認ステップへ進むこと、無効な電話（`123`）・無効なメール（`abc@`）・未同意が引き続き阻止されることを確認。

### 13-3. My Life Validation（3 Weeks と同一結果）

| Email | 結果 | Phone | 結果 |
|---|---|---|---|
| `takuya.nakamura@b8e.co.jp` ／ `user+test@example.com` | ✅ 通過 | `080-1234-5678` ／ `08012345678` ／ `03-6868-5470` ／ `+81 80 1234 5678` | ✅ 通過 |
| `abc` ／ `abc@` ／ `@example.com` ／ `abc@example` | ✅ 弾く | `090 1234 5678` ／ `(03) 6868-5470` ／ `0120-123-456` | ✅ 通過 |
| | | `123` ／ 19 桁 ／ `あいうえお` ／ `abc-defg-hijk` ／ 空 | ✅ 弾く |

### 13-4. My Life Full Sandbox E2E

| 段階 | 結果 |
|---|---|
| Application 全項目・`six_month_intent`（placeholder 含む） | ✅ |
| Legal links 別タブ | ✅ `target="_blank" rel="noopener"` |
| trim（前後空白付きで入力） | ✅ 確認表示・送信値とも trim 後 |
| 確認ステップ | ✅ 6 項目（名前 / メール / 電話 / メッセージ / 6か月の意図 / `同意済み`） |
| 「修正する」 | ✅ **6 項目 + Consent すべて保持**（reload なし） |
| 無効値（`novalidate` 下） | ✅ 確認へ進まず、ブラウザ標準メッセージ |
| 「この内容で申し込む」 | ✅ Formspree（`xbglradg`）送信成功 → `/dreamin-spiral/my-life/thanks/` |
| 送信 payload | ✅ `six_month_intent` を含む 10 field ／ `_next` なし |
| Thanks | ✅ 600,000円（税込）×2 ／ Stripe・銀行振込が並列 ／ Pressure 語 0 件 ／ `thanks-note`・`form-note` とも 5.32 |
| Stripe Sandbox Asset | ✅ retrieve で Canonical と**不一致 0 件** |
| **Checkout → Test Payment → Complete redirect** | ⏸ **Engineer 環境では未検証**（`ERR_BLOCKED_BY_CLIENT`・§10-3 と同一事象） |
| Complete | ✅「最初のセッションについて」／ My Page ／ Community ／ `Dialogue` 0 件 ／ 5.32・6.90・9.02 ／ Footer Legal |
| mobile 375px | ✅ 確認ステップ表示・横スクロール 0 |

**Readability：** 横展開で新たに加わった確認ステップのラベル（`.ds-confirm dt` = `#6b6b6b`）は 3 Weeks と同一で AA を満たし、
**新たな薄い本文は生じていない。**

---

## 14. Live Web Connection（Phase 5 Production Connection・2026-09-16）

Stripe Live Provisioning（OS repo `payment-foundation-v1.md` §13-10・Owner Approved）で作成済みの Live Payment Link を Thanks Page へ接続。
Live Asset は再作成していない。URL は Canonical（§13-10）から取得した。

| Service | 変更前（Sandbox） | 変更後（Live） | File |
|---|---|---|---|
| 3 Weeks | `https://buy.stripe.com/test_00w4gseyMdC5bhKbU7eAg00` | `https://buy.stripe.com/28E5kxe6M5TmcCO0VC0x206`（`plink_1UGFKH8tXYwNlHqEYUPswbJm`） | `dreamin-spiral/3-weeks/thanks/index.html` |
| My Life | `https://buy.stripe.com/test_fZudR29es9lP4Tmf6jeAg01` | `https://buy.stripe.com/28EbIV2o4ftWcCO47O0x207`（`plink_1UGFKQ8tXYwNlHqEgg0hw2rn`） | `dreamin-spiral/my-life/thanks/index.html` |

- 変更は各 Thanks Page の Stripe CTA の `href` と直前の HTML コメントのみ。Copy・銀行振込ブロック・Application・Complete は変更なし
- Live Payment Link の `after_completion` は Production Complete URL（`https://www.b8e.co.jp/dreamin-spiral/<service>/complete/`）。retrieve で再確認済み
- Production Complete URL は本 PR の merge までは 404（Preview 上で Live Checkout を完了すると本番 404 へ redirect されるため、Preview では支払わない）
- Sandbox Asset は Stripe 側に残す（regression / comparison 用）

---

## Change History

| Date | 内容 |
|---|---|
| 2026-09-16 | **Live Web Connection（§14）。** 3 Weeks / My Life の Thanks Page の Stripe CTA を Sandbox → Live Payment Link へ切替。Production Review（Owner Review Gate）で停止 |
| 2026-09-16 | **3 Weeks Owner Approved Pattern を My Life へ横展開**（確認ステップ・Email / Phone Validation・`pattern` は 3 Weeks から抽出し完全一致）。横展開中に**前後空白を含む値が trim 前に弾かれる潜在欠陥**を発見し、`novalidate` で 3 Weeks / My Life 両方を修正。My Life は Application → Confirmation → Formspree → Thanks と Complete を検証。Stripe Checkout 以降は Owner Review へ |
| 2026-09-16 | **Owner Reality Review Adjustment。** ①6 ページを Read-only 調査し「読ませる文」で AA 未達だった `.thanks-note` / `.form-note`（2.15:1）を `#666`（5.32:1）へ。`body.ds-page` で Payment Foundation 配下のみにスコープし、accent / placeholder / eyebrow は対象外 ②3 Weeks に申込前の確認ステップを追加（修正する / この内容で申し込む・二重送信防止・値保持）③Email / Phone に Validation を追加（`pattern` のみ・独自エラーコピーなし）④3 Weeks E2E 再成功。My Life は文字色のみ |
| 2026-09-16 | **3 Weeks を Owner Approved Pattern として確定**（Stripe Description を `｜` 区切りの Final Copy へ）。**同 Pattern を My Life へ横展開**（AJAX 送信・Legal links 別タブ・`_next` 削除・Complete Copy `Dialogue`→`セッション`）。My Life の Application → Formspree → Thanks と Complete を検証。Stripe Checkout 以降は Engineer 環境の制約により Owner Review へ委ねる |
| 2026-09-16 | **Owner Reality Review Adjustment 3 点を反映**（Legal links 別タブ／Stripe Description 改行／Complete Copy Dialogue→セッション）。Application → Formspree → Thanks と Complete Copy は再 Validation 済み。**Stripe Checkout は Sandbox Account の requirements past due により停止中**（§10-3） |
| 2026-09-16 | **3 Weeks を AJAX 送信方式へ変更し、Full Sandbox E2E（Application → Formspree → Thanks → Stripe → Test Payment → Complete）を通しで成功。** My Life は endpoint を `xbglradg` へ修正のみ（横展開は 3 Weeks Owner Review 後） |
| 2026-09-16 | Formspree endpoint を両 Form へ接続。3 Weeks（`mwlpenvp`）は受理を確認、My Life（`xbgtradg`）は FORM_NOT_FOUND。`_next` が Formspree 側で上書きされる事象を §9 に記録 |
| 2026-09-16 | **Owner Reality Review 第1回を反映。** 申込 Form の「お名前」「電話番号」に入力例を追加。Complete Page 本文から `contact@b8e.co.jp` の表示を削除 |
| 2026-09-16 | Sandbox Payment Link を Thanks Page へ接続。Sandbox E2E（3 Weeks のテスト決済 → redirect）を実測して記録 |
| 2026-09-16 | 新規作成。Application Form 2 本・Thanks / Next Step 2 本・Complete / Start 2 本・`style.css` A11 を実装。Formspree endpoint と Stripe Payment Link は未接続 |
