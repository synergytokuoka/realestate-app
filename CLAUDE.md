# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git運用ルール

- コードを変更したら、そのたびに変更内容をコミットし、GitHubにプッシュすること。
- コミットは意味のある単位に分け、変更内容が分かるコミットメッセージを付けること。
- プッシュ前に `git status` / `git diff` で差分を確認し、意図しない変更が含まれていないかチェックすること。
- force push (`git push --force` 等)や `git reset --hard`、履歴の書き換えを伴う操作は行わないこと。必要な場合は必ず事前に確認を取ること。
- 機密情報(APIキー、認証情報など)を誤ってコミット・プッシュしないよう注意すること。
