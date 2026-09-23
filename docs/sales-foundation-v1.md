# Dreamin' Spiral Sales Foundation v1 — Legal Foundation（実装記録）

> Dreamin' Spiral 3 Weeks / My Life を Reality へ出すための **Sales Foundation v1** のうち、
> Legal Foundation（Privacy Policy / 利用規約 / 特定商取引法に基づく表記 / Footer Legal Navigation）を
> b8e-lab へ実装した記録と、後続の申込 Form が従う **Form Consent v1.1** 仕様。
>
> Owner（中村）・Architect（ChatGPT）Approved の設計（2026-09-15）を、Engineer（Claude Code）が実装した。
> 本書は b8e-lab の Web 実装の記録であり、Offer（価格・提供内容）そのものを定義しない。

| 項目 | 内容 |
|---|---|
| Status | **Released（2026-09-15・PR #84 merge `081fa8a`）／ Legal Foundation v1：CLOSED** |
| Decision | Owner Approved（2026-09-15） |
| 対象 | Legal Page 3 本・全ページ Footer・Form Consent v1.1 仕様 |
| Offer の正本 | [dreamin-spiral-os `docs/repository-architecture/dreamin-spiral-offer-definition.md`](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/repository-architecture/dreamin-spiral-offer-definition.md)（3 Weeks Offer v1 / My Life Offer v1） |
| Community 解約運用の正本 | dreamin-spiral-academy `docs/community-portal/community-session-business-flow-and-portal-architecture-planning-v1.0.md` §49 |

---

## 1. Legal Pages

| Public URL（Canonical） | Source | 文書版 | 日付表示 | 対象 |
|---|---|---|---|---|
| `https://www.b8e.co.jp/privacy-policy/` | `privacy-policy/index.html` | Privacy Policy **v0.4** | 制定日：2026年9月15日 ／ 最終改定日：2026年9月19日 | BEAT EIGHT EMOTION株式会社の Web サイト・各種サービス |
| `https://www.b8e.co.jp/terms/` | `terms/index.html` | Dreamin' Spiral 利用規約 **v0.4** | 制定日：2026年9月15日 ／ 最終改定日：2026年9月19日 | Dreamin' Spiral Guide / 3 Weeks / Community / My Life / Business Creation |
| `https://www.b8e.co.jp/legal/` | `legal/index.html` | 特定商取引法に基づく表記 **v0.4** | 最終更新日：2026年9月19日 | 有料サービス（3 Weeks / Community / My Life / Business Creation） |

- URL は **末尾スラッシュのディレクトリ URL**（`/privacy-policy/` 等）を Public Canonical とする。
  サイトは `vercel.json` を持たず Clean URLs も無効のため、`<dir>/index.html` の静的配置で実現している（新しい Routing の導入なし）
- 本文は Owner Approved v0.3 の文言をそのまま HTML 化した（見出しレベルの調整・リンク化のみ）。**文言を変える場合は Owner / Architect の承認を経る**
- 表示は既存の Header / Global Nav / Footer / `.page-content` を踏襲し、`style.css` の **A10. Legal Pages**（`.legal-*`）だけを追加した
- 日付は各ページ本文の末尾に `.legal-date` で表示する。**文言を改訂したときは Privacy / 利用規約に「最終更新日」を追加し、特商法表記の「最終更新日」を更新する**
- Global Nav には追加しない（5 ページ構成を維持）

## 2. Footer Legal Navigation

全公開ページの `nav.footer-links` の末尾（`お問い合わせ` の後）に、次の順で 3 リンクを置く。

```html
<a href="/privacy-policy/">プライバシーポリシー</a>
<a href="/terms/">利用規約</a>
<a href="/legal/">特定商取引法に基づく表記</a>
```

- どの階層のページからも同じになるよう **ルート相対パス**で記述する
- **新しいページを追加するときは、この 3 リンクを含む Footer を複製する**（Footer は各 HTML に個別複製されている）
- Legal Page 同士の相互移動は Footer で担う（Legal 専用の重複 Navigation は置かない）
- Footer の著作権表示は **`© 2026 BEAT EIGHT EMOTION株式会社`**（2026-09-15 に全公開ページを 2025 → 2026 へ更新）

## 3. 公開・契約上の正式窓口

