# Site Structure

> Current state of the b8e-lab website as deployed to https://www.b8e.co.jp/ via GitHub + Vercel.
>
> Academy 配下のページ構成・Notion Knowledge Architecture との対応・実装状況は「Academy Site Map」以降を参照。Dreamin' Spiral Academy の Notion 側構造は [dreamin-spiral-core/docs/06_implementations/academy-knowledge-architecture.md](https://github.com/eight-takuya/dreamin-spiral-core/blob/main/docs/06_implementations/academy-knowledge-architecture.md) を正本とする。
>
> Community / Premium / Dreamin' Spiral オーナープログラムの提供内容（Offer）の正本は [dreamin-spiral-os/docs/repository-architecture/academy-offer-definition.md](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/repository-architecture/academy-offer-definition.md) とする。b8e-lab の LP は、この Offer Definition を反映する位置付けであり、提供内容を変更する際は正本を先に更新する。
>
> ※ OS 側 repository の現名称は **`dreamin-spiral-os`**（旧名 `dreamin-spiral-core`。旧名の URL は GitHub の redirect で引き続き到達する）。

---

## Top-level Pages

| File | URL path | Title | Role |
|---|---|---|---|
| `index.html` | `/` | B8E \| BEAT EIGHT EMOTION | Entry point. Philosophy first, paths second. |
| `dx.html` | `/dx` | DX支援 \| B8E | External transformation via DX consulting |
| `dc.html` | `/dc` | 企業型DC \| B8E | Financial foundation via corporate DC |
| `academy.html` | `/academy` | Dreamin' Spiral Academy \| B8E | Internal transformation via the Academy（Academy入口） |
| `about.html` | `/about` | About \| B8E | Founder's path, company identity, name meaning |

`dc-guide.html` は DC 領域の補助ページ（本ドキュメントの調査対象外。Academy とは無関係）。

---

## Academy の 3 つの入口（Web Architecture）

> Offer の正本は OS repo の [`academy-offer-definition.md`](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/repository-architecture/academy-offer-definition.md)（§0・§3・§6）。
> 本節はそれを **b8e-lab の Web 構造としてどう扱うか**の正本であり、提供内容そのものを定義しない。
> 実装の進め方（Phase A〜F / Owner Review Gate 1〜3）は同 repo の [`owner-program-web-implementation-plan.md`](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/repository-architecture/owner-program-web-implementation-plan.md)。

Dreamin' Spiral Academy には、**3 つの独立した入口**がある。

| 入口 | 質感（一言） | Web 上の現在地 |
|---|---|---|
| **Community** | 気づき・つながりが育つ場 | `academy/community.html`（✅ 公開中） |
| **Premium** | メンターとともに、自分の質感や本命の未来を深め、育てていく伴走 | `academy/premium.html`（✅ 公開中） |
| **Dreamin' Spiral オーナープログラム** | 自分自身がオーナーとして立ち、AI とともに自分の事業・活動を仕組みにし、実装し、改善しながら育て続ける実践 | `academy/owner-program.html`（✅ **公開中**） |

### 構造上の拘束（Web 表現）

**3 つは上下関係ではない。順番でもない。ステップアップ型でもない。**

- 3 つを**横並び・対等**な関係として扱う
- 次のような段階・矢印の構造で表現しない

```
❌ Community → Premium → オーナープログラム
❌ Community ↓ Premium ↓ オーナープログラム
```

- `Community → Premium` と進む人もいれば、`オーナープログラム → Premium` と進む人もいる。1 つだけを使う人もいる
- どれも入口になれる。順番は本人の現在地が決める

### 入口の質感（基本表現）

> 今の自分に合うところから、どこからでも始められる。

3 入口を並べるすべての箇所（`academy.html`・`academy/program.html`・各 LP）で、この質感を基本とする。

### HP / LP Communication Principle — 入口は広く、奥は深く

**抽象度をできるだけ下げ、入口を広くする。** 思想を薄めるのではなく、入口では日常語・具体語へ翻訳し、
読み進めるほど背景の構造・思想が自然に見えてくる設計とする。公開ページの情報設計はこの順で組む。

