# Community Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/community/index.html`, `assets/dreamin-spiral/community/hero-*`（`style.css` の変更なし。A21 ／ A21-b の Reality Hero ・ Scene Hero ・ Continue Cue ・ Offer Lead と、既存の `.ds-service-relation` を再利用）
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

## Hero Visual（AD-1 決着 ・ 2026-10-01）

**Architect Decision：** 既存 `DS-COMMUNITY-01` は LP Hero に使わない（夕日の海辺テラスで非日常 ／ Facilitator 中心 ／ 全員の笑顔が強い ／ Networking 広告に寄る ／ Home の Community Card と同一）。新規 **`DS-COMMUNITY-HERO-01`** を採用。

| 項目 | 内容 |
|---|---|
| Asset ID | `DS-COMMUNITY-HERO-01`（Owner の正式 PNG 名 `DS-COMMUNITY-HERO-01_dreamin-spiral-community-hero.png` ・ 1672×941 ・ byte 一致を確認） |
| Visual Role | Connection ＋ Daily Life ＋ Human |
| Meaning | それぞれの人生を持った人たちが、少しの時間だけ同じ場にいる |
| Master | OS repo `assets/png/b8e-public-visual/ds/DS-COMMUNITY-HERO-01.png`（Inventory ・ Implementation Map 更新） |
| 公開版 | `assets/dreamin-spiral/community/hero-{640,960,1280,1672}.{avif,webp}`（WebP q72 ・ AVIF q52 ・ 16〜65 KB）。Master PNG は public に置かない |
| Layout | My Life と同じ A21-b：Desktop（≥ 880px）は Visual ｜ Copy の 2 列、それ未満は Visual → Copy の縦積みで **max-width 560px**。画像と Copy は別面（Copy の背後に敷かない） |
| Markup | `<picture>`（AVIF ／ WebP ・ srcset 4 幅 ・ `sizes="(max-width: 879px) min(560px, calc(100vw - 48px)), 500px"`）・ `width="1672" height="941"`（CLS 0）・ `fetchpriority="high"` ・ `decoding="async"` |
| Role separation | Home の 6 Service Card は `DS-COMMUNITY-01` のまま（KEEP） |

## Known Issue（External Exposure Layer へ）

- Meta description ／ `og:description` は「日々の現実を生きながら、共に気づき続ける場。」のまま（変更していない）。この文は Hero から Meaning Section（03）へ移ったが、ページの意味としては矛盾しない。Hero の文と揃えるかは External Exposure Layer で判断

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → Recognition → Meaning → Togetherness → Rhythm → 内容・料金 → Final Action |
| CTA | Hero の Stripe CTA 0 ・ Stripe CTA は Final の 1 件のみ（URL 不変）・ Continue Cue → `#recognition` |
| KEEP | 「日常そのものを、一緒に見ていく。」・「それぞれの人生を生きながら、共にいる。」・「誰かの正解に合わせる…」・「また日常へ戻っていく。」・ Offer 一覧 ・ 20,000円（税込）／月 ・ Final CTA ・ Meta ／ OGP ・ Header ／ Footer |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 孤立行（1〜2 文字の行）0 |
| Hero Visual 実寸 | 320：272×153 ・ 375：327×184 ・ 390：342×192 ・ 430：382×215 ・ **768 ／ 820 ／ 879：560×315（上限で停止）**・ 1024：444×250 ・ 1280 ／ 1440：512×288（2 列）。全幅で 16:9（1.778）・ 顔の切れなし |
| Regression | `style.css` ・ complete page ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
