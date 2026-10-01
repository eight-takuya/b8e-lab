# Business Creation Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/business-creation/index.html` のみ（`style.css` ・ `gas-transition.js` ・ Dialogue Form の URL ／ 属性は変更なし。A21 の Reality Hero ・ Continue Cue を再利用）
**AI Creation Request:** ACR-20261001-009

## Core Principle

Business Creation を知らない人が、最初から「Creation System」を理解する必要はない。
まず「今の自分の Business のことかもしれない」と感じられる Reality から入り、「実際に一緒に何を創るのか」が見えたあとで、「Business だけでなく、自分で創り続けられる Creation System も残る」という Meaning へ進む。

## Section 構造

| # | Before | After | 操作 |
|---|---|---|---|
| 01 | Hero（あなたのBusinessを、一緒に創る。＋ Creation System の Lead ＋ Dialogue CTA ＋ Guide） | **Hero — Reality**（やりたいことを、Businessにしたい。…＋ Continue Cue「Business Creationについて見てみる ↓」） | REFRAME ・ Hero の Primary ／ Guide CTA を REMOVE ・ ADD |
| 02 | Starting Reality | **Recognition**（`#recognition`） | KEEP（見出し ・ 本文 ・ 4 つの list ・「どれも、問題ではありません。」は byte 不変） |
| 03 | 創るのは、Businessだけではありません。（具体 ＋ Meaning） | **What We Create — 必要なものを、実際に一緒に創る。** | 旧 03 の具体（Artifact）を Meaning より前に MOVE（Architect 指定 Copy） |
| 04 | — | **Meaning — 創るのは、Businessだけではありません。** | 旧 03 の Meaning（Creation System）を MOVE。Statement「自分で決めて、自分で創り、自分で育てられる状態へ。」は byte 不変 |
| 05〜08 | Creation ・ Technology ・ Partnership ・ Offer | **同じ** | KEEP（旧 Section 4〜7 の block を byte のまま） |
| 09 | Final | **Final Action** | KEEP（本文 ・ Primary ・ Guide Secondary ・ Note は byte 不変。Dialogue Form の説明 comment だけを Hero から移動） |

## CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 Continue | Business Creationについて見てみる ↓ | Hero → `#recognition` |
| 3 Conversation | Business Creationについて話してみる | Final のみ（Business Creation Dialogue Form ・ GAS `…/exec?page=booking&type=business_creation_initial` ・ `data-gas-transition`） |
| Optional | まずGuide（無料）で話してみる | Final のみ（Secondary ・ 必須入口にしない） |

- Hero の「Guide（無料）について見る」は REMOVE。Final の Secondary は Current の文言「まずGuide（無料）で話してみる」を KEEP した（Meaning は同じ ・ 既存 UI）

## Dialogue Form（Current Reality ・ 変更なし）

- Final の Primary は Business Creation 専用の Dialogue Form（GAS ・ `type=business_creation_initial`）。Reality → 90分の対話日時 → 予約。general contact form ・ Guide ・ 直接決済には接続しない
- この Request では GAS ・ `gas-transition.js` に触れていない。Final の CTA 2 本は元と byte 一致

## Visual（DS-BUSINESS-01）の評価と Architect への返却

既存 `DS-BUSINESS-01`（1672×941 ・ Artifact ＋ Creation）は **Hero に再利用しない**。Hero は Text のみで実装した。

| 観点 | 評価 |
|---|---|
| Hero Reality ／ Business の途中 | ✗ 完成した Website（Monitor ・ Phone）と Dashboard が並び、「創っている途中」ではなく「完成品を眺める」構図 |
| Revenue ／ Money | ✗ Laptop に **売上グラフと ¥ の数値**（Direction の避けるもの：revenue graph ・ money） |
| Startup ／ Laptop 広告 | ✗ 3 台の Device と満足げな笑顔。Laptop ／ Startup success 広告に寄る |
| Daily Reality | ✗ 湖と山を望むテラスの仕事場（非日常） |
| 人が創っている | △ 人はいるが、眺めているだけで手は動いていない |
| Home Card との重複 | ✗ Home ／ TOP の Business Creation Card で使用中 |
| 16:9 ・ 質 | ○ |

→ Stop Condition「Existing DS-BUSINESS-01 が Hero に不適合で新規 Asset が必要」。以下を提案として返す（画像は生成していない）。

