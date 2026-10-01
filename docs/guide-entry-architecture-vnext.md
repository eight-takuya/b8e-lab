# Guide Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/guide/index.html` のみ（`style.css` ・ `gas-transition.js` ・ Booking の URL ／ 属性は変更なし。A21 の Reality Hero ・ Continue Cue を再利用）
**AI Creation Request:** ACR-20261001-006

## Core Principle

「話す内容が整理できてから来る場所」ではなく、「まだ整理できていないところから、話してみてもよい場所」。
売らない ・ 決めさせない ・ 答えを押しつけない ・ まとまっていなくてよい。

## Section 構造

| # | Before | After | 操作 |
|---|---|---|---|
| 01 | Hero（今、気になっていることから話してみる。＋ Booking CTA） | **Hero — Reality**（Headline ・ Lead の文言 KEEP ＋ Continue Cue「Guideについて見てみる ↓」） | Hero の Booking CTA を REMOVE ・ Cue を ADD。Lead は文言そのままで 3 段落に分けた（Architect 指定の段落） |
| 02 | まとまっていなくても大丈夫です。 | **Permission**（`#permission`） | KEEP（list は byte 不変） |
| 03 | 答えを出すための時間ではありません。 | **Meaning** | KEEP（最後の段落だけを 04 へ MOVE） |
| 04 | — | **What Happens — 話しながら、今の自分を一緒に見ていく。** | ADD（「何かを決める必要はありません。」＋ 旧 03 の「話しているうちに、…見えてくるかもしれません。」） |
| 05 | 内容 | **Offer** | KEEP（`dl` ・「営業面談ではありません。」は byte 不変） |
| 06 | 今、少し話してみたいことがあれば。 | **Final Action** | 説明文を Current Booking UX に合わせて REFRAME。CTA ・ URL ・ Transition 属性は byte 不変 |

## CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 Continue | Guideについて見てみる ↓ | Hero → `#permission` |
| 3 Booking | Guide（無料）に申し込む | Final Action のみ（GAS Booking `…/exec?page=booking` ・ `data-gas-transition`） |

## Booking（Current Reality ・ 変更なし）

- Booking は Google Apps Script の Web App（`dreamin'-spiral-academy`）。公開枠が 1 件以上なら即時予約、0 件なら**同じ予約画面**が第1 ・ 第2希望（必須）・ 第3希望（任意）の送信になる（ACR-20261001-004 ・ academy PR #178 merge 済み）。Production の予約ページ（`?page=booking`）が 第1希望 ／ 第2希望 ／ 第3希望 ／ 希望日時 の表示を含み、お問い合わせフォームへの誘導を含まないことを確認した（curl ・ 1 回）
- この Request では GAS ・ `gas-transition.js` に触れていない。b8e-lab 側の Booking link（href ・ `data-gas-transition` ・ 3 つの `data-transition-*`）は Final に 1 件、元と byte 一致で残した
- Final の説明文は「空いている枠から選ぶか、ご都合のよい候補日時をお知らせいただけます。」として、公開枠あり ／ なしの両方を含めた

## Visual（DS-GUIDE-01）の評価と Architect への返却

既存 `DS-GUIDE-01`（1672×941 ・ Dialogue）は **Hero に再利用しない**。Hero は Text のみで実装した。

| 観点 | 評価 |
|---|---|
| 1 対 1 の Dialogue | ○ 1 対 1 の会話ではある |
| 上下関係 | ✗ 手前の人は後ろ姿で話し、奥の男性が正面で頬杖をつき笑顔で聴く → **聴く専門家 ／ 相談者**の構図に見える |
| Advisor ／ Coach 広告 | ✗ 奥の男性の手元に Laptop。笑顔の「傾聴するプロ」で Coaching ／ Consultation 広告に寄る |
| 過剰な笑顔 | △ stock photo smile |
| 日常の延長 | ✗ 湖と山を望む屋外テラス（非日常） |
| Home Card との重複 | ✗ Home ／ TOP の Guide Card で使用中。奥の人物は `DS-COMMUNITY-01` の中央人物と同じに見える |
| 16:9 ・ 質 | ○ |