| 項目 | 値 |
|---|---|
| 販売事業者 | BEAT EIGHT EMOTION株式会社 |
| 運営責任者 | 代表取締役　中村 琢八 |
| 所在地 | 〒102-0074 東京都千代田区九段南1丁目5番6号 りそな九段ビル5階 KSフロア |
| 電話番号 | 03-6868-5470 |
| **公開・契約上の正式メール窓口** | **`contact@b8e.co.jp`** |

- `academy@b8e.co.jp` は現在 **Technical Account**（GAS 実行 identity 等）として存在するが、**Legal / Public Contact には使用しない**
- `academy@b8e.co.jp` の Rename / Migration は Future Phase（Technical Migration）で扱う。本 Sales Foundation では触れていない

## 4. 価格の掲載範囲（Public / Private 境界の更新）

[site-structure.md](site-structure.md) の Public / Private 境界は「未確定の料金を b8e-lab に置かない」。
Sales Foundation v1 で **Owner Approved（2026-09-15）となった次の価格は、特定商取引法に基づく表記に公開する**。

| Service | 価格 | 根拠 |
|---|---|---|
| Dreamin' Spiral 3 Weeks | 60,000円（税込） | OS Offer Definition §1（Offer v1） |
| Dreamin' Spiral Community | 20,000円（税込）／月 | Sales Foundation v1 Owner Approved（Stripe Subscription） |
| Dreamin' Spiral My Life | 600,000円（税込） | OS Offer Definition §2（Offer v1） |

- **Dreamin' Spiral Guide** は無料サービス。利用規約の対象には含め、特商法の有料サービス一覧には載せない
- **Dreamin' Spiral Business Creation**（2026-09-19・v0.4）: 無料の初回対話（90分・申込 ／ 契約 ／ 支払いではない）と、有料サービス（6か月 880,000円 ／ 12か月 1,600,000円（税込）・ご提案 → 個別契約 → 支払い）を分けて、特商法表記 ・ 利用規約 ・ プライバシーポリシーへ追加した（Legal Review で問題なし・OS Business Creation Legal Design v1 §18 の Production Launch Gate）。有料サービスの中途終了 ・ 分割 ・ 延長 ・ IP 等の詳細は、有料の受入開始の前に別途扱う
- **Project Creation**（2026-09-23・v0.5）: Founding Cohort 148,000円（税込）・一括払いを特商法表記の価格一覧へ追加し、利用規約（第1条 ・ 第9条の2）・ プライバシーポリシーへ追加した。正本は OS `project-creation-launch-v1.md` §12 ・ Offer Definition §6
- 旧 Academy / Premium 等の Historical ページ（`academy/*`）の文言・価格表示方針は本 Sales Foundation では変更していない

## 5. Dreamin' Spiral Community の解約運用（Legal 文言との整合）

利用規約 第9条・特商法表記「キャンセル・中途解約・返金」と一致する運用。運用の正本は academy repo の Community Portal 計画書 §49。

```
利用者
↓
contact@b8e.co.jp へ解約をメールで連絡
↓
Owner が受領
↓
Stripe Subscription を current period end（現在の利用期間の終了時）で cancel
↓
現在の利用期間終了までは Community Access を維持
↓
期間終了後に Community Access（community-members Google Group 等）を終了
```

- **解約申出を受けた瞬間に Community Access を削除しない**
- 次回更新日以降の料金は発生させない。支払済みの当期分は原則返金しない

## 6. Form Consent v1.1（後続 Form の仕様）

今後実装する **Dreamin' Spiral 3 Weeks Form** / **Dreamin' Spiral My Life Form** では、
利用規約とプライバシーポリシーへの同意を **1 つの必須チェックボックス**で扱う。

| 項目 | 仕様 |
|---|---|
| 表示文言 | 「**利用規約**および**プライバシーポリシー**を確認し、同意します。」 |
| Link | 利用規約 → `/terms/`、プライバシーポリシー → `/privacy-policy/` |
| `name` | `terms_privacy_consent` |
| `type` | `checkbox` |
| `value` | `agreed` |
| `required` | `true` |

- Privacy Policy 単独の同意（旧仕様）は Form v1.1 では使用しない
- 既存の問い合わせ Form（B8E 本体 5 ページ・`academy/session.html`）は本仕様の対象外で、今回変更していない

## 7. Form v1.1 Reference（未実装・Owner Approved Design）

### Dreamin' Spiral 3 Weeks Form v1.1

