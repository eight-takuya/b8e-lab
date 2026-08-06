# Dreamin' Spiral Academy Journey 再設計計画

> 2026-07-19 現状調査に基づく。思想・定義の正本は dreamin'-spiral-core（Single Source of Truth）。
> 本計画は Web 上の体験（導線・構造）の再設計のみを扱い、新しい思想・定義は追加しない。

## 1. 現在のページ構造

| ページ | 役割（現状） | 備考 |
|---|---|---|
| /academy.html | Academy 入口（世界観・こんな方へ・支援しないこと） | Hero「外側が変わるほど、自分の中心が大切になる。」 |
| /academy/program.html | 「実践の形」— Community / Premium の2つの関わり方紹介 | Journey 全体像はない |
| /academy/library.html | **Guide + Library 兼用**（hero label は "Guide"） | 人生覚醒ガイド（Featured）+ 処方箋・実践 PDF 6本 |
| /academy/session.html | 無料ガイドセッション（約45分・1対1・Zoom・無料） | 申込は LINE と apply.html#consult |
| /academy/community.html | Community 紹介 | 申込は apply.html#community |
| /academy/premium.html | Premium 紹介 | 申込は apply.html#premium |
| /academy/apply.html | **共通 Apply**（Community / Premium / 相談 の3分岐） | Stripe ×2 + Formspree フォーム |
| /academy/thanks.html | フォーム送信後 | Formspree _next |
| /academy/premium-portal.html | Premium 会員用ポータル | 今回対象外 |

Guide 専用ページは存在しない（library.html が Guide を内包）。

## 2. 現在の内部リンク構造

- academy → program（実践の形を見る）/ library（ガイドを読んでみる）/ session（少し話してみる）— 主導線が並列
- program → community / premium / **apply** / session / library（CTA 5本・Journey 表現なし）
- library → session（最初の対話へ）/ program（継続の形を知る）
- session → LINE / **apply#consult** / program
- community → **apply#community** / **apply#consult** / **premium**（申込と Premium CTA が同居）
- premium → **apply#premium** / **apply#consult** / **community**（同上）
- グローバルナビ・フッターは全ページ統一済み（Academy 配下ページはナビに並べていない）

## 3. 現在の Apply 構造

apply.html 1ページに集約:
- #community — Stripe: `https://buy.stripe.com/28E8wJe6MftWdGScEk0x205`
- #premium — Stripe: `https://buy.stripe.com/9B6bIV8Ms0z29qCbAg0x204`
- #consult — session への案内 + Formspree `https://formspree.io/f/xgoqybbl`（_next: /academy/thanks.html）
- LINE: `https://lin.ee/wP4UfPR`（全ページ共通・QR `assets/line-qr-black.png`）

## 4. 現在の課題

1. Program が Community / Premium の2択紹介に留まり、Academy 全体の体験マップとして機能していない
2. Session の申込が共通 Apply（#consult）に依存し、対話の入口としての独立性が弱い
3. Library は導線自体は良いが、Guide（知る）と Library（深める）の2つの役割が構造上区別されていない
4. Community / Premium で一度サービスを選んだ後、apply.html で再び Community / Premium を選び直す**再分岐**が発生
5. Community / Premium の CTA 群に相互の申込導線が混在

## 5. 新しい Journey 構造

```
Academy（出会う）
  ↓
Program（歩き方の地図）
  ↓
Guide（知る）＝ library.html#guide
  ↓
Library（深める）＝ library.html#library
  ↓
Session（言葉にする）＝ session.html（#apply 申込内蔵）
  ↓
Community（共に育つ） または Premium（個別に伴走）
  ↓
community-apply.html ／ premium-apply.html（各専用 Apply）
  → 次の Spiral へ
```

全員が同順で進む必要はない。Program を地図として、各ページ下部の文脈リンクで現在地に合う入口を選べる。

## 6. 各ページの役割（再設計後）

| ページ | 役割 | 主導線（1〜2本） |
|---|---|---|
| academy.html | 世界観と出会う | **Program**（+補助: Guide / Session） |
| program.html | Journey の地図・体験マップ | 5つの入口（Guide / Library / Session / Community / Premium） |
| library.html | Guide（知る）+ Library（深める） | **Session**（+補助: Program） |
| session.html | 対話の入口・現在地を言葉にする（営業面談ではない） | **#apply（専用フォーム）**（+ LINE）。後続: Community / Premium / Library |
| community.html | Community の理解〜申込 | **community-apply.html**（+補助: Session。Premium は比較リンクのみ） |
| premium.html | Premium の理解〜申込 | **premium-apply.html**（+補助: Session。Community は比較リンクのみ） |
| community-apply.html（新規） | Community 専用申込（Stripe） | Stripe CTA |
| premium-apply.html（新規） | Premium 専用申込（Stripe） | Stripe CTA |
| apply.html | 旧共通 Apply → **案内ページ化** | Program + 各新導線への案内のみ |

## 7. Program の再設計方針

- 既存の「ここで実践すること」「関わり方の違い」「コミュニティ／プレミアム伴走」「今の自分を確認する」の文章は維持
- 新セクション「Academy の歩き方」を追加し、知る（Guide）→ 深める（Library）→ 話す（Session）→ 共に育つ（Community）／個別に伴走する（Premium）→ 次の Spiral へ、を静かな縦の Journey Map（新 CSS `.journey-map`）で表現
- ページ末尾 CTA を「今の自分に合う入口」5本（Guide を読む / Library を見る / Session で話す / Community を知る / Premium を知る）に整理し、apply.html への直行リンクを廃止
- 価格・機能の比較表は作らない

## 8. Session の新しい位置付け

- Library と Community / Premium の間をつなぐ「対話の入口」。営業面談ではないことを本文で明示（1文追加）
- 申込を Session ページ内 `#apply` セクションに内蔵（Formspree フォームを apply.html#consult から移設。フィールド・_next は無変更）
- セッション後の流れとして「共に続けたい → Community」「個別に伴走してほしい → Premium」「もう少し自分で考えたい → Library」を案内

## 9. Library の新しい位置付け

- 1ページのまま、`#guide`（人生覚醒ガイド＝知る）と `#library`（Prescriptions & Practices＝深める）のアンカーで2つの役割を構造化（ページ分割はしない — ページを増やさない方針）
- 下部導線: 「読んで、話してみたくなった方へ → Session」（主）/「全体の Journey を見直したい方へ → Program」（副）

## 10. Community 専用申込導線

community.html 下部 CTA「Community に参加する →」→ **community-apply.html**（Stripe リンク移設 + お申し込み後の流れ + LINE）。Premium の申込 CTA は同一画面に置かず、「Community と Premium の違い」セクション（→ program.html）を比較補助として維持。

## 11. Premium 専用申込導線

premium.html 下部 CTA「Premium 伴走を始める →」→ **premium-apply.html**（同上の構成）。Community の申込 CTA は置かず、「Community との違い」セクション（→ program.html）を維持。

## 12. URL 変更案

- 新規: `/academy/community-apply.html` `/academy/premium-apply.html`
- 既存 URL は全て維持（library.html にアンカー #guide / #library を追加）

## 13. Redirect 方針

- `/academy/apply.html` は URL を残し**案内ページ化**（Stripe・フォームは各専用ページへ移設。Program を主導線に、新しい各申込先を静かに案内）
- HTTP 301（vercel.json）の導入は今回見送り（vercel.json が存在せず、デプロイ設定の新規追加はスコープ外。Open Question へ）

## 14. 変更対象ファイル

academy.html / academy/program.html / academy/library.html / academy/session.html / academy/community.html / academy/premium.html / academy/apply.html / style.css

## 15. 新規作成候補ファイル

academy/community-apply.html / academy/premium-apply.html / docs/academy-journey-redesign-plan.md（本書）

## 16. 廃止候補ファイル

- なし（apply.html は廃止せず案内ページとして残す。完全廃止＝301 化は Open Question）

## 17. Open Questions

1. apply.html の将来（案内ページ維持 / vercel.json による 301 → program.html）
2. Guide を独立ページ（guide.html）へ分割するか（現状はアンカー方式。PDF が増えた時点で再検討）
3. Stripe 決済後の Success ページ新設（apply.html 内の既存 TODO コメントを community-apply / premium-apply へ引き継ぎ）
4. 新規2ページの OGP 画像（暫定で既存 apply.png を使用。専用画像は OGP Brand System 側で生成するか）
5. session の Formspree フォームに種別 hidden フィールド（type=guide-session 等）を追加するか（今回はフィールド無変更）
