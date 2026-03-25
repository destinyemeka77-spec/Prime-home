import { useForm, ValidationError } from "@formspree/react"
import "../styles/Contact.css"

function Contact() {
  const [state, handleSubmit] = useForm("mgonbazb")

  if (state.succeeded) {
    return (
      <div className="contact-success">
        <div className="contact-success-icon">✅</div>
        <h2 className="contact-success-title">Message Sent!</h2>
        <p className="contact-success-sub">Thanks for reaching out. We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <div className="contact">

      <div className="contact-hero">
        <h1 className="contact-hero-title">Get in <em>Touch</em></h1>
        <p className="contact-hero-sub">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-body">

        <div className="contact-info">
          <span className="contact-eyebrow">Contact Info</span>
          <h2 className="contact-info-title">Let's <em>talk</em></h2>
          <div className="contact-details">
            {[
              { icon: "📍", label: "Address", value: "Aguda Ogba, Ikeja Lagos, Nigeria" },
              { icon: "📞", label: "Phone", value: "+234 706 607 8020" },
              { icon: "📧", label: "Email", value: "hello@primehomehub.com" },
              { icon: "🕐", label: "Hours", value: "Mon - Fri, 9am - 6pm" },
            ].map(d => (
              <div key={d.label} className="contact-detail">
                <span className="contact-detail-icon">{d.icon}</span>
                <div>
                  <div className="contact-detail-label">{d.label}</div>
                  <div className="contact-detail-value">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-wrap">
          <span className="contact-eyebrow">Send a Message</span>
          <h2 className="contact-form-title">We'll get back <em>to you</em></h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field-row">
              <div className="contact-field">
                <label className="contact-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="contact-input"
                  placeholder="John"
                  required
                />
                <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
              </div>
              <div className="contact-field">
                <label className="contact-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="contact-input"
                  placeholder="Doe"
                  required
                />
                <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label">Email</label>
              <input
                type="email"
                name="email"
                className="contact-input"
                placeholder="john@example.com"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div className="contact-field">
              <label className="contact-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="contact-input"
                placeholder="+234 80 000 0000"
              />
            </div>

            <div className="contact-field">
              <label className="contact-label">Message</label>
              <textarea
                name="message"
                className="contact-textarea"
                placeholder="How can we help you?"
                rows={5}
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              className="contact-btn"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Contact