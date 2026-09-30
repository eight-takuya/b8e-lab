# Dreamin' Spiral 🌱 Home Entry Architecture vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-09-30
**Scope:** `dreamin-spiral/index.html`, `style.css`（A20 追加 ・ `.ds-home-empathy` → `.ds-home-recognition`）
**Decision by:** Architect（Owner 採用）
**AI Creation Request:** ACR-20260930-023

---

## 0. Core Principle

> **Dreamin' Spiral 🌱 を説明する前に、訪れた人が自分の今に気づく。**
>
> **思想を弱めるのではない。思想が届く順番を変える。**

B8E TOP Entry Architecture vNext（ACR-20260930-019）と同じ入口思想を Home にも適用する。
ただし TOP の Copy ・ 構造を単純 copy するものではない。

---

## 1. Section 構造

### Before

`01 Hero: Philosophy → 02 Dreamin' Spiral 🌱とは → 03 今、気になっているところから → 04 6 Services → 05 Library → 06 Closing → Guide`

### After（vNext）

| # | Section | Role | 操作 |
|---|---|---|---|
| 01 | Hero | Reality / Recognition | REFRAME ＋ ADD |
| 02 | Recognition | Recognition | MOVE ＋ REFRAME（旧「今、気になっているところから。」）|
| 03 | Meaning / Philosophy | Meaning | MOVE（旧 Hero の Core Message）|
| 04 | Spiral | Spiral | KEEP ＋ Lead を ADD |
| 05 | Six Entrances | 中心 | REFRAME（Card の読み順）|
| 06 | Creation | Reality / Work / Creation | **ADD（新規）** |
| 07 | Library | Library | KEEP |
| 08 | Open Closing | Return | Copy KEEP ・ CTA REFRAME |

---

## 2. 各 Section

### 01 Hero — Reality / Recognition

初見の人に Dreamin' Spiral 🌱 を説明しきる場所ではない。「これ、自分にもあるかもしれない」と感じられることを目的とする。

- Eyebrow: `DREAMIN' SPIRAL 🌱`
- Headline: 仕事も、暮らしも、それなりに進んでいる。／ でも、ふと「このままでいいのかな」と思うことがある。
- Subheadline: その「気になる」を、すぐに答えにしなくてもいい。／ 今の現実から、自分に気づきながら、人生や仕事を創っていく。／ Dreamin' Spiral 🌱は、そのプロセスを一緒に見ていくための場です。
- **Level 1 CTA（Continue）**: `今の自分から見てみる ↓` → `#recognition`（Conversion Button にしない）

### 02 Recognition

旧「今、気になっているところから。」の Reality Role を First Scroll へ MOVE し、Recognition として再構成。
**ここではまだ Service 名を前面に出さない。**

- Headline: 日々の中で、ふと心に残ること。
- Body 4 項目 ＋ Closing「答えを急がなくても、その『気になる』は、今の自分を知る入口なのかもしれません。」

CSS class を `.ds-home-empathy` → `.ds-home-recognition` に rename（Section の Role が Empathy から Recognition へ変わったため。装飾 ・ 余白は不変）。

### 03 Meaning / Philosophy

旧 Hero の Core Message **「自分そのものから、人生と仕事を生きていく。」** をここへ MOVE（削除しない）。
Eyebrow は `Dreamin' Spiral 🌱とは`（日本語を含むので `.ds-service-eyebrow` の uppercase 変換を外す）。
Home の中で最も静かな Section の一つ。Visual Density を上げない。

### 04 Spiral

Spiral ・ wording（気になる → 感じる → 気づく → やってみる → また感じる）・ figcaption（戻るけれど、同じところには戻っていない。）は **完全 KEEP**。
Philosophy の中にあったものを独立 Section にし、Lead **「気づいて終わるのではなく、小さくやってみて、また感じていく。」** だけを ADD。

Step 図 ・ 正しい手順 ・ Level ・ Stage ・ 成長階段に見せない（Visual Direction v1 §10）。番号 ・ 矢印 ・ 見出しを付けていない。

### 05 Six Entrances — Home の中心

- Headline: 今の自分に近い入口から。
- Lead: 6つは、順番でも段階でもありません。／ 今、自然に気になるところから見てみてください。

**Card の読み順を REFRAME:**

