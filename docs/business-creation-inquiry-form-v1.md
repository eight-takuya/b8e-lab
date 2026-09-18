# Dreamin' Spiral Business Creation Inquiry Form v1 — 実装記録（b8e-lab）

> Business Creation 専用 Inquiry Form `/dreamin-spiral/business-creation/inquiry/` と送信後の Thanks `/dreamin-spiral/business-creation/thanks/` の Web 実装の記録。
> **意味 ・ fields の正本は OS repo** `constitution/brand-architecture/business-creation-architecture.md` §9.3 ・ §9.5.3 〜 §9.5.5、
> Privacy 設計は `docs/repository-architecture/business-creation-legal-design-v1.md` §11 ・ §17 ・ §18。本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **SUPERSEDED（2026-09-18・Production 未公開のまま廃止）** — Business Creation Dialogue Entry Integration（Architect Decision）で、GAS の Business Creation Dialogue Form（Reality → 90分の対話日時 → 予約）へ統合。`inquiry/` ・ `thanks/` は PR #104 から削除した。本書は Historical Record として残す（以下の本文は当時の実装記録） |
| 旧 Status | PREVIEW IMPLEMENTED ／ Owner Reality Review：PENDING |
| Formspree endpoint | 不要になった（Superseded）。当時は OWNER ACTION REQUIRED（未作成）・Preview 用の非送信モード（§5） |
| Production | **NOT RELEASED**（PR #104 ＝ Business Creation Public Entrance の release branch。merge していない） |
| 実装日 | 2026-09-18 |
| Branch | `feature/business-creation-public-page-v1`（PR #104・additive commit） |

## 1. 役割

- Business Creation について**最初の対話を始めるため**に、相手の今の現実（リアリティ）を受け取る入口
- **Application ・ 審査 ・ Fit Gate ・ Lead scoring ・ 決済 ／ 契約の入口ではない。** Guide は必須ではない
- General B8E Contact Form（`mykleakb`）には混ぜない（OS §9.5.4）
- 送信 ≠ 申込 ・ 承認 ・ Fit 判定 ・ Proposal 受諾 ・ 契約 ・ 決済

## 2. Pages

| File | URL | title | robots | canonical |
|---|---|---|---|---|
| `dreamin-spiral/business-creation/inquiry/index.html` | `/dreamin-spiral/business-creation/inquiry/` | Business Creationについて話してみる \| Dreamin' Spiral Business Creation \| B8E | index（既存 apply page と同じ） | `https://www.b8e.co.jp/dreamin-spiral/business-creation/inquiry/` |
| `dreamin-spiral/business-creation/thanks/index.html` | `/dreamin-spiral/business-creation/thanks/` | 送信ありがとうございます \| Dreamin' Spiral Business Creation \| B8E | `noindex, follow`（既存 thanks と同じ） | `https://www.b8e.co.jp/dreamin-spiral/business-creation/thanks/` |

- Route は既存の Service 子 route（`/dreamin-spiral/<service>/apply/`・`/thanks/`）の convention に合わせた。`apply` は申込の意味になるため使わず、`inquiry` とした
- Visual は既存 apply ／ thanks の pattern（`.thanks-hero` ・ `.apply-form.ds-apply-form` ・ `.ds-field` ・ `.ds-consent` ・ `.ds-form-error` ・ `.thanks-message`）を再利用。**style.css は変更していない**
- 見出し（`.hero-copy`）は `h1` 要素にした（既存 apply page は `p`。見え方は同じ）

## 3. Fields（OS §9.5.3 の 6 fields。追加していない）

| # | Label | name | type | 必須 |
|---|---|---|---|---|
| 1 | お名前 | `name` | text（`autocomplete=name`） | 必須 |
| 2 | メールアドレス | `email` | email（`autocomplete=email`・既存と同じ pattern） | 必須 |
| 3 | 今、気になっていること | `current_concern` | textarea | 任意 |
| 4 | Businessの現在地 | `business_current` | textarea | 任意 |
| 5 | IT / AIについての現在地 | `it_ai_current` | textarea | 任意 |
| 6 | 話してみたいこと | `conversation_topic` | textarea | 任意 |

