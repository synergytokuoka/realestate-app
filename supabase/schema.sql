-- 不動産管理アプリ用の物件テーブル
-- Supabaseダッシュボードの SQL Editor でこのファイルの内容を実行してください。

-- 物件テーブルの作成
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- 行単位のセキュリティ(RLS)を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "Users can view own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のuser_idでのみ物件を登録できる
create policy "Users can insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Users can update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Users can delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
