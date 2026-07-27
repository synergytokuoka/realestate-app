import { createClient } from '@supabase/supabase-js'

// .env で管理しているSupabaseのProject URLとPublishable Keyを読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Supabaseの環境変数(VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)が設定されていません。')
}

// アプリ全体で共有するSupabaseクライアント
export const supabase = createClient(supabaseUrl, supabasePublishableKey)