```
具体 → 理解 → 共感 → 構造 → 思想
```

**ファーストビューでは抽象語を前面に出しすぎない。** 情報空間／現実創造／OS Architecture 等の
抽象的な語の大量提示から始めない。まず「何をするものなのか」が初見で分かるところから始める。

オーナープログラムの想定する中心表現（確定コピーではなく方向性）:

> 自分がオーナーとなり、AI と一緒に事業の仕組みをつくる。

これは既存の [`writing-principles.md`](writing-principles.md)（短い文・問いで開く・ブローシャーにしない）と併存する。
文体の正本は writing-principles、**情報の出し順**の正本が本節。

### 用語表記

| 原則 | 表記 |
|---|---|
| 日本人向け公開ページでは日本で一般的・直感的な表記を使う | `Mentor` ではなく **メンター** |
| 3 者の役割名はカタカナ | **オーナー（意思決定役）／アーキテクト（設計役）／エンジニア（実装役）** |
| プログラム名は日本語主表記 | **Dreamin' Spiral オーナープログラム**（英語単独表記を主にしない） |
| 対象者 | 職種を機械的に大量列挙しない |

### CTA 方針（現時点）

| 項目 | 方針 |
|---|---|
| **主 CTA** | **当面は無料ガイドセッション**（`academy/session.html`）。オーナープログラム専用の申込システムは作らない |
| 申込導線 | Community / Premium は既存の専用申込ページ（Stripe）を維持。オーナープログラムは専用申込を持たない |

### Public / Private 境界

**b8e-lab は Public repository である。** 次を b8e-lab（HTML・docs いずれも）へ置かない。

- 未確定の**料金**
- 未確定の**詳細な提供条件**（セッション回数・チャット対応範囲・教材数・保証内容など）
- 内部戦略・内部検討・内部思想ドラフト
- OS 側 Offer Definition の Private 情報（公開前提でない対象者情報を含む）

**期間について（2026-08-31 Owner 決定）:** オーナープログラムの**提供期間 6 か月は公開情報**として LP へ記載する。
**料金は引き続き非公開。**

**OS 側 Offer 正本へ反映済み**（2026-08-31・OS repo PR #145 merge）。
`academy-offer-definition.md` §3-6「期間 —— 原則 6 か月の伴走」が正本。
**「6 か月で完全に自立できることを保証する」という意味ではない**旨も同節に明記されている。

**反映順序:** OS repo の Offer Definition（Private 正本）→ 本書ほか b8e-lab 設計文書 → HP / LP 実装。

### 既存ページとの差分（未整合として記録）

| 箇所 | 対応 | 実施 Phase |
|---|---|---|
| `academy/program.html`「関わり方の違い」 | **「3つの入口」へ改稿済み。**「どれが上でも下でもありません。順番でもありません。今の自分に合う入口が、よい入口です」。オーナープログラムの `program-plan` ブロックを追加（Community / Premium と同じ体裁） | ✅ 公開済み |
| `academy/program.html` の `<meta name="description">` / `og:description` | **「三つの入口」へ更新済み** | ✅ 公開済み |
| `academy.html` | **「3つの入口」section を追加済み**（`Academyが支援しないこと` と Quiet CTA の間）。3 つを `.offer-list` に対等に並べ、`.academy-nav-links` から各ページへ | ✅ 公開済み |
| `/academy/owner-program.html` | **`academy.html` / `academy/program.html` から導線接続済み** | ✅ 公開済み |
| `academy/program.html` の Journey Map `.journey-fork` | **3 分岐へ整合済み。**`仕組みにする`（オーナープログラム）を追加し、`.journey-fork` を **flex → `grid-template-columns: repeat(3, 1fr)`** へ変更。**2+1 の折り返しが構造的に起こらない**。600px 以下は 1 カラム | ✅ 公開済み |
| オーナープログラム専用 OGP | **作成済み。**Master PPTX の **Slide 13**（Slide 07 Premium の複製 + タイトル / サブコピー差し替え）から `generated/owner-program.png`（1200×630）を生成し `og:image` へ反映 | ✅ 公開済み |
| `generated/program.png` の OGP サブコピー | **追随更新済み。**`Community と Premium、二つの関わり方。` → `三つの入口から、今の自分に合う形で。`（Slide 05 のテキストのみ変更） | ✅ 公開済み |
| global nav | **未変更**（オーナープログラムの単独追加は行わない）。まず Academy 内導線として公開する | ⏸ 意図的 |

**2026-08-31 に本番公開済み**（Gate 3 Owner 承認 → PR #82 merge → Vercel Production）。
`academy.html` と `academy/program.html` から `academy/owner-program.html` へリンクしている。
一方、**global nav・footer・`academy/session.html`・`academy/community.html`・`academy/premium.html`・
`index.html`・`scroll.js` は変更していない。** global nav へのオーナープログラム単独追加は行わず、
Academy 内導線としての公開に留めている（追加の要否は今後 Owner が判断する）。

---

## Academy Site Map

`academy.html` を入口として、`academy/` 配下にプログラム紹介・導線ページが存在する。

**訂正（実URLで検証済み）:** 本サイトは `vercel.json` を持たず、Vercel の Clean URLs は有効になっていない。全ページ **`.html` 拡張子付きのURLでのみ実在**する（例: `academy.html` → 実在するのは `https://www.b8e.co.jp/academy.html`。`https://www.b8e.co.jp/academy` は404）。以下は実際にHTTPアクセスして確認した実URL。

```
https://www.b8e.co.jp/academy.html                    Academy入口（世界観・Program への導線）
├─ /academy/program.html          実践の形（Academy 全体の Journey Map・体験マップ）
├─ /academy/library.html          人生再起動ガイド（#guide＝知る / #library＝深める）
│   └─ /academy/pdf/*.pdf                              PDF実体（7件。うち1件はarchiveと重複）
├─ /academy/session.html          無料ガイドセッション（対話の入口。#apply に申込フォーム内蔵）
├─ /academy/thanks.html           届きました（Session フォーム送信後のサンクスページ）
├─ /academy/community.html        Community LP（提供内容・申込導線）
│   ├─ /academy/community-apply.html    Community 専用申込（Stripe）
│   └─ /academy/community-success.html  決済後の案内（noindex）
├─ /academy/premium.html          Premium LP（提供内容・申込導線）
│   ├─ /academy/premium-apply.html      Premium 専用申込（Stripe）
│   └─ /academy/premium-success.html    決済後の案内（noindex）
├─ /academy/owner-program.html    Dreamin' Spiral オーナープログラム LP（academy.html / program.html から到達可能）
├─ /academy/apply.html            旧共通 Apply。現在は入口の案内ページ（noindex）
└─ /academy/premium-portal.html   Premium Client Portal Prototype（契約後マイページの原型）
```

**役割の再整理（2026年7月）:** 当初 `academy/community.html` と `academy/premium.html` はどちらも「Client My Page の作成途中版」として扱っていたが、その後の LP 再構築（PR #66 / #68）と Journey 再設計（PR #69）により、**両ページは公開 LP（提供内容の紹介＋申込導線）として再定義された**。契約後マイページの役割は `academy/premium-portal.html` が担う。

- `academy/community.html` — **Community LP**。提供内容（Offer Definition 準拠）と Community 専用申込への導線を持つ
- `academy/premium.html` — **Premium LP**。提供内容（Offer Definition 準拠）と Premium 専用申込への導線を持つ
- `academy/premium-portal.html` — **Premium Client Portal Prototype**。対象は契約者・受講者。サイト内のどこからもリンクされていない（意図的）

### 現在の導線（実際にクリックして辿れる経路）

Journey 再設計（PR #69）以降の構成。Program を地図として、各ページ下部の文脈リンクで進む。

```
academy.html
  ├→ academy/program.html          （主導線・Academy の歩き方）
  ├→ academy/library.html#guide
  └→ academy/session.html

academy/program.html               （Journey Map：知る→深める→話す→共に育つ/個別に伴走）
  ├→ academy/library.html#guide / #library
  ├→ academy/session.html?from=program
  ├→ academy/community.html
  ├→ academy/premium.html
  └→ LINE（外部）

academy/library.html
  ├→ academy/session.html?from=library   （主導線）
  └→ academy/program.html

academy/session.html
  ├→ #apply（Formspree フォーム）→ academy/thanks.html
  ├→ academy/community.html / academy/premium.html / academy/library.html#library（セッションのあとに）
  └→ LINE（外部）

academy/community.html
  ├→ academy/community-apply.html        （主導線）→ Stripe Checkout（外部）→ community-success.html
  ├→ academy/session.html?from=community
  └→ academy/program.html                （Premium との比較）

academy/premium.html
  ├→ academy/premium-apply.html          （主導線）→ Stripe Checkout（外部）→ premium-success.html
  ├→ academy/session.html?from=premium
  └→ academy/program.html                （Community との比較）

academy/apply.html                 ← 旧 URL 維持のための案内ページ（noindex）
  └→ program.html / community-apply.html / premium-apply.html / session.html?from=apply#apply

academy/premium-portal.html        ← どこからもリンクされていない（Client Portal Prototype・意図的）
```

**Formspree連携:** `academy/session.html` の `#apply` セクションのフォーム（`action="https://formspree.io/f/xgoqybbl"`）は送信後 `https://www.b8e.co.jp/academy/thanks.html` にリダイレクトする（`_next` hidden field）。**PR #70 で `apply.html` から `session.html` へ移設した。** Session への流入元は `?from=` を hidden 項目へ記録する（[academy-session-form-tracking.md](academy-session-form-tracking.md)）。

**Stripe決済:** Stripe Payment Link は `academy/community-apply.html`（Community）・`academy/premium-apply.html`（Premium）にそれぞれ1本ずつ配置されている。**PR #69 で `program.html` / `apply.html` から専用申込ページへ移設し、Community / Premium を再度選び直させる構造を解消した。** 決済後の案内は `community-success.html` / `premium-success.html`（Stripe 側のリダイレクト設定が前提）。商品説明文の正本は Offer Definition（冒頭注記参照）。

---

## Page Role

| Page | 役割 |
|---|---|
| `academy.html` | Academy入口。世界観と出会う。主導線は Program（Academy の歩き方） |
| `academy/program.html` | 実践の形。**Academy 全体の Journey Map（体験マップ）**。Guide / Library / Session / Community / Premium への入口を一続きの流れとして示す |
| `academy/session.html` | 無料ガイドセッション。対話の入口（営業面談ではない）。`#apply` に Formspree 申込フォームを内蔵 |
| `academy/apply.html` | 旧共通 Apply。**現在は入口の案内ページ（noindex）**。専用申込ページ・Session へ案内するのみ（[academy-apply-migration.md](academy-apply-migration.md)） |
| `academy/thanks.html` | 届きました。Session フォーム送信後のサンクスページ |
| `academy/library.html` | 人生再起動ガイド。`#guide`＝知る（人生覚醒ガイド）/ `#library`＝深める（Prescriptions & Practices）。Library PDF（7件）の配布ページ |
| `academy/community.html` | **Community LP**。提供内容（Offer Definition 準拠の4項目）と Community 専用申込への導線。Premium の申込 CTA は置かない（比較は program.html へ） |
| `academy/community-apply.html` | **Community 専用申込ページ**。Stripe Payment Link・申込後の流れ・LINE |
| `academy/community-success.html` | Community 決済後の案内（noindex）。Stripe のリダイレクト先 |
| `academy/premium.html` | **Premium LP**。提供内容（Offer Definition 準拠の4項目）と Premium 専用申込への導線。Community の申込 CTA は置かない（比較は program.html へ） |
| `academy/premium-apply.html` | **Premium 専用申込ページ**。Stripe Payment Link・申込後の流れ・LINE |
| `academy/premium-success.html` | Premium 決済後の案内（noindex）。Stripe のリダイレクト先 |
| `academy/owner-program.html` | **Dreamin' Spiral オーナープログラム LP**。3 入口のうちオーナープログラムの詳細ページ。主 CTA は無料ガイドセッション（`session.html`）。**提供期間 6 か月は掲載・料金と詳細な提供条件は掲載しない**（Owner 決定 2026-08-31／料金は未確定）。`academy.html`「3つの入口」と `academy/program.html`「3つの入口」から到達できる |
| `academy/premium-portal.html` | **Premium Client Portal Prototype**。契約後マイページの原型。対象は契約者・受講者・個別伴走クライアント。受講者が現在地・今月のテーマ・教材・Journal・Next Sessionを確認する場所。外向けLPではなく、本番導線へ出す前の体験確認用Prototype（Next.js / Supabase / 認証 / per-member表示への育成を見据える） |

---

## Notion Architecture 対応

Dreamin' Spiral Academy の Notion Knowledge Architecture（`Fields > 🎓 Dreamin' Spiral Academy`）と、本サイトの実装ページの対応表。Notion側の構造は [academy-knowledge-architecture.md](https://github.com/eight-takuya/dreamin-spiral-core/blob/main/docs/06_implementations/academy-knowledge-architecture.md) を参照。

| Web Page | Notion配置場所 |
|---|---|
| `academy.html` | 🌐 Web / Platform > LP（Academy Top） |
| `academy/program.html` | 🌐 Web / Platform > LP（Program） |
| `academy/session.html` | 🌐 Web / Platform > LP（Session） |
| `academy/apply.html` | 🌐 Web / Platform > LP（Apply） |
| `academy/thanks.html` | 🌐 Web / Platform > LP（Thanks） |
| `academy/library.html` | 🌐 Web / Platform > LP（Library）※PDF実体7件は教材資産として 📚 Contents Library 側の棚卸し対象（本ドキュメントの調査対象外） |
| `academy/community.html` | 🌐 Web / Platform > **LP**（Community）※ 2026年7月に Client My Page から再分類。Notion側の実反映は未実施（フォローアップ要） |
| `academy/premium.html` | 🌐 Web / Platform > **LP**（Premium Program Preview）※ 2026年7月に Client My Page から再分類。Notion側の実反映は未実施（フォローアップ要） |
| `academy/premium-portal.html` | 🌐 Web / Platform > **Client My Page**（Premium Portal Prototype）※ 新規追加。Notion側の実反映は未実施（フォローアップ要） |
| （設計のみ・未実装） | 🌐 Web / Platform > Client My Page（Community Portal Design / Premium Portal Design） |

`academy/community.html` ・ `academy/premium.html` は、当初 🏫 Programs 側（各Programの紹介ページ）に対応すると考えていたが、実際には Client My Page の作成途中版であることが判明し、Notion側も Web / Platform > Client My Page 配下へ再配置した（2026年7月）。

**役割の再整理（2026年7月・追記）:** その後 `academy/premium-portal.html`（Premium Client Portal Prototype）を新設したことで、`academy/premium.html` は Client My Page ではなく **外向けPreview（LP）** として再定義した。さらに LP 再構築（PR #66 / #68）と Journey 再設計（PR #69）により、**`academy/community.html` も公開 LP として再定義された**（Client My Page 扱いではなくなった）。**これらの再分類は本ドキュメント上の整理のみで、Notion Knowledge Architecture 側（Web / Platform > LP / Client My Page の実際のブロック配置）へはまだ反映していない。** 次回Notion側整理の際に合わせて反映する。

**未反映のページ（2026-07-20 時点）:** `community-apply.html` / `premium-apply.html` / `community-success.html` / `premium-success.html` は上表に含めていない。Notion 側の配置は未決のため、次回 Notion 整理時に決定する。

Notion側との同期は `dreamin-spiral-core/scripts/notion-setup/sync-academy-existing-assets.js`（初回棚卸し）→ `rebuild-web-platform-toggles.js`（トグル構造化）→ `fix-web-platform-lp-clientmypage.js`（library.html追加・Community/Premium再配置）で実施済み（2026年7月）。上記の役割再整理はこのNotion反映より後に発生したため、次回同期対象。

---

## Status

| Page / 機能 | Status | 備考 |
|---|---|---|
| `academy.html` | ✅ Released | 本番稼働中 |
| `academy/program.html` | ✅ Released | 本番稼働中。参加導線ハブとして機能 |
| `academy/session.html` | ✅ Released | 本番稼働中。`#apply` に Formspree フォームを内蔵（PR #70 で apply.html から移設） |
| `academy/apply.html` | ✅ Released | 旧 URL 維持のための案内ページ（noindex）。申込機能は専用ページへ移設済み |
| `academy/thanks.html` | ✅ Released | 本番稼働中 |
| `academy/library.html` + PDF 7件 | ✅ Released | 本番稼働中 |
| Stripe Checkout連携（Community/Premium） | ✅ Released | `community-apply.html` / `premium-apply.html` に各1本（PR #69 で移設） |
| `academy/community.html`（Community LP） | ✅ Released | 本番稼働中。program.html から導線接続済み |
| `academy/premium.html`（Premium LP） | ✅ Released | 本番稼働中。program.html から導線接続済み |
| `academy/community-success.html` / `premium-success.html` | ✅ Released（ページとして） | 決済後の案内ページ。**Stripe 管理画面でのリダイレクト設定が前提**（未設定の場合は Stripe 標準の完了画面のまま） |
| `academy/premium-portal.html`（Premium Client Portal Prototype） | 🚧 Prototype | 8ブロック構成で実装済み。認証・DB・Next.jsなし。本番導線へは未接続（意図的） |
| Community/Premium Portal Design（設計ドキュメント） | ✅ Released（設計のみ） | `dreamin-spiral-core/docs/session-library/{community,premium}/portal/` に存在。実装（ログイン等）は別途 |
| Community / Premium Portal ページへの導線接続 | 📅 Planned | 未着手 |
| Client My Page（認証・ログイン機能） | 📅 Planned | 実装未着手 |
| `academy/owner-program.html`（オーナープログラム LP） | ✅ Released | 本番稼働中（2026-08-31 公開）。`academy.html` / `academy/program.html` から導線接続済み |
| `academy.html` / `academy/program.html` の 3 入口導線 | ✅ Released | 本番稼働中。Journey Map も 3 分岐（Desktop / Tablet 3 列 1 行・Mobile 1 列 3 行） |
| `generated/owner-program.png`（専用 OGP） | ✅ Released | 本番稼働中。Master Slide 13 から生成（1200×630） |

