# CLAUDE.md — B8E Lab 作業ルール

Claude Code がこのリポジトリで作業する際の必須ルールです。

---

## Git ワークフロー（最重要）

### main への直接 push は禁止

**必ず以下のフローで進めること。例外はない。**

```
1. feature ブランチを作成
2. 変更を feature ブランチへ commit
3. feature ブランチを GitHub へ push
4. Pull Request を作成
5. ユーザーが Vercel Preview URL で確認
6. ユーザーが確認・承認してから main へ merge
7. merge 後に Vercel Production へ自動反映
```

### ブランチ命名規則

```
feature/improve-dc-page
feature/add-faq-section
feature/refine-dx-hero
fix/mobile-nav-spacing
```

### 作業開始時の手順

```bash
# 最新の main から切る
git checkout main
git pull origin main
git checkout -b feature/<作業内容>
```

### 作業完了後の手順

```bash
# ステージング・コミット
git add <変更ファイル>
git commit -m "scope: 変更内容の説明"

# feature ブランチを push
git push origin feature/<作業内容>

# PR を作成
gh pr create --title "..." --body "..."
```

### PR 作成時の注意

- PR タイトルは 70 文字以内
- body には変更概要と確認ポイントを記載
- Vercel Preview URL が自動生成されるのでユーザーに伝える
- **ユーザーの承認なしに main へ merge しない**

---

## commit message 形式

```
scope: 変更内容（日本語 or 英語どちらでも可）

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

scope 例: `style`, `content`, `fix`, `feature`, `docs`

---

## 変更後に必ずやること

1. `docs/improvement-log.md` に変更内容を追記
2. `git status` で想定外のファイルが含まれていないか確認
3. PR を作成してユーザーに Preview URL を伝える

---

## やってはいけないこと

- `git push origin main` — 直接 push 禁止
- `git push --force` — ユーザーの明示的な指示なしに禁止
- `--no-verify` でフックをスキップ — 禁止
- context.md などの一時ファイルをコミット — 禁止
