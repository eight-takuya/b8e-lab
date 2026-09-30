# Community Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/community/index.html` のみ（`style.css` の変更なし。A21 の Reality Hero ・ Continue Cue ・ Offer Lead と、既存の `.ds-service-relation` を再利用）
**AI Creation Request:** ACR-20261001-003

## Core Principle

「Communityに入りませんか」から始めず、日常の中で誰かと一緒に見てみたくなる瞬間から始める。
**思想を弱めるのではない。思想が届く順番を変える。**

## Section 構造

| # | Before | After | 操作 |
|---|---|---|---|
| 01 | Hero（Meaning ＋ Stripe CTA） | **Hero — Reality**（日々の中で、ふと誰かと話してみたくなることがある。＋ Continue Cue） | REFRAME ・ Hero の Stripe CTA を REMOVE |
| 02 | 日常そのものを、一緒に見ていく。 | **Recognition — Daily Reality**（`#recognition`） | KEEP（本文そのまま） |
| 03 | それぞれの人生を生きながら、共にいる。 | **Meaning — 日々の現実を生きながら、共に気づき続ける場。** | 旧 Hero の Core Message を MOVE（削除しない） |
| 04 | 内容 | **Togetherness — それぞれの人生を生きながら、共にいる。** | KEEP（「また日常へ戻っていく」を含め本文そのまま） |
| 05 | Final CTA | **Rhythm / Contents — 月に一度集まり、また、それぞれの日常へ戻っていく。** | 新規（Architect 指定 Copy）。「日常 → Community → 日常」の後に Contents |
| 06 | — | **Offer — 内容・料金**（Lead「継続して誰かとつながるためではなく、…」を一覧の前へ） | 一覧は KEEP |
| 07 | — | **Final Action — 日々を生きながら、共に気づいていく。＋ Communityに参加する** | KEEP（Primary CTA はここだけ） |

## CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 Continue | Communityについて見てみる ↓ | Hero → `#recognition` |
| 2 Read / Understand | — | Recognition ・ Meaning ・ Togetherness ・ Rhythm ・ Offer |
| 3 Join | Communityに参加する | Final Action のみ（Stripe Live Payment Link `https://buy.stripe.com/28E4gt7IoftW8my5bS0x208`） |

## 実装メモ（非意味的な判断）

- **Rhythm の「日常 → Community → 日常」**は、3 Weeks の「セッション ⇄ 日常のリアリティ」と同じ `.ds-service-relation`（1 組だけを静かに示す。Step ・ 工程表にしない）で見出しの直下に置いた。新しい Component は作っていない
- **Rhythm の Contents** は My Life の Six Months と同じ `.ds-service-list`（Zoom ・ 月1回 ・ Archive ・ Learning Resources ・ Community Portal）。料金は出さない
- **Offer の一覧（`dl`）は byte で不変**。見出しは「内容」→「内容・料金」（Architect 指定 ・ My Life と同じ）
- Hero の見出し ・ Lead には既存の `.ds-phrase` を使い、狭い画面で語の途中や 1〜2 文字で折り返さないようにした（文言は不変）
- Stripe の Payment Link に付いていた注記コメントは Final CTA の上へ移した

## Visual（DS-COMMUNITY-01）の評価と Architect への返却

既存 `DS-COMMUNITY-01`（1672×941 ・ Connection）は **Hero に再利用しない**。Hero は Text のみで実装した（Visual 不足は Copy ／ Structure を block しない）。

| 観点 | 評価 |
|---|---|
| Hero Reality に自然か | ✗ 夕日の海と山を望むテラス。「日々の中で」ではなく非日常（retreat）の場面 |
| 「楽しい仲間」広告に見えないか | △〜✗ 全員が大きく笑顔で、中央の男性へ向いている |
| Connection として静かか | ✗ 中央の男性が身振りで話し、周囲が聞く構図 → Facilitator ／ Seminar に見える |
| Home → Community の連続 | ✗ Dreamin' Spiral 🌱 Home の Family Card ですでに使用。同じ画像が続く |
| 16:9 | ○（1672×941） |

→ Stop Condition「Existing Visual が今回の Role に合わず、新規 Asset が必要」。以下を提案として返す（画像は生成していない）。

- **Page:** `/dreamin-spiral/community/`
- **Section:** 01 Hero（My Life と同じ A21-b：Desktop は Visual ｜ Copy の 2 列、880px 未満は縦積みで max-width 560px）
- **Asset ID 案:** `DS-COMMUNITY-HERO-01`
- **Visual Role:** Connection（複数人の場）— Reality
- **Meaning:** それぞれの人生を持った人たちが、少しの時間だけ同じ場にいる。
- **Direction:** 3〜4 人 ・ ふつうの室内（窓からの自然光 ・ 平日の午後） ・ 簡素なテーブルをゆるく囲む ・ 一人が静かに話し、他は聞いている（カメラは見ない） ・ それぞれ自分のカップ ／ ノートを持ち、姿勢も服装もばらばら ・ 穏やかな表情で大きな笑顔なし ・ 中央に立つ人 ／ ホワイトボード ／ 絶景 ／ リゾートなし ・ 16:9 で人物は中くらい、周囲に余白
- **使用箇所:** Community LP Hero のみ（DS Home の Family Card は `DS-COMMUNITY-01` のまま）
- **Prompt 案:**
  > A quiet, documentary-style photograph of three or four Japanese adults of different ages sitting loosely around a simple wooden table in an ordinary, softly lit room on a weekday afternoon. Natural window light, muted warm palette. One person is speaking calmly while the others listen, each in their own posture, holding their own mug or notebook; no one looks at the camera. Calm, natural expressions, no big smiles. Everyday clothing. No facilitator standing, no whiteboard, no scenic view, no party, no seminar, no team-building, no networking mood. Wide 16:9 composition, people at medium size with space around them, subjects slightly below center so a top-anchored crop keeps faces.

## Known Issue（External Exposure Layer へ）

- Meta description ／ `og:description` は「日々の現実を生きながら、共に気づき続ける場。」のまま（変更していない）。この文は Hero から Meaning Section（03）へ移ったが、ページの意味としては矛盾しない。Hero の文と揃えるかは External Exposure Layer で判断

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → Recognition → Meaning → Togetherness → Rhythm → 内容・料金 → Final Action |
| CTA | Hero の Stripe CTA 0 ・ Stripe CTA は Final の 1 件のみ（URL 不変）・ Continue Cue → `#recognition` |
| KEEP | 「日常そのものを、一緒に見ていく。」・「それぞれの人生を生きながら、共にいる。」・「誰かの正解に合わせる…」・「また日常へ戻っていく。」・ Offer 一覧 ・ 20,000円（税込）／月 ・ Final CTA ・ Meta ／ OGP ・ Header ／ Footer |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 孤立行（1〜2 文字の行）0 ・ 画像 0 のため Visual 巨大化なし |
| Regression | `style.css` ・ complete page ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
