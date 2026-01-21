export default function MetricsCard({ title, value, icon }) {
  return (
    <div className="metrics-card">
      <div className="metrics-icon">{icon}</div>
      <div className="metrics-content">
        <p className="metrics-title">{title}</p>
        <p className="metrics-value">{value}</p>
      </div>
    </div>
  )
}
