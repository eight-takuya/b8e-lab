# B8E TOP Entry Architecture vNext

**Status:** Implemented（Preview・Owner Review 待ち）
**Date:** 2026-09-30
**Scope:** `index.html`（TOP のみ）, `style.css`（A19 追加・不要になった rule を撤去）, `scroll.js`
**Decision by:** Architect
**AI Creation Request:** ACR-20260930-019

---

## 0. Architect Decision

B8E TOP は、**Brand を説明するページから始めず、訪問者が自分の「今」に気づくページから始める。**

基本 Experience を次の順序へ変更する。

**Reality → Recognition → Routing → Meaning → Trust → Resonance → Action**

これは B8E の思想変更ではない。
現在の思想 ・ Visual ・ Service Architecture は残しながら、**訪問者がそれらへ入る認知順序を変える。**

B8E TOP の役割は、

> 「B8E とは何かを最初に理解してもらう」ことではなく、
> 「今の自分に関係する入口があると感じてもらう」こと。

内部設計名として、これを **Reality Routing** と呼ぶ。

---

## 1. 既存 Canonical との関係

今回の vNext は既存 Canonical と基本的に整合する。

既存 Visual Direction には **Stillness → Human → Reality → Creation** が既に存在し、
`B8E Public Visual Experience v1` でも TOP は「気になる ／ 自分事になる」場所であり LP 化しない、と定義されている。

したがって今回行うのは新しいマーケティング思想の追加ではなく、
**既に Visual 側で成立している Reality-first の考え方を、Headline / Copy / CTA / Section 順序まで通す**ことである。

### Visual Experience v1 との関係（重要）

`B8E Public Visual Experience v1` の TOP Phase は **2026-09-25 に CLOSED** しており、
その Phase は **Copy ・ Section 順 ・ Navigation ・ Service Architecture を変更しない前提で Visual だけを導入**していた。

今回の vNext は意図的に **Copy / Section Order の一部を変更する新しい Architecture** である。
そのため Visual v1 を黙って書き換えるのではなく、**別の Decision として本書に記録**する。

- Visual v1 は **Historical / Provenance として保持**する（`index.html` 内の Provenance comment・`style.css` A17）
- **Visual Asset は 6 点すべて KEEP。新規生成は行わない**
- Visual Standard（A17）・ Typography Standard（A16）・ Mobile Orphan Line Quality（A18）の**定義そのものは変更しない**

---

## 2. Section 構造

### Before

Hero Philosophy → B8Eとは → Three Paths → Dreamin' Spiral 🌱 → Track Record → どこから始めますか → B8E Philosophy → Contact

### After（vNext）

| # | Section | Role | Visual |
|---|---|---|---|
| 01 | Hero | Reality / Recognition | `TOP-HERO-01` KEEP |
| 02 | Reality Routing（Three Paths） | Routing | `TOP-THREE-PATHS-01` KEEP |
| 03 | B8E Meaning（B8Eとは） | Meaning | `TOP-B8E-01` KEEP |
| 04 | Track Record | Trust | `TOP-TRACK-RECORD-01` KEEP |
| 05 | Dreamin' Spiral 🌱 Summary | Reality → Meaning → Philosophy | `TOP-DREAMIN-SPIRAL-01` KEEP |
| 06 | B8E Philosophy | Resonance | `TOP-CLOSING-01` KEEP |
| 07 | Contact | Action | — |

大きな点は 3 つ。

1. Reality を Hero へ移す
2. Three Paths を First Scroll へ移し、「サービス説明」から「自分の現在地を見つける場所」へ変える
3. 旧「どこから始めますか」は Reality Routing へ統合し、重複 Section としては削除する

---

## 3. Section 01｜Hero（Reality）

思想を理解する場所ではなく、最初の数秒で「あ、自分にも関係があるかもしれない」と感じる場所。

- **Headline:** 今、少し気になっていることは何でしょう。
- **Subheadline:** 会社のITや業務のこと。／ 社員や社長の将来のこと。／ 自分自身の生き方や働き方のこと。／ B8Eは、今の現実に近いところから、一緒に見ていきます。
- **CTA（Level 1 Continue）:** 今の気になるところから ↓ → `#paths`

Button 型の Conversion CTA にはしない。役割は「問い合わせる」ではなく **続きを見る理由をつくる**こと。

**Visual は静けさを担当し、Copy が Reality を担当する。** Hero Visual だけで Reality を説明しようとしない。

### Hero Visual を KEEP した理由

- 2026-09-25 に Owner Approved されたばかり
- Atmosphere として静けさを担う役割は成立している
- 現時点の主要課題は Visual 品質より Headline と認知順序
- 同時にすべてを変えると、何が入口改善に寄与したのか分からなくなる

### 実装上の判断｜局所 scrim（A19）

Copy 層が Headline 1 行から 4 ブロックへ増えたため、`TOP-HERO-01` の明るい streak と
小さい文字が重なる幅が出た（実測 worst-case **3.62:1**・AA 未満）。

