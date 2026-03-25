import "../styles/About.css"

function About() {
  return (
    <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <h1 className="about-hero-title">About <em>Prime Home Hub</em></h1>
        <p className="about-hero-sub">
          Curating the finest kitchenware for those who believe cooking is an art form.
        </p>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="about-story-text">
          <span className="about-eyebrow">Our Story</span>
          <h2 className="about-section-title">Born from a passion <em>for the kitchen</em></h2>
          <p>
            Prime Home Hub was founded with one simple belief — everyone deserves a beautiful, well-equipped kitchen. We source only the finest kitchenware from trusted makers around the world, bringing luxury and function together in one place.
          </p>
          <p>
            From our first cast iron pan to our growing collection of premium dinnerware, every product we carry is handpicked with care and craftsmanship in mind.
          </p>
        </div>
        <div className="about-story-stats">
          <div className="about-stat">
            <span className="about-stat-num">500+</span>
            <span className="about-stat-label">Products</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">12K+</span>
            <span className="about-stat-label">Happy Customers</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">4.9★</span>
            <span className="about-stat-label">Average Rating</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">5+</span>
            <span className="about-stat-label">Years in Business</span>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <span className="about-eyebrow">Our Mission</span>
        <h2 className="about-section-title">We exist to <em>elevate</em> your home</h2>
        <p className="about-mission-desc">
          Our mission is to make premium kitchenware accessible to every home. We believe that the right tools inspire better cooking, better meals, and better moments with the people you love.
        </p>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <span className="about-eyebrow">Our Values</span>
        <h2 className="about-section-title">What we <em>stand for</em></h2>
        <div className="about-values-grid">
          {[
            { icon: "🏆", title: "Quality First", desc: "Every product is carefully vetted for durability, safety, and craftsmanship before it reaches you." },
            { icon: "🤝", title: "Customer Trust", desc: "We build lasting relationships with our customers through honesty, transparency, and great service." },
            { icon: "🌱", title: "Sustainability", desc: "We are committed to sourcing responsibly and reducing our environmental footprint." },
            { icon: "💡", title: "Innovation", desc: "We are always looking for the next great kitchen product to make your life easier and more enjoyable." },
          ].map(v => (
            <div key={v.title} className="about-value-card">
              <span className="about-value-icon">{v.icon}</span>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="about-cta">
        <h2 className="about-cta-title">Ready to elevate your kitchen?</h2>
        <p className="about-cta-desc">Explore our full collection of premium kitchenware.</p>
        <a href="/shop" className="about-cta-btn">Shop Now</a>
      </section> */}

    </div>
  )
}

export default About