import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createProperty, deleteProperty, fetchProperties, updateProperty } from '../lib/propertiesApi'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyForm } from '../components/PropertyForm'

export function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  // フォームの表示状態: null(非表示) / 'create'(新規登録) / 編集対象の物件オブジェクト
  const [formMode, setFormMode] = useState(null)

  const loadProperties = async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch {
      setLoadError('物件一覧の取得に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const handleCreate = async (values) => {
    await createProperty({ ...values, userId: user.id })
    setFormMode(null)
    await loadProperties()
  }

  const handleUpdate = async (values) => {
    await updateProperty(formMode.id, values)
    setFormMode(null)
    await loadProperties()
  }

  const handleDelete = async (property) => {
    const confirmed = window.confirm(`「${property.name}」を削除しますか?`)
    if (!confirmed) return
    await deleteProperty(property.id)
    await loadProperties()
  }

  const isEditing = formMode !== null && formMode !== 'create'

  return (
    <div className="properties-page">
      <header className="properties-header">
        <div>
          <h1>物件一覧</h1>
          <p className="logged-in-user">{user?.email} でログイン中</p>
        </div>
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      {formMode === null ? (
        <button type="button" className="new-property-button" onClick={() => setFormMode('create')}>
          物件を登録
        </button>
      ) : (
        <PropertyForm
          key={isEditing ? formMode.id : 'create'}
          initialValues={
            isEditing
              ? { name: formMode.name, rent: formMode.rent, area: formMode.area, layout: formMode.layout }
              : undefined
          }
          submitLabel={isEditing ? '更新' : '登録'}
          onSubmit={isEditing ? handleUpdate : handleCreate}
          onCancel={() => setFormMode(null)}
        />
      )}

      {isLoading && <p className="loading-text">読み込み中...</p>}
      {loadError && <p className="error-message">{loadError}</p>}
      {!isLoading && !loadError && properties.length === 0 && (
        <p className="empty-text">登録されている物件はありません。</p>
      )}

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={(target) => setFormMode(target)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
