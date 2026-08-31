function PredictionSummary({ predictions }) {
  if (!predictions.length) {
    return (
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <span>Prediction</span>
          <h2>Your projection</h2>
        </div>

        <div className="dashboard-empty-state">
          <p>No prediction yet.</p>
          <span>
            Generate a prediction from the tracker to see your projected
            progress here.
          </span>
        </div>
      </section>
    )
  }

  const latestPrediction = predictions[0]

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-heading">
        <span>Prediction</span>
        <h2>Your projection</h2>
      </div>

      <div className="prediction-summary">
        <div className="prediction-current">
          <span>Predicted weight</span>
          <strong>{latestPrediction.predicted_weight} kg</strong>
        </div>

        <div className="prediction-details">
          <div>
            <span>Predicted change</span>
            <strong>
              {latestPrediction.predicted_change} kg
            </strong>
          </div>

          <div>
            <span>Prediction date</span>
            <strong>
              {latestPrediction.prediction_date}
            </strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PredictionSummary
