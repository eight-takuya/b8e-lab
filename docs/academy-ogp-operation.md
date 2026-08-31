# Academy OGP 運用手順（v1.0.1 Phase 4）

> Dreamin' Spiral Academy の専用 OGP 画像を、既存 Master Template から生成・反映するための運用手順。
> 設計・ブランド仕様の正本は [`assets/ogp/README.md`](../assets/ogp/README.md)（Brand OGP System 設計書）。本書は運用手順に絞る。

## 正本 Master Template のパス

```
assets/ogp/master/OGP_Template_Master.pptx
```

- **これが唯一の正本。** v2 / final / 別ファイルは作らない（履歴は Git で管理）。
- 候補が1本のみであること、`assets/ogp/README.md` が本ファイルを正式マスターと明記していることを確認済み（Master 選定の根拠）。

## Master を選定した根拠

- リポジトリ内の OGP 用 PPTX は `assets/ogp/master/OGP_Template_Master.pptx` の**1本のみ**（`OGP_Template_Master(1).pptx` 等の重複候補は存在しない）。
- `assets/ogp/README.md`「マスターファイル形式」で、この1本を正式マスターと明記。
- 既存 `generated/*.png` を Master のスライドから再レンダリングすると**ピクセル単位で一致**することを確認（academy スライドで検証）。既存 PNG が本 Master 由来であることが裏付けられた。

## 使用フォント / サイズ

| 項目 | 値 |
|---|---|
| フォント | Noto Sans JP / Arial（Master のスライドマスターで管理。個別変更しない） |
| スライドサイズ | 12.5in × 6.5625in（= 1.905:1、標準 OGP 比） |
| 出力画像サイズ | **1200 × 630 px**（PNG / RGB / 8bit / アルファなし） |

## ページと画像の対応表（v1.0.1 時点）

| Slide | page-key | 生成画像 | 反映先 HTML |
|---|---|---|---|
| 01 | template-master | （書き出さない） | — |
| 02 | top | `generated/top.png` | `index.html` |
| 03 | about | `generated/about.png` | `about.html` |
| 04 | academy | `generated/academy.png` | `academy.html` |
| 05 | program | `generated/program.png` | `academy/program.html` |
| 06 | community | `generated/community.png` | `academy/community.html`（＋ `community-success.html`） |
| 07 | premium | `generated/premium.png` | `academy/premium.html`（＋ `premium-success.html`） |
| 08 | session | `generated/session.png` | `academy/session.html` |
| 09 | apply | `generated/apply.png` | `academy/apply.html` |
| 10 | library | `generated/library.png` | `academy/library.html` |
| **11** | **community-apply** | **`generated/community-apply.png`** | **`academy/community-apply.html`** |
| **12** | **premium-apply** | **`generated/premium-apply.png`** | **`academy/premium-apply.html`** |
| **13** | **owner-program** | **`generated/owner-program.png`** | **`academy/owner-program.html`** |

Success ページ（`community-success.html` / `premium-success.html`）は `noindex` で SNS 共有を想定しないため、専用スライドは作らず親サービスの `community.png` / `premium.png` を流用する。

## PPTX 生成方法（新スライドの追加）

**Master を直接上書きしない = 既存スライドを壊さない。** 既存スライド（01〜）は保持し、新規は Slide 11 以降へ**追加**する。

1. Master を展開：`unzip OGP_Template_Master.pptx -d work/`
2. 近いページのスライドを複製（例：community-apply は community=slide6 を複製）。パッケージ登録込みで複製するには pptx スキルの `add_slide.py work/ slide6.xml --after slide10.xml` を使う（`presentation.xml` / rels / content-types を自動更新）。
3. 複製スライドの `ppt/slides/slideN.xml` で、**タイトル・サブコピーの `<a:t>` テキストのみ**を差し替える（UTF-8 で編集。背景・ロゴ・配色・余白・フォントは触らない）。
4. 再パッケージ：`(cd work && zip -Xqr ../OGP_Template_Master.pptx .)`
5. 検証：`validate.py OGP_Template_Master.pptx --original <元master>` が PASS すること。

