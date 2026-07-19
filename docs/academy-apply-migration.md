# Academy Apply 移行整理（v1.0.1 Phase 1）

> 旧共通 Apply ページ（`academy/apply.html`）の扱いを整理した記録。
> Journey 再設計（PR #69）で Community / Premium は専用ページへ分離済み。本 Phase はその後始末。

## 旧 URL 一覧

| URL | かつての役割 |
|---|---|
| `/academy/apply.html` | 共通 Apply（Community / Premium / 相談 の3分岐） |
| `/academy/apply.html#community` | Community 申込セクションへのアンカー |
| `/academy/apply.html#premium` | Premium 申込セクションへのアンカー |
| `/academy/apply.html#consult` | 相談（Session）セクションへのアンカー |

## 現在の利用状況（調査結果・2026-07-20）

- **リポジトリ内から `apply.html` へのリンクは実質ゼロ。** PR #69 で全内部導線を専用ページへ直結済み：
  - Community → `community-apply.html`（community.html・apply.html 内）
  - Premium → `premium-apply.html`（premium.html・apply.html 内）
  - Session → `session.html#apply`
- `apply.html#community` / `#premium` / `#consult` を指す内部リンクは**存在しない**（grep 済み）。
- 旧 URL への外部流入（SNS 共有・ブックマーク・検索インデックス）が残る可能性はあるため、URL 自体は維持する。

## 採用した移行方法

**優先案（移行案内ページ + 内部リンク直結）を採用。**

1. `apply.html` は「入口のご案内」ページとして維持（PR #69 実装済み）。3導線を明示：
   - Community に参加する → `community-apply.html`
   - Premium 伴走を始める → `premium-apply.html`
   - Session（無料ガイドセッション）を申し込む → `session.html#apply`
   - 主導線は Program（Academy の歩き方）
2. 本 Phase で追加：
   - `<meta name="robots" content="noindex, follow">`（重複コンテンツの検索インデックス回避。リンクは辿らせる）
   - 旧アンカー到達時のクライアント側案内スクリプト（下記）

## 301 Redirect を採用したか

**採用していない。** 理由：

- URL フラグメント（`#community` 等）はサーバーへ送信されないため、`vercel.json` 等のサーバー側設定でフラグメント別の 301 分岐は**技術的に不可能**。
- `apply.html` 全体を Community または Premium のどちらか一方へ一律 301 すると、他方・Session を選びたい利用者を誤誘導する。**行き先を一つに決められないため一律 301 は行わない。**
- 現状 `vercel.json` は存在せず、サーバー側リダイレクト設定は導入していない。

## フラグメント URL の制約と対応

- `#community` / `#premium` / `#consult` は各案内リンクの `id` として保持しているため、`apply.html#premium` 等でアクセスすると**ブラウザ標準のアンカースクロール**で該当リンクへ移動する。
- 加えて、`apply.html` 末尾に**クライアント側の案内スクリプト**を追加：既知のフラグメント（community / premium / consult のみ許可）で到達した場合、対応するリンクを画面中央へスクロールし、キーボード／スクリーンリーダー利用者のためにフォーカスを移す。
- **これは 301 Redirect ではなく「クライアント側の案内」である。** 自動遷移はさせず、利用者が他の入口も選べるよう選択肢を残す。許可した3値以外のフラグメントは無視する（任意文字列を DOM へ出力しない）。

## canonical / noindex 方針

| 項目 | 設定 |
|---|---|
| canonical | `https://www.b8e.co.jp/academy/apply.html`（自己参照。他ページへ寄せると誤ったシグナルになるため変更しない） |
| robots | `noindex, follow`（案内ページなので検索結果に出さず、リンク先の専用ページは評価されるようにする） |
| 専用ページ側（community-apply / premium-apply） | 通常どおり index 対象。canonical は各自を指す |

## 将来的な完全廃止条件

以下がすべて満たされたとき、`apply.html` の 301 化または削除を検討してよい：

1. 検索インデックスから `apply.html` が消え、外部流入（Analytics で確認）が実質ゼロになっている
2. 旧 URL を掲載した外部資料（SNS 投稿・名刺・チラシ等）が残っていないことを確認済み
3. その時点で 301 を行う場合、行き先は `program.html`（Academy の歩き方）を第一候補とする（特定サービスへ寄せない）
4. フラグメント別の出し分けは引き続きサーバー側では不可能なため、必要なら本ページのクライアント側案内を維持する

現時点では上記を確認できないため、**案内ページとして維持する**。
