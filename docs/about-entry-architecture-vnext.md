# About Entry Architecture vNext

> **上位 Standard：** Web Entry Standard v1（dreamin-spiral-os `docs/repository-architecture/web-entry-standard-v1.md`）— 入口の Type ・ Strength ・ 表現の横断基準。本書はそのページ単位の具体。

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**Scope:** `about.html`（本文 ・ About 専用の inline style）
**AI Creation Request:** ACR-20261001-016

## Core Principle

「何者かを証明する About」ではなく、「この人と一緒にいる時間を想像できる About」。
Experience：Reality → Person → Story → Way of Seeing → Way of Being With People → Trust → Action。思想から始めない。

## Section 構造（11）

| # | Section | h | 内容 |
|---|---|---|---|
| 01 | Hero — Person | h1 | 指定 Copy（Headline ・ Lead 3 段 ・ BEAT EIGHT EMOTION株式会社 代表取締役 中村 琢八）＋ 本人の実写真。資格 ・ 実績 ・ Service CTA なし |
| 02 | Reality — Technology | h2 | 論理や構造 ・ 技術で創ること → 大きなシステムの Project → 小さな会社の現場 →「人」がいることへの気づき（年数 ・ 件数を出さない）|
| 03 | Turning Point | h2 | 既存の問い（外側を変えることはできる…また同じ場所に戻ってしまうのか）＋ 3 つの問い ＋ 心理 ・ 脳 ・ 身体 ・ 呼吸 ・ 意識 ＋「意識や現実について考える中で、量子論にも関心を持ちました。」 |
| 04 | Way of Seeing | h2 | Copy Direction ＋ 既存の「デジタルも、身体も、心も、本当は別々ではありません。」 |
| 05 | With People | h2 | 「こうすればいいですよ」より「今、何が起きているんだろう」・「あ、そういうことか」・ 関わり方の根っこは同じ（Service 名は出さない）|
| 06 | Technology | h2 | Copy Direction ＋ 既存の「デジタルが苦手だと思っていた人が…」 |
| 07 | Body & Daily Life | h2 | 既存 Public の呼吸 ・ 身体 ・ リンパケア ＋「私自身も、まだその途中にいます。」＋ 既存の「苦手だと思っていたことが、少し楽しくなる…」 |
| 08 | What I Do | h2 | 代表取締役 ・ Dreamin' Spiral 🌱 の運営 ・ AI・DX・Project の支援（DX支援 ・ PJ推進支援）・ 企業型DC の導入支援 ・ YouTube での発信 ・ 地域での活動 |
| 09 | Profile | h2 | 大学・大学院で情報工学 ・ NTTデータ ・ 中小企業4社 ・ 2015年創業 ・ IT業界歴25年以上 ＋ BEAT EIGHT EMOTION（名前の意味 3 行）＋ 会社情報 |
| 10 | Dreamin' Spiral 🌱 | h2 | Copy Direction ＋ 6 つの入口（Canonical Order の軽い link ・ 同じ形 ・ 同じ大きさ）|
| 11 | Open Action | h2 | 指定 Copy ＋ Primary「Guide（無料）について見る」・ Secondary「Dreamin' Spiral 🌱を見る」 |

指定のない本文は、Copy Direction と現行 About の既存 Copy から Engineer が組み立てた（Architect Review の対象）。

## 事実の出所（Engineer は経歴を推測しない）

| 事実 | 出所 |
|---|---|
| NTTデータ ・ 中小企業4社 ・ 2015年創業 ・ IT業界歴25年以上 | 現行 about.html（Public）|
| 呼吸 ・ 身体 ・ リンパケア ・ 心理学 ／ 脳科学 ／ 量子論への関心 | 現行 about.html（Public）|
| 大学・大学院で情報工学（Computer Science）| dreamin-spiral-os `docs/01_foundation/founders-origin.md`（Owner の Origin 文書 ・ 非公開）— **Architect / Owner 確認事項** |
| YouTube での発信 ・ 地域での活動 | dreamin-spiral-os `projects/social-flow/operations/channel-readiness.md`（SNS の紹介文）— **確認事項** |
| 群馬大学 ・ 教育活動 ・ 温泉 ・ 散歩 ・ Music ・ 家族 | **見つからないため掲載していない** |

## Visual

- **使用：** `ABOUT-HERO-OWNER-01`（本人の実写真 ・ 3:4 ・ `assets/about/owner-{240,480,720}.{avif,webp}`）だけ。Desktop 260px ／ 768px 以下 200px（旧 184 ／ 168px）。下端を Hero へ溶かす mask は継承。`fetchpriority="high"` ・ width ／ height 指定
- **本文から外した：** career ・ turning ・ question ・ beat ・ closing（いずれも AI 生成の雰囲気画像）と ABOUT-THREE-01（三つの事業の図）。Real Photo First のため。asset file は削除していない
- AI で本人の代替人物は作っていない

## 変更していないもの

- `<head>`（meta ／ OGP）・ Header ・ Navigation ・ Footer ・ URL
- 6 Service LP ・ Home ・ TOP ・ 価格 ・ Stripe ・ Legal ・ Terms ・ Guide flow

## 外したもの

- 末尾の general contact form（Formspree `mykleakb`「少し話してみる」）— Open Action は Guide（Primary）／ Dreamin' Spiral 🌱（Secondary）。連絡先 `contact@b8e.co.jp` は会社情報に残した
- 「なぜ、この三つが一つの場所にあるのか」・「今も続いている問い」・「B8Eとして在るということ」の独立 Section（一部の Copy は 04 ・ 05 ・ 07 へ移した）

## Verification（ローカル静的配信）

- h1 1 ・ h2 10（＋ h3 2）・ Hero の link 0 ・ main の画像 1（本人の実写真）
- 320 ・ 375 ・ 390 ・ 430 ・ 768 ・ 820 ・ 879 ・ 1024 ・ 1280 ・ 1440 で overflow 0 ・ CTA と 6 つの入口は viewport 内。1〜2 文字の行は Section 11 の指定 Copy「今、」（意図した改行）だけ
- Portrait：320〜768 → 200×267（Portrait → Copy の縦積み）／ 820 以上 → 260×347（Copy ｜ Portrait）。比率は元のまま（Crop なし）