> v1.0.1 では Slide 11（community-apply）/ Slide 12（premium-apply）を、それぞれ Slide 06 / 07 の複製 + タイトル・サブコピー差し替えで追加した。
>
> 2026-08-31 に **Slide 13（owner-program）** を Slide 07（premium）の複製 + タイトル・サブコピー差し替えで追加した。あわせて **Slide 05（program）のサブコピー**を 3 入口構成へ追随更新している（テキストのみ）。

## PNG 出力方法

1. PDF 化：`soffice.py --headless --convert-to pdf OGP_Template_Master.pptx`
   （このリポジトリでは LibreOffice レンダリングが実機 PowerPoint 出力とピクセル一致することを確認済み）
2. 対象スライドを PNG 化：`pdftoppm -png -scale-to-x 1200 -scale-to-y 630 -f <slide> -l <slide> OGP_Template_Master.pdf out`
   （**この形で直接 1200×630 が出る。**`-r 96` は高さ 631px になり、`sips -z` での再サンプルが
   最下段に明るい 1px 行を残すため使わない）
3. 追加のリサイズは不要（サイズは `sips -g pixelWidth -g pixelHeight` で確認する）
4. `assets/ogp/generated/<page-key>.png` へ配置する。
5. 書き出し前に文字切れ・フォント置換・余白・タイトル位置を目視確認する。

## Web 反映方法

対象 HTML の `<head>` を更新：

- `og:image` を `https://www.b8e.co.jp/assets/ogp/generated/<page-key>.png`（**絶対 URL**）に設定
- `og:title` / `og:description` / `og:url` / `canonical` は各ページの正式値と矛盾しないこと
- **Twitter Card 用タグ（`twitter:*`）はサイト全体で使用していない**（X は og: にフォールバック）。本サイトの慣習に合わせ og: のみとし、`twitter:*` は追加しない。

## OGP 検証手順

- **既存スライドの非破壊確認：** 更新前後の pptx を zip として開き、変更対象以外の `ppt/slides/slideN.xml` が byte 単位で一致することを確認する。
- **既存 PNG の再現確認：** 更新後の master から既存ページ（例 premium）を書き出し、`generated/` の既存 PNG とテキスト境界が一致することを確認する。
- **セーフゾーン確認：** 明るい文字画素の外接矩形が外周 90px の内側に収まり、幅が 1020px 以内であることを確認する。
- リポジトリ内：`og:image` の URL・絶対 URL であること・画像が 1200×630 であることを確認。
- 公開後の HTTP 確認：`curl -I https://www.b8e.co.jp/assets/ogp/generated/community-apply.png` で 200 と `Content-Type: image/png` を確認。
- 外部プレビュー（ログインが必要なため手順のみ）：
  - Facebook Sharing Debugger（`https://developers.facebook.com/tools/debug/`）で対象 URL を入力し「Scrape Again」でキャッシュ更新。
  - X の Card は投稿プレビューで確認（Card Validator は現在提供終了。og: フォールバックで表示される）。
  - LINE はトーク画面に URL を貼って実際のカード表示を確認。
- キャッシュ：SNS 側は OGP をキャッシュするため、画像更新後は各デバッガーで再スクレイプが必要。

## 新規ページ追加時の手順（まとめ）

1. `assets/ogp/README.md` の「PowerPoint構成」「③ページ別コピー」「④HTML対応表」へ追記。
2. 本書「PPTX 生成方法」で Slide を追加（既存スライドは保持）。
3. 「PNG 出力方法」で 1200×630 PNG を書き出し `generated/` へ。
4. 「Web 反映方法」で該当 HTML の `og:image` を更新。
5. コピーは既存ページの Hero / description から**意味を変えず短縮**する（新しいコピーを作らない）。

## Master を直接上書きしないルール

- `generated/` 配下の PNG は Master からの書き出し結果として扱い、**直接編集しない**。
- Master の変更は「既存スライドを保持したままスライドを追加」または「スライドマスター側の一括更新」のみ。個別ページのために背景・配色・レイアウトを変えない。
- Master のバックアップ用に別名ファイル（v2 等）を並べない。履歴は Git のコミットで管理する。