Asset は差し替えず、**Copy が載る中央だけを沈める局所 scrim**を置いて解決した
（Dreamin' Spiral 🌱 Home Hero / A14 の局所 scrim と同じ考え方）。Hero 全体は暗くしていない。

---

## 4. Section 02｜Reality Routing（Three Paths）

First Scroll の中心 Section。Eyebrow `THREE PATHS` は残すが、最初に見せる意味は「B8E には 3 事業あります」ではない。

- **Headline:** 今、どこが少し気になっていますか？
- **Lead:** 大きな問題になってからでなくても。／ 少し立ち止まって見てみたいところから。

各 Path は **Reality → Service → Meaning → CTA** の順。

| Path | Reality | Service | CTA |
|---|---|---|---|
| 01 | 会社のITや業務の進め方を、もう少し自然にしたい。 | DX支援 | DX支援を見る |
| 02 | 社員や自分の将来に向けて、会社の制度を整えておきたい。 | 企業型DC | 企業型DCについて |
| 03 | 仕事や生き方について、ふと「このままでいいのかな」と思うことがある。 | Dreamin' Spiral 🌱 | Dreamin' Spiral 🌱について |

3 つは完全に対等。上下関係にしない。

**Visual Hierarchy を変更**し、`Reality → 3 Paths → Structure Visual` の順にした。
Visual は入口を説明するものではなく、「3 つの異なる入口が、B8E というひとつの場所につながっている」ことを**後から補強**する。

Secondary Link として `B8Eという会社について知りたい — About` を Section 下部に置く。

---

## 5. Section 03｜B8E Meaning

ここで初めて思想を出す。旧 Hero Headline **「変容には、外側と内側がある。／ どちらも、同じ問いから始まる。」** を **MOVE**（削除しない）。

本文は KEEP。旧 `.what-domains`（DX支援・IT推進 ／ 企業型DC・制度設計 ／ 人材育成・内面探究）は **REMOVE**。
Reality Routing で 3 つの入口を具体的に理解しているため、ここで再び分類語を並べる必要性が低い。
この Section は**説明ではなく Meaning** に集中する。

---

## 6. Section 04｜Track Record（Trust）

Dreamin' Spiral 🌱 の大きな Section より前へ **MOVE**。
TOP は Dreamin' Spiral 🌱 だけの Home ではないため、DX / DC 訪問者にも TOP 全体の Balance が保たれる。

数値（25+ / 10+ / 50+ / 50+）は **KEEP**。Closing Copy のみ Hero の言葉とつなぐ。

- Before: 積み重ねてきた経験をもとに、**今必要な入口から**、静かに伴走します。
- After: 積み重ねてきた経験をもとに、**今の現実に近いところから**、静かに伴走します。

---

## 7. Section 05｜Dreamin' Spiral 🌱 Summary

Section 自体は **KEEP**（`dreamin-spiral-home-v1` が定める B8E TOP 上の Summary）。
**Section 内部の認知順序だけ**を `Philosophy → Reality` から `Reality → Meaning → Philosophy` へ変更した。

これにより「自分そのものから生きるとは？」を理解してから Reality を探すのではなく、
「あ、自分にもある」→「それを、こう捉えているのか」になる。

**6 Service は完全 KEEP。** Canonical Display Name / Canonical Order（Guide / 3 Weeks Tuning / Community /
My Life, My Way / Project Creation / Business Creation）も Service Family Card Copy も変更しない。
Funnel でも Level でもなく、Guide から始める必要もない、というCanonical を厳守する。

---

## 8. Section 06｜B8E Philosophy / Resonance

**KEEP。** 入口ではなく、読み進めた人が「なるほど、この会社はこういう場所なのか」と感じる場所。
本文・About への CTA ともに変更しない。About の役割は Conversion ではなく Resonance を深めること。

---

## 9. Section 07｜Contact / Action

**KEEP。** Lead も CTA（少し話してみる）も変更しない。
「問い合わせる」「無料相談はこちら」「今すぐ申し込む」等には変えない。

---

## 10. REMOVE｜「どこから始めますか」

ページ後半の 4 択 Section を独立 Section として **REMOVE**。

削除の意味は入口をなくすことではない。この機能を First Scroll の Reality Routing へ**移動**した。

Before は `Three Paths → Dreamin' Spiral 🌱 → 実績 → もう一度「どこから始めますか」` となっており、入口選択が重複していた。
vNext では **入口は最初に選べる。** 読み続けたい人だけが、その後 Meaning / Trust / Resonance へ進む。

About への導線だけを Reality Routing 下部に Secondary Link として残した。

---

## 11. CTA Hierarchy

| Level | CTA | 位置 |
|---|---|---|
| 1 — Continue | 今の気になるところから ↓ | Hero → First Scroll |
| 2 — Explore | DX支援を見る ／ 企業型DCについて ／ Dreamin' Spiral 🌱について ／ 各 Service の「詳しく見る」／ About | Reality Routing ・ DS Section ・ Philosophy |
| 3 — Contact | 少し話してみる | 最終 Section |