| | Before | After |
|---|---|---|
| 1 | Service Name | **Self-relevance** |
| 2 | Self-relevance | **Service Name** |
| 3 | Summary | Summary（Meaning）|
| 4 | CTA | CTA |

訪問者は Service 名ではなく「これ、自分かも」から Card へ入る。

> **Provenance:** 実装時の comment「読み順：Service 名（左上）→「○○な方へ」→ 短い説明 → CTA（Owner ／ Architect Review 2026-09-24）」は本 Decision で supersede した。
> なお **Visual Direction v1 §12 は元から「Service 名より『○○な方へ』（Self-relevance）を上位に置く」** と定めており、今回の変更は実装を Canonical へ合わせ直すものでもある。

**完全 KEEP:** 6 Service の Canonical Display Name ・ Canonical Order（Guide / 3 Weeks Tuning / Community / My Life, My Way / Project Creation / Business Creation）・ Self-relevance Copy ・ Summary ・ 6 Service Visual。

**Service Equality:** おすすめ ・ まずはこちら ・ 初心者向け ・ 人気 ・ Step ・ Level ・ 次はこちら ・ Upgrade ・ Funnel 表現を付けていない。面積 ・ Visual 強度 ・ CTA 強度 ・ 装飾はすべて同じ。

### 06 Creation（ADD）

Dreamin' Spiral 🌱 を内省 ・ Healing ・ Mindset だけの Brand に見せない。
Reality / Work / Technology / Creation を Home 全体の意味として接続する。

- Headline: 気づくだけで、終わらない。
- Body: 話してみる。／ 書いてみる。／ やってみる。／ 働き方を少し変えてみる。／ Projectを動かしてみる。／ Businessを形にして、実際に届けてみる。／ Dreamin' Spiral 🌱では、自分の内側を見ることと、現実を創ることを分けません。

### 07 Library

KEEP。Service Family とは分離したまま。「無料」を Primary framing に足していない。

### 08 Open Closing

Closing Copy（今、気になっていることは何でしょう。／ そこから始めてみてもいいのかもしれません。）は KEEP。

- **REMOVE:** 旧 CTA `Guide（無料）について見る`
- **vNext CTA（Level 3 Return）:** `今の自分に近い入口を見る ↑` → `#entrances`

理由：6 Service は Canonical 上対等であり、Home の最後だけ Guide を標準入口に見せないため。
**Guide 自体は弱めていない** — 6 つの入口の 1 つとして Card に同じ強さで存在する。

---

## 3. CTA Hierarchy

| Level | CTA | 遷移 |
|---|---|---|
| 1 — Continue | 今の自分から見てみる ↓ | Hero → Recognition |
| 2 — Explore | 各 Service「詳しく見る」／ Libraryを見る | Card → Service LP ／ Library |
| 3 — Return | 今の自分に近い入口を見る ↑ | Closing → Six Entrances |

「今すぐ申し込む」「無料相談」「今すぐ予約」等の強い Conversion CTA は追加していない。申込 Action は各 Service LP の役割。

---

## 4. Visual — 現状と未解決

Visual Direction v1 が求める Role に対し、**現行 Asset で成立しない Section が 4 つある。**
`勝手に AI 画像を生成して差し替えない` という Decision に従い、**1 枚も生成していない。**
Asset Role ・ Direction ・ Prompt 案は `architect-report.md` の `## Architect Decision Needed` に設計して返している。

| Section | 必要な Role | 現状 |
|---|---|---|
| 01 Hero | Human ＋ Daily Life ＋ Light ＋ Reality | `DS-HERO-01` は**抽象の Atmosphere**（光と稜線のみ ・ 人物 ・ 生活空間 ・ PC なし）で Role を満たさない。暫定で継続表示 |
| 02 Recognition | Human ／ PC ／ Daily Life（Hero と別 Scene）| Asset なし（Photo Slot B は未充填のまま）|
| 06 Creation | Reality ＋ Work ＋ Technology ＋ Creation | Asset なし（新規 Section）|
| 08 Closing | Human ＋ Light ＋ Nature（Hero と別 Asset）| Asset なし（Photo Slot C は未充填のまま）|

**KEEP:** Spiral Visual ・ 6 Service Visual（Guide / 3 Weeks Tuning / Community / My Life, My Way / Project Creation / Business Creation）。

### Visual Rhythm

`Hero Visual → Recognition（Text）→ Quiet Philosophy → Spiral → 6 Service Visuals → Creation（Text）→ Library / White Space → Closing（Text）`

全 Section を写真で埋めていない。Stillness と Reality が交互に現れる（Visual Direction v1）。

---

## 5. 実装ノート

### CSS

- **A20** を新設（`style.css` 末尾）
- **A14 ／ A15（Visual Direction v1 実装）・ A16（Typography）・ A18（Mobile Orphan Line Quality）の定義は変更していない**
- `.ds-home-empathy` → `.ds-home-recognition` に rename（8 箇所 ・ Home でしか使われていないことを確認済み）
- 6 Service Card の読み順変更は **HTML の要素順** で行い、`.ds-family-desc` / `.ds-family-name` の余白だけを A20 で調整（面積 ・ Visual ・ CTA の強度は 6 枚とも不変）

### Hero / Closing CTA の色

Home 標準の link 色 `#8a6a4e` は、**Hero の Cue が載る下部で worst-case 3.11:1（AA 未満）**だった（Asset ・ gradient ・ cream scrim ・ 下端の緑を合成した実測）。
Mobile は crop（`object-position: 68% 46%`）と scrim の減衰でさらに厳しい。Closing の Return も panel の最暗部 `#f2f0e9` 上で 4.36:1 と届かない。

→ 新設の 2 CTA だけを **`#42301f`** にした（Desktop Cue 7.89:1 ・ Mobile Cue 5.25:1 ・ Closing Return 11.00:1）。
Library の `.ds-service-cta`（`#8a6a4e` ・ `#f8f6f1` 上で 4.62:1）は変更していない。

---

## 6. Verification（Preview・Chromium 実測）

| 項目 | 結果 |
|---|---|
| Section 順序 | `hero → recognition → philosophy → spiral → family → creation → library → closing`（DOM 実測） |
| Hero Headline | `仕事も、暮らしも、それなりに進んでいる。でも、ふと「このままでいいのかな」と思うことがある。` |
| Card 読み順 | `ds-family-desc → ds-family-name → ds-family-summary`（6 枚とも）|
| 6 Service Canonical | Guide / 3 Weeks Tuning / Community / My Life, My Way / Project Creation / Business Creation（Order 不変）|
| Spiral | SVG ・ wording ・ figcaption とも保持 |
| Continue CTA | `#recognition` へ着地（`top = 16`）|
| Return CTA | `#entrances` へ着地（`top = 16`）|
| 旧 Guide 固定 CTA | 0 件（本文中） |
| Hero contrast | Desktop Title 11.96 / Lead 6.99 / Cue **7.89** ・ Mobile Title 10.08 / Lead 6.26 / Cue **5.25** — すべて AA 以上 |
| Orphan Line ／ overflow | 320 / 375 / 430 / 768 / 1024 / 1280 の 6 幅で **虚しい改行 0 件 ・ horizontal overflow 0** |
| 既存 link | 6 Service ＋ Library の href は main と完全一致（追加は `#recognition` ・ `#entrances` のみ）|
| Regression | `/dreamin-spiral/guide/` ・ `/dreamin-spiral/3-weeks/` ・ `/dreamin-spiral/library/` ・ TOP に影響なし |

---

## 7. Out of Scope

各 Service LP 本文 ・ Price ・ Payment ・ Stripe ・ Formspree ・ Booking ・ Legal ・ Header / Footer Architecture ・ URL ・
SEO keyword strategy ・ SNS ・ YouTube ・ External Exposure strategy ・ OGP 全体戦略。

**Meta description / OGP:** Hero Copy が Philosophy から Reality へ変わったため、現行の description
（「自分そのものから、人生と仕事を生きていく。…」）は Hero の第一印象と一致しなくなった。
ただし §24 が広範囲変更を禁じているため**変更せず、architect-report.md で報告**している。

---

## 8. Definition of Done

Architect Request §28 の 22 項目のうち **1〜15 ・ 21 ・ 22 は実装で満たしている**（engineer-report.md `## Self-check`）。
**16〜20 は Owner / Architect Reality Review が必要**で、Engineer は PASS 判定をしない。
