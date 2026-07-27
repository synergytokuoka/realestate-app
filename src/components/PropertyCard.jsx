// 家賃を「¥000,000」の形式で表示するためのフォーマッタ
const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
})

// 物件情報を表示するカード。編集・削除ボタンを備える
export function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="property-rent">{yenFormatter.format(property.rent)} / 月</p>
      <p className="property-area">{property.area}</p>
      <p className="property-layout">{property.layout}</p>
      <div className="property-card-actions">
        <button type="button" onClick={() => onEdit(property)}>
          編集
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(property)}>
          削除
        </button>
      </div>
    </div>
  )
}
