# 3 Weeks Tuning Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/3-weeks/index.html`, `assets/dreamin-spiral/3-weeks/hero-*`（`style.css` の変更なし。A21 ／ A21-b の Reality Hero ・ Scene Hero ・ Continue Cue を再利用）
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

## Hero Visual（AD-1 決着 ・ 2026-10-01）

**Architect Decision：** 既存 `DS-3WEEKS-01` は LP Hero に使わない（非日常の湖 ・ 山 ・ リゾート感 ／ Process ・ Time が見えない ／ 遠くを見る構図が自己啓発 ・ Healing 寄り ／ Home ・ TOP Card と同一）。新規 **`DS-3WEEKS-HERO-01`** を採用。

| 項目 | 内容 |
|---|---|
| Asset ID | `DS-3WEEKS-HERO-01`（Owner の正式 PNG 名 `DS-3WEEKS-HERO-01_dreamin-spiral-3-weeks-hero.png` ・ 1672×941 ・ byte 一致を確認） |
| Visual Role | Process / Time ＋ Daily Life ＋ Human |
| Meaning | 何かを解決した瞬間ではなく、日常を生きながら、少しずつ自分を見ていく時間 |
| Master | OS repo `assets/png/b8e-public-visual/ds/DS-3WEEKS-HERO-01.png`（Inventory ・ Implementation Map 更新） |
| 公開版 | `assets/dreamin-spiral/3-weeks/hero-{640,960,1280,1672}.{avif,webp}`（WebP q72 ・ AVIF q52 ・ 12〜56 KB）。Master PNG は public に置かない |
| Layout | My Life ・ Community と同じ A21-b：Desktop（≥ 880px）は Visual ｜ Copy の 2 列、それ未満は Visual → Copy の縦積みで **max-width 560px**。画像と Copy は別面 |
| Markup | `<picture>`（AVIF ／ WebP ・ srcset 4 幅 ・ `sizes="(max-width: 879px) min(560px, calc(100vw - 48px)), 500px"`）・ `width="1672" height="941"`（CLS 0）・ `fetchpriority="high"` ・ `decoding="async"` |
| Role separation | Home ／ TOP の 3 Weeks Card は `DS-3WEEKS-01` のまま（KEEP） |

## Known Issue（External Exposure Layer へ）

- Meta description ／ `og:description` は「「気になる」や「悩み」から自分に気づく3週間。」のまま（変更していない）。この文は Hero から Meaning Section（03）へ移ったが、ページの意味とは矛盾しない

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → 今、こんなことが気になっているなら → 「気になる」や「悩み」から自分に気づく3週間 → 日常を生きながら、3週間を一緒に見ていく。→ この時間で大切にしていること → 内容 → 今、話してみたいことがあれば。 |
| CTA | Hero の申込 CTA 0 ・ 申込 CTA は Final の 1 件のみ（`/dreamin-spiral/3-weeks/apply/`）・ Continue Cue → `#recognition` |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ Footer 以降 ・ Recognition list ・ Rhythm ・ What We Hold ・ Offer（Note 含む）・ Final の各 block が origin/main と一致 |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0 |
| Hero Visual 実寸 | 320：272×153 ・ 375：327×184 ・ 390：342×192 ・ 430：382×215 ・ **768 ／ 820 ／ 879：560×315（上限で停止）**・ 1024：444×250 ・ 1280 ／ 1440：512×288（2 列）。全幅で 16:9（1.778）・ 顔の切れなし |
| Regression | `style.css` ・ apply ・ thanks ・ complete ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