- 必須はお名前 ・ メールアドレスのみ。他 4 項目は任意（Form を Application ／ 詳細な質問票にしないため・OS に必須指定はない）
- Public Page の 4 つの Starting Reality を radio ／ checkbox にしていない。本人の言葉で受け取る
- 補足: 項目 3 に「まとまっていなくても大丈夫です。今感じていることを、そのまま書いてください。」（`aria-describedby`）
- 注意書き: 「パスワードや機密情報などは入力しないでください。」（Consent の直前）
- maxlength ・ 条件分岐 ・ 多段 wizard ・ scoring はなし

## 4. Consent ・ Hidden ・ Spam

| 項目 | 内容 |
|---|---|
| Consent | **Form Consent v1.1 をそのまま再利用**（`name=terms_privacy_consent` ・ `value=agreed` ・ 必須 ・ 文言「利用規約およびプライバシーポリシーを確認し、同意します。」・ link は別タブ） |
| Hidden | `form_type=business_creation_inquiry` ／ `site_version=business-creation-inquiry-v1` ／ `source_page`（referrer の path・既定 `direct`）／ `submitted_at`（送信時の ISO 時刻）。既存 apply form と同じ convention |
| Spam | `_gotcha` honeypot（既存 Contact Form と同じ Formspree 標準） |
| Submit | 「送信する」（1 画面。確認 step なし・既存 Contact Form と同じ一段送信） |

## 5. 送信方式 ・ Formspree

- 既存 3 Weeks ／ My Life と同じ **AJAX（fetch・`Accept: application/json`）**。**送信成功時のみ** Thanks へ遷移（ルート相対）。失敗時は入力を保持し、既存の Owner Approved Error Copy を表示
- **Business Creation 専用 endpoint が必要。** 既存 `mykleakb` ／ `mwlpenvp` ／ `xbglradg` ／ `xgoqybbl` は流用しない
- 新規 Form の作成は Owner の Formspree Dashboard でのみ可能（OS `payment-foundation-v1.md` §13-2 の調査結果：CLI ・ API ・ 環境上の認証では作成できない）
- **endpoint 未設定の間（`ENDPOINT = ''`）は非送信モード:** Validation まで動作し、送信はせず「Preview：送信先（Formspree）の設定前のため…」を表示する。Thanks へは進まない
- Owner が endpoint を作成したら、Engineer が `ENDPOINT` に設定して Preview を再 deploy し、test submission で確認する

## 6. 送信後

- Thanks: 送信のお礼 ／ 内容を確認のうえ Business Creation についてお話しするためのご連絡 ／ 送信時点で契約 ・ 決済は発生しない ／ まず今の現実（リアリティ）から一緒に見ていく。**返信時期は約束しない**
- 日程調整: **Owner がメール等で個別に調整する manual flow**（v1 default）。Guide の Booking GAS には接続しない。新しい予約 tool は導入しない
- Autoresponse: **なし**（既存 Form に precedent がない）
- Owner 通知: Formspree の通知（Form 作成時の通知先）。`form_type` で Business Creation と識別できる
- Client ID: **送信時点では発番しない**（Inquiry ≠ Client acceptance。OS Payment Flow v1 §4：Owner が Business Creation Client として進めると判断した後）

## 7. Public Page との接続

- Public Page の Primary CTA「Business Creationについて話してみる」（Hero ・ Final）を `/dreamin-spiral/business-creation/inquiry/` へ接続（Preview branch のみ）
- Guide の Secondary link（`/dreamin-spiral/guide/`）は変更なし

## 8. Production Gate（未完了）

- Formspree endpoint の作成と設定 ・ test submission
- Business Creation 向けの Privacy Policy ・ 利用規約 ・ 特定商取引法に基づく表記の整合（OS Legal Design v1 §17 ・ §18。現行 Privacy Policy は問い合わせ情報の取得を一般的に含むが、Business Creation 固有の表現は未整備）
- Owner Reality Review ／ Production Review

## 9. Change History

| Date | 内容 |
|---|---|
| 2026-09-18 | **新規作成。** Inquiry Form v1 ・ Thanks を Preview として実装。Public Page の Primary CTA を接続。Formspree endpoint は Owner Action 待ち（非送信モード）。Production 未公開 |
| 2026-09-18 | **Superseded。** Business Creation Dialogue Entry Integration により、Inquiry Form ／ Thanks を Production 未公開のまま削除。Formspree endpoint の作成は不要になった。後継: dreamin-spiral-academy の Business Creation Dialogue Form（GAS）・OS `business-creation-architecture.md` §9.5.3 |