---

## Future

- **global nav へのオーナープログラム追加** — 現時点では行わない。Academy 内導線での公開後、必要性を Owner が判断する
- **オーナープログラム専用 OGP** — 現在は暫定で `generated/academy.png` を流用している。Master PPTX へ専用スライドを追加するかは Owner / Architect 判断事項（[academy-ogp-operation.md](academy-ogp-operation.md)）
- **既存 Academy ページの 3 入口整合** — `academy/program.html` の「二つの関わり方」（本文・meta description・OGP description）と `academy.html` を、Community / Premium / オーナープログラムの対等な 3 入口へ改稿する
- **Client My Page** — ログイン・マイページ機能。`academy/premium-portal.html` が Prototype として存在するが認証機能はない。Portal 設計ドキュメント（`community/portal/`・`premium/portal/`。Community側は認証アーキテクチャの設計を含む）も別途存在
- **Community / Premium Portal ページの導線接続** — 参加者が実際に辿り着けるよう、ログイン後の導線を設計する（`premium-portal.html` は現状どこからもリンクされていない）
- **Notion Knowledge Architecture への役割再整理の反映** — `academy/community.html` / `academy/premium.html`（LP再分類）・`academy/premium-portal.html`（Client My Page）に加え、`community-apply` / `premium-apply` / `community-success` / `premium-success` の配置を Notion側 Web / Platform 配下へ反映する
- **Premium Content の教材タイプ別表示検討** — Content01/02中心から Video / Audio / Workbook / Practice への再編成（`docs/improvement-log.md` 2026-07-06 参照）

---

## Stylesheet

| File | Role |
|---|---|
| `style.css` | Single shared stylesheet for all pages. No external dependencies. |

## Shared Script

