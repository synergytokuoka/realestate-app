import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// 認証状態(ログインユーザー情報)をアプリ全体で共有するためのコンテキスト
const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション取得が完了するまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に現在のセッションを取得する
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなどの認証状態変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // メールアドレス+パスワードでの会員登録
  const signUp = (email, password) => {
    return supabase.auth.signUp({ email, password })
  }

  // メールアドレス+パスワードでのログイン
  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  // ログアウト
  const signOut = () => {
    return supabase.auth.signOut()
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証状態にアクセスするためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの内側で使用してください。')
  }
  return context
}
