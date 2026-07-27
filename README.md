# 不動産管理アプリ

React + Vite + Supabase Authenticationで構成された、メールアドレス+パスワード認証付きの不動産管理アプリです。

## 機能

- メールアドレス+パスワードでの会員登録・ログイン
- ログイン後は物件一覧画面(ダミーデータ)に遷移
- 未ログイン時はログイン画面にリダイレクト
- ログアウト機能

## セットアップ

```bash
npm install
```

`.env` にSupabaseのProject URLとPublishable Keyを設定してください(`.env.example` を参考にしてください)。

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

## 開発サーバー起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```