| File | Role |
|---|---|
| `scroll.js` | IntersectionObserver によるスクロール時フェードイン演出。全ページ共通で読み込む。ルーティング・状態管理は行わない |

**Components について:** このリポジトリはフレームワーク（React/Vue等）を使わない静的HTMLサイトであり、再利用可能な「コンポーネント」システムは存在しない。ヘッダー・ナビゲーション・フッターは各HTMLファイルに個別に複製されている（テンプレート共通化は未導入）。

---

## Page Structure (all pages)

```
<header class="site-header">     — B8E wordmark + BEAT EIGHT EMOTION tagline
<nav class="site-nav">           — Links to all 5 pages; .current on active page
<main>
  [hero section]                 — Page-specific hero with dark background
  [page content]                 — .page-content wrapper (max-width: 720px)
    .page-intro                  — Opening paragraphs (philosophy-first)
    .section-block(s)            — Content sections separated by top border
    .resonance-questions         — Questions that mirror the reader's state
    .quiet-cta                   — Soft contact invitation
    .back-link                   — ← TOP (service pages only)
<footer class="site-footer">     — Brand, nav links, copyright
```

---

## CSS Class Reference

### Layout
| Class | Purpose |
|---|---|
| `.page-content` | Center column, max-width 720px, large padding |
| `.page-intro` | Opening text block, larger font, generous line-height |

### Sections
| Class | Purpose |
|---|---|
| `.section-block` | Content section with top border separator |
| `.resonance-questions` | Question list, mirrors reader's inner state |
| `.quiet-cta` | Contact invitation, text-link only, no button |
| `.back-link` | ← TOP link, appears after quiet-cta |

### TOP page only
| Class | Purpose |
|---|---|
| `.hero` | Full-width dark hero (TOP page) |
| `.philosophy` | White background text block |
| `.two-questions` | Two-column self-selection block |
| `.paths` | Three-column service path grid |
| `.path-card` | Individual path within paths grid |
| `.question-block` | Individual question within two-questions |

### Hero variants (service pages)
| Class | Purpose |
|---|---|
| `.dx-hero` | DX page hero |
| `.dc-hero` | DC page hero |
| `.academy-hero` | Academy page hero |
| `.about-hero` | About page hero |
| `.community-hero-title` / `.community-hero-copy` | Community page hero |
| `.premium-hero-title` / `.premium-hero-copy` | Premium page hero |

All hero variants share: dark background, `.hero-label` (small uppercase), `.hero-copy` (light weight, generous line-height).

### Footer
| Class | Purpose |
|---|---|
| `.site-footer` | Dark footer wrapper |
| `.site-footer-inner` | Two-column grid: brand + nav |
| `.footer-brand` | Company name + one-line description |
| `.footer-links` | Column of page links |
| `.footer-bottom` | Copyright line |

---

## Navigation Completeness

All 5 top-level pages must appear in both the `<nav>` and the footer `<nav>`:
- TOP
- DX支援
- 企業型DC
- Dreamin' Spiral Academy
- About
- お問い合わせ (mailto link, footer only)

**Academy 配下の扱い:** Academy 配下の詳細ページはグローバルナビには並べず、`academy/program.html`（Journey Map）と各ページ下部の文脈リンクで辿る構成とする（PR #69）。`academy/community.html` / `academy/premium.html` は program.html から到達可能で、孤立ページではない。

**既知のギャップ:** `academy/premium-portal.html`（Client Portal Prototype）は、契約者向けのため意図的にどこからもリンクされていない。

---

## Deployment

- **Repository**: GitHub (`main` branch)
- **Hosting**: Vercel (auto-deploys on push to `main`)
- **Live URL**: https://www.b8e.co.jp/
- **本番ドメインの実装先:** `academy/apply.html` のフォーム送信先（Formspreeの `_next` パラメータ）が `https://www.b8e.co.jp/academy/thanks.html` を指しており、本リポジトリの実装が現在の本番ドメインで稼働していることを確認済み（旧版のこのドキュメントにあった「現行の www.b8e.co.jp はWixで別運用」という記述は事実確認により削除した）
