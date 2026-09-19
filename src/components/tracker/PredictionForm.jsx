import { useState } from "react"

import { createPrediction } from "../../services/prediction"

function PredictionForm({ onCreated }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("dietly_token")

      if (!token) {
        throw new Error("Authentication token not found.")
      }

      const data = await createPrediction(token)

      onCreated(data)
    } catch (err) {
      const message =
        err.response?.data?.weight ||
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

        <h2>Predict your future weight</h2>

        <p>
          Your latest weight and meal history will be used
          to estimate your next weight.
        </p>
      </div>

      <form className="tracker-form" onSubmit={handleSubmit}>
        {error && <p className="auth-error">{error}</p>}

        <button
          type="submit"
          className="button button-primary"
          disabled={isLoading}
        >
          {isLoading
            ? "Predicting..."
            : "Predict future weight"}
        </button>
      </form>
    </section>
  )
}

export default PredictionForm