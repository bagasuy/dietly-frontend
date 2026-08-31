import { useState } from "react"

import { createDietEntry } from "../../services/diet"

const initialFormData = {
  food_name: "",
  meal_type: "",
  calories: "",
  protein: "",
  carbohydrates: "",
  fat: "",
  consumed_at: "",
}

function MealForm() {
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

    const token = localStorage.getItem("dietly_token")

    if (!token) {
      setError("You are not authenticated. Please log in again.")
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbohydrates: Number(formData.carbohydrates),
        fat: Number(formData.fat),
      }

      await createDietEntry(token, payload)

      setFormData(initialFormData)
      setSuccess("Meal added successfully.")
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Failed to add meal. Please check your input and try again."

      setError(
        typeof message === "string"
          ? message
          : "Failed to add meal. Please check your input and try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="tracker-section">
      <div className="tracker-section-heading">
        <span>Add meal</span>
        <h2>Track a meal</h2>
        <p>
          Record what you ate and keep your nutrition history organized.
        </p>
      </div>

      <form className="tracker-form" onSubmit={handleSubmit}>
        <label>
          Food name
          <input
            type="text"
            name="food_name"
            value={formData.food_name}
            onChange={handleChange}
            placeholder="e.g. Chicken rice"
            required
          />
        </label>

        <label>
          Meal type
          <select
            name="meal_type"
            value={formData.meal_type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a meal type
            </option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </label>

        <div className="tracker-form-grid">
          <label>
            Calories
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              placeholder="e.g. 500"
              required
            />
          </label>

          <label>
            Protein (g)
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="e.g. 30"
              required
            />
          </label>

          <label>
            Carbohydrates (g)
            <input
              type="number"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="e.g. 50"
              required
            />
          </label>

          <label>
            Fat (g)
            <input
              type="number"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="e.g. 15"
              required
            />
          </label>
        </div>

        <label>
          Consumed at
          <input
            type="datetime-local"
            name="consumed_at"
            value={formData.consumed_at}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="tracker-error">{error}</p>}

        {success && <p className="tracker-success">{success}</p>}

        <button
          type="submit"
          className="button button-primary"
          disabled={isLoading}
        >
          {isLoading ? "Adding meal..." : "Add meal"}
        </button>
      </form>
    </section>
  )
}

export default MealForm
