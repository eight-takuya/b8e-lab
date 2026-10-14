# Dreamin' Spiral 🌱 Entry Clarity v1（TOP ・ Dreamin' Spiral 🌱 LP）

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）。

**Status:** Implemented（Preview ・ Architect Review 待ち）
**Date:** 2026-10-15
**AI Creation Request:** ACR-20261015-002
**Scope:** `index.html`（#dreamin-spiral Section）・ `dreamin-spiral/index.html` ・ `style.css`（A25 追加のみ）

## Core Principle

入口は一般的に、分かりやすく、具体的に。中に入るほど Dreamin' Spiral 🌱 の思想 ・ 質感が伝わる。全面リニューアルではなく、情報階層 ・ 見出し ・ Service の見せ方 ・ 信頼 ・ Guide CTA だけを整える。

## 6 Service の見出し（TOP ・ LP 共通）

日本語の主見出し（`h3.ds-family-name`）→ Service 名（`p.ds-family-en` ・ 副題）。Visual ・「○○な人へ」・ Summary は KEEP（Project Creation の「○○な人へ」だけ変更 — 下記）。

| Service | 主見出し |
|---|---|
| Guide | まずは無料で、話してみる・相談してみる |
| 3 Weeks Tuning | 悩みや迷いを整理して、次の一歩を決める3週間 |
| My Life, My Way | これからの人生を、もう一度設計する |
| Project Creation | プロジェクトを推進できる人になる |
| Business Creation | 副業・新規事業を立ち上げ、育てる |
| Community | 安心して話せる、信頼できるコミュニティ |

- **Project Creation：** 会社 ・ 組織の Project に関わる Engineer ・ PM ・ PdM ・ PMO ・ Member が Project を前に進める力を身につける Service。旧「エンジニアから、プロジェクトを創る人へ。」は一人で立ち上げる意味に読めるため、「Engineer・PM・PdM・PMOなど、仕事でProjectに関わる人へ。」へ（TOP ・ LP の Card だけ。Project Creation Page は不変）
- **Group（階段ではない）：** まず話してみる（Guide）／ 今のテーマに合わせて伴走する（3 Weeks Tuning ・ My Life, My Way ・ Project Creation ・ Business Creation）／ 継続的につながる（Community）。Group 内の並びは Canonical Order（Project Creation → Business Creation）
- Guide ・ Community は Desktop で横長の Card（埋没させない）、中の 4 つは 2 列。Mobile はすべて 1 列

## TOP（#dreamin-spiral）

- Reality の引用 2 行 →「人生、仕事、キャリア、ビジネス。今、少し気になっているところから始められます。」
- テーマ 4 行（悩みや迷いを整理したい ／ これからの人生を考えたい ／ 副業やBusinessを始めたい ／ 仕事でProjectをもっと前に進めたい）を Lead の後に
- Bridge：「決まった順番はありません。」「迷ったときは、まず無料のGuideで話してみてください。」
- Hero ・ Three Paths（DX支援 ・ 企業型DC ・ Dreamin' Spiral 🌱）・ Track Record ・ 問いから読む ・ Section Ending は不変

## Dreamin' Spiral 🌱 LP の順序

| # | Section | 操作 |
|---|---|---|
| 1 | Hero ・ Recognition（共感）| KEEP |
| 2 | **今、どんなことが気になっていますか？**（6 テーマ → Service の Text Link list）| ADD |
| 3 | Dreamin' Spiral 🌱とは ・ Spiral ・ 気づくだけで、終わらない。| KEEP（Creation を Service の前へ MOVE）|
| 4 | **人と、仕事と、Projectの現場に向き合ってきました。**（中村琢八 ・ 25年以上 ／ 50社以上 ／ 50Project以上 ／ 延べ300名以上）| ADD |
| 5 | 今の自分に近い入口から。（Group ・ 日本語の主見出し）| REFRAME |
| 6 | **どれが自分に合うか分からなくても大丈夫です。**（Guide 無料 ・ Zoom 45分 ・「無料で話してみる」）| ADD |
| 7 | YouTube「人生覚醒チャンネル」・ Library ・ 問いから読む | YouTube を ADD（https://www.youtube.com/@DreaminSpiral）・ 他は KEEP |
| 8 | Closing（Copy ・ Visual KEEP）＋「無料で話してみる」＋ Return | REFRAME |

- **延べ300名以上：** 50社以上 × 平均2名程度 ＋ 50Project以上 × 平均4名程度の延べ人数（Owner 提示）。注記で「同じ方を重ねて数えている場合がある」「Dreamin' Spiral 🌱の利用者数ではない」と明記。他の数値は既存の Public 事実（TOP Track Record ・ DX支援 ・ About）
- **Guide CTA：** Guide Page と同じ正式な Booking（GAS `?page=booking` ・ `data-gas-transition` ・ `/gas-transition.js`）。表現は Text Action（`.ds-service-cta`）。LP の Guide 節と Closing の 2 か所
- 人物の写真は About の `owner-240/480`（既存 Asset）を再利用。新しい Visual なし

## Verification（local）

- TOP ・ LP：320 ／ 375 ／ 390 ／ 430 ／ 768 ／ 820 ／ 879 ／ 1024 ／ 1280 ／ 1440 で overflow 0 ・ 1〜2 文字の行 0 ・「（」「「」の行末 0 ・ 句読点の行頭 0。Card は 768 以下 1 列 ・ 820 以上 2 列
- 内部 link ・ 画像 ・ page 内 anchor：切れ 0。GAS Booking 200 ・ YouTube 200。Guide CTA 2 件とも Guide Page と同じ href ・ Transition 文言、click で Transition View 表示（遷移 timer を止めて確認）
- JS error 0（404 は local に無い `/_vercel/insights/script.js` だけ）・ HTML の開閉 0 不整合
- 差分は `index.html` ・ `dreamin-spiral/index.html` ・ `style.css`（追加のみ）。他ページ ・ Service Page ・ DX支援 ・ 企業型DC ・ 問い合わせ form は不変
