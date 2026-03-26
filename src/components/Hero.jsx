import { useEffect, useState } from "react"
import "../styles/Hero.css"

const phrases = ["your home", "your kitchen", "your lifestyle", "your space"]

function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const full = phrases[currentPhrase]
    let timeout

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, currentPhrase])

  // Hide scroll arrow once user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToProducts = () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero">
      <div className="hero-overlay">
        {/* Badge now inside overlay */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Trusted by 12,000+ happy customers
        </div>

        <h1>
          Everything for<br />
          <em className="hero-typewriter">
            {displayed}
            <span className="hero-cursor">|</span>
          </em>
        </h1>
        <p>Premium home essentials, curated with care and delivered to your door.</p>
        <div className="hero-actions">
          <button onClick={scrollToProducts}>Shop Now</button>
          <a href="/about" className="hero-link">Our Story →</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero-scroll ${scrolled ? "hero-scroll--hidden" : ""}`} onClick={scrollToProducts}>
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3v14M4 11l6 6 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero