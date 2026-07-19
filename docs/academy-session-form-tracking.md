# Academy Session フォーム 流入元トラッキング（v1.0.1 Phase 3）

> `academy/session.html` の Formspree フォームに、運用改善のための hidden 項目を追加した記録。
> 利用者の入力負担は増やさず、どのページ／Journey から Session へ進んだかを把握する。

## 追加した hidden 項目

| name | 設定方法 | 値の意味 |
|---|---|---|
| `form_type` | 固定値 | フォーム種別。常に `academy_session` |
| `site_version` | 固定値 | サイト実装バージョン。`academy-v1.0.1` |
| `source_page` | スクリプトが `?from=` を検証して設定 | Session への流入元ページ。既定 `direct` |
| `submitted_at` | 送信時にスクリプトが設定 | 送信時刻（ISO 8601・利用者端末の時計） |

既存の hidden（`program=dreamin-spiral-academy`、`_next=…/thanks.html`）と可視項目（name / email / message）は**変更していない**。

## 値の意味と許可値

`source_page` は、Session へのリンクに付与した `?from=` クエリパラメータから設定する。
**許可リストに一致する値のみ**を採用し、それ以外（未指定・不正値）はすべて `direct` にフォールバックする。

許可値（＝流入元ページ）：

| `?from=` | 流入元 |
|---|---|
| `program` | Program（Journey Map・末尾CTA） |
| `library` | Library |
| `community` | Community |
| `premium` | Premium |
| `community-apply` | Community 申込ページ |
| `premium-apply` | Premium 申込ページ |
| `apply` | 旧 Apply 案内ページ |
| （上記以外・なし） | `direct`（URL 直接・ブックマーク・外部流入等） |

## Session への内部リンク（`?from=` 付与済み）

| リンク元 | href |
|---|---|
| program.html（Journey Map） | `session.html?from=program` |
| program.html（末尾CTA） | `session.html?from=program` |
| library.html | `session.html?from=library` |
| community.html | `session.html?from=community` |
| premium.html | `session.html?from=premium` |
| community-apply.html | `session.html?from=community-apply` |
| premium-apply.html | `session.html?from=premium-apply` |
| apply.html | `session.html?from=apply#apply` |

## 確認方法

1. `session.html?from=program` 等でアクセスし、ブラウザ開発者ツールの Elements で
   `<input name="source_page">` の `value` が `program` になっていることを確認。
2. `?from=` を付けない、または不正値（例：`?from=evil"><script>`）でアクセスすると `direct` になることを確認。
3. 送信直前に `submitted_at` に ISO 時刻が入ることを確認（実送信は不要。`submit` を preventDefault してテスト可）。
4. 本 PR では Node + Chrome DevTools Protocol による自動テストで全許可値・不正値・空値・送信時刻・既存項目不変を検証済み。

## Formspree での見え方

送信されると、Formspree の受信データに以下が **name=value** として追加表示される：

```
form_type       = academy_session
site_version    = academy-v1.0.1
source_page     = program            （例）
submitted_at    = 2026-07-20T00:12:34.567Z （例）
program         = dreamin-spiral-academy   （既存）
name / email / message                     （利用者入力）
```

Formspree の管理画面・通知メール・CSV エクスポートで、流入元ごとの傾向を確認できる。

## プライバシー上の考慮

- **利用者の追加入力は一切なし。** hidden 項目のみで、入力欄は増やしていない。
- `document.referrer` や閲覧履歴、Cookie、外部トラッカーは**使用しない**（過剰収集を避ける）。
- `source_page` はサイト内リンクに明示的に付与した `?from=` の**許可値のみ**を採用し、任意文字列を DOM やフォームへ出力しない（XSS・値の汚染を防止）。
- `submitted_at` は端末時計に基づくおおよその送信時刻で、個人を特定する情報ではない。
- 収集する情報は「どのページから Session に来たか」「いつ送信したか」に限定し、運用改善の目的に必要な最小限にとどめる。

## 新しい流入元を追加するとき

1. 新しいリンク元ページから `session.html?from=<key>` でリンクする。
2. `session.html` 末尾スクリプトの `ALLOWED` 配列へ `<key>` を追加する。
3. 本ドキュメントの許可値テーブルへ追記する。
