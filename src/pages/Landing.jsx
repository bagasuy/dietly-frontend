import { ArrowRight, ChartNoAxesCombined, Scale, Utensils } from "lucide-react"
import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"
import FeatureCard from "../components/FeatureCard"

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-eyebrow">
              Your personal nutrition companion
            </span>

            <h1>
              Track your diet.
              <br />
              Own your progress.
            </h1>

            <p>
              Keep your meals, weight, and nutrition progress organized in one
              simple place.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="button button-primary">
                Start your journey
                <ArrowRight size={18} />
              </Link>

              <Link to="/login" className="button button-secondary">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <span>Today</span>
                <span className="status-dot" />
              </div>

              <div className="hero-progress">
                <span>Nutrition progress</span>
                <strong>On track</strong>
              </div>

              <div className="hero-metrics">
                <div>
                  <small>Meals</small>
                  <strong>Track</strong>
                </div>

                <div>
                  <small>Weight</small>
                  <strong>Monitor</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <span>Simple by design</span>

            <h2>
              Everything you need
              <br />
              to stay on track.
            </h2>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<Utensils size={22} />}
              title="Track your meals"
              description="Record what you eat and keep your daily nutrition history organized."
            />

            <FeatureCard
              icon={<Scale size={22} />}
              title="Monitor your weight"
              description="Keep your weight history in one place and follow your progress over time."
            />

            <FeatureCard
              icon={<ChartNoAxesCombined size={22} />}
              title="See your progress"
              description="Understand your progress through a simple and focused dashboard."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Landing