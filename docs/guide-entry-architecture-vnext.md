# Guide Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/guide/index.html`, `assets/dreamin-spiral/guide/hero-*`（`style.css` ・ `gas-transition.js` ・ Booking の URL ／ 属性は変更なし。A21 ／ A21-b の Reality Hero ・ Scene Hero ・ Continue Cue を再利用）
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

## Hero Visual（AD-1 決着 ・ 2026-10-01）

**Architect Decision：** 既存 `DS-GUIDE-01` は LP Hero に使わない（聴く側が正面 ・ 話す側が後ろ姿で上下関係 ／ Coach ・ Consultant 広告寄り ／ Laptop ／ 湖 ・ 山の屋外テラス ／ stock photo smile ／ Home ・ TOP Card と同一）。新規 **`DS-GUIDE-HERO-01`** を採用。

| 項目 | 内容 |
|---|---|
| Asset ID | `DS-GUIDE-HERO-01`（Owner の正式 PNG 名 `DS-GUIDE-HERO-01_dreamin-spiral-guide-hero.png` ・ 1672×941 ・ byte 一致を確認） |
| Visual Role | Dialogue ＋ Daily Life ＋ Human |
| Meaning | ちゃんと相談内容を整理してから来るのではなく、今あることを、そのまま誰かと話してみる |
| Master | OS repo `assets/png/b8e-public-visual/ds/DS-GUIDE-HERO-01.png`（Inventory ・ Implementation Map 更新） |
| 公開版 | `assets/dreamin-spiral/guide/hero-{640,960,1280,1672}.{avif,webp}`（WebP q72 ・ AVIF q52 ・ 13〜61 KB）。Master PNG は public に置かない |
| Layout | My Life ・ Community ・ 3 Weeks と同じ A21-b：Desktop（≥ 880px）は Visual ｜ Copy の 2 列、それ未満は Visual → Copy の縦積みで **max-width 560px**。画像と Copy は別面 |
| Markup | `<picture>`（AVIF ／ WebP ・ srcset 4 幅 ・ `sizes="(max-width: 879px) min(560px, calc(100vw - 48px)), 500px"`）・ `width="1672" height="941"`（CLS 0）・ `fetchpriority="high"` ・ `decoding="async"` |
| Role separation | Home ／ TOP の Guide Card は `DS-GUIDE-01` のまま（KEEP） |

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
| Responsive | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0（Offer の「無料」は値そのもの） |
| Hero Visual 実寸 | 320：272×153 ・ 375：327×184 ・ 390：342×192 ・ 430：382×215 ・ **768 ／ 820 ／ 879：560×315（上限で停止）**・ 1024：444×250 ・ 1280 ／ 1440：512×288（2 列）。全幅で 16:9（1.778）・ 二人とも顔の切れなし ・ Headline は全幅で First View 内 |
| Regression | `style.css` ・ `gas-transition.js` ・ Dreamin' Spiral 🌱 Home ・ 他 Service Page の差分 0 |
