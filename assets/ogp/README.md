# Dreamin' Spiral Brand OGP System — 設計書

> Dreamin' Spiral v1.0 公開サイト全体で使用する、統一されたBrand OGP System（ブランド資産としてのOGP画像仕様）。

---

## Version History

### v1.0
2026-07

- Brand OGP System 設計確定（Design Philosophy / Brand Rules）
- OGP_Template_Master.pptx 正式マスター化（PowerPoint Slide Master運用）
- Slide 01 Brand Manual化
- 公開9ページ分のOGP画像生成（`generated/`配下）
- 該当HTML9ページの `og:image` 反映

Future

- Community Portal 用スライド追加
- Premium Portal 用スライド追加
- DX Support 用スライド追加

---

## Design Philosophy

OGP画像は、単なるWebページのサムネイルではない。Dreamin' Spiralというブランドと、初めて出会う人の第一印象を担うものである。

そのため、以下をデザインの中心に置く。

- 静けさ
- 余白
- 自然
- 信頼
- 調和
- 呼吸感
- 一貫性
- 長く使える普遍性

情報量を増やすことよりも、見た人が落ち着き、安心し、ページを開いてみたいと感じることを優先する。

ページごとの差異は、原則として次の3つだけである。

- ブランドライン
- ページタイトル
- サブコピー

背景・ロゴ・配色・余白・オブジェクト配置は、ページごとに変えず、ブランド資産として統一する。

将来、別の担当者やAIがこのBrand OGP Systemを編集する場合も、視覚的な派手さや情報量より、静けさと余白を守ることを優先する。

---

## ① ディレクトリ構成

```
assets/
  ogp/
    README.md                      ← このファイル（設計書）
    master/
      OGP_Template_Master.pptx      ← 正式マスター（PowerPoint）
    generated/
      top.png
      about.png
      academy.png
      program.png
      community.png
      premium.png
      session.png
      apply.png
      library.png
```

`master/` `generated/` ともにv1.0時点で実体を持つ（マスターPowerPoint 1本、生成PNG 9枚）。

---

## マスターファイル形式

正式マスターは **PowerPoint（.pptx）1本に統一する。**

```
assets/ogp/master/OGP_Template_Master.pptx
```

ai（Illustrator）・fig（Figma構成）など他形式は正式マスターとして採用しない。

理由：

- 中村琢八が今後も直接編集しやすい
- テキスト・図形・ロゴ・背景を編集可能オブジェクトとして保持できる
- PowerPointから1200×630px相当のPNGをそのまま書き出せる
- Claude Codeとの今後の運用（スライド内テキスト差し替え→書き出し）にも合わせやすい
- 画像ファイル（PNG）を直接修正せず、マスターから再生成する運用を明確にできる

1ファイル内に全ページ分をスライドとして持つ（1ページ＝1スライド）。スライドの並び順・スライド名は③のページ一覧に合わせる。

---

## スライドマスターの使用

長期的なブランド資産として運用できるよう、PowerPointの**スライドマスター／レイアウト機能**を使用する。

以下は、個別スライドではなく**スライドマスター（レイアウト）側で一元管理**する。

- 背景（深いグリーンのグラデーション、光の滲み）
- ロゴ（レムニスケート）
- B8Eワードマーク
- フォント
- 余白
- 配色

各ページスライドで編集するのは、原則として次の3つのみ：

- ブランドライン
- ページタイトル
- サブコピー

PowerPoint上では「表示 > スライドマスター」から、この共通レイアウト（`OGP_MASTER`）を直接編集できる。**背景・ロゴ・余白・配色を変更したいときは、個別スライドではなく必ずスライドマスター側を編集する。** マスター側の変更は、そのレイアウトを使う全スライドに反映される。

ただし、PowerPointの一般的な仕様として、一度スライド上で入力されたタイトル・サブコピー・ブランドラインの**文字サイズ**は、そのスライド固有の書式として個別に保持される。マスター側でタイトルの文字サイズなどを変更した場合、既存スライドへ反映するには、対象スライドを選択し「ホーム > レイアウト > レイアウトのリセット」を実行する（位置・背景・ロゴは常にマスターと連動するため、この操作は不要）。

Slide 01（Brand Manual）も同じ`OGP_MASTER`レイアウトを使用する。Slide 01のみ、Brand OGP System自体の紹介（Design Philosophy・キーワード）と、複製・書き出し方法の案内（「DO NOT EXPORT — HOW TO USE」ラベルと6ステップ、スピーカーノート）をスライド側に個別追加している。ブランドガイドが主役、操作手順は補足という構成にしている。

---

## PowerPoint構成

| Slide | 内容 | スライド名（page-key） |
|---|---|---|
| 01 | Brand Manual（Design Philosophy + 使い方。原本・書き出し対象外） | `template-master` |
| 02 | Top | `top` |
| 03 | About | `about` |
| 04 | Academy | `academy` |
| 05 | Program | `program` |
| 06 | Community | `community` |
| 07 | Premium | `premium` |
| 08 | Guide Session | `session` |
| 09 | Apply | `apply` |
| 10 | Library | `library` |

運用ルール：

- Slide 01はテンプレート原本。**PNGへは書き出さない**
- Slide 02以降は、Slide 01を複製して作成する
- ページごとに変更してよいのは、ブランドライン・ページタイトル・サブコピー・スライド名のみ
- 背景・ロゴ・配色・余白・オブジェクトの配置・フォントサイズは一切変更しない
- PowerPoint内のスライド名は、生成画像の`<page-key>`と一致させる（「ファイル命名規則」参照）
- 将来ページを追加する場合はSlide 11以降へ追加する（Slide 01〜10の並び・内容は変更しない）

---

## 運用フロー

```
OGP_Template_Master.pptx
        ↓
各ページのタイトル・サブコピーを差し替え
        ↓
PNGへ書き出し
        ↓
assets/ogp/generated/ へ配置
        ↓
該当HTMLの <meta property="og:image"> を更新
```

背景・ロゴ・配色・レイアウトはスライドマスター／レイアウト側で固定し、ページごとに触るのはタイトルとサブコピーのテキストボックスのみとする。

---

## 目的

- ページごとに個別デザインを作らず、ブランド全体で統一されたBrand OGP Systemを1つ持つ
- 各ページの差分は「タイトル」「サブコピー」のみとし、他の要素（背景・ロゴ・レイアウト・配色）は完全に固定する
- LINE / Facebook / X / Slack / Discord など、想定SNS全てでリンクを共有した際に、Dreamin' Spiralとして一貫した「静かな高級感」「自然な豊かさ」の第一印象を与える
- Academy配下だけでなく、将来のCommunity Portal / Premium Portal / DX支援などにも同じBrand OGP Systemで展開できる設計にする

---

## サイズ

**1200 × 630 px**（標準OGP比率 1.91:1）

- Facebook / LINE / Slack / Discord は概ねこの比率をそのままサムネイル表示に使う
- X（Twitter）はやや中央寄りにクロップされることがあるため、テキストは中央寄せの安全領域（後述）に収める

---

## レイアウト

サイト本編のHero構成（`hero-label`＝小さな大文字ラベル → `hero-copy`＝大きな本文）をそのままOGPへ引き継ぐ、上下中央揃えの1カラム構成。

```
┌─────────────────────────────────────────────┐
│                                               │
│           (ロゴマーク：レムニスケート・控えめ)     │  ← 上部・控えめ
│                    B8E                       │
│                                               │
│         DREAMIN' SPIRAL ACADEMY              │  ← ブランドライン（小・大文字・字間広め・控えめ）
│                                               │
│                                               │
│                                               │
│          ページタイトル（大・主役）              │  ← 中央：最も強く見える要素
│                                               │
│                                               │
│          サブコピー（中・軽量）                  │  ← タイトル直下
│                                               │
│                                               │
│                                               │  ← 下部は広い余白のみ（URL等は置かない）
└─────────────────────────────────────────────┘
```

