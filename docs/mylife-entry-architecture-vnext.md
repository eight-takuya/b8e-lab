# My Life, My Way Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/my-life/index.html`, `style.css`（A21 ・ A21-b 追加）, `assets/dreamin-spiral/my-life/`
**AI Creation Request:** ACR-20261001-001

## Core Principle

「自分の人生を生きる」という思想を先に語るのではなく、今の生活全体に触れてから、その思想と出会う LP にする。
**思想を弱めるのではない。思想が届く順番を変える。**

## Section 構造

| # | Before | After | 操作 |
|---|---|---|---|
| 01 | Hero（Philosophy ＋ 申込 CTA） | **Hero（Reality ＋ Continue Cue）** | REFRAME ・ Hero の申込 CTA を REMOVE |
| 02 | Lifeは、解決するものではなく、生き様そのもの。 | **Recognition — 人生のことは、ひとつずつ切り離せない。** | 「仕事、家族、人間関係、身体、これからの人生」を MOVE |
| 03 | 6か月の日常そのものが、My Lifeです。 | **Meaning — 自分そのものから、自分の人生を生きる伴走。** | 旧 Hero の Core Message を MOVE（削除しない）|
| 04 | 6か月後の答えを、今決めなくていい。 | **Six Months**（Meaning → Daily Reality → Contents） | REFRAME（一覧を後ろへ）|
| 05 | 大切にすること | **Open Future** | KEEP |
| 06 | 内容・料金 | **Values** | 完全 KEEP |
| 07 | Final CTA | **Offer**（「6か月全体を通した伴走です。」を一覧の前へ） | REFRAME（意味の順序のみ）|
| 08 | — | **Final Action**（Primary Application CTA はここだけ） | KEEP |

## CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 Continue | この6か月について見てみる ↓ | Hero → `#recognition` |
| 2 Read / Understand | — | Six Months ・ Open Future ・ Values ・ Offer |
| 3 Apply | My Life, My Wayに申し込む | Final Action のみ（`/dreamin-spiral/my-life/apply/`）|

## KEEP（byte ／ text で確認）

Open Future 本文 ・ Values ・ Offer の一覧（期間 ・ Zoom 60分 × 月2回（全12回）・ Video 月2本 ・ Community ・ My Page ・ **600,000円（税込）**）・ Six Months の Contents 一覧 ・ Final Action ・ Apply URL ・ Meta / OGP ・ Header / Footer。

- **Open Future** は Current の本文をそのまま KEEP した。Architect が示した意味（「こうなりたい」がはっきりしていても、していなくても大丈夫 ／ この6か月をどんな時間として過ごしてみたいか ／ そこから一緒に始める）は Current の本文にすでにすべて含まれているため
- **Offer** の旧 note「…6か月全体を通した伴走として提供します。」は、一覧の前の Lead「…6か月全体を通した伴走です。」へ MOVE ・ REFRAME した（同じ意味を 2 回言わない）

## Visual（Round 2 ・ 2026-10-01 ・ AD-1 決着）

| Asset ID | Section | Visual Role | Meaning | 公開版 |
|---|---|---|---|---|
| `DS-MYLIFE-HERO-01` | 01 Hero | Human ＋ Daily Life ＋ Life as a Whole | 今の人生を生きている | `assets/dreamin-spiral/my-life/hero-{640,960,1280,1672}.{avif,webp}` |

- **Recognition には Visual を置かない**（Architect Decision — Hero で Reality を Visual として受け取り、Recognition は言葉と余白に集中させる）
- Master（PNG 1672×941 ・ 16:9）は dreamin-spiral-os `assets/png/b8e-public-visual/ds/`（README に Inventory）。b8e-lab には最適化済みの公開版だけ（AVIF 17〜48KB）
- **Layout:** Desktop（≥ 880px）は Visual ｜ Copy の 2 列（Home Hero と同じ考え方 ・ Deep Indigo Hero はそのまま）。880px 未満は Visual → Copy の縦積みで、**画像に max-width 560px** を持たせ Tablet ／ 中間幅で巨大化させない
- 実測：1440 ・ 1280 → 512×288 ／ 1024 → 444×250 ／ 879 ・ 820 ・ 768 → 560×315（上限で停止）／ 430 〜 320 → 382〜272 幅（全幅）。すべて 16:9
- Home の `DS-MYLIFE-01`（山頂の風景）は LP では使わない

## Verification（Preview・Chromium）

- 320 ／ 375 ／ 390 ／ 430 ／ 768 ／ 1024 ／ 1280 の 7 幅で **horizontal overflow 0 ・ 孤立行 0**
- Hero の申込 CTA 0 件 ・ Continue Cue → `#recognition`（top 16）・ 申込 CTA はページ全体で 1 件（Final）
- `/dreamin-spiral/my-life/apply/` は正常（form 1 ・ overflow 0）
- Scroll Cue の色は既存 Hero CTA と同じ `#dcc3a0`（Deep Indigo 上で約 9:1）

## Known Issues

- **Meta description ／ OGP**（「自分そのものから、自分の人生を生きる伴走。」）は vNext では Meaning Section の Copy になった。Out of Scope のため変更せず、External Exposure Layer へ
