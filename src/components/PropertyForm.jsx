import { useState } from 'react'

const emptyValues = { name: '', rent: '', area: '', layout: '' }

// 物件の新規登録・編集で共用する入力フォーム
export function PropertyForm({ initialValues = emptyValues, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await onSubmit({
        name: values.name,
        rent: Number(values.rent),
        area: values.area,
        layout: values.layout,
      })
    } catch {
      setErrorMessage('保存に失敗しました。入力内容をご確認ください。')
      setIsSubmitting(false)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label htmlFor="name">物件名</label>
      <input id="name" name="name" value={values.name} onChange={handleChange} required />

      <label htmlFor="rent">家賃(円)</label>
      <input
        id="rent"
        name="rent"
        type="number"
        min="0"
        step="1"
        value={values.rent}
        onChange={handleChange}
        required
      />

      <label htmlFor="area">エリア名</label>
      <input id="area" name="area" value={values.area} onChange={handleChange} required />

      <label htmlFor="layout">間取り</label>
      <input
        id="layout"
        name="layout"
        placeholder="例: 1LDK"
        value={values.layout}
        onChange={handleChange}
        required
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="property-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : submitLabel}
        </button>
        <button type="button" className="secondary-button" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
