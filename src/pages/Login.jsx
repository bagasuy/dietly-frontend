import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../services/auth"

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)

    try {
      const data = await loginUser(formData)

      localStorage.setItem("dietly_token", data.token)
      localStorage.setItem("dietly_user", JSON.stringify(data.user))

      navigate("/dashboard")
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed. Please check your username and password."

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/landing" className="auth-logo">
          Dietly
        </Link>

        <div className="auth-heading">
          <span>Create healthier habits</span>
          <h1>Welcome back.</h1>
          <p>Log in to continue tracking your nutrition progress.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="button button-primary auth-submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
