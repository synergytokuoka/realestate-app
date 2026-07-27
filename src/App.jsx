import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { PropertiesPage } from './pages/PropertiesPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertiesPage />
          </ProtectedRoute>
        }
      />
      {/* ルートパス・未定義パスは物件一覧画面へ(未ログイン時はProtectedRouteがログイン画面へ転送する) */}
      <Route path="/" element={<Navigate to="/properties" replace />} />
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
