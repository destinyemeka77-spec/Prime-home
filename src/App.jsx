import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

function App() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    navigate("/cart")
  }

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App