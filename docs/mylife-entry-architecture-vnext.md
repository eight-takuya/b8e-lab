# My Life, My Way Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/my-life/index.html`, `style.css`（A21 追加）
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

## Visual

LP には現在も写真がない（Before も After も Text のみ）。Home の `DS-MYLIFE-01`（山頂から朝日の景色を見るバックパッカー）は、Home の Card では「人生全体」として機能するが、
今回の LP Direction（日常 ・ 家 ・ 街 ・ 生活の途中）に対して「未来へ向かう演出 ・ Heroic」の NG に寄るため **LP には再利用していない**。
新規 Asset は生成せず、Role と Prompt 案を Architect へ返した（ACR-20261001-001 architect-report）。

## Verification（Preview・Chromium）

- 320 ／ 375 ／ 390 ／ 430 ／ 768 ／ 1024 ／ 1280 の 7 幅で **horizontal overflow 0 ・ 孤立行 0**
- Hero の申込 CTA 0 件 ・ Continue Cue → `#recognition`（top 16）・ 申込 CTA はページ全体で 1 件（Final）
- `/dreamin-spiral/my-life/apply/` は正常（form 1 ・ overflow 0）
- Scroll Cue の色は既存 Hero CTA と同じ `#dcc3a0`（Deep Indigo 上で約 9:1）

## Known Issues

- **Meta description ／ OGP**（「自分そのものから、自分の人生を生きる伴走。」）は vNext では Meaning Section の Copy になった。Out of Scope のため変更せず、External Exposure Layer へ
