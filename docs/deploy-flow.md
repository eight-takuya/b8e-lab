# HP 更新時の安全な反映フロー

B8E サイト更新における Git / Vercel の標準フローです。

---

## なぜこのフローを使うか

- **本番反映前に新旧ページを比較確認できる**
- Vercel の Preview Deployment URL でモバイル含む表示確認ができる
- 問題があれば main に入れず差し戻せる
- 変更履歴が PR として残り、後から追跡できる

---

## フロー概要

```
feature ブランチ作成
      ↓
変更・commit
      ↓
feature ブランチを push
      ↓
PR 作成（GitHub）
      ↓
Vercel Preview Deployment 自動生成
      ↓
Preview URL で表示確認（ユーザー）
      ↓
OK なら main へ merge（ユーザー操作）
      ↓
Vercel Production 自動反映（〜60秒）
      ↓
本番 URL で最終確認
```

---

## 手順詳細

### 1. feature ブランチを作成する

```bash
git checkout main
git pull origin main
git checkout -b feature/<作業名>
```

命名例:
- `feature/improve-dc-page`
- `feature/add-academy-faq`
- `fix/mobile-spacing`

---

### 2. 変更・commit

```bash
# ファイルを編集後
git add dc.html style.css docs/improvement-log.md
git commit -m "content: dc ページに FAQ セクション追加"
```

**注意:** `context.md` などの一時ファイルをコミットしない。

---

### 3. feature ブランチを GitHub へ push

```bash
git push origin feature/<作業名>
```

---

### 4. Pull Request を作成

```bash
gh pr create \
  --title "DC ページ: FAQ 追加と CTA 改善" \
  --body "$(cat <<'EOF'
## 変更概要
- FAQ セクションを追加（5問、JSON-LD 構造化データ付き）
- CTA コピーを相談ハードルの低いトーンへ変更

## 確認ポイント
- モバイルで FAQ の表示崩れがないか
- 世界観が維持されているか

## Preview URL
Vercel が自動生成します（PR 画面に表示）
EOF
)"
```

---

### 5. Vercel Preview で確認

PR を作成すると Vercel が自動で Preview Deployment を生成します。

- GitHub の PR ページに `Visit Preview` ボタンが表示される
- URL 形式: `https://b8e-lab-git-feature-<ブランチ名>.vercel.app/`
- PC・スマートフォン両方で確認する

---

### 6. main へ merge（ユーザー操作）

Preview 確認で問題なければ、GitHub の PR 画面から `Merge pull request` を押す。

Claude Code が merge することはない。**必ずユーザーが判断・操作する。**

---

### 7. Vercel Production への反映確認

merge 後、約 60 秒で `https://www.b8e.co.jp/` に反映されます。

本番 URL で最終確認してください。

---

## ブランチ・PR を削除する（任意）

merge 後、不要になった feature ブランチは削除できます。

```bash
# リモートブランチの削除（GitHub PR 画面からもできる）
git push origin --delete feature/<作業名>

# ローカルブランチの削除
git branch -d feature/<作業名>
```

---

## Claude Code の報告ルール

### 背景と目的

PR 作成後に「mergeしてください」と報告したが、実際には GitHub 上ですでに merged 状態だった、というケースが複数回発生しています。  
ユーザーが GitHub を開いて状態を再確認しなくても済むよう、報告前に必ず状態を確認します。

---

### 報告前チェックリスト（必須）

push・PR 作成後、最終報告の前に以下を確認する。

```
[ ] PR が存在するか
[ ] PR 状態（open / merged / closed）
[ ] 最新 commit が PR に含まれているか
[ ] 最新 commit が main に反映済みか
[ ] Vercel の状態（Preview / Production / 未確認）
```

確認コマンド例：

```bash
# PR 状態と最新 commit の確認
gh pr view <番号> --json state,headRefName,mergedAt,commits

# main への反映確認
git fetch origin main
git log origin/main --oneline -5

# 最新 commit が main に含まれているか
git branch -r --contains <commit-sha>
```

---

### 報告フォーマット

以下の形式で報告する。

```
PR: #26
Status: open          ← open / merged / closed
Commit: e020f21       ← 最新 commit SHA（7桁）
Main: not yet         ← reflected / not yet
Vercel: Preview ready ← Preview ready / Production deployed / 未確認

Next Action:
Vercel Preview URLをご確認後、問題なければmergeをお願いします。
```

---

### 禁止事項

| 状態 | ❌ 言ってはいけない | ✅ 正しい報告 |
|---|---|---|
| PR が merged | 「mergeしてください」 | 「merge済みです」「Production反映をご確認ください」 |
| PR が open | 「反映されました」 | 「Vercel Previewでご確認後、mergeをお願いします」 |
| main 未反映 | 「本番に反映されました」 | 「mainに未反映です。新しいPRを作成します」 |

---

### 報告例（merged の場合）

```
PR: #26
Status: merged（2026-06-09 merge済み）
Commit: e020f21 → main に反映済み
Vercel: Production deployed

Next Action:
https://www.b8e.co.jp/ でスマホ表示をご確認ください。
```

### 報告例（open の場合）

```
PR: #26
URL: https://github.com/eight-takuya/b8e-lab/pull/26
Status: open
Commit: e020f21（PRに含まれている）
Main: not yet
Vercel: Preview ready

Next Action:
Vercel Preview URLでご確認後、問題なければmergeをお願いします。
```

---

## よくある質問

**Q: 複数ページを一度に変更したい場合は？**
A: 1つの feature ブランチで複数ファイルを変更して構いません。1つの PR にまとめます。

**Q: 急ぎで修正したい場合は？**
A: ホットフィックスも同じフローを使います。`fix/<内容>` ブランチを切ってください。

**Q: PR 作成後に追加修正が必要になった場合は？**
A: 同じ feature ブランチへ追加 commit して push すれば、PR と Preview に自動で反映されます。

---

## 関連ファイル

- [`CLAUDE.md`](../CLAUDE.md) — Claude Code 向けのルール（このフローを強制）
- [`docs/improvement-log.md`](improvement-log.md) — 全変更の記録
- [`README.md`](../README.md) — リポジトリ概要とハーネス使い方
