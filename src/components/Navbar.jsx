import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/landing" className="navbar-logo">
        Dietly
      </Link>

      <nav className="navbar-actions">
        <Link to="/login" className="navbar-login">
          Log in
        </Link>

        <Link to="/register" className="button button-primary">
          Get started
        </Link>
      </nav>
    </header>
  )
}

export default Navbar