→ Stop Condition「Existing DS-GUIDE-01 が Hero に不適合で新規 Asset が必要」。以下を提案として返す（画像は生成していない）。

- **Page:** `/dreamin-spiral/guide/`
- **Section:** 01 Hero（My Life ／ Community ／ 3 Weeks と同じ A21-b にすれば：Desktop は Visual ｜ Copy、880px 未満は縦積みで max-width 560px）
- **Asset ID 案:** `DS-GUIDE-HERO-01`
- **Formal Filename 案:** `DS-GUIDE-HERO-01_dreamin-spiral-guide-hero.png`
- **Visual Role:** Dialogue ＋ Daily Life ＋ Human
- **Meaning:** ちゃんと相談内容を整理してから来るのではなく、今あることを、そのまま誰かと話してみる
- **Direction:** 1 対 1 ・ **斜め向かい ／ 横並びに近い対等な位置**（向かい合わせの面談配置にしない）・ ふつうの部屋の小さなテーブル ・ 平日の日中の自然光 ・ 一人が言葉を探しながら話し、もう一人は静かに聴いている（どちらもカメラを見ない）・ 二人とも同じ高さ ・ 同じくらいの存在感 ・ 40〜50 代を含む ・ 表情は穏やか（大きな笑顔なし）・ 手元はカップ程度で Laptop ・ 書類 ・ メモを主役にしない ・ therapist couch ・ 診察 ・ 商談 ・ 握手 ・ 高級オフィス ・ セミナー ・ スピリチュアル ・ 絶景なし ・ 16:9 で人物は中くらい、余白あり ・ 2 人とも顔が上半分に入る
- **使用箇所:** Guide LP の Hero のみ（Home ／ TOP の Guide Card は `DS-GUIDE-01` のまま）
- **Prompt 案:**
  > A quiet, documentary-style photograph of two Japanese adults (one in their late 40s) sitting at a small wooden table in an ordinary, softly lit room on a weekday afternoon, angled toward each other rather than face to face, at the same eye level. One is speaking slowly, as if searching for words; the other listens calmly. Neither looks at the camera. Calm, natural expressions, no big smiles. Only two mugs on the table; no laptop, no documents, no notes. Everyday clothing, plain lived-in room, muted warm palette, natural window light. No therapist couch, no clinic, no business meeting, no handshake, no luxury office, no seminar, no scenic view. Wide 16:9 composition, people at medium size with space around them, both faces in the upper half of the frame.

## Known Issue（External Exposure Layer へ）

- Meta description ／ `og:description` は「Dreamin' Spiral 🌱 の Guide（無料）。…」のまま（変更していない）。冒頭に「（無料）」が出るのは、Hero で「無料」を前に出さないという今回の方針と少しずれる。意味の矛盾ではない
- Final CTA の文言「Guide（無料）に申し込む」と Transition の見出し「Guide（無料）の予約ページを開いています。」は KEEP 指定のまま

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → まとまっていなくても大丈夫です。→ 答えを出すための時間ではありません。→ 話しながら、今の自分を一緒に見ていく。→ 内容 → 今、少し話してみたいことがあれば。 |
| CTA | Hero の Booking link 0 ・ `data-gas-transition` link は Final の 1 件のみ ・ Continue Cue → `#permission`（375px で Permission の見出しが上端付近に着地） |
| GAS Transition | Final CTA の click で Transition View（「Guide（無料）の予約ページを開いています。」）が表示される（遷移の timer だけを止めて検証。GAS へは移動していない） |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ `</main>` 以降（`gas-transition.js` の読み込みを含む）・ Permission list ・ Meaning の見出しと 2 段落 ・ Offer（`dl` ＋ Statement）・ Final の Booking link |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0（Offer の「無料」は値そのもの）・ 画像 0 のため Visual 巨大化なし |
| Regression | `style.css` ・ `gas-transition.js` ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
