# Project Creation Public Reality Reset + Entry Architecture vNext

**Status:** Round 2 Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `dreamin-spiral/project-creation/index.html`, `dreamin-spiral/project-creation/apply/index.html`, `style.css`（A22 ・ 2 rules）／ Round 2：`dreamin-spiral/project-creation/{thanks,complete}/index.html`, `legal/index.html`, `assets/dreamin-spiral/project-creation/`
**AI Creation Request:** ACR-20261001-012

## Public Current Reality

- Internal：2026-10-01 開始予定だった Founding Cohort は実施しない（Public には理由を書かない）
- Public：「現在、Project Creationの募集は行っていません。次回の募集時期や内容が決まりましたら、このページでお知らせします。」だけ
- 「終了した募集ページ」ではなく、Project Creation がどんな仕事の見方と実践なのかを、いつでも読める Evergreen Page にした
- 次回募集が決まったら、**12 Current Availability ・ 13 Open Action**（必要なら Offer ／ Price ／ Apply を足す）だけを更新すればよい

## 19 → 13 Section

| 旧 | vNext | 操作 |
|---|---|---|
| 01 First View（PROJECT CREATION ｜ FOUNDING COHORT ・ 3ヶ月 ・ 申込 CTA） | **01 Hero — Reality** | Architect 指定の Reality Copy。Positioning「エンジニアから、プロジェクトを創る人へ。」は KEEP（`.pc-hero-positioning`）。Continue Cue「Project Creationについて見てみる ↓」。Founding Cohort ・ 期間 ・ 料金 ・ 開始日 ・ 定員 ・ 申込 CTA ・ Guide link を Hero から外した |
| 02 Resonance | **02 Recognition**（`#recognition`） | 見出しを Architect 指定へ。本文は byte KEEP。旧 18 の「無理に『管理職らしく』…／ 誰かのPM像に…」を「違う気がする。」の後へ MOVE |
| 03 Reframe | **03 Meaning** | 見出し KEEP。list を Architect 指定の 7 項目へ。結びを「役職としてPMになるためだけの講座ではありません。／ 役職名よりも、Projectが動ける状態を創ることを扱います。」へ REFRAME |
| 04 Transformation（3ヶ月後に目指す変化） | **04 Shift** | 見出しを「Projectの見方が、少しずつ変わっていく。」へ。Before ／ Shift（旧 After のラベル）・ Statement は KEEP。旧 18 の「今まで身につけてきた技術も…次の土台になります。」を冒頭へ MOVE |
| 05 OS ＋ 06 3 Roles | **05 How It Works** | OS（7 steps）・ 3 Roles の `dl` は byte KEEP。3 Roles は `h3` の小見出しにし、「3つは、選ぶコースではなく、ひとつのProjectを見るための視点です。最初からどれか一つを選ぶ必要はありません。」を添えた（Lens として扱う） |
| 07 AI | **06 AI** | byte KEEP |
| 08 12 Weeks | **07 12 Weeks** | Month ／ Week は byte KEEP。Intro「Project Creationは、この12 Weeksを基本構造として設計しています。」を追加。日付なし |
| 09 How You Learn | **08 Real Work** | 見出し ・ Flow は byte KEEP。「架空の教材だけで終わらず、現実の仕事と行き来します。」を追加 |
| 10 Support ＋ 11 Portfolio | **09 Support & Outputs** | 見出し「学びながら、実際のProjectへ戻っていく。」。Weekly Group Session ・ 1on1 は KEEP。**My Page（将来的に提供）・ Community（決済確認後から）を REMOVE**。「AIとの実践」「Real Workと振り返り」を追加。Outputs は小見出し「12 Weeksで取り組む12 Outputs」＋ 12 項目 ＋ Statement（byte KEEP） |
| 12 Who ＋ 13 講師 | **10 Who / Partner** | Who list は byte KEEP。旧 18 の結び「技術を理解している自分のまま、…Projectを創れる人になる。」を Statement として MOVE。講師は小見出し「一緒にProjectを見る人」＋ 本文 ・ Profile を byte KEEP（経歴の追加なし） |
| 14 Capacity ・ 15 Price ・ 16 Founding Cohort | — | **Public から REMOVE** |
| 17 FAQ | **11 FAQ** | 8 問は byte KEEP。**キャンセル・返金を REMOVE**（Legal は無変更）。「現在、参加できますか？」を追加 |
| 18 Final Message | — | 独立 Section にはせず、Recognition ・ Shift ・ Who / Partner へ分けて MOVE（同じ Copy の重複なし）。「その3ヶ月を、…一緒に始めます。」は Cohort 前提のため外した |
| 19 Final CTA | **12 Current Availability ＋ 13 Open Action** | 申込 CTA ・ Cohort の Offer 表 ・ 受付終了の表示を REMOVE。Guide（無料）は Open Action の下に Optional（「Guide（無料）について見る」） |

## Engineer が書いた非意味的な補い（Architect Review の対象）

- 05：「3つは、選ぶコースではなく、ひとつのProjectを見るための視点です。」（§15「Lens として扱う」の言語化）
- 09：「AIとの実践 ／ Projectの中で、AIと一緒に考える」「Real Workと振り返り ／ 今の仕事で試し、振り返る」（§23 の項目名に `dl` の値を添えた）
- 08：「架空の教材だけで終わらず、現実の仕事と行き来します。」（§20 の特徴を文にした）
- 旧 18 の配置（上表）

## /apply/（閉じた状態）

- 見出し「現在、Project Creationの募集は行っていません。」＋ 本文 ＋「Project Creationについて見る」（LP へ）＋ Optional「Guide（無料）について見る」
- **Form ・ Formspree endpoint ・ 入力 → 確認 → 送信の inline script ・ cohort.js の読み込みを Public の page から外した**（JavaScript が動かない環境でも送信できない）
- 旧 Founding Cohort の申込 Form は、この変更の直前（b8e-lab `e55ce23`）の版と OS repo `docs/repository-architecture/project-creation-launch-v1.md` に残っている。次回の募集で再利用するときは、そこから戻す
- meta description ／ og:description「Project Creation｜Founding Cohort のお申し込みフォーム。…」は、受付中と読める Current Reality の誤りのため、「Project Creation のお申し込みページです。現在、Project Creationの募集は行っていません。」へ最小限で直した（§51）。title ・ og:title ・ og:image は無変更

## cohort.js の調査

- 使用箇所：LP（`/dreamin-spiral/project-creation/`）と `/apply/` の 2 つだけ（他 Page ・ JS からの参照なし）
- 内容：STATUS（open ／ closed）と締切（2026-09-30 18:00 JST）で、`[data-pc-apply]`（申込 CTA ・ Form）を隠し、`[data-pc-closed]`（受付終了の表示）を出す
- vNext では LP ・ /apply/ のどちらにも `data-pc-*` の要素がなくなったため、両方から読み込みを外した
- **ファイルは削除していない**（次回の募集で再利用できる。現時点で参照はない）

## Visual（DS-PROJECT-01）の評価と Architect への返却

既存 `DS-PROJECT-01`（1672×941 ・ Structure ＋ Project）は **Hero に再利用しない**。Hero は Text のみで実装した。

| 観点 | 評価 |
|---|---|
| 一人が演説しない ・ 対等 | ✗ 中央の男性が**立ってホワイトボードを指しながら話し**、他の 4 人が座って笑顔で聞く ＝ Presentation ／ Consultant workshop ／ Manager 指示の構図 |
| 普通の仕事場 ・ Daily Reality | ✗ 夕日の海を望むテラス（非日常） |
| 過剰な笑顔 | ✗ 全員が大きく笑顔（stock photo） |
| Whiteboard ／ Laptop が脇役 | △ ホワイトボードが画面の右 1/4 を占める |
| Collaboration ・ Structure | ○ 付箋 ・ 構造図 ・ 複数人はある |
| Home Card との重複 | ✗ Home ／ TOP の Project Creation Card で使用中 |
| 16:9 ・ 質 | ○ |

→ Stop Condition「Existing DS-PROJECT-01 が Hero 不適合で新規 Asset が必要」。以下を提案として返す（画像は生成していない）。

- **Page:** `/dreamin-spiral/project-creation/`
- **Section:** 01 Hero（他 5 Service と同じ A21-b：Desktop は Visual ｜ Copy、880px 未満は縦積みで max-width 560px）
- **Asset ID 案:** `DS-PROJECT-HERO-01`
- **Formal Filename 案:** `DS-PROJECT-HERO-01_dreamin-spiral-project-creation-hero.png`
- **Visual Role:** Project ＋ Human ＋ Collaboration ＋ Structure ＋ Reality
- **Meaning:** Project を管理している人ではなく、人 ・ Business ・ Technology をつなぎながら、Project を創っている人
- **Direction:** 3 人 ・ 40〜50 代を含む ・ 小さな普通の Office の一角 ・ 平日の日中の自然光 ・ 全員が座ってテーブルを囲む（立って話す人なし）・ 一人が話し、一人が聴き、一人が紙に簡単な図を書いて整理している ・ Laptop ／ ノート ／ 付箋は脇役 ・ 表情は穏やかで集中（大きな笑顔なし）・ Project を創っている途中 ・ 絶景 ・ 高級オフィス ・ プレゼン ・ 握手 ・ Scrum の儀式 ・ PM ソフトの画面 ・ 浮遊 UI ・ AI ロボット ・ ネオン ・ 祝福なし ・ 16:9 ・ 人物は中くらい、余白あり（**1672×941 の 16:9 で生成**）
- **使用箇所:** Project Creation LP の Hero のみ（Home ／ TOP の Card は `DS-PROJECT-01` のまま）
- **Prompt 案:**
  > A quiet, documentary-style 16:9 photograph of three Japanese colleagues (one in their late 40s) seated around a plain table in the corner of an ordinary small office on a weekday afternoon, soft natural window light. Everyone is seated at the same level. One person is explaining a situation, one is listening, and one is sketching a simple structure diagram on paper to organize it. A laptop, a notebook and a few sticky notes are on the table but secondary. Calm, focused expressions, no big smiles. Work in progress, not a finished presentation. No one standing, no whiteboard presentation, no handshake, no luxury office, no scrum ceremony, no project-management software screen, no floating UI, no AI robot, no neon, no celebration, no scenic view. Wide 16:9 composition (1672×941), people at medium size with space around them, faces in the upper half of the frame.

## Known Issues ／ Architect への返却（Round 1 時点 ・ 1〜3 と 5 は Round 2 で解決）

1. **/thanks/ に Stripe LIVE Payment Link（148,000円 ・ `plink_1UIxv88tXYwNlHqEJkFOfNPw`）と銀行振込の案内が残っている**（noindex ・ 直接アクセスで表示される）。/apply/ を閉じたので正規の導線からは到達しないが、Stripe 側の Payment Link 自体は有効のまま。Payment Link の停止は Owner の Stripe 操作で、/thanks/ ・ /complete/ をどう扱うかは Architect の判断が要る
2. **/complete/ に「Project Creationは、2026年10月1日（木）20:00に始まります。」が残っている**（noindex ・ 決済後の到達ページ）
3. **/legal/（特定商取引法に基づく表記）に「現在はFounding Cohortのみを販売しています」「Founding Cohortは2026年10月1日（木）20:00に開始します」が残っている**。Prompt §52 に従い、Legal は変更せず報告のみ
4. LP の meta description ／ og:description「…3ヶ月間、実際のProjectを題材に、…実践プログラム。」は Founding Cohort ・ 日付 ・ 料金 ・ 受付を含まず、受付中という誤りにはならないため変更していない（External Exposure Layer へ）
5. Hero に Visual なし（上記 AD-1）

## Verification（ローカル静的配信で実測 ・ 2026-10-01）

| 項目 | 結果 |
|---|---|
| 構成 | h1 ＋ h2 × 12 ＝ 13 Section（＋ h3 小見出し 3）：Hero → こんなことを、感じることはありませんか。→ PMになることと、… → Projectの見方が、… → Projectを動かすための、新しい仕事のOS（h3 PM / PdM / PMO）→ AIを学ぶのではなく、… → 12 Weeks → 今の仕事そのものが、教材になる。→ 学びながら、…（h3 12 Outputs）→ こんな方へ（h3 一緒にProjectを見る人）→ よくあるご質問 → 現在の募集について → Project Creationが、少し気になったら。 |
| 外した Sales 表示 | LP の DOM テキスト（`textContent` ・ 非表示要素を含む）に Founding ／ 第1期 ／ 148,000 ／ 198,000 ／ 最大6名 ／ 6名 ／ 2026 ／ 10月1日 ／ 9月30日 ／ 受付終了 ／ 満席 ／ 申し込む ／ My Page ／ 将来的に提供 ／ 決済確認後 ／ キャンセル ／ 返金 ／ 3ヶ月後 の **0 件**。`/apply` への link 0 ・ `[hidden]` 要素 0 ・ cohort.js の読み込みなし |
| CTA | Hero の CTA 0 ・ Continue Cue → `#recognition` ・ Guide（無料）は Open Action の Secondary 1 件だけ |
| KEEP（byte） | `<head>`（Meta ／ OGP）・ `</main>` 以降（cohort.js の読み込み 1 行を除く）・ Recognition 本文 ・ OS ・ 3 Roles ・ AI ・ 12 Weeks ・ Real Work Flow ・ 12 Outputs ・ Who list ・ 講師 ・ FAQ 8 問 |
| /apply/ | `<form>` 0 ・ input ／ textarea ／ button 0 ・ inline script なし ・ Sales 表示 0 ・ LP ／ Guide への link のみ ・ 320 ／ 375 ／ 1280 で overflow 0 |
| Responsive（LP） | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 1〜2 文字の孤立行 0 ・ 画像なし |
| Regression | thanks ・ complete ・ cohort.js ・ legal ・ TOP ・ Home ・ gas-transition.js の差分 0。`style.css` は末尾に A22（2 rules）を足しただけ |

## Round 2（2026-10-01 ・ AD-1 Hero Visual ＋ AD-2 残存 Sales Reality）

### AD-1 — Hero Visual

| Asset ID | Section | Visual Role | Meaning | 公開版 |
|---|---|---|---|---|
| `DS-PROJECT-HERO-01` | 01 Hero | Project ＋ Human ＋ Collaboration ＋ Structure ＋ Reality | Project を管理している人ではなく、人 ・ Business ・ Technology をつなぎながら、Project を創っている人 | `assets/dreamin-spiral/project-creation/hero-{640,960,1280,1672}.{avif,webp}`（AVIF 22〜61KB）|

- Owner の正式 PNG（`DS-PROJECT-HERO-01_dreamin-spiral-project-creation-hero.png` ・ 1672×941 ・ 16:9）をそのまま使った（crop なし）。Master は dreamin-spiral-os `assets/png/b8e-public-visual/ds/DS-PROJECT-HERO-01.png`（byte 一致）
- Layout は A21-b（`.ds-service-hero--scene`）：≥ 880px は Visual ｜ Copy、880px 未満は Visual → Copy の縦積みで画像は max-width 560px。`fetchpriority="high"` ・ `width`/`height` 指定（CLS なし）
- Hero の Copy ・ Positioning ・ Continue Cue は byte で変更なし（`<div>` で包んだだけ）。Home ／ TOP の Card は `DS-PROJECT-01` のまま

### AD-2 — /thanks/ ・ /complete/ ・ /legal/

