import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"

function Navbar({ cartCount }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToProducts = () => {
    setMenuOpen(false)
    if (location.pathname !== "/") {
      window.location.href = "/#products"
    } else {
      document.getElementById("products").scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-dot" />
        Prime Home Hub
      </Link>

      {/* DESKTOP LINKS */}
      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <span className="navbar-link" onClick={scrollToProducts}>
          Products
        </span>
        <Link to="/about" className={`navbar-link ${location.pathname === "/about" ? "active" : ""}`}>
          About
        </Link>
        <Link to="/contact" className={`navbar-link ${location.pathname === "/contact" ? "active" : ""}`}>
          Contact
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          🛒
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <span className="mobile-link" onClick={scrollToProducts}>Products</span>
          <Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/cart" className="mobile-link" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
        </div>
      )}

    </nav>
  )
}

export default Navbar