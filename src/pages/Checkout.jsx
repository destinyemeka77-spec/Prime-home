import { useForm, ValidationError } from "@formspree/react"
import { Link } from "react-router-dom"
import "../styles/Checkout.css"

function Checkout({ cart }) {
  const [state, handleSubmit] = useForm("xjgadqgj")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const orderSummary = cart.map(item => `${item.name} x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`).join(", ")

  if (state.succeeded) {
    return (
      <div className="checkout-success">
        <div className="checkout-success-icon">🎉</div>
        <h2 className="checkout-success-title">Order Placed!</h2>
        <p className="checkout-success-sub">Thank you for your order. We'll call you shortly to confirm delivery.</p>
        <Link to="/" className="checkout-success-btn">Back to Home</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-icon">🛒</div>
        <h2 className="checkout-empty-title">Your cart is empty</h2>
        <p className="checkout-empty-sub">Add some products before checking out</p>
        <Link to="/" className="checkout-empty-btn">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="checkout">

      <div className="checkout-hero">
        <h1 className="checkout-hero-title">Check<em>out</em></h1>
        <p className="checkout-hero-sub">Fill in your details and we'll deliver to you</p>
      </div>

      <div className="checkout-body">

        <div className="checkout-form-wrap">
          <span className="checkout-eyebrow">Delivery Details</span>
          <h2 className="checkout-form-title">Where should we <em>deliver?</em></h2>

          <form className="checkout-form" onSubmit={handleSubmit}>

            {/* Hidden order details */}
            <input type="hidden" name="order_items" value={orderSummary} />
            <input type="hidden" name="order_total" value={`₦${total.toLocaleString()}`} />
            <input type="hidden" name="payment_method" value="Pay on Delivery" />

            <div className="checkout-field-row">
              <div className="checkout-field">
                <label className="checkout-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="checkout-input"
                  placeholder="John"
                  required
                />
                <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
              </div>
              <div className="checkout-field">
                <label className="checkout-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="checkout-input"
                  placeholder="Doe"
                  required
                />
                <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
              </div>
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="checkout-input"
                placeholder="+234 800 000 0000"
                required
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Email (optional)</label>
              <input
                type="email"
                name="email"
                className="checkout-input"
                placeholder="john@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Delivery Address</label>
              <textarea
                name="address"
                className="checkout-textarea"
                placeholder="Enter your full delivery address"
                rows={3}
                required
              />
              <ValidationError prefix="Address" field="address" errors={state.errors} />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">City</label>
              <input
                type="text"
                name="city"
                className="checkout-input"
                placeholder="Lagos"
                required
              />
              <ValidationError prefix="City" field="city" errors={state.errors} />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Additional Notes (optional)</label>
              <textarea
                name="notes"
                className="checkout-textarea"
                placeholder="Any special instructions for delivery?"
                rows={3}
              />
            </div>

            <div className="checkout-payment-method">
              <span className="checkout-payment-icon">🚚</span>
              <div>
                <div className="checkout-payment-title">Pay on Delivery</div>
                <div className="checkout-payment-desc">Pay cash when your order arrives</div>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-btn"
              disabled={state.submitting}
            >
              {state.submitting ? "Placing Order..." : `Place Order — ₦${total.toLocaleString()}`}
            </button>

          </form>
        </div>

        <div className="checkout-summary">
          <h3 className="checkout-summary-title">Order Summary</h3>
          <div className="checkout-summary-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-summary-item">
                <div className="checkout-summary-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="checkout-summary-info">
                  <div className="checkout-summary-name">{item.name}</div>
                  <div className="checkout-summary-qty">Qty: {item.quantity}</div>
                </div>
                <div className="checkout-summary-price">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary-divider" />
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="checkout-summary-note">
            We'll call you to confirm your order before delivery
          </div>
        </div>

      </div>

    </div>
  )
}

export default Checkout