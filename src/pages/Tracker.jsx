import { Link } from "react-router-dom"

import MealForm from "../components/tracker/MealForm"
import WeightForm from "../components/tracker/WeightForm"

function Tracker() {
  return (
    <main className="tracker-page">
      <div className="tracker-container">
        <header className="tracker-header">
          <div>
            <span className="tracker-eyebrow">Nutrition tracker</span>

            <h1>Track your progress.</h1>

            <p>
              Record your meals and weight to keep your nutrition history
              organized.
            </p>
          </div>

          <Link to="/dashboard" className="button button-secondary">
            Back to dashboard
          </Link>
        </header>

        <div className="tracker-grid">
          <MealForm />
          <WeightForm />
        </div>
      </div>
    </main>
  )
}

export default Tracker
