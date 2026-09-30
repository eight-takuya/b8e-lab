# 3 Weeks Tuning Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/3-weeks/index.html` のみ（`style.css` の変更なし。A21 の Reality Hero ・ Continue Cue を再利用）
**AI Creation Request:** ACR-20261001-005

## Core Principle

「3週間のサービスです」から始めず、まだ言葉になっていない“気になり”から始める。
**思想から始めるのではなく、現実から入って、思想へ導く。**

## Section 構造

| # | Before | After | 操作 |
|---|---|---|---|
| 01 | Hero（「気になる」や「悩み」から自分に気づく3週間 ＋ 申込 CTA） | **Hero — Reality**（なんとなく気になる。…＋ Continue Cue「3週間について見てみる ↓」） | REFRAME ・ Hero の申込 CTA を REMOVE ・ ADD |
| 02 | 今、こんなことが気になっているなら | **Recognition**（`#recognition`） | KEEP（list は byte 不変） |
| 03 | 日常を生きながら、3週間を一緒に見ていく。 | **Meaning — 「気になる」や「悩み」から自分に気づく3週間** | 旧 Hero の Headline ・ Lead を MOVE（削除しない） |
| 04 | 内容 | **Three Weeks Rhythm**（セッション ⇄ 日常のリアリティ） | KEEP（block ごと byte 不変） |
| 05 | この時間で大切にしていること | **What We Hold** | Offer の前へ MOVE（block ごと byte 不変） |
| 06 | 今、話してみたいことがあれば。 | **Offer — 内容**（「3回のZoomを購入するサービスではなく…」の Note を含む） | KEEP（block ごと byte 不変） |
| 07 | — | **Final Action**（申込 CTA はここだけ） | KEEP（block ごと byte 不変） |

## CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 Continue | 3週間について見てみる ↓ | Hero → `#recognition` |
| 3 Apply | 3 Weeks Tuningに申し込む | Final Action のみ（`/dreamin-spiral/3-weeks/apply/`） |

## 実装メモ（非意味的な判断）

- 旧 Section 3 〜 6 は、HTML block を丸ごと移動しただけで中身は byte 単位で不変
- Hero と Meaning の長い行には既存の `.ds-phrase` を付けた（語の途中や 1〜2 文字だけで折り返さないため。文言は不変）
- My Life ／ Community と同じ Entry の型（Reality Hero ＋ Continue Cue）だが、Rhythm の `セッション ⇄ 日常のリアリティ` など 3 Weeks 固有の表現はそのまま

## Visual（DS-3WEEKS-01）の評価と Architect への返却

既存 `DS-3WEEKS-01`（1672×941 ・ Process / Time）は **Hero に再利用しない**。Hero は Text のみで実装した。

| 観点 | 評価 |
|---|---|
| Hero Reality に自然か | ✗ 朝日の湖と山を望むテラス。「日常の延長」ではなく**非日常のリゾート**（Direction の避けるもの） |
| Process ／ Time | ✗ 一人の一瞬の場面。時間の経過 ・ 日常と対話の往復は写っていない（Asset Requirements v1 でも「Process が無い」と記録済み） |
| 講座 ・ 研修 ・ ワークショップ | ○ そうは見えない |
| Success Visual | △ 遠くを見て微笑む姿勢が「前向きな未来」寄り |
| Healing ／ Spiritual 広告 | △ 絶景 ・ 柔らかい逆光で Healing retreat に寄る |
| 自己啓発感 | △ ノートとペンを手に考える構図（Direction の「notebook の過剰な自己啓発感」） |
| Home Card との重複 | ✗ Dreamin' Spiral 🌱 Home と TOP の 3 Weeks Card で使用中 |
| 16:9 ・ 質 | ○ |

→ Stop Condition「Existing Visual 不適合で新規 Asset が必要」。以下を提案として返す（画像は生成していない）。

- **Page:** `/dreamin-spiral/3-weeks/`
- **Section:** 01 Hero（My Life ／ Community と同じ A21-b にすれば：Desktop は Visual ｜ Copy、880px 未満は縦積みで max-width 560px）
- **Asset ID 案:** `DS-3WEEKS-HERO-01`
- **Formal Filename 案:** `DS-3WEEKS-HERO-01_dreamin-spiral-3-weeks-hero.png`
- **Visual Role:** Process ／ Time ＋ Daily Life ＋ Human
- **Meaning:** 何かを解決した瞬間ではなく、日常を生きながら、少しずつ自分を見ていく時間
- **Direction:** 40〜50 代の人物が一人 ・ ふつうの自宅 ／ 仕事場の一角 ・ 平日の午後の自然光 ・ 手を止めて少し考えている（窓の外 ／ 手元のカップ）・ 机の上に日常の物（鍵 ・ 郵便 ・ 飲みかけのカップ ・ 閉じたノート PC）・ 時間の経過を感じる光や影 ・ 表情は穏やかで、笑顔でも深刻でもない ・ 絶景 ・ リゾート ・ 瞑想 ・ セミナー ・ ノートに書き込む自己啓発の構図なし ・ 16:9 で人物は中くらい、余白あり
- **使用箇所:** 3 Weeks Tuning LP の Hero のみ（Home ／ TOP の 3 Weeks Card は `DS-3WEEKS-01` のまま）
- **Prompt 案:**
  > A quiet, documentary-style photograph of a Japanese person in their late 40s at home on an ordinary weekday afternoon, sitting at a simple wooden table near a window. Soft natural light with long, gentle shadows suggesting time passing. They have paused mid-day, holding a half-finished mug, looking slightly away in calm thought; not smiling broadly, not troubled. Everyday objects nearby: keys, a few letters, a closed laptop. Plain, lived-in room, muted warm palette. No scenic view, no resort, no meditation pose, no seminar, no notebook journaling, no success pose. Wide 16:9 composition, person at medium size with space around them, face in the upper-middle area so a top-anchored crop keeps it.

## Known Issue（External Exposure Layer へ）

- Meta description ／ `og:description` は「「気になる」や「悩み」から自分に気づく3週間。」のまま（変更していない）。この文は Hero から Meaning Section（03）へ移ったが、ページの意味とは矛盾しない

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → 今、こんなことが気になっているなら → 「気になる」や「悩み」から自分に気づく3週間 → 日常を生きながら、3週間を一緒に見ていく。→ この時間で大切にしていること → 内容 → 今、話してみたいことがあれば。 |
| CTA | Hero の申込 CTA 0 ・ 申込 CTA は Final の 1 件のみ（`/dreamin-spiral/3-weeks/apply/`）・ Continue Cue → `#recognition` |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ Footer 以降 ・ Recognition list ・ Rhythm ・ What We Hold ・ Offer（Note 含む）・ Final の各 block が origin/main と一致 |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0 ・ 画像 0 のため Visual 巨大化なし |
| Regression | `style.css` ・ apply ・ thanks ・ complete ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
