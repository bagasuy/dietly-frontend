import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import MealForm from "../components/tracker/MealForm"
import MealHistory from "../components/tracker/MealHistory"
import PredictionForm from "../components/tracker/PredictionForm"
import WeightForm from "../components/tracker/WeightForm"
import { getDietEntries } from "../services/diet"

function Tracker() {
  const navigate = useNavigate()

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadMeals() {
      const token = localStorage.getItem("dietly_token")

      if (!token) {
        navigate("/login", { replace: true })
        return
      }

      try {
        const data = await getDietEntries(token)
        setMeals(data)
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("dietly_token")
          localStorage.removeItem("dietly_user")
          navigate("/login", { replace: true })
          return
        }

        setError(
          err.response?.data?.detail ||
            "Failed to load meal history.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadMeals()
  }, [navigate])

  return (
    <main className="tracker-page">
      <div className="tracker-container">
        <header className="tracker-header">
          <div>
            <span className="tracker-eyebrow">
              Nutrition tracker
            </span>

            <h1>Track your progress.</h1>

            <p>
              Record your meals and weight to keep your nutrition
              history organized.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="button button-secondary"
          >
            Back to dashboard
          </Link>
        </header>

        {error && (
          <p className="tracker-error">
            {error}
          </p>
        )}

        <div className="tracker-grid">
          <MealForm />
          <WeightForm />
          <PredictionForm />
        </div>

        {isLoading ? (
          <section className="tracker-section">
            <p>Loading meal history...</p>
          </section>
        ) : (
          <MealHistory meals={meals} />
        )}
      </div>
    </main>
  )
}

export default Tracker
