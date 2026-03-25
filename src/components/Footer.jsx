import "../styles/Footer.css"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer">

      {/* <div className="footer-top">

        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-dot" />
            Prime Home Hub
          </div>
          <p className="footer-desc">
            Curating the finest kitchenware for those who believe cooking is an art form. Luxury and function, in one place.
          </p>
        </div>

      </div> */}

      <div className="footer-bottom">
        <p className="footer-copy">© 2024 Prime Home Hub. All rights reserved.</p>
      </div>

    </footer>
  )
}

export default Footer