Level 3 をいきなり Hero へ持ってこない。

---

## 12. First View Experience Requirement

Desktop / Mobile とも、**Hero だけが完全に閉じた一画面にならないこと**を Experience Requirement とする。
目的は Scroll を強制することではなく、**次に何があるか分かる状態にする**こと。

実測（Preview）：

| Viewport | Hero 高さ | Cue 下端 | Reality Routing の見えている高さ |
|---|---|---|---|
| 1280 × 800 | 581px | 663px | 25px |
| 375 × 812 | 484px | 646px | 102px |

---

## 13. 実装ノート

### CSS

- **A19** を新設（`style.css` 末尾）。Hero Reality 層 ・ 局所 scrim ・ Scroll Cue ・ Reality Routing ・ B8E Meaning Headline ・ DS intro の順序に伴う余白
- A16 / A17 / A18 の**定義は変更していない**。A18 の balance list からは、REMOVE した element の selector（`.entry-points-sub` ・ `.path-target`）だけを外した
- 使われなくなった rule を撤去：`.entry-points` 系一式 ・ `.what-domains` / `.what-domain` ・ `.path-target`（いずれも TOP でしか使われていなかった）
- `scroll.js` の fade-in 対象から `.entry-points-inner` を削除

### Path Card の折返し

720px を 3 分割した狭い column では、手動 `<br>` が「す。」だけの行を生んだ（実測）。
Meaning の `<br>` を外して Browser に任せ、`word-break: auto-phrase` / `text-wrap: pretty` を
**この Decision が実際に Copy を変更した Section の中だけに閉じて**適用した。
A18 の「Desktop Typography には触れない」という制約を、A18 自身の scope を広げずに守るための判断。

### QA（Preview・Chromium）

- Hero contrast（Asset ・ gradient ・ scrim を合成して worst-case を実測）
  - Desktop 1280：Headline 14.26:1 ・ Subheadline 12.46:1 ・ Closing 5.53:1 ・ Cue 11.07:1
  - Mobile 375：Headline 14.18:1 ・ Subheadline 12.25:1 ・ Closing 6.37:1 ・ Cue 11.73:1
  - **すべて AA 以上**
- Orphan Line 検出（A18 と同じ考え方で、行ごとの実テキストを `Range.getClientRects()` から復元）
  320 / 375 / 390 / 430 / 768 / 880 / 1024 / 1280 の 8 幅で **虚しい改行 0 件 ・ horizontal overflow 0**
- DX支援 ・ 企業型DC ・ About ・ Dreamin' Spiral 🌱 Home に regression なし（CSS の撤去対象はすべて TOP 専用 class）

> Playwright ベースの `docs/qa/mobile-typography-audit.mjs`（全 27 ページ Harness）は本 Request では未実行。
> Merge 前に Production URL へ向けて回すなら、README の手順どおり `npx playwright install` から。

---

## 14. Out of Scope

DX支援 LP 本文 ・ 企業型DC LP 本文 ・ Dreamin' Spiral 🌱 Home 全体 ・ 各 Service LP ・ About ・
Browser title ・ Meta description ・ OGP ・ SEO strategy ・ Header / Footer Architecture ・ URL ・
Technical Identifier ・ Visual Asset の新規生成 ・ Contact backend ・ Service Pricing / Offer。

External Exposure（検索 ・ SNS ・ OGP 等）は次の Layer で扱う。今回はまず**到着後の Entry** を整える。

---

## 15. Definition of Done

実装後、以下を満たして初めて成立とする（1〜12 は Preview 実装で確認済み。13〜15 は Owner Review）。

1. Hero を見た数秒で「自分に関係がある可能性」が感じられる
2. Hero だけで B8E の思想を理解させようとしていない
3. First Scroll で 3 つの入口が Reality として理解できる
4. DX / DC / Dreamin' Spiral 🌱 のいずれも上下関係に見えない
5. 「変容には、外側と内側がある」という B8E の核は失われていない
6. Philosophy が Reality の後に自然につながる
7. Dreamin' Spiral 🌱 の 6 Service は Canonical order / copy を維持する
8. Guide が必須入口や Funnel 起点に見えない
9. 後半の Routing 重複がなくなる
10. Contact CTA が唐突に感じられない
11. 現行 Visual Rhythm が崩れていない
12. Desktop / Mobile 双方で First View → First Scroll のつながりが見える
13. Owner 本人が、Hero Copy を自分の言葉として自然に話せる
14. 「マーケティングっぽくなった」という違和感がない
15. 「静かだけれど、以前より自分事として入ってくる」と感じられる

---

## 16. Core Statement

> **B8E が何者かを先に説明するのではなく、訪れた人が自分の今に気づき、その先で B8E の意味と出会える TOP にする。**
>
> **思想を弱くするのではない。思想が届く順番を変える。**