- 完全中央揃え。左右非対称のレイアウトは採らない（Vision Architectureの「静けさ・余白」を優先し、視線誘導を作らない）
- 要素間の余白を広めに取り、情報密度を意図的に下げる（サイト本編のPhilosophy同様、詰め込まない）
- ロゴ・B8Eワードマーク・ブランドラインは控えめに、ページタイトルが最も目を引く主役になるようにする（SNS上で一瞬しか見られないため）

### セーフゾーン（安全領域）

- 外周 **90px** はテキスト・ロゴを配置しない余白帯とする（X等のクロップ耐性のため）
- 実質のコンテンツ領域：1020 × 450 px 相当

---

## フォント

サイト本編と同一のフォントスタックを使用し、ブランドの一貫性を保つ。

```
-apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN',
'Hiragino Sans', 'Noto Sans JP', Arial, sans-serif
```

| 要素 | ウェイト | 目安サイズ（1200px幅基準） |
|---|---|---|
| ロゴワードマーク（B8E） | Light、字間広め | 14px（控えめ） |
| ブランドライン（DREAMIN' SPIRAL ACADEMY） | Regular〜Light | 16px、字間 0.25em、大文字（控えめ） |
| ページタイトル | Light〜Regular（サイト本編の`hero-copy`に準拠：font-weight 300） | 88px（主役として大きく） |
| サブコピー | Light | 30px |

ページタイトルは、ロゴ・B8E・ブランドラインより明確に大きく、SNS上で一瞬見ただけでも主役として認識できるサイズとする。タイトルが長い場合（例：「Dreamin' Spiral Academy」）でも1行に収まることを実機PowerPointおよびQAレンダリングで確認済み（詳細は「画像更新ルール」参照）。

---

## 余白

- 外周セーフゾーン：90px（前述）
- ロゴブロックとブランドラインの間：24px
- ブランドラインとページタイトルの間：56px（意図的に大きく空け、"間"を作る）
- タイトルとサブコピーの間：32px
- サブコピー以下、スライド下端までは広い余白のみとする（URL等は置かない。下部は特に余白を残し、詰まった印象を避ける）

---

## タイトル位置

- 水平：中央揃え
- 垂直：画像全体の中央からやや上（黄金分割の上寄り、目安で画像上端から42%〜58%の帯）
- 最大幅：セーフゾーン内、1020px以内で折り返し

---

## サブコピー位置

- タイトル直下、32pxの余白を挟んで中央揃え
- 1行を基本とする（既存サイトの`hero-sub`パターンに準拠。長くなる場合も2行まで）
- タイトルより明るい／軽い色調（後述カラー参照）で、階層を明確にする

---

## ブランドカラー

サイト本編の配色（`style.css`）から、OGP専用の統一パレットを定義する。ページごとの個別Hero配色（Community=緑、About=中立ダークなど）は使わず、**全ページ共通で以下の深いグリーン基調**に統一する（ユーザー指定の「深いグリーン」「自然」「静けさ」キーワードを、ブランド全体の顔として採用）。

| 用途 | 色 | 備考 |
|---|---|---|
| 背景（ベース） | `#0a1208` → `#0d1a10` → `#111a0e` | `style.css`の`.community-hero`グラデーションを流用（`linear-gradient(160deg, #0d1a10 0%, #0a1208 60%, #111a0e 100%)`） |
| 背景アクセント（光の滲み） | `rgba(60, 100, 60, 0.18)` | 同じく`.community-hero`の`radial-gradient`を流用。呼吸感・柔らかさを出す |
| ページタイトル文字色 | `#f7f6f4` | サイト全体のベース背景色と同じ、暖かみのあるオフホワイト |
| サブコピー文字色 | `#a8a49e` | `.community-hero-copy`の文字色を流用。タイトルより明度・彩度を落として階層化 |
| ブランドライン／ロゴ文字色 | `#c0b8ad` | `.site-header h1`（ロゴワードマーク）の色を流用 |
| アクセントライン（ロゴのレムニスケート等） | `#c9a882` | サイト共通のアンバーアクセント |

この配色は「深いグリーン × 暖かみのあるオフホワイト × アンバー」で構成され、既存サイトのCommunityセクションと同じ質感を持ちながら、企業ブランド（B8E）としての落ち着きも損なわない。

