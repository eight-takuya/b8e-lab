# QA Tooling

**公開ページからは参照されない開発 ／ QA 用のスクリプト置き場。**
Production bundle には含まれない（どの HTML からも読み込まれず、ブラウザでは実行されない）。

## mobile-typography-audit.mjs

[Mobile Typography ／ Orphan Line Quality v1](https://github.com/eight-takuya/dreamin-spiral-os/blob/main/docs/design-systems/mobile-typography-orphan-line-quality-v1.md)
（正本は `dreamin'-spiral-os`）の Audit Harness。

Public HP ／ LP を各 Viewport で render し、**文字ごとに `Range.getClientRects()`** を取って
行ごとの実テキストを復元する。同時に `<br>` の位置を記録し、
**「明示 `<br>` 直後 ＝ 意図された改行」と「自動折返し ＝ 虚しい改行」を区別**する。

検出するもの：1〜2 文字行 ・ 助詞のみの行 ・ 句読点始まり ・ 極端に短い最終行 ・
固有名称の行またぎ分断 ・ horizontal overflow ・ button overflow。

### 使い方

```bash
npm i -D playwright
npx playwright install webkit chromium

# WebKit（iOS Safari 相当）
node docs/qa/mobile-typography-audit.mjs docs/qa/public-pages.txt 320,360,375,390,393,412,430 https://www.b8e.co.jp webkit wk.json

# Chromium
node docs/qa/mobile-typography-audit.mjs docs/qa/public-pages.txt 320,375,390,430 https://www.b8e.co.jp chromium ch.json

# Desktop / Tablet regression
node docs/qa/mobile-typography-audit.mjs docs/qa/public-pages.txt 768,1024,1280 https://www.b8e.co.jp chromium reg.json
```

引数：`<pages.txt> <widths> <baseURL> <webkit|chromium> <out.json>`

### 注意

- **自動検出結果 ＝ 修正対象にしない。** 必ず Screenshot で Visual Context を確認する
- 本文中の inline link（`<a>`）は、親の段落が折り返す位置で 2 行として測られるため**偽陽性**が出る。
  親要素側に findings が無ければ問題ではない
- `word-break: auto-phrase` は Chromium のみ。WebKit では `line-break: strict` が効いていることを確認する
