# Search Content Layer v1 ＋ Pilot Questions（問いから読む）

**Status:** Implemented（Preview・Architect Review 待ち）
**Date:** 2026-10-01
**AI Creation Request:** ACR-20261001-019
**正本：** dreamin-spiral-os `docs/repository-architecture/search-content-standard-v1.md`（Standard）・ `content/search-content/question-registry.csv`（Question Registry ・ 運用データ）

本書は b8e-lab 側の実装記録。Content Unit の正本は Video ではなく Question（1 Video = 1 Article にしない）。

## 追加した file

| file | 内容 |
|---|---|
| `dreamin-spiral/questions/index.html` | Hub「問いから読む」（Recent Questions ・ Card は Theme ／ Question ／ 1 行の Recognition）|
| `dreamin-spiral/questions/<slug>/index.html` × 5 | Pilot Question Page（01 Question Hero → 02 Recognition → 03 何が起きているんだろう → 04 少し違う見方 → 05 日常の中で、少しだけ観てみる → 06 動画（ある場合）→ 07 近くにある問い → 08 Natural Next Action）|
| `tools/search-content/build_questions.py` | Hub ／ Question Page の静的生成（header ・ nav ・ footer は Guide Page と同じ。Guide 固有の script は除く）|
| `tools/search-content/questions_data.py` | Pilot 5 の本文 ・ Related ・ Next Action（Question ID は Registry と同じ）|
| `tools/search-content/videos_data.py` | 埋め込む動画の公開事実（YouTube oEmbed ＋ OS の公開 catalog）|
| `tools/search-content/question_ogp.py` | Search Question 用 OGP（Brand OGP System の Slide 14 を土台に Theme ／ Question を書き出す）|
| `assets/ogp/questions/*.png` | Hub ＋ 5 Question の OGP（1200 × 630）|
| `style.css` | A23（Search Content の部品）|
| `dreamin-spiral/index.html` | Library の後に小さな「問いから読む」（3 問 ＋ Hub への link ・ Service ・ Library より弱い）|
| `sitemap.xml` | Hub ＋ 5 Question を追加 |

## Pilot 5

| ID | Question | Theme | 動画（埋め込み）| Next Action |
|---|---|---|---|---|
| Q-0001 | まだ何も起きていないのに、頭の中で説明を始めてしまうのはなぜ？ | Self | Video 031 `uzCirN0dpu8` | About |
| Q-0002 | なぜか話が噛み合わないとき、何が起きているんだろう？ | Relationship | Video 024 `uR2aTkowfcw`（028 は未公開のため埋め込まない）| Community |
| Q-0003 | 自分を証明しようとしてしまうのは、なぜだろう？ | Self | Video 014 `j-mwlIt9Vy0`（物差し）| Guide |
| Q-0004 | 自分を変えようと頑張るほど、なぜ疲れてしまうんだろう？ | Self | Video 025 `B36juZZviGQ` | My Life, My Way |
| Q-0005 | 鏡を見ると、なんだか疲れて見えるのが気になるのはなぜ？ | Body & Daily Life | なし（Video 021 は未公開）| 3 Weeks Tuning |

## Structured Data

Question Page：Article（author 中村 琢八 → About ・ publisher BEAT EIGHT EMOTION株式会社）＋ BreadcrumbList（TOP → Dreamin' Spiral 🌱 → 問いから読む → Question）＋ VideoObject（動画がある 4 ページ ・ 値は oEmbed と公開 catalog の事実だけ）。Hub：CollectionPage ＋ BreadcrumbList。FAQPage は使わない。

## 再生成

```
python3 tools/search-content/build_questions.py
python3 tools/search-content/question_ogp.py
```

## Verification（ローカル）

- Hub ＋ 5 Question ＋ Home：320 〜 1440 の 10 幅で overflow 0 ・ 1〜2 文字の行 0 ・ 動画は 16:9
- title ／ description は 6 ページで unique ・ h1 は各 1 ・ 内部 link 切れ 0 ・ JSON-LD 全件有効 ・ og:image の file あり
- 本文に断定 ／ 診断の語（結論： ・ 必ず ・ 絶対 ・ 診断 ・ 治療 ・ 病気 ・ 原因は ・ あなたは ・ だからです）0
