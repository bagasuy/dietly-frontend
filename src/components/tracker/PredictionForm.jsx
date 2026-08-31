import { useState } from "react"

import { createPrediction } from "../../services/prediction"

function PredictionForm({ onCreated }) {
  const [weight, setWeight] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setPrediction(null)
    setError("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("dietly_token")

      if (!token) {
        throw new Error("Authentication token not found.")
      }

      const data = await createPrediction(token, Number(weight))

    setPrediction(data)
    onCreated(data)
    setWeight("")
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to generate prediction."

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="tracker-section">
      <div className="tracker-section-heading">
        <span>Prediction</span>
        <h2>See your projected progress</h2>
        <p>
          Enter your current weight to generate a nutrition progress
          prediction.
        </p>
      </div>

      <form className="tracker-form" onSubmit={handleSubmit}>
        <label>
          Current weight (kg)
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            min="0"
            step="0.1"
            placeholder="e.g. 70.5"
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button
          type="submit"
          className="button button-primary"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate prediction"}
        </button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <span>Prediction result</span>

          <strong>
            {prediction.predicted_weight} kg
          </strong>

          <p>
            Predicted change: {prediction.predicted_change}
          </p>

          <small>
            Prediction date: {prediction.prediction_date}
          </small>
        </div>
      )}
    </section>
  )
}

export default PredictionForm
