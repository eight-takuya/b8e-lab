# Business Creation Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/business-creation/index.html`, `assets/dreamin-spiral/business-creation/hero-*`（`style.css` ・ `gas-transition.js` ・ Dialogue Form の URL ／ 属性は変更なし。A21 ／ A21-b の Reality Hero ・ Scene Hero ・ Continue Cue を再利用）
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

## Hero Visual（AD-1 決着 ・ 2026-10-01）

**Architect Decision：** 既存 `DS-BUSINESS-01` は LP Hero に使わない（完成した Website ／ Dashboard を眺める構図 ・ 売上グラフ ／ ¥ ・ 複数 Device ・ 満足げな笑顔 ・ 湖と山のテラス ・ Home ／ TOP Card と同一）。新規 **`DS-BUSINESS-HERO-01`** を採用。

| 項目 | 内容 |
|---|---|
| Asset ID | `DS-BUSINESS-HERO-01`（Owner の正式 PNG 名 `DS-BUSINESS-HERO-01_dreamin-spiral-business-creation-hero.png` ・ byte 一致を確認） |
| 原寸 | **1536×1024（3:2）** — 他の Service Page Hero（1672×941 ・ 16:9）と異なる |
| Visual Role | Reality ＋ Creation ＋ Work ＋ Human ＋ Technology |
| Meaning | Businessが完成したのではなく、今の現実から、実際にBusinessを創っている途中 |
| Master | OS repo `assets/png/b8e-public-visual/ds/DS-BUSINESS-HERO-01.png`（原寸のまま ・ Inventory ・ Implementation Map 更新） |
| 公開版 | **上端基準で 16:9（1536×864）にトリミング**して `assets/dreamin-spiral/business-creation/hero-{640,960,1280,1536}.{avif,webp}`（WebP q72 ・ AVIF q52 ・ 22〜88 KB）。下端の机上 160px（付箋の一部）だけを除き、顔 ・ 手元 ・ 付箋 ・ Laptop は残る。最大幅は原寸の 1536（拡大しない）。Master PNG は public に置かない |
| Layout | My Life ・ Community ・ 3 Weeks ・ Guide と同じ A21-b：Desktop（≥ 880px）は Visual ｜ Copy の 2 列、それ未満は Visual → Copy の縦積みで **max-width 560px**。画像と Copy は別面 |
| Markup | `<picture>`（AVIF ／ WebP ・ srcset 4 幅 ・ `sizes="(max-width: 879px) min(560px, calc(100vw - 48px)), 500px"`）・ `width="1536" height="864"`（公開版の 16:9 ・ CLS 0）・ `fetchpriority="high"` ・ `decoding="async"` |
| Role separation | Home ／ TOP の Business Creation Card は `DS-BUSINESS-01` のまま（KEEP） |

## Known Issue（External Exposure Layer ほか）

- Meta description ／ `og:description` は従来のまま（変更していない）。Hero の Copy と揃えるかは External Exposure Layer で判断
- Hero の Lead は Architect 指定の 4 段落。Round 2（Visual ｜ Copy の 2 列）で Desktop の Cue 下端は 856px（1280 ／ 1440）・ 899px（1024）。1440×900 では First View 内、1280×800 ・ 1024×768 では少し下（Headline ・ Lead ・ Visual は First View 内）。Copy の判断のため変えていない
- Recognition の 4 つ目の見出し「AIを使いたいけれど、何にどう使えばいいか分からない」は Current の markup（`.ds-phrase` なし）を byte で KEEP したため、Mobile では「何にどう使えば ／ いいか分からない」で折り返す（1〜2 文字の孤立ではない）

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| Section 順 | Hero → 今、どこにいても。そこから始められます。→ 必要なものを、実際に一緒に創る。→ 創るのは、Businessだけではありません。→ 現実（リアリティ）から始まるCreation。→ テクノロジーは、必要な分だけ。→ 構想を、現実の仕組みへ。→ Business Creationについて → まず、今の現実（リアリティ）から話してみませんか。 |
| Hero | Creation System の語なし ・ Dialogue Form ／ Guide の link 0 ・ Continue Cue → `#recognition`（375px で Recognition の見出しが上端から 65px） |
| CTA | `main a[data-gas-transition]` 1（Final）・ Guide Secondary 1（Final）・ Final CTA の click で Transition View（「Business Creationの対話ページを開いています。」）を表示（遷移の timer だけを止めて検証。GAS へは移動していない） |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ `</main>` 以降 ・ Recognition の list と Closing ・ Statement ・ 旧 Section 4〜7（Creation ・ Technology ・ Partnership ・ Profile ・ Offer ・ 880,000円 ・ 1,600,000円 ・ Notes）・ Final の本文 ／ CTA ／ Note |
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0 |
| Hero Visual 実寸 | 320：272×153 ・ 375：327×184 ・ 390：342×192 ・ 430：382×215 ・ **768 ／ 820 ／ 879：560×315（上限で停止）**・ 1024：444×250 ・ 1280 ／ 1440：512×288（2 列）。全幅で 16:9（1.778）・ 顔の切れなし ・ 手元と付箋が見える |
| Regression | `style.css` ・ `gas-transition.js` ・ Dreamin' Spiral 🌱 Home ・ TOP ・ 他 Service Page の差分 0 |