- **Page:** `/dreamin-spiral/business-creation/`
- **Section:** 01 Hero（My Life ・ Community ・ 3 Weeks ・ Guide と同じ A21-b にすれば：Desktop は Visual ｜ Copy、880px 未満は縦積みで max-width 560px）
- **Asset ID 案:** `DS-BUSINESS-HERO-01`
- **Formal Filename 案:** `DS-BUSINESS-HERO-01_dreamin-spiral-business-creation-hero.png`
- **Visual Role:** Reality ＋ Creation ＋ Work ＋ Human ＋ Technology
- **Meaning:** Business が完成したのではなく、今の現実から、実際に Business を創っている途中
- **Direction:** 40〜50 代の人物が一人（または二人で並んで作業）・ 自宅の一角 ／ 小さな Studio ・ 平日の日中の自然光 ・ 机の上に手書きのメモ ／ 付箋 ／ サービス案のスケッチ ・ ノート PC は開いているが脇役（画面は簡素な作りかけのページか白い画面で、数字 ・ グラフは映さない）・ 人は手を動かしている（書く ／ 付箋を並べ替える）・ 表情は集中して穏やか ・ 未完成で散らかりすぎない机 ・ 窓の外は普通の街並み ・ 成功ポーズ ・ 握手 ・ プレゼン ・ 会議 ・ 高級オフィス ・ コワーキングの華やかさ ・ AI ロボット ・ 浮遊 UI ・ ネオン ・ 売上グラフ ・ お金 ・ 絶景なし ・ 16:9 で人物は中くらい、余白あり
- **使用箇所:** Business Creation LP の Hero のみ（Home ／ TOP の Card は `DS-BUSINESS-01` のまま）
- **Prompt 案:**
  > A quiet, documentary-style photograph of a Japanese person in their late 40s working at a wooden desk in a corner of an ordinary home studio on a weekday afternoon, soft natural window light. They are mid-task, writing on sticky notes and rearranging hand-drawn sketches of a service idea; an open laptop sits to the side showing a simple, unfinished web page (no numbers, no charts). Coffee mug, notebook, a few papers, a small plant. Calm, focused expression. The desk is in progress but not messy. Plain everyday room, ordinary city view outside. No success pose, no handshake, no presentation, no meeting, no luxury office, no coworking glamour, no AI robot, no floating UI, no neon, no revenue graph, no money, no scenic resort view. Wide 16:9 composition, person at medium size with space around them, face in the upper half of the frame.

## Known Issue（External Exposure Layer ほか）

- Meta description ／ `og:description` は従来のまま（変更していない）。Hero の Copy と揃えるかは External Exposure Layer で判断
- Hero の Lead は Architect 指定の 4 段落（商品やサービス… ／ 最初から全部を… ／ 今あるもの… ／ 一緒にBusinessを…）。Desktop（1024〜1440 ・ 画面高 768〜900）では Continue Cue が First View の少し下（Cue 下端 888px）に来る。Headline と Lead の前半は First View 内。Copy の判断のため変えていない
- Recognition の 4 つ目の見出し「AIを使いたいけれど、何にどう使えばいいか分からない」は Current の markup（`.ds-phrase` なし）を byte で KEEP したため、Mobile では「何にどう使えば ／ いいか分からない」で折り返す（1〜2 文字の孤立ではない）

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → 今、どこにいても。そこから始められます。→ 必要なものを、実際に一緒に創る。→ 創るのは、Businessだけではありません。→ 現実（リアリティ）から始まるCreation。→ テクノロジーは、必要な分だけ。→ 構想を、現実の仕組みへ。→ Business Creationについて → まず、今の現実（リアリティ）から話してみませんか。 |
| Hero | Creation System の語なし ・ Dialogue Form ／ Guide の link 0 ・ Continue Cue → `#recognition`（375px で Recognition の見出しが上端から 65px） |
| CTA | `main a[data-gas-transition]` 1（Final）・ Guide Secondary 1（Final）・ Final CTA の click で Transition View（「Business Creationの対話ページを開いています。」）を表示（遷移の timer だけを止めて検証。GAS へは移動していない） |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ `</main>` 以降 ・ Recognition の list と Closing ・ Statement ・ 旧 Section 4〜7（Creation ・ Technology ・ Partnership ・ Profile ・ Offer ・ 880,000円 ・ 1,600,000円 ・ Notes）・ Final の本文 ／ CTA ／ Note |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0 ・ 画像 0 のため Visual 巨大化なし |
| Regression | `style.css` ・ `gas-transition.js` ・ Dreamin' Spiral 🌱 Home ・ TOP ・ 他 Service Page の差分 0 |
