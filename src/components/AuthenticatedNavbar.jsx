import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

import { logoutUser } from "../services/auth"

function AuthenticatedNavbar() {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  async function handleLogout() {
    const token = localStorage.getItem("dietly_token")

    setIsLoggingOut(true)

    try {
      if (token) {
        await logoutUser(token)
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Logout request failed.", err)
      }
    } finally {
      localStorage.removeItem("dietly_token")
      localStorage.removeItem("dietly_user")
      navigate("/login", { replace: true })
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <header className="authenticated-mobile-header">
        <Link
          to="/dashboard"
          className="navbar-logo"
        >
          Dietly
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </header>

      <aside
        className={`authenticated-sidebar ${
          isMenuOpen ? "authenticated-sidebar-open" : ""
        }`}
      >
        <div className="authenticated-sidebar-header">
          <Link
            to="/dashboard"
            className="navbar-logo"
            onClick={closeMenu}
          >
            Dietly
          </Link>

          <button
            type="button"
            className="mobile-close-button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <nav className="authenticated-sidebar-nav">
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              `authenticated-nav-link ${
                isActive
                  ? "authenticated-nav-link-active"
                  : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tracker"
            onClick={closeMenu}
            className={({ isActive }) =>
              `authenticated-nav-link ${
                isActive
                  ? "authenticated-nav-link-active"
                  : ""
              }`
            }
          >
            Tracker
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              `authenticated-nav-link ${
                isActive
                  ? "authenticated-nav-link-active"
                  : ""
              }`
            }
          >
            Profile
          </NavLink>
        </nav>

        <div className="authenticated-sidebar-footer">
          <button
            type="button"
            className="authenticated-logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut
              ? "Logging out..."
              : "Log out"}
          </button>
        </div>
      </aside>

      {isMenuOpen && (
        <button
          type="button"
          className="authenticated-sidebar-overlay"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}
    </>
  )
}

export default AuthenticatedNavbar