---

## 構成要素の詳細

1. **ロゴマーク**：レムニスケート（∞を横に倒した二重楕円のアウトライン、塗りなし）。ストローク色はアンバー`#c9a882`。控えめなサイズで配置
2. **B8Eワードマーク**：ロゴ直下、小さく字間を広めに。控えめなサイズで配置
3. **ブランドライン**：ページの所属を示す一行。基本は「DREAMIN' SPIRAL ACADEMY」。Top/AboutなどAcademy配下でないページは「BEAT EIGHT EMOTION」を使用（詳細は③一覧を参照）。控えめなサイズで配置
4. **ページタイトル**：主役。各ページのHeroコピーまたはページ名に対応。ロゴ・B8E・ブランドラインより明確に大きく表示する
5. **サブコピー**：タイトルを補足する一文。既存ページのHero本文・meta descriptionから短く要約
6. **URLは表示しない**（SNSプレビューカード側にドメインが自動表示されるため、画像内に重複表示しない）

---

## ファイル命名規則

- マスター：`assets/ogp/master/OGP_Template_Master.pptx`（1ファイル固定。バージョン違いのファイルを並べない。編集履歴はgit/PowerPoint自体の変更履歴に委ねる）
- 生成画像：`assets/ogp/generated/<page-key>.png`
  - `<page-key>`は小文字・単語区切りなしの1語とする：`top` / `about` / `academy` / `program` / `community` / `premium` / `session` / `apply` / `library`
  - 将来拡張分も同じ命名規則に従う（例：`community-portal.png` / `premium-portal.png` / `dx.png`）
- PowerPoint内のスライド名も`<page-key>`と一致させ、どのスライドがどの生成画像に対応するかを常に一意に追える状態にする

---

## 画像更新ルール

- **編集は必ずマスター（`master/OGP_Template_Master.pptx`）で行う。** `generated/`配下のPNGを直接編集しない（PNGはマスターからの書き出し結果として扱う。手描き修正・別ツールでの加工は禁止）
- 新しいページを追加・更新する場合：
  1. `OGP_Template_Master.pptx`内の該当スライド（なければ複製して新規作成）で、タイトル・サブコピーのテキストボックスのみを差し替える
  2. 背景・ロゴ・配色・レイアウトは一切変更しない
  3. 該当スライドを`generated/<page-key>.png`として1200×630 pxでPNG書き出しする
  4. 該当HTMLの`<meta property="og:image">`を更新する
- **タイトルが2行を超える場合**は、サブコピー側を短縮するか省略し、タイトルの可読性を優先する（詰め込まない、が最優先）
- ブランドカラー・フォント・余白のルールを変更する場合は、必ずこの README とマスターのスライドマスター／レイアウトを先に更新してから全スライド分を再書き出しする（個別ページだけ配色や余白を変える運用は禁止。統一性の担保が本テンプレートの目的そのものであるため）
- `community.html`/`premium.html`が暫定使用していた汎用画像（`assets/community/bg_v01.png`）は、v1.0で`community.png`/`premium.png`へ置き換え済み

---

## Brand Rules

このテンプレートを長期的なブランド資産として運用するための要約ルール。詳細・理由はそれぞれ「PowerPoint構成」「画像更新ルール」「ファイル命名規則」を参照。ここでの記載と本文の間に矛盾がある場合は、より詳細な本文の記述を正とする。

### Always

- 正式マスターは `OGP_Template_Master.pptx` を使用する
- 背景・ロゴ・配色・余白はスライドマスター側で管理する
- 各ページで変更するのはブランドライン・ページタイトル・サブコピーのみ
- スライド名と生成PNGの `<page-key>` を一致させる
- 1200 × 630 px で書き出す
- `generated/` 配下のPNGはマスターから再生成する
- README と PowerPoint の仕様を常に一致させる

### Never

