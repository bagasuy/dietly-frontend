function StatCard({ label, value, description }) {
  return (
    <article className="dashboard-stat-card">
      <span className="dashboard-stat-label">{label}</span>

      <strong className="dashboard-stat-value">
        {value}
      </strong>

      <span className="dashboard-stat-description">
        {description}
      </span>
    </article>
  )
}

export default StatCard
