import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { registerUser } from "../services/auth"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await registerUser(form)

      setSuccess("Account created successfully.")

      setTimeout(() => {
        navigate("/login")
      }, 800)
    } catch (err) {
      const responseData = err.response?.data

      if (responseData) {
        const firstError = Object.values(responseData)[0]

        if (Array.isArray(firstError)) {
          setError(firstError[0])
        } else {
          setError(String(firstError))
        }
      } else {
        setError("Unable to connect to the server.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/landing" className="auth-logo">
          Dietly
        </Link>

        <div className="auth-heading">
          <span>Create your account</span>

          <h1>Start your journey.</h1>

          <p>
            Create your Dietly account and start tracking your nutrition
            progress.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>

          {error && <p className="form-message form-error">{error}</p>}

          {success && (
            <p className="form-message form-success">{success}</p>
          )}

          <button
            type="submit"
            className="button button-primary auth-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  )
}

export default Register