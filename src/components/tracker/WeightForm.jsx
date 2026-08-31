import { useState } from "react"

import { createWeightEntry } from "../../services/diet"

const initialFormData = {
  weight: "",
  recorded_at: "",
}

function WeightForm({ onCreated }) {
  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

async function handleSubmit(event) {
  event.preventDefault()

  setError("")
  setSuccess("")
  setIsLoading(true)

  try {
    const token = localStorage.getItem("dietly_token")

    if (!token) {
      throw new Error("Authentication token not found.")
    }

    const createdWeight = await createWeightEntry(token, {
      weight: Number(formData.weight),
      recorded_at: formData.recorded_at,
    })

    onCreated(createdWeight)

    setFormData(initialFormData)
    setSuccess("Weight recorded successfully.")
  } catch (err) {
    const message =
      err.response?.data?.detail ||
      err.response?.data?.message ||
      "Failed to record weight."

    setError(message)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <section className="tracker-section">
      <div className="tracker-section-heading">
        <span>Weight progress</span>
        <h2>Record your weight</h2>
        <p>
          Add your current weight to keep your progress history up to date.
        </p>
      </div>

      <form className="tracker-form" onSubmit={handleSubmit}>
        <label>
          Weight (kg)
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.1"
            placeholder="e.g. 70.5"
            required
          />
        </label>

        <label>
          Recorded at
          <input
            type="date"
            name="recorded_at"
            value={formData.recorded_at}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        {success && <p className="auth-success">{success}</p>}

        <button
          type="submit"
          className="button button-primary"
          disabled={isLoading}
        >
          {isLoading ? "Recording..." : "Record weight"}
        </button>
      </form>
    </section>
  )
}

export default WeightForm
