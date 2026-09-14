import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MealList from "../components/dashboard/MealList";
import PredictionSummary from "../components/dashboard/PredictionSummary";
import StatCard from "../components/dashboard/StatCard";
import WeightSummary from "../components/dashboard/WeightSummary";
import { getDietEntries, getWeightHistory } from "../services/diet";
import { getPredictions } from "../services/prediction";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

function Dashboard() {
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [weights, setWeights] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("dietly_token");

      const storedUser = localStorage.getItem("dietly_user");

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUsername(user.username || "");
        } catch {
          setUsername("");
        }
      }

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const [mealData, weightData, predictionData] = await Promise.all([
          getDietEntries(token),
          getWeightHistory(token),
          getPredictions(token),
        ]);

        setMeals(mealData);
        setWeights(weightData);
        setPredictions(predictionData);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("dietly_token");
          localStorage.removeItem("dietly_user");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.detail || "Failed to load dashboard data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  const totalCalories = meals.reduce(
    (total, meal) => total + Number(meal.calories || 0),
    0,
  );

  const latestWeight = weights[0];

  if (isLoading) {
    return (
      <>
        <AuthenticatedNavbar />

        <main className="dashboard-page">
          <div className="dashboard-container">
            <p>Loading your dashboard...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AuthenticatedNavbar />

      <main className="dashboard-page">
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div>
              <span className="dashboard-eyebrow">Your nutrition overview</span>

              <h1>Welcome back, {username}.</h1>

              <p>Keep an eye on your meals, weight, and projected progress.</p>
            </div>

            <div className="dashboard-header-actions">
              <Link to="/tracker" className="button button-primary">
                Track progress
              </Link>
            </div>
          </header>

          {error && <div className="dashboard-error">{error}</div>}

          <section className="dashboard-stats">
            <StatCard
              label="Calories tracked"
              value={`${totalCalories} kcal`}
              description="Total calories in your recorded meals"
            />

            <StatCard
              label="Meals tracked"
              value={meals.length}
              description="Meals currently in your nutrition history"
            />

            <StatCard
              label="Current weight"
              value={latestWeight ? `${latestWeight.weight} kg` : "—"}
              description="Latest recorded weight"
            />
          </section>

          <div className="dashboard-grid">
            <MealList meals={meals} />
            <WeightSummary weights={weights} />
          </div>

          <div className="dashboard-grid dashboard-prediction-grid">
            <PredictionSummary predictions={predictions} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
