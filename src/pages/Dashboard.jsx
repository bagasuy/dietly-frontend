import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import MealList from "../components/dashboard/MealList"
import StatCard from "../components/dashboard/StatCard"
import WeightSummary from "../components/dashboard/WeightSummary"
import { getDietEntries, getWeightHistory } from "../services/diet"

function Dashboard() {
  const navigate = useNavigate()

  const [meals, setMeals] = useState([])
  const [weights, setWeights] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("dietly_token")

      if (!token) {
        navigate("/login", { replace: true })
        return
      }

      try {
        const [mealData, weightData] = await Promise.all([
          getDietEntries(token),
          getWeightHistory(token),
        ])

        setMeals(mealData)
        setWeights(weightData)
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("dietly_token")
          localStorage.removeItem("dietly_user")
          navigate("/login", { replace: true })
          return
        }

        setError(
          err.response?.data?.detail ||
            "Unable to load your dashboard.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [navigate])

  const user = JSON.parse(
    localStorage.getItem("dietly_user") || "null",
  )

  const totalCalories = meals.reduce(
    (total, meal) => total + Number(meal.calories || 0),
    0,
  )

  const latestWeight = weights[0]?.weight ?? "-"

  if (isLoading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <p>Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              Your nutrition overview
            </span>

            <h1>
              Welcome back{user?.username ? `, ${user.username}` : ""}.
            </h1>

            <p>
              Keep tracking your meals and weight to stay on
              top of your progress.
            </p>
          </div>

          <Link to="/tracker" className="button button-primary">
            Track today
          </Link>
        </header>

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        <section className="dashboard-stats">
          <StatCard
            label="Meals recorded"
            value={meals.length}
            description="Total meals in your history"
          />

          <StatCard
            label="Calories logged"
            value={`${totalCalories} kcal`}
            description="Total calories recorded"
          />

          <StatCard
            label="Current weight"
            value={latestWeight === "-" ? "-" : `${latestWeight} kg`}
            description="Latest recorded weight"
          />
        </section>

        <div className="dashboard-grid">
          <MealList meals={meals} />
          <WeightSummary weights={weights} />
        </div>
      </div>
    </main>
  )
}

export default Dashboard
