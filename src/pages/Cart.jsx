import { Link } from "react-router-dom"
import "../styles/Cart.css"

export default function Cart({ cart, updateQuantity, removeItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-sub">Add some products to get started</p>
        <Link to="/" className="cart-empty-btn">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart">

      <div className="cart-hero">
        <h1 className="cart-hero-title">Your <em>Cart</em></h1>
        <p className="cart-hero-sub">{cart.length} item{cart.length > 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="cart-body">

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <span className="cart-item-category">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <div className="cart-item-price">₦{item.price.toLocaleString()}</div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-total">₦{(item.price * item.quantity).toLocaleString()}</div>
                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕ Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <div className="cart-summary-rows">
            {cart.map(item => (
              <div key={item.id} className="cart-summary-row">
                <span>{item.name} x{item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="cart-summary-divider" />
          <div className="cart-summary-total">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="cart-checkout-btn">Proceed to Checkout</Link>
          <Link to="/" className="cart-continue">← Continue Shopping</Link>
        </div>

      </div>

    </div>
  )
}