- **/thanks/ ・ /complete/**：/apply/ と同じ閉じた状態にした（h1「現在、Project Creationの募集は行っていません。」＋ Architect 指定の Body ＋「Project Creationについて見る」＋ 任意の Guide）。支払いへの導線 ・ 金額 ・ 振込の案内 ・ 開始日時 ・ 受付完了 ・ 参加方法の案内は **DOM から除去**（CSS で隠していない）。旧版は git history（bf33b85 以前）に残る
- 両ページの `<title>` ／ og:title ／ meta description ／ og:description は「お申し込みを受け付けました」「お支払いを受け付けました」という現在と矛盾する表示だったため、/apply/ と同じ考え方で最小限だけ直した（title は LP の Section 名「現在の募集について」を流用）。`noindex` はそのまま
- **/legal/**：Project Creation の Current Sales Terms（料金一覧の行 ・ Founding Cohort の説明 ・ 支払方法 ・ 支払時期 ・ 役務の提供時期 ・ キャンセル／返金）を外し、「販売価格・役務の対価」に Current Note を 1 か所だけ置いた（重複を避けるため、他の見出しには置いていない）。他 Service の記述は byte で変更なし。最終更新日を 2026年10月1日 に更新
- **/terms/**（利用規約 第9条の2）は KEEP 指定のため変更していない（「定員は各期ごとに定めます（Founding Cohortは6名）」は現在の販売表示ではない）→ Known Issue
- LP の HTML コメントにあった内部の事情（旧募集を「実施しない」）を、表示と同じ「現在は募集を行っていない」に揃えた（表示テキストの変更なし）

### Stripe（旧 Founding Cohort の Payment Link）

- Engineer 環境の Stripe CLI は **Sandbox の context だけが認証済み**で、Live の Payment Link を操作できない（`--live` は sandbox context のため実行されない）。Live を操作するには Stripe CLI の再認証（Owner の承認）が要る
- そのため Prompt §33 に従い：Public HTML から Payment Link を完全に除去 ・ /apply/ ・ /thanks/ ・ /complete/ を閉じた状態 ・ 直接の Public 導線 0 を確認し、Payment Link の停止だけを **External Action Pending** とした
- Product ／ Price ／ 履歴には触れていない

### Verification（Round 2 ・ ローカル静的配信で実測）

| 項目 | 結果 |
|---|---|
| Hero（10 幅） | 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ 孤立行 0 ・ 画像は全幅 16:9。320〜430 → 272〜382 幅（全幅）／ 768 ・ 820 ・ 879 → 560×315（上限で停止）／ 1024 → 444×250 ／ 1280 ・ 1440 → 512×288。Hero の CTA 0 ・ Continue → `#recognition` |
| /thanks/ | form ・ input ・ button 0 ・ Stripe ／ Payment Link ID ／ 金額 ／ 銀行 ／ 口座 ／ 振込 ／ Founding ／ Welcome の文字列が HTML source に 0 ・ link は LP と Guide だけ ・ overflow 0 |
| /complete/ | Founding ／ 10月1日 ／ 20:00 ／ Zoom ／ 1on1 ／ Start ／ Welcome ／ 受け付けました ／ 全12回 が HTML source に 0 ・ link は LP と Guide だけ ・ overflow 0 |
| /apply/ | form 系 0 ・ Formspree 0 ・ cohort.js の読み込みなし（Round 1 のまま）|
| /legal/ | Project Creation の記述は Current Note 1 か所だけ ・ Founding ／ 148,000 ／ 198,000 ／ 定員6名 ／ 9月30日 ／ 開講日 0 ・ 他 Service の料金表示はすべて残っている ・ overflow 0 |
| 公開 source 全体 | Payment Link ID ・ `buy.stripe.com` の Project Creation 分 0（3 Weeks ・ My Life の thanks の Stripe link はそのまま）|
| cohort.js | 削除なし ・ どのページからも読み込みなし |