- ページごとに背景色を変更しない
- ページごとにレイアウトを変更しない
- ロゴの位置や大きさを個別スライドで変えない
- URLを画像内に表示しない
- ボタンやCTAを画像内に置かない
- 情報を詰め込まない
- 装飾をページごとに追加しない
- `generated/` 配下のPNGを直接編集しない
- 個別ページだけ独自フォントを使用しない
- Slide 01をPNGへ書き出さない

---

## 将来の拡張ページへの適用方針

Community Portal / Premium Portal / DX支援などを追加する場合も、同じマスターデータからタイトル・サブコピーのみ差し替えて`generated/`に追加する。ブランドラインは所属に応じて出し分ける（例：DX支援なら「B8E」、Premium Portalなら「DREAMIN' SPIRAL ACADEMY」）。新規ページを追加する際は、本READMEの③④相当のリストにも追記すること。

---

## ③ ページ別タイトル・サブコピー一覧

既存ページのHeroコピー・meta descriptionから、OGP用に短く再構成したもの。新しい文章は作らず、既存の確定済みコピーの再利用・要約のみとした。

| ページ | ブランドライン | タイトル | サブコピー |
|---|---|---|---|
| Top | BEAT EIGHT EMOTION | B8E | 変容には、外側と内側がある。 |
| About | BEAT EIGHT EMOTION | About | 一人の問いが、場所になった。 |
| Academy | DREAMIN' SPIRAL ACADEMY | Dreamin' Spiral Academy | 外側が変わるほど、自分の中心が大切になる。 |
| Program | DREAMIN' SPIRAL ACADEMY | 実践の形 | Community と Premium、二つの関わり方。 |
| Community | DREAMIN' SPIRAL ACADEMY | Community | 共に育つ場所です。 |
| Premium | DREAMIN' SPIRAL ACADEMY | Premium | 一人ひとりの人生全体を、6か月かけて整える。 |
| Guide Session | DREAMIN' SPIRAL ACADEMY | 無料ガイドセッション | 今の自分の言葉で、話してみる。 |
| Apply | DREAMIN' SPIRAL ACADEMY | 参加方法を選ぶ | あなたに合う入口から、静かに。 |
| Library | DREAMIN' SPIRAL ACADEMY | 人生再起動ガイド | 人生再起動の、入口へ。 |

**将来拡張分（参考・未確定）**

| ページ | ブランドライン | タイトル | サブコピー |
|---|---|---|---|
| Community Portal | DREAMIN' SPIRAL ACADEMY | Community Portal | 共に育つ場所へ、おかえりなさい。 |
| Premium Portal | DREAMIN' SPIRAL ACADEMY | Premium Portal | あなた自身の6か月の旅路に戻る場所。 |
| DX支援 | BEAT EIGHT EMOTION | DX支援 | 外側を整える、静かな伴走。 |

---

## ④ HTMLへ適用するOGP一覧

各HTMLの`<meta property="og:image">`に設定している画像ファイルの対応表。v1.0で全9ページに反映済み。

| HTML | og:image |
|---|---|
| `index.html` | `https://www.b8e.co.jp/assets/ogp/generated/top.png` |
| `about.html` | `https://www.b8e.co.jp/assets/ogp/generated/about.png` |
| `academy.html` | `https://www.b8e.co.jp/assets/ogp/generated/academy.png` |
| `academy/program.html` | `https://www.b8e.co.jp/assets/ogp/generated/program.png` |
| `academy/community.html` | `https://www.b8e.co.jp/assets/ogp/generated/community.png` |
| `academy/premium.html` | `https://www.b8e.co.jp/assets/ogp/generated/premium.png` |
| `academy/session.html` | `https://www.b8e.co.jp/assets/ogp/generated/session.png` |
| `academy/apply.html` | `https://www.b8e.co.jp/assets/ogp/generated/apply.png` |
| `academy/library.html` | `https://www.b8e.co.jp/assets/ogp/generated/library.png` |

`academy/community.html` / `academy/premium.html` が暫定利用していた`assets/community/bg_v01.png`は、v1.0で正式なOGP画像に置き換え済み。og:imageはすべて絶対URLで記載する（SNSクローラーによっては相対パスを正しく解決できないため）。
