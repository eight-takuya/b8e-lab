# Community Current Entrance v1 — 実装記録（b8e-lab）

> Dreamin' Spiral Community を Current Service として HP から申し込めるようにする Web 実装の記録（Phase 8）。
> **設計の正本（Owner Approved Design・Copy・Stripe Strategy）は OS repo `docs/repository-architecture/community-current-entrance-v1.md`。** 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **CLOSED（2026-09-16）。** Production 公開済み（PR #92 `462ca31`）・CTA は Current Community Live Payment Link・Owner Reality Review（Community Service Page画面 / Stripe Community Checkout画面）Approved。正本：OS repo `community-current-entrance-v1.md` §16 |
| 実装日 | 2026-09-16 |
| Branch | `feature/community-current-entrance-v1`（PR #92） |

## 1. New URLs

| URL | File | title | robots | canonical |
|---|---|---|---|---|
| `/dreamin-spiral/community/` | `dreamin-spiral/community/index.html` | Dreamin' Spiral Community \| B8E | index | `https://www.b8e.co.jp/dreamin-spiral/community/` |
| `/dreamin-spiral/community/complete/` | `dreamin-spiral/community/complete/index.html` | ご参加ありがとうございます \| Dreamin' Spiral Community \| B8E | noindex, follow | `https://www.b8e.co.jp/dreamin-spiral/community/complete/` |

- Guide / 3 Weeks / My Life と同じ `<dir>/index.html` 方式。実装前は 404 で route collision なし
- Header / Footer は Guide Service Page と完全一致。`style.css` の変更なし（既存 A11 / A12 を再利用）
- `sitemap.xml` / `robots.txt` / `vercel.json` は存在せず追加しない

## 2. Page 構造

**Community Service Page**

| Section | 内容 |
|---|---|
| Hero | Eyebrow / Title / Lead / CTA「Communityに参加する」 |
| 2 | 日常そのものを、一緒に見ていく。 |
| 3 | それぞれの人生を生きながら、共にいる。 |
| 4 内容 | 形式 オンライン（Zoom）／ Group Session 月1回 ／ 内容 Archive ・ Learning Resources ・ Community Portal ／ 料金 20,000円（税込）／月（`.ds-offer-summary`） |
| Final CTA | 日々を生きながら、共に気づいていく。＋ CTA |

- CTA 2 件：Current Community Stripe **Live** Payment Link `https://buy.stripe.com/28E4gt7IoftW8my5bS0x208`（`plink_1UGIUV8tXYwNlHqE2OJhlGvs`・月額 Subscription）
- Application Form / Formspree / 銀行振込は設けない

**Community Complete Page**：Hero「Communityへのご参加ありがとうございます。」／ 本文「お申し込み内容を確認後、Communityへの参加方法をご案内します。」（`.thanks-hero` / `.thanks-message`・Payment Foundation Complete Page と同じ構成）

Mobile で孤立文字が出ないよう、Hero Lead と Complete 本文の一部に既存 `.ds-phrase` を使用（文言は不変）。

## 3. TOP

Dreamin' Spiral Community に「詳しく見る」→ `/dreamin-spiral/community/` を追加（Guide / 3 Weeks / My Life と同じ markup・同じ色）。Copy は変更なし。Business Creation は変更なし。

## 4. Validation（ローカル静的配信で実測・2026-09-16）

| 項目 | 結果 |
|---|---|
| TOP | Guide / 3 Weeks / Community / My Life に「詳しく見る」（同色 `#9b7b5c`）。Business Creation は CTA なし |
| Community Service Page | h1 → h2 × 4 ・ Copy 一致 ・ 旧表記（Academy / Premium / 無料ガイドセッション）0 件 ・ 本文コントラスト 6.90 ・ Keyboard で CTA に `:focus-visible` ・ Mobile 375px 横スクロールなし |
| CTA | 2 件とも Live Payment Link（HTTP 200・Live Account の Payment Link を返すことを確認） |
| Community Complete Page | 見出し / 本文一致 ・ noindex ・ Current Header / Footer ・ 旧表記 0 件 ・ Mobile 横スクロールなし |
| Regression | Guide / 3 Weeks / My Life / Payment Foundation / `/academy/*` / `style.css` の差分 0 |

## 5. Temporary Coexistence

Phase 10 cleanup まで、Current Community Flow（`/dreamin-spiral/community/`）と Old Academy Community Flow（`/academy/community*.html`・旧 Payment Link）が一時併存する。旧 Flow は変更していない。