| # | 表示 | name | type | 必須 | 補足 |
|---|---|---|---|---|---|
| 1 | お名前 | `name` | text | Required | |
| 2 | メールアドレス | `email` | email | Required | お申し込み後のご案内をお送りします。 |
| 3 | 電話番号 | `phone` | tel | Required | メール等でご連絡がつかない場合や、Zoom当日の緊急連絡などに使用します。厳格な国内番号の pattern validation は行わない |
| 4 | 今、気になっていることや、話してみたいことがあれば教えてください。 | `message` | textarea | Optional | placeholder：まとまっていなくても大丈夫です。今、頭や心に浮かんでいることを、そのままお書きください。 |
| 5 | 利用規約およびプライバシーポリシーを確認し、同意します。 | `terms_privacy_consent` | checkbox（`agreed`） | Required | §6 |
| 6 | Submit：3 Weeksに申し込む | | | | |

Hidden：`form_type = dreamin_spiral_3weeks`・`source_page`・`submitted_at`・必要なら `site_version`

### Dreamin' Spiral My Life Form v1.1

| # | 表示 | name | type | 必須 | 補足 |
|---|---|---|---|---|---|
| 1 | お名前 | `name` | text | Required | |
| 2 | メールアドレス | `email` | email | Required | お申し込み後のご案内をお送りします。 |
| 3 | 電話番号 | `phone` | tel | Required | メール等でご連絡がつかない場合や、Zoom当日の緊急連絡などに使用します。 |
| 4 | 今、気になっていることや、話してみたいことがあれば教えてください。 | `message` | textarea | Optional | |
| 5 | この6か月を、どんな時間として過ごしてみたいですか？ | `six_month_intent` | textarea | Optional | placeholder：はっきりしていなくても大丈夫です。今感じていることを、そのままお書きください。 |
| 6 | 利用規約およびプライバシーポリシーを確認し、同意します。 | `terms_privacy_consent` | checkbox（`agreed`） | Required | §6 |
| 7 | Submit：My Lifeに申し込む | | | | |

Hidden：`form_type = dreamin_spiral_my_life`・`source_page`・`submitted_at`・必要なら `site_version`

## 8. 本 Sales Foundation で実施していないもの（後続）

- Dreamin' Spiral 3 Weeks / My Life の Service Page・Form（Formspree endpoint を含む）
- Thanks / Next Step Page・Payment Complete / Onboarding
- Stripe Product / Price / Payment Link（3 Weeks・My Life）
- 銀行振込の案内 Page
- 旧 Premium / Community の公開申込導線（`academy/premium-apply.html`・`academy/community-apply.html` の Stripe Link）の扱い
- `academy@b8e.co.jp`・Academy / Premium 等の Technical Rename / Migration

## Change History

| Date | 内容 |
|---|---|
| 2026-09-23 | **Legal Pages v0.5:** Project Creation を 3 ページへ追加（特商法表記: 価格 ・ 提供形態 ・ 支払 ・ 提供時期 ・ キャンセル ／ 利用規約: 第1条 ・ 第2条 ・ 第9条の2 ・ 第11条 ／ プライバシーポリシー: 取得する情報 ・ 利用目的 ・ 外部サービス（AI）・ グループでの共有）。最終更新日 ／ 最終改定日 2026年9月23日 |
| 2026-09-19 | **Legal Pages v0.4:** Dreamin' Spiral Business Creation を 3 ページへ追加（特商法表記: 価格 ・ 無料の初回対話 ・ 外部サービス費用 ・ 支払方法 ／ 時期 ・ 提供時期 ・ キャンセル／ 利用規約: 第1条 ・ 第3条 ・ 第4条／ プライバシーポリシー: 取得する情報 ・ 利用目的）。Legal Review（D-1 特商法 ・ D-2 利用規約）問題なし。最終更新日 ／ 最終改定日 2026年9月19日 |
| 2026-09-15 | **Legal Foundation v1 CLOSED。** PR #84（b8e-lab・`081fa8a`）・PR #132（academy・`483e5a2`）を merge。本番で 3 Legal Page・Footer Legal リンク・© 2026・日付表示を確認 |
| 2026-09-15 | Legal Page に制定日 / 最終更新日（2026年9月15日）を追加。全公開ページの Footer 著作権表示を © 2026 へ更新（Owner / Architect Approved） |
| 2026-09-15 | 新規作成。Legal Page 3 本（v0.3）・Footer Legal Navigation・正式窓口・Community 解約運用・Form Consent v1.1・Form v1.1 Reference を記録 |
