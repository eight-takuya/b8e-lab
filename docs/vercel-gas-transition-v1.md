# Vercel → GAS Transition v1 — 実装記録（b8e-lab）

> **正本（原則 ・ 適用範囲 ・ 言葉）は OS repo** `docs/design-systems/web-design-system/vercel-gas-transition-standard-v1.md`。
> 本書は b8e-lab 上の実装事実のみを扱う。

| 項目 | 内容 |
|---|---|
| Status | **Guide: PRODUCTION RELEASED**（2026-09-18・PR #105・Owner Reality Review APPROVED・Production Verification PASS）／ Business Creation: APPROVED IN PREVIEW（PR #104・未公開） |
| 共通の振る舞い | `/gas-transition.js`（1 ファイル・style も同梱。`style.css` は変更しない） |
| 実装日 | 2026-09-18 |

## 1. 使い方

```html
<a class="ds-service-cta"
   href="https://script.google.com/macros/s/…/exec?…"
   data-gas-transition
   data-transition-eyebrow="DREAMIN' SPIRAL …"
   data-transition-heading="…を開いています。"
   data-transition-text="…">…</a>
<script src="/gas-transition.js" defer></script>
```

- ページ側が渡すのは **行き先（href）と言葉だけ**。起動 ・ Transition View の表示 ・ 二重起動の防止 ・ accessibility ・ 移動の scheduling は `gas-transition.js` が持つ
- `data-gas-transition` があり、`href` が `https://script.google.com/` の link だけを扱う（他の link ・ 外部 link には触れない）

## 2. 振る舞い

- **click（mouse ・ trackpad ・ touch の tap ・ keyboard の Enter）** で起動する。link の標準の起動と同じ（押し始めで移動すると、touch のスクロールや「押してから指をずらして取り消す」操作を壊すため）
- 起動した瞬間に、ページ全体を Transition View（Service Page の Hero と同じ色 ・ 書体 ・ 余白）に変える。言葉が主役。細い線が静かに明滅する（`prefers-reduced-motion` では止める）
- `requestAnimationFrame` → `setTimeout(0)` で描画の後に `location.assign(href)`（同じタブ ・ 通常の履歴）。rAF が止まる環境の保険に 100ms の timer。**人工的な待ちはない**
- 移動は 1 回だけ（起動後の click は無視）
- 修飾キー（⌘ ／ Ctrl ／ Shift ／ Alt）・ 中クリック ・ `target` ・ `download` はブラウザの通常の動作に任せる（Transition View を出さない）
- Transition View は `role="status"` ・ `aria-live="polite"`。見出しへ focus を移す。元のページは `aria-hidden` ＋ `inert`（元の CTA を読み上げ直さない ・ 操作できない）
- 戻るで戻ってきたとき（bfcache）は `pageshow` で元のページへ戻す（もう一度押せる）
- JavaScript が動かない場合は、href のまま普通に移動する（progressive enhancement）

## 3. 適用している導線

| Page | CTA | 行き先 | 状態 |
|---|---|---|---|
| `/dreamin-spiral/business-creation/`（Hero ・ Final） | Business Creationについて話してみる | Business Creation Dialogue Form（GAS・Production） | Owner Reality Review APPROVED・PR #104 merge（2026-09-19・Production Live） |
| `/dreamin-spiral/guide/`（Hero ・ Final） | Guide（無料）に申し込む | Guide 予約ページ（GAS・Production・行き先は release 前と同一） | **Production Released**（PR #105 merge `2f04537`・2026-09-18） |

- B8E Owner Portal のカードは新しいタブで開く launcher のため、適用しない（正本 §2-1）

## 4. Production Verification（Guide・2026-09-18）

`https://www.b8e.co.jp/dreamin-spiral/guide/` で実施（headless Chromium・実際の mouse 入力。予約は送信していない）:

- 配信中の `gas-transition.js` ・ Guide Page が merge 後の main と一致
- 「Guide（無料）に申し込む」（2 箇所）の行き先が release 前と同一の Guide 予約ページ（GAS Production）
- 押した瞬間に承認済みの Transition View（見出し ・ 添える一文 ・ `role="status"`）
- 移動は 1 回だけ ・ 押してから 400ms 以内に開始 ・ Guide 予約ページ（「Guide（無料） 日程選択」）が開く
- 戻るで Guide Page に戻る（Transition View は残らない）・ 他の link は通常どおり

## 5. Change History

| Date | 内容 |
|---|---|
| 2026-09-18 | **新規作成。** `gas-transition.js` を追加（Preview）。Business Creation（PR #104）・ Guide（別 PR）へ適用 |
| 2026-09-18 | **Guide: Production Released。** Owner Reality Review（Business Creation ・ Guide とも APPROVED）後に PR #105 を merge。Production Verification PASS（§4）。Business Creation は PR #104 のまま（未公開） |
