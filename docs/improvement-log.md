# Improvement Log

> A running record of every significant change to the B8E website.
> Updated after each deployment.

---

## Entry Template

```
---
## [YYYY-MM-DD] — [Short title]

**Scope:** [Which pages or files were changed]
**Triggered by:** [Reader analysis / user request / philosophy review]
**Mode used:** [Reader / Designer / Guardian / Implementer / Deployer]

### Changes
- [file]: [what changed and why]
- [file]: [what changed and why]

### Philosophy notes
[One sentence on how this change serves B8E philosophy]

### Deployed
[ ] Yes — commit: [hash or message]
[ ] No — pending
---
```

---

## 2026-06-12 — academy.html：「講座紹介ページ」から「思想の入口ページ」へ再設計

**Scope:** academy.html, style.css
**Triggered by:** ユーザー依頼 — DX支援・企業型DCと同じ思想で統一。「なぜこの場があるのか」が伝わる入口ページへ
**Mode used:** Designer / Implementer

### Changes
- academy.html: Dreamin' Engineの4象限グリッドを削除（program.html側へ移す前提）
- academy.html: 「この場を作った理由」セクションを追加（dc-whyと同構造）
- academy.html: 「Academyが支援しないこと」セクションを追加（B8Eが支援しないことと同構造）
- academy.html: CTAを`.cta-link`ボタンから2つの静かなテキストリンクへ変更
  - 「プログラムを読む →」「無料ガイドセッションの案内を読む →」
- style.css: `.academy-why` / `.academy-not` / `.academy-not-item` / `.academy-not-note` / `.academy-nav-links` を追加

### Philosophy notes
「答えを与えない、変容を急がせない」という姿勢を、ページの構造自体で体現した。

### Deployed
[ ] Yes — commit: pending
[ ] No — pending

---

## 2026-06-10 — dc.html：YouTube動画補足導線を追加

**Scope:** dc.html
**Triggered by:** ユーザー依頼 — 「この制度を伝えている理由」の補足として動画を静かに紹介
**Mode used:** Designer / Implementer

### Changes
- dc.html: `.video-reference` ブロックを「この制度を伝えている理由」セクション直後に追加
- ラベル「動画でもお話ししています」+ 動画タイトル + テキストリンク「YouTubeで見る →」構成
- サムネイルなし・大きなボタンなし・B8Eの静かなトーンで統一
- リンク先: https://youtu.be/HEEvSczlJpU

### Philosophy notes
YouTube集客ではなく、思想の補足として動画を紹介する静かな導線設計。

### Deployed
[ ] Yes — commit: pending
[ ] No — pending

---

## 2026-06-10 — dc.html：最終ブラッシュアップ（思想の前置・制度説明リード・導線文言）

**Scope:** dc.html
**Triggered by:** ユーザー依頼 — 「制度紹介ページ」ではなく「経営者の未来設計を考える入口」として完成させる
**Mode used:** Designer / Implementer

### Changes
- dc.html: 「企業型DCという選択肢」セクションの冒頭にリード文を追加
  - 「制度そのものが目的ではありません」「経営者自身の未来準備と従業員の将来設計を同じ仕組みの中で考えるための選択肢」
  - `.dc-choice-lead` スタイルを追加
- dc.html: dc-guide.html への導線文言を変更
  - 旧: 「制度について詳しく読みたい方は」
  - 新: 「まずは、自社に関係がありそうか。その判断材料として、制度の概要を整理しています。」

### Philosophy notes
「制度を勧めるのではなく、理解と判断を支援するページ」として、売り込み感を排除した入口設計を完成させた。

### Deployed
[ ] Yes — commit: pending
[ ] No — pending

---

## 2026-06-10 — dc-guide：注意書きブロックのレイアウト修正

**Scope:** dc-guide.html
**Triggered by:** ユーザー依頼 — 注意書きが全幅・左寄りでレイアウトの重心が崩れていた
**Mode used:** Designer / Implementer

### Changes
- dc-guide.html: `.dcg-notice`（全幅・左ボーダーボックス）を廃止し、`page-content` 内に `.dcg-about-page` として移動
- 見出し「このページについて」を追加（small caps スタイル）
- 警告ボックス的な背景色・左ボーダーを削除し、静かな導入テキストとして再スタイリング
- 本文と同じ content-width に揃え、About/DX支援ページと同じ読み心地に統一

### Philosophy notes
制度の情報ページとして、法的注意を前面に出すのではなく、「読む準備を整える場所」として入口を設計した。

### Deployed
[ ] Yes — commit: pending
[ ] No — pending

---

## 2026-06-10 — 企業型DC：思想接続セクション追加

**Scope:** dc.html
**Triggered by:** ユーザー要求 — DX支援・About と同じ思想の連続性を企業型DCページに追加
**Mode used:** Implementer

### Changes
- dc.html: 「この制度を伝えている理由」セクション追加（「こんな方へ」と「企業型DCという選択肢」の間）
  - 会社変革支援の中で経営者自身の後回しに出会ってきた経験を記述
  - 「DXも制度も、本質は同じ問い」という思想の接続を明示
  - 「人と組織が本来あるべき流れの中にいるか」→ About・DX支援との共鳴
  - Mobile 375px で全行孤立なし（各行 21px 以内に収まることを計測確認）

### Deployed
[ ] Yes — commit: pending
[ ] No — pending
---

## 2026-06-10 — 企業型DCページ全面再設計

**Scope:** dc.html, dc-guide.html
**Triggered by:** ユーザー要求 — 制度紹介から「経営者の判断支援ページ」へ再設計
**Mode used:** Implementer

### Changes
- dc.html: 10セクション構成に全面再設計
  - Hero（維持）+ 一文説明（金融商品ではない旨を明示）新設
  - 「こんな状況はありませんか」共感セクション新設
  - 「こんな方へ」対象者タグ付き新設
  - 「企業型DCという選択肢」断定表現なしで制度説明
  - 「B8Eが支援すること」5項目（左ボーダーリスト）新設
  - 「B8Eが支援しないこと」5項目（金融商品販売・投資助言等を明示）新設
  - 「導入までの考え方」4ステップ新設
  - dc-guide.html への静かな導線（1箇所のみ）
  - Formspree フォーム設置
- dc-guide.html: B8Eサイトデザインへの統合 + 内容整理
  - 独自ヘッダー・フッター → site-header / site-nav / site-footer に置換
  - 画像3点（img-01/02/03）を完全削除 → テキスト説明に置換
  - 他社出典（EarlyCross）表記を削除
  - 断定表現を修正：「全額損金」→「損金計上できる場合がある」等
  - 比較表「◎（最適）」→「有効な選択肢のひとつ」に修正
  - 冒頭注意書きバナー（dcg-notice）新設
  - FAQ: 9問 → 6問に整理
  - 末尾免責セクション（dcg-disclaimer）新設
  - dc.html への戻りリンク追加
  - Formspree フォーム設置

### Deployed
[ ] Yes — commit: pending
[ ] No — pending
---

## 2026-06-10 — DX支援ページ 100点仕上げ：言葉の磨き込み + 構成完成

**Scope:** `dx.html`
**Triggered by:** User request — 95点→100点。支援リストをB8Eらしい動詞表現へ、「なぜ支援できるのか」を大企業×中小企業の独自性中心に再構成、「支援しないこと」を価値観の表明へ、「支援の形」セクションを新設。

### Changes

- `dx.html`: 11セクション構成として完成。
  - **一文説明**: 「DX戦略、業務改善、IT導入、プロジェクト推進を支援しています。」をPC/SP出し分けで実装
  - **B8Eが支援すること**: 名詞羅列→動詞主体へ（「戦略を整理し、どこから動くかを決める」など）
  - **B8Eが支援しないこと**: 冒頭を価値観の提示「B8Eは、現場と一緒に考えることを大切にしています」に変更、締めを呼びかけへ
  - **なぜ支援できるのか**: 大企業の推進力×中小企業の現場感覚を冒頭に置き、実績を裏づけとして後置
  - **支援の形**: CTA直前に新設（課題整理・PJ推進・PM補佐・AI活用の相談ハードル低減）

### Philosophy notes
「誰に、何を、どこまで支援するのか」が3スクロール以内に伝わる構成。一般的なDXコンサル会社の文章に寄せず、「流れ・現場・伴走・問い」のキーワードを軸にB8Eの独自性を静かに伝える。

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-06-10 — DX支援ページ全面再設計：「相談したくなるページ」へ

**Scope:** `dx.html`
**Triggered by:** User request — 「思想を伝えるページ」から「相談したくなるページ」へ進化。誰に・何を・どこまで支援するのかを明確に伝える。

### Changes

- `dx.html`: 全面再構成。新7セクション構成:
  1. Hero（現状維持）
  2. こんな状況はありませんか（`.resonance-questions` 転用）
  3. B8Eが支援すること（`.dx-services` 左罫線リスト、支援内容6項目）
  4. なぜ支援できるのか（NTTデータ→中小企業4社→50社以上の根拠）
  5. 伴走という在り方（現行テキスト再構成）
  6. 支援実績（文章スタイル、業種列挙→温度差言及→個別相談へ）
  7. Contact CTA（Formspree、honeypot追加）

  旧構成の詩的 page-intro・「AIの時代と、人の問い」セクションを削除。
  meta description を追加。モバイルブレークポイントを 768px に統一。

- inline CSS: `.dx-services`（左罫線リスト）・`.dx-track`（実績テキスト間隔）を追加。

### Philosophy notes
共感で掴み（こんな状況）→ 具体で安心させ（支援内容）→ 根拠で納得させ（経歴）→ 哲学で共鳴させ（伴走）→ 実績で信頼を固め（50社以上）→ 静かに行動へ（CTA）という流れ。営業色を排しながら「何をする会社か」が明確に伝わる構成へ。

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## Log

---

## 2025-04-15 — Full site redesign from scratch

**Scope:** All pages (index, dx, dc, academy, about), style.css (new), about.html (new)
**Triggered by:** Reader Mode analysis of existing test site; B8E Philosophy Layer applied
**Mode used:** Reader → Designer → Implementer (Guardian integrated into conversation)

### Changes

- `style.css`: Created from scratch. Single shared stylesheet replacing inline CSS duplicated across all pages. Establishes visual language: off-white background (`#f7f6f4`), softened dark (`#1a1a1a`), generous spacing, minimal hierarchy.

- `index.html`: Rebuilt with Being-first structure. Hero replaced service listing. Philosophy section (founder's voice) added. Two-questions self-selection block added. Paths grid replaced card layout. Quiet CTA replaced dark button block. Footer added.

- `dx.html`: Rewritten. Hero reframes DX as an alignment question. "提供価値" and "こんな方" replaced with "伴走という在り方" and resonance questions. CTA softened. Footer added.

- `dc.html`: Rewritten. Intro leads with human feeling ("社員に安心して") rather than system explanation. "どちらにとっても意味のある選択" (sales endorsement) removed. dc-note box added for procedural clarity without disrupting tone.

- `academy.html`: Rewritten. Hero declares the page's nature ("自分の内側に、戻っていく場所"). Dreamin' Engine introduced as philosophy, not feature. Spiral growth explained as deepening. Bridge section added (human presence, founder's voice). Resonance questions replace target-audience list.

- `about.html`: Created new. Hero: "一人の問いが、場所になった。" Founder's path told as a sequence of questions. Three-pillars section explains why DX/DC/Academy share one home. BEAT EIGHT EMOTION name meaning explained. Mission stated as living commitment.

### Philosophy notes
The redesign replaced a persuasion-based structure (service + value + target + CTA) with a resonance-based structure (being + philosophy + question + quiet invitation) across all pages.

### Deployed
[ ] Yes — commit: (pending first deploy from this harness)
[x] No — local development complete

---

## 2025-04-15 — Site-wide tone refinement

**Scope:** index.html, dx.html, dc.html, academy.html, about.html (copy only)
**Triggered by:** Cross-page consistency review
**Mode used:** Implementer (targeted edits)

### Changes

- `index.html`: "どこに当てはまるかわからない方も" → "どれにも当てはまらない気がしても". Footer About link added.
- `dx.html`: "その経験から言えることがあります" → "ひとつ感じていることがあります". "丁寧に扱います" → "のそばに留まります". Footer About link added.
- `dc.html`: "きちんと考えてあげたい" → "一緒に考えたい". Removed sales endorsement line. Softened dc-note.
- `academy.html`: "たいてい、四つのどこかがずれています" → "四つのどこかがずれていることがあります". Footer About link added.
- `about.html`: Removed "現在" from three-pillars intro. Inline styles moved to CSS class.

### Philosophy notes
Removed the last traces of categorizing, assertive, and service-adjacent language. Site now reads as a continuous quiet voice across all pages.

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-04-15 — Harness build + index.html pipeline refinement

**Scope:** index.html (copy refinement); skills/, docs/, prompts/, README.md (new harness infrastructure)
**Triggered by:** Harness-driven Reader → Designer → Guardian → Implementer pipeline run on index.html
**Mode used:** Reader → Designer → Guardian → Implementer → Deployer

### Changes

- `index.html`: Philosophy section — removed conclusion statement ("外側を変えても…"), kept observation only ("変わっていく場面も、戻っていく場面も"). Two-questions — removed `#paths` anchor links (section now mirrors, not navigates); "したい" → "気がする" (recognition, not desire). Paths — "外側に" → "隣に"; "制度的な基盤" → "土台"; link labels renamed to service names. CTA — removed "歓迎します"; closed with "ここから。"

- `README.md`: Replaced single-line placeholder with full harness documentation (pipeline overview, usage guide, prompt reference table).

- `skills/hp-reader.md`: New. Observation-only analysis protocol. Output format: Structure Summary → Page Breakdown → Message Flow → Issues (tagged by type).

- `skills/hp-designer.md`: New. Design-only protocol with 5-point Philosophy Compliance Check. Never implements.

- `skills/hp-guardian.md`: New. Gatekeeper. 5-point compliance check; verdicts: Approved / Revise / Reject. Nothing proceeds without Approved.

- `skills/hp-implementer.md`: New. Translates approved designs to HTML/CSS. Follows existing class names. Never designs.

- `skills/hp-deployer.md`: New. Pre-deploy checklist, git workflow, commit format, rollback protocol.

- `docs/b8e-philosophy.md`: New. Authoritative philosophy reference. Core principles, two-axis model, name meaning, communication style.

- `docs/writing-principles.md`: New. Language guidelines: words to use freely, words to avoid, patterns for hero/resonance/CTA copy.

- `docs/site-structure.md`: New. Page inventory, CSS class documentation, navigation requirements, deployment architecture.

- `prompts/improve-homepage.md`: New. Ready-to-use prompt for index.html improvement cycle.
- `prompts/refine-copy.md`: New. Copy-only refinement pass prompt.
- `prompts/improve-dx-page.md`: New. DX page improvement prompt.
- `prompts/improve-academy-page.md`: New. Academy page improvement prompt.
- `prompts/polish-site-wide.md`: New. Cross-page consistency pass prompt.

### Philosophy notes
The harness encodes the B8E Philosophy Layer as a non-negotiable constraint in every step of the pipeline — Reader observes, Designer resonates, Guardian enforces, Implementer serves. The index.html refinements removed the last instances of the site stating its conclusions rather than creating space for the reader to arrive at them.

### Deployed
[x] Yes — commit: refine: deepen index.html resonance + add improvement harness
[ ] No — pending

---

## 2026-04-15 — Visual tone refinement (style.css only)

**Scope:** `style.css` — visual only, no HTML or content changes
**Triggered by:** Reader analysis of visual inconsistencies; full Reader → Designer → Guardian → Implementer pipeline
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

- `body letter-spacing`: `0.01em` → `0.02em` — Japanese body text breathes more
- `.hero background`: flat `#1a1a1a` → `linear-gradient(160deg, #1e1e1e 0%, #141414 100%)` — barely perceptible depth; removes flatness
- `.hero-copy font-weight`: `400` → `300` — lighter opening line; more space around the first words
- `.philosophy background-color`: `#ffffff` → `#faf9f7` — warms the white panel; unifies with body palette
- `.paths background-color`: `#ffffff` → `#faf9f7` — same; removes competing neutral
- Borders unified: `#ddd`, `#e0e0e0`, `#e8e6e3` → single value `#e6e4e1` across `.question-block`, `.path-card`, `.section-block`, `.resonance-questions`, `.quiet-cta`
- `.section-block h3 font-weight`: `600` → `400` — uppercase labels at 0.78rem read cleaner at regular weight
- `.resonance-questions h3 font-weight`: `600` → `400` — same
- Accent color `#9b7b5c` introduced — muted warm amber, used exclusively in:
  - `.quiet-cta .cta-link` color + border (default and hover)
  - `.back-link:hover` color

### Philosophy notes
The accent color appears only at moments of invitation — the CTA link and the back link on hover. It gives warmth to the reader's choice without decorating the surrounding space. The white panel unification and border consolidation removed the last sources of visual inconsistency in the palette.

### Deployed
[x] Yes — commit: style: visual tone refinement — accent color, warmth, typography
[ ] No — pending

---

## 2026-04-15 — Hero atmosphere refinement (all pages)

**Scope:** `style.css` (.hero), `dx.html` (.dx-hero), `dc.html` (.dc-hero), `academy.html` (.academy-hero), `about.html` (.about-hero) — background CSS only
**Triggered by:** Reader analysis: all heroes reading as flat dark walls; goal: "air, not black"
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

Single consistent change applied to all five hero classes:

```css
background:
  radial-gradient(ellipse at 50% 40%, rgba(255,235,200,0.055) 0%, transparent 58%),
  linear-gradient(180deg, #1c1a17 0%, #111010 100%);
```

Replacing: `background-color: #1a1a1a` (page heroes) and `linear-gradient(160deg, #1e1e1e 0%, #141414 100%)` (index hero).

- Radial layer: warm cream at ~5.5% opacity, centered at 50% 40% — creates imperceptible atmospheric softness around the text position. Invisible as a shape; felt as depth.
- Linear layer: `#1c1a17` (barely warm dark) → `#111010` (near-black), straight down — gives the field direction. Top is slightly less heavy than bottom. Replaces diagonal (160deg) with vertical (180deg).
- No HTML structure changes. No content changes. Mobile breakpoints (padding only) untouched.

### Philosophy notes
The darkness is now a space, not a wall. The change is invisible as technique — it contributes only as quality. The reader arrives in air rather than encountering a surface.

### Deployed
[x] Yes — commit: style: hero atmosphere — air not black, all pages
[ ] No — pending

---

## 2026-04-15 — Typography and spacing refinement

**Scope:** `style.css` only — line-height and margin-top values; no HTML or content changes
**Triggered by:** Reader analysis of rhythm inversion — resonance questions (most contemplative text) had tightest spacing (8px); hero had same line-height as body
**Mode used:** Reader → Designer → Guardian → Implementer

### Changes

12 properties adjusted. All in `style.css`.

- `body line-height`: `1.9` → `2.0` — align with `p` rule; clean shared baseline
- `p line-height`: `2.0` → `2.1` — slight lift for all unstyled paragraphs
- `.hero-copy line-height`: `2.0` → `2.2` — opening words at font-weight 300 can hold more vertical space
- `.hero-copy letter-spacing`: `0.04em` → `0.05em` — marginally more expansive; felt not seen
- `.philosophy p line-height`: `2.2` → `2.3` — the site's most considered text; one step further
- `.philosophy p + p margin-top`: `24px` → `32px` — more pause between separate thoughts
- `.question-block p line-height`: `1.9` → `2.0` — raised to body baseline
- `.path-card p line-height`: `1.8` → `1.95` — raised from system's tightest value toward body
- `.section-block p + p margin-top`: `16px` → `24px` — content paragraphs need pause between thoughts
- `.resonance-questions p + p margin-top`: `8px` → `16px` — each line must land before the next arrives
- `.page-intro p + p margin-top`: `20px` → `28px` — intro sets the page tone; more pause
- `.quiet-cta p line-height`: `2.0` → `2.2` — invitation breathes at the philosophy register

### Philosophy notes
The rhythm hierarchy now matches the contemplative weight of each section: hero and philosophy breathe the most; footer text remains compact. The resonance questions — the site's most important mirror text — finally have room between them.

### Deployed
[x] Yes — commit: style: typography and spacing refinement — rhythm and immersion
[ ] No — pending

---

## 2026-04-16 — Logo redesign: lemniscate mark + V1 typography (all pages)

**Scope:** `style.css` (logo CSS), all 5 HTML files (header h1 replacement)
**Triggered by:** Logo redesign request — existing h1 at font-weight 600 contradicted site philosophy
**Mode used:** Designer → Implementer (three variations presented, V3 + V1 selected)

### Changes

- `style.css`: replaced `.site-header h1` bold rule with new wordmark style (font-weight 200, 0.36em tracking, warm `#c0b8ad`). Added `.logo-mark` (inline-flex column) and `.logo-lemniscate` (48×19px, opacity 0.6). Dimmed tagline to `#424039`.
- All 5 HTML files: replaced `<h1>B8E</h1>` with `.logo-mark` containing inline SVG lemniscate + `<h1>B8E</h1>`.
- SVG: figure-8 lemniscate, viewBox 0 0 80 32, two ellipses (rx 18, ry 10) meeting at center (40,16). stroke `#c9a882`, stroke-width 1.1, opacity 0.6. `aria-hidden="true"` — h1 text provides semantic identity.

### Philosophy notes
The logo no longer announces itself. The lemniscate (∞) appears at 60% opacity — barely a shape. The wordmark at font-weight 200 is the quietest text on the site. A reader scrolling through will discover the mark rather than be greeted by it. EIGHT = ∞ is now visible in the header, not merely encoded in the name.

### Deployed
[x] Yes — commit: design: lemniscate logo mark — V3 + V1 typography, all pages
[ ] No — pending

---

## 2026-04-16 — Scroll experience refinement

**Scope:** `style.css` (spacing + fade CSS), new `scroll.js`, all 5 HTML files (script tag + hero padding)
**Triggered by:** Explicit scroll refinement request — "scrolling should feel like breathing, not navigation"
**Mode used:** Implementer (direct implementation, goals specified by user)

### Changes

**Spacing (style.css):**
- `p line-height`: `2.1` → `2.2`
- `.hero padding`: `88px 40px` → `112px 40px` — initial pause before first content
- `.philosophy padding`: `64px 40px` → `80px 40px`
- `.two-questions padding`: `64px 40px` → `80px 40px`
- `.paths padding`: `64px 40px` → `80px 40px`
- `.page-content > * + * margin-top`: `56px` → `72px` — breathing room between service page blocks

**Page hero padding (HTML inline CSS):**
- `.dx-hero`, `.dc-hero`, `.about-hero`: `96px → 120px`
- `.academy-hero`: `104px → 120px`

**Fade-in CSS (style.css, section 16):**
- `.fade-in { opacity: 0.12; transition: opacity 1.6s ease; }`
- `.fade-in.is-visible { opacity: 1; }`
- `@media (prefers-reduced-motion: reduce)` — disables animation for accessibility

**scroll.js (new):**
- IntersectionObserver: `threshold: 0.07`, `rootMargin: 0px 0px -32px 0px`
- Targets: `.philosophy-inner`, `.two-questions-inner`, `.paths-grid`, `.section-block`, `.page-intro`, `.resonance-questions`, `.quiet-cta`
- Elements visible in initial viewport (top < 92% of innerHeight) receive no animation
- Elements below fold: `.fade-in` class added; fade from `0.12 → 1` on entry
- Feature-detected: no-op if IntersectionObserver unavailable
- Observes each element once, then unobserves (no re-trigger)

### Philosophy notes
The fade targets only inner content containers — not section backgrounds. Backgrounds remain solid; only text/content surfaces arrive gently. The reader does not notice the animation; they notice that each thought seems to arrive at the right moment.

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-05-20 — DC page bridge and trust structure

**Scope:** `dc.html`, `style.css`, `docs/improvement-log.md`
**Triggered by:** User request — dc page lacked bridge from world-view to concrete situation; small-business owners and solo directors couldn't immediately recognize themselves
**Mode used:** Implementer

### Changes

- `dc.html`: Added "こんな経営者の方へ" section as first block in page-content — five concrete situations (法人化・小規模・社長一人・採用・長期安心) using `.resonance-questions` styling so tone stays consistent. Modified page-intro to open with empathy about executives putting their own future on hold ("経営者は、会社のことを考え続けている"). Updated resonance-questions to include owner's personal perspective as first item. Added FAQ section (社長一人でも、小規模法人、個人事業主、iDeCoとの違い、社会保険料) inside `.section-block` with new `.faq-items`/`.faq-item` classes. Updated quiet-cta copy to lower consultation barrier ("情報交換ベースで。小規模でも使えるか…そういった問いから話せます"). Added `<meta name="description">` and FAQPage JSON-LD structured data for SEO. Removed dead `.dc-note` CSS.

- `style.css`: Added section 18 — `.faq-items`, `.faq-item`, `.faq-q`, `.faq-a`. FAQ items separated by `#f0eeeb` border; question at `#444`, answer at `#777`.

### Philosophy notes
The page now builds a bridge from world-view to specific situation. Readers who are solo directors or small-company owners can recognize themselves before the philosophical content — the invitation becomes more accessible without losing the quiet B8E tone.

### Deployed
[x] Yes — commit: improve dc page bridge and trust structure
[ ] No — local

---

## 2026-05-21 — Add dc-guide.html LP to b8e site

**Scope:** `dc-guide.html` (new), `assets/dc/` (new), `dc.html` (guide link added)
**Triggered by:** User request — migrate completed LP from dc-growth-system repo to b8e-lab as `/dc-guide.html`
**Mode used:** Implementer

### Changes

- `dc-guide.html`: Ported from `dc-growth-system/lp/vercel-ready/dc-guide.html`. Changes from source: image paths updated to `/assets/dc/` (3 places); CTA `href="/contact"` changed to `mailto:contact@b8e.co.jp` (2 places); footer nav updated to match b8e-lab nav structure (TOP/DX支援/企業型DC/Academy/About/お問い合わせ); Vercel Insights script added; residual `<!-- VERCEL: -->` migration comments removed. Global `style.css` is intentionally NOT linked — the page uses its own complete design system to avoid CSS conflicts.

- `assets/dc/`: New directory. Three images copied from dc-growth-system (img-01-asset-flow.png 1.4MB, img-02-social-insurance.png 1.9MB, img-03-welfare.png 2.3MB).

- `dc.html`: Added `.guide-link-block` section (CSS in inline `<style>`) between FAQ and quiet-cta. Points to `/dc-guide.html`. Navigation flow: dc.html（思想・入口）→ dc-guide.html（制度整理LP）→ contact.

### Philosophy notes
dc-guide.html is a standalone LP with its own design language — it does not inherit B8E's site-wide CSS. The connection to the site is maintained through the header back-link (`← 企業型DCについて`) and footer navigation.

### Deployed
[x] Yes — commit: add dc-guide landing page to b8e site
[ ] No — PR pending review

---

## 2026-05-21 — Fix dc-guide SP table and Formspree contact flow

**Scope:** `dc-guide.html` only
**Triggered by:** Vercel Preview review — compare table was horizontally scrolling on SP; CTA used mailto which fails on PC browsers
**Mode used:** Implementer

### Changes

- `dc-guide.html` CSS: Added `.compare-cards` section (hidden by default). Added `@media (max-width: 768px)` block that hides `.table-scroll` and shows `.compare-cards` as flex column of 3 cards (NISA / iDeCo / 企業型DC). 企業型DC card gets `border-color: var(--gold)` and gold header for light emphasis without being sales-heavy. Added `.dc-contact-form` section with B8E-style form (transparent inputs, bottom-border only, gold focus ring, text-link submit button).

- `dc-guide.html` HTML: Added `.compare-cards` block (3 `.ccard` elements) immediately after `.table-scroll`. Replaced 2 `<a class="cta-btn-*" href="mailto:...">` buttons + `.cta-promises` + `.cta-flow` with a Formspree `<form>` (action `https://formspree.io/f/mykleakb`, `_next` → `https://b8e.co.jp/thanks.html`) + `.cta-note` text. Fields: name（任意）/ email（必須）/ message（任意）. Submit: 「少し話してみる」.

### Philosophy notes
The form now matches the B8E site's existing contact experience — transparent inputs, bottom border, text-link submit. The DC card in the comparison carries emphasis through a gold border, not a sales badge. The change removes the mailto fallback that broke desktop browser flows.

### Deployed
[x] Yes — commit: fix dc guide mobile table and formspree contact flow
[ ] No — PR pending review

---

## 2026-05-21 — Consolidate DC contact form into dc-guide page

**Scope:** `dc.html` only
**Triggered by:** User request — duplicate contact forms on dc.html and dc-guide.html; consolidate to dc-guide.html as single contact point
**Mode used:** Implementer

### Changes

- `dc.html`: Removed the `<!-- Quiet CTA — improved -->` block (Formspree `<form>`, `.form-note`, `.contact-form`). Updated `<!-- Guide link -->` block to become the sole CTA at the page end — new text: "制度の詳細・比較・問い合わせフォームは、こちらに整理しています。" / link text: "企業型DCについて、もう少し整理してみる →" / href: `/dc-guide.html`. Role split: dc.html = empathy/entry point; dc-guide.html = detail + FAQ + contact form.

### Philosophy notes
A single contact form on dc-guide.html keeps the entry page (dc.html) as a pure reading experience — no form pressure, no decision moment. The guide page receives readers who are already curious.

### Deployed
[x] Yes — commit: consolidate dc contact form into guide page
[ ] No — PR pending review

---

## 2026-05-21 — Simplify dc entry page and guide flow

**Scope:** `dc.html` (complete rewrite of content; structure retained)
**Triggered by:** User request — dc.html was too long to reach the CTA; FAQ/detail sections belong in dc-guide.html; entry page should create natural pull to dc-guide.html
**Mode used:** Implementer

### Changes

- `dc.html`: Complete content restructure. **Removed:** FAQ section (5 Q&As + JSON-LD), all three resonance-question/section-block explanation blocks ("足元という問い", "問いのそばに在ること", "たとえば、こんな感覚。"), the detailed page-intro paragraphs. **Added:** New hero copy ("会社のことを、考え続けている。自分のことは、後回しになっていないか。") focused on owner's own future. Shortened page-intro to 2 paragraphs. CTA #1 (`dc-cta-inline`) placed immediately after page-intro. New `section-block` with 2-sentence 企業型DC intro. New `dc-benefits` grid (3 items: 社長自身の将来準備 / 社会保険料の見直し / 福利厚生・採用力). CTA #2 (`guide-link-block`) at page end. Both CTAs link to `/dc-guide.html` with text "制度の概要を見てみる →". **CSS:** Replaced FAQ/quiet-cta/resonance inline styles with `.dc-benefits` grid + `.dc-cta-inline` wrapper. Page reduced from 299 → 244 lines; content depth ≈ 3–4 scrolls on PC.

### Philosophy notes
The entry page no longer asks the reader to decide or engage — it creates recognition ("自分のことかも") and opens a door. The detail, comparison, and contact live in dc-guide.html. Two CTAs give early leavers and full readers the same access point.

### Deployed
[x] Yes — commit: simplify dc entry page and guide flow
[ ] No — PR pending review

---

## 2026-05-21 — Refine dc pages spacing, tone, and readability

**Scope:** `dc.html`, `dc-guide.html`
**Triggered by:** User request — temperature/tone adjustment after structural simplification; focus on quietness, whitespace, and reduced information pressure
**Mode used:** Implementer

### Changes

**dc.html:**
- Hero background: warm dark (`#1c1a17→#111010` + warm amber radial) → deep quiet navy (`#182038→#0c1020` + faint cool-blue radial at 0.03 opacity). Removes "金融LP感", adds "経営者コラム感".
- CTA text × 2: "制度の概要を見てみる →" → "制度の概要を見る →". Lighter action weight.

**dc-guide.html CSS (spacing/rhythm):**
- `.section padding`: `120px 0` → `136px 0` (more inter-section air)
- `.hero__story gap`: `28px` → `40px`; `line-height`: `2.35` → `2.55`
- `.editorial line-height`: `2.15` → `2.35`; `p+p margin-top`: `1.6em` → `2em`
- `.empathy-intro margin-bottom`: `36px` → `52px`; `line-height`: `2.1` → `2.35`
- `.empathy-close margin-top`: `44px` → `60px`; added `line-height: 2.35`
- `.empathy-accent margin-top`: `52px` → `68px`; `padding`: `28px 32px` → `32px 36px`
- `.pre-diagram margin`: `60px 0 28px` → `84px 0 36px`

**dc-guide.html HTML (content lightening):**
- Hero story: 3 paragraphs + divider → 2 paragraphs. Removed `.hero__divider`.
- Hero note: shortened from 2 sentences to 1.
- Empathy intro: 3-line → 2-line version.
- Empathy close: 3-line → 2-line version.
- Editorial (WHAT IS DC): 3 paragraphs → 2 (merged 2nd and 3rd).
- Pre-diagram text: 2 sentences → 1.
- Mid-CTA link: "自社に合うかどうか、一度話を聞いてみる →" → "少し話してみる →".

### Philosophy notes
Tone refinement rather than structure change. Every spacing/content edit removes one unit of pressure from the reader. The hero background shift from warm-dark to deep navy aligns the entry page with 企業型DC's trusted/institutional feel without introducing "金融営業" energy.

### Deployed
[ ] Yes — commit: refine dc pages spacing tone and readability
[x] No — PR pending review

---

## 2026-05-24 — TOP copy update: 30年近く + AI時代/個人次元の追加

**Scope:** `index.html`, `dx.html`
**Triggered by:** User request — ① "28年間" を経年変化しない表現へ変更、② DX支援説明にtoC（個人）次元を自然に追加し「技術と人の可能性をつなぐ存在」として伝わるよう整える
**Mode used:** Implementer

### Changes

- `index.html`: Philosophy paragraph 1 — "28年間、組織が動く瞬間を、見てきました。" → "30年近くにわたり、IT・DXの現場で培ってきた経験をもとに、/ 組織が動く瞬間を見てきました。" 具体的な年数ではなく経験の深みとフィールドを示す表現に変更。

- `index.html`: Philosophy paragraph 3 — "B8Eは、その問いのそばに在る場所です。" → "B8Eは、その問いのそばに在る場所です。/ 組織にも、一人ひとりにも。" toB/toC両面への在り方を一行で加筆。

- `dx.html`: 新 `section-block` "AIの時代と、人の問い" を「外側の変容と内側の状態」セクションの直後に追加。AIが日常に入る時代における組織と個人の問いの共鳴を描き、B8Eが個人の可能性を開く場にも関わることを自然に伝える。

### Philosophy notes
「技術と人の可能性をつなぐ存在」という自己認識が、コピー上で初めて明示された。ただし断言するのではなく、読み手が感じ取れるように書かれている。年数の固定化という実務上の課題も解消。

### Deployed
[x] Yes — commit: content: update top copy 30years and ai era individual dimension
[ ] No — PR pending review

---

## 2026-06-09 — TOPページ細部改善：活動領域・対象者・Entry Points入口感

**Scope:** `index.html`, `style.css`
**Triggered by:** User request — Whatセクションの活動領域タグ追加、Three Pathsへの対象者文追加、Entry Pointsのhover改善、営業抑制文の文言柔軟化、Track Record→Entry Points橋渡し文追加

### Changes

- `index.html`: What セクション末尾に `.what-domains`（DX支援・IT推進 / 企業型DC・制度設計 / 人材育成・内面探究）の3タグを追加。Three Paths各カードに `.path-target`（対象者1行）を追加。Track Record末尾に `.track-bridge` の橋渡し段落を追加。Contact の `.form-notice` 文言を柔らかく改訂。

- `style.css`: `.what-domain`（枠線タグ、border付き小テキスト）、`.path-card .path-target`（#999 対象者テキスト）、`.entry-item` hover状態（`.entry-question` → #333、リンク → #7a5f44）、`.track-bridge` を追加。

### Philosophy notes
活動領域を「タグ」として置くことで、説明文を読まなくても一瞬で活動分野が把握できるようになった。対象者文と hover 改善は、読者の「自分のことかも」という認識を静かに促す。

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-06-09 — TOPページ全面改訂：静かな会社案内の入口へ

**Scope:** `index.html`, `style.css`, `scroll.js`
**Triggered by:** User request — 「思想作品」から「静かな会社案内の入口」へ。初見の人にB8Eが何をしている会社かが伝わるようにしたい。

### Changes

- `index.html`: 全面再構成。旧: Hero → Philosophy → Two Questions → Paths → Contact。新: Hero → What → Three Paths → Philosophy → Track Record → Entry Points → Contact。Two Questionsセクション削除。Pathsカードの詩的コピーを説明的な文言へ変更。Philosophyセクションを後半へ移動し新コピーへ更新。Track Record（10+/50+/50+の実績数字）とEntry Points（目的別4リンク）を新規追加。ContactフォームにhoneypotフィールドとSPAM抑制文を追加。meta descriptionを追加。

- `style.css`: セクション19を追加。`.section-label`（共通小見出しラベル）、`.what-block`/`.what-inner`（B8Eとはブロック）、`.paths-sub`（Paths副コピー）、`.track-record`/`.track-stat`系（実績セクション）、`.entry-points`/`.entry-item`/`.entry-question`系（目的別導線）、`.form-notice`（フォーム前注意書き）を定義。SP対応のmedia queryを含む。

- `scroll.js`: fadein対象セレクタに `.what-inner`, `.track-record-inner`, `.entry-points-inner` を追加。

### Philosophy notes
「何をしている会社か」を最初のコンテンツセクションで明示しつつ、詩的な哲学テキストを後半（Philosophy）に温存。Entry Pointsの設置により、初見の読者が迷わず次のページへ進める導線ができた。B8Eの静けさと余白はそのまま保っている。

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---

## 2026-05-24 — About ページリニューアル：WHY→HISTORY→WHAT構成へ

**Scope:** `about.html`
**Triggered by:** User request — 「会社概要ページ」から「B8Eは何を大切にしている存在なのか」が自然に伝わるページへ進化させる。"技術と人の可能性をつなぐ存在"という現在地を静かに伝える。
**Mode used:** Implementer

### Changes

- `about.html`: **meta description 追加** — "B8Eは、技術と人の可能性をつなぐ場所です。"

- `about.html` **page-intro（WHY）**: "ITとプロジェクトマネジメントの現場に、28年間いました。" → "30年近くにわたり、IT・DXの現場で培ってきた経験の中で、ずっとひとつの問いがありました。" に変更。余分な経歴紹介パラグラフを削除し、WHYの問い（なぜ人は戻ってしまうのか）→確信（外側と内側が同時に動くとき）への流れに絞った。

- `about.html` **新 section-block「積み重ねてきたもの」（HISTORY）**: NTTデータ（1997年入社・超大規模PJ・PM・QA視点）→ 中小企業4社（業務改善・IT化・DX化・経営感覚）→ B8E起業（2015年・11年目）を段落で繋ぐ。末尾に `.about-stats` グリッドで「11年目」「50+企業支援」「50+開発PJ」の数字を amber accent で静かに表示。

- `about.html` **新 section-block「AIの時代と、人の可能性」**: AI時代における組織・個人双方の問い→「技術は、人の可能性をひらくためにある」という確信へ。B8Eの現在地を明示する。

- `about.html` **section-block「なぜ、この三つが一つの場所にあるのか」**: pillar label を "DX支援" → "DX支援 / PJ推進" へ更新。会社情報の事業説明に "PJ推進支援" を追加。

- `about.html` **inline CSS**: `.about-stats`（3列グリッド）/ `.about-stat` / `.about-stat__num`（amber 1.5rem）/ `.about-stat__label` を追加。SP: 2列表示（`repeat(2, 1fr)`）。CSS内の整理（コメント補完、順序統一）。

### Philosophy notes
経歴が「履歴書」ではなく「問いの旅程」として語られるようになった。NTTデータ→中小企業→起業という時間軸が、現在の思想（変容は外側と内側が同時に）へ自然に接続している。数字（11年・50+）は主張ではなく、文脈の中で静かに存在する。

### Deployed
[ ] Yes — commit: content: renew about page WHY-HISTORY-WHAT structure
[x] No — PR pending review

---

## 2026-06-09 — About ページ全面再設計：「創業者の問いの旅」構成へ

**Scope:** `about.html`, `index.html`, `style.css`
**Triggered by:** User request — About と TOP の役割重複を解消。About を「会社概要」から「問いの旅程」へ。Aboutページは静かな旅として機能させ、TOPは入口に徹する。
**Mode used:** Implementer

### Changes

- `about.html`: 全面再構成。旧: about-stats グリッド（数字3列）・three-pillars グリッドを削除。新: 9セクション構成（Hero「一人の問いが、場所になった。」/ page-intro「問い」/ section-block「積み重ねてきたもの」/ 「転換」/ 「なぜ三つが一つの場所に」/ 「AIの時代と、人の可能性」/ 「BEAT EIGHT EMOTION」/ 「B8Eとして在るということ」/ 「会社情報」）。グリッドを排除し、すべてテキストによる旅程として再構成。inline CSS を about-hero のみに整理。モバイルブレークポイントを 640px → 768px に統一。

- `index.html`: Philosophy セクション末尾に `.philosophy-about`（Aboutへの静かな誘導リンク）を追加。「この問いの旅について、もう少し読んでみたい方は — About」

- `style.css`: `.philosophy-about`（margin-top: 36px、color: #aaa、font-size: 0.85rem）と `.philosophy-about a`（amber accent + hover）を追加。

### Philosophy notes
About は「会社紹介」ではなく、創業者が30年かけてたどり着いた問いの旅程として機能するようになった。TOP で「問いのそばに在る場所」と伝え、About でその旅の全体像が静かに語られる。TOPの哲学テキストとAboutの旅程は、重複ではなく層になっている。

### Deployed
[ ] Yes — commit: (pending)
[x] No — local

---
