function WeightSummary({ weights }) {
  if (!weights.length) {
    return (
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <span>Weight progress</span>
          <h2>Your weight</h2>
        </div>

        <div className="dashboard-empty-state">
          <p>No weight records yet.</p>
          <span>Start recording your weight to track your progress.</span>
        </div>
      </section>
    )
  }

  const latestWeight = weights[0]

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-heading">
        <span>Weight progress</span>
        <h2>Your weight</h2>
      </div>

      <div className="weight-summary">
        <div className="weight-current">
          <span>Current weight</span>
          <strong>{latestWeight.weight} kg</strong>
        </div>

        <div className="weight-history">
          {weights.slice(0, 5).map((entry) => (
            <div className="weight-history-item" key={entry.id}>
              <span>{entry.recorded_at}</span>
              <strong>{entry.weight} kg</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WeightSummary
