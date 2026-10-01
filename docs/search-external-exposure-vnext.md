# Search & External Exposure Layer vNext

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**AI Creation Request:** ACR-20261001-017
**正本（Search Role ・ Query Intent ・ Title ／ Meta ・ OGP ・ Structured Data ・ Technical findings ・ Measurement Baseline）：** dreamin-spiral-os `docs/repository-architecture/search-external-exposure-v1.md`

本書は b8e-lab 側の実装記録。Search Intent = Page Meaning。本文 ・ H1 ・ Section 構成は変えていない。

## 変更した file

| file | 変更 |
|---|---|
| 9 target pages（`index.html` ・ `dreamin-spiral/index.html` ・ `guide` ・ `3-weeks` ・ `community` ・ `my-life` ・ `project-creation` ・ `business-creation` ・ `about.html`）| `<title>` ・ meta description ・ og:description（Social 用。Home ・ 6 Service ・ About）・ og:title（About のみ）・ twitter:title ／ description ／ image を追加（About は twitter:card も）・ JSON-LD |
| `dreamin-spiral/project-creation/index.html` ・ `business-creation/index.html` | 講師 ／ Partner の Profile の下に「中村琢八について見る」（→ About ・ 既存の Secondary link の見え方）|
| `assets/ogp/generated/about.png` ・ `assets/ogp/master/OGP_Template_Master.pptx` | Slide 03 のサブコピーを現行 Hero へ（`assets/ogp/README.md` Phase G）|
| `sitemap.xml` | lastmod を各 file の最終 commit 日へ（URL の追加 ・ 削除なし）|
| `vercel.json` | 旧サイトの URL で検索結果に残っているもの（404）のうち、現行の対応ページが明確なものだけ 308：`/academy` ・ `/academy/` → `/dreamin-spiral/`、`/scta` → `/legal/`、`/about` ・ `/about/` ・ `/about/mission/` → `/about.html` |

変更していない：本文 ・ H1 ・ Section 順 ・ Hero Copy ・ Offer ・ 価格 ・ Stripe ・ Legal ・ Terms ・ robots.txt（すでに正しい）・ URL 構造。

## Verification（ローカル）

- 9 ページ：title ・ description は unique（description 89〜136 文字）・ canonical は sitemap の URL と一致 ・ og:url = canonical ・ og:image の file あり ・ twitter 4 tag あり ・ H1 は main と同じ ・ head に旧 Offer ／ 旧日程（148,000 ・ 198,000 ・ Founding ・ 9月30日 ・ 10月1日 ・ 募集 ・ 第1期 ・ 受付終了）0 ・ 内部 link の切れ 0 ・ JSON-LD はすべて JSON として正しい
- `sitemap.xml` ・ `vercel.json` は構文として正しい
- 追加した link のある Project Creation ・ Business Creation、About を 375 ／ 1280 で overflow 0
