import { useState, useRef, useEffect } from "react"
import "../styles/Products.css"

export default function Products({ addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCards, setVisibleCards] = useState(new Set())
  const touchStartX = useRef(null)
  const cardRefs = useRef([])

  const productList = [
    { id: 1, name: "Cast Iron Skillet", category: "Cookware & Pots", price: 89, originalPrice: 120, badge: "Sale", image: "/images/castiron.jpg", desc: "A premium pre-seasoned cast iron skillet perfect for searing, baking, and frying. Built to last a lifetime.", features: ["Pre-seasoned surface", "Even heat distribution", "Oven-safe to 500°F", "Lifetime warranty"] },
    { id: 2, name: "Porcelain Dinner Set", category: "Dinnerware & Plates", price: 124, originalPrice: null, badge: "New", image: "/images/porcelain.jpg", desc: "Elegant porcelain dinner set with a matte ivory glaze. Includes plates, bowls and side dishes for 4.", features: ["Food-safe glaze", "Dishwasher safe", "Microwave safe", "Set of 4 (16 pieces)"] },
    { id: 3, name: "Damascus Chef's Knife", category: "Cutlery & Knives", price: 215, originalPrice: null, badge: null, image: "/images/Damascus.jpg", desc: "Hand-forged Damascus steel chef's knife with a premium walnut handle. Sharp, balanced and beautiful.", features: ["67-layer Damascus steel", "Full tang construction", "Hand-sharpened edge", "Walnut wood handle"] },
    { id: 4, name: "Espresso Machine Pro", category: "Kitchen Appliances", price: 380, originalPrice: 480, badge: "Sale", image: "/images/Expresso.jpg", desc: "Barista-grade espresso machine with 15-bar pressure and a built-in steam wand for lattes and cappuccinos.", features: ["15-bar pump", "Built-in steam wand", "1.5L water tank", "PID temperature control"] },
    { id: 5, name: "Storage Containers", category: "Kitchen", price: 8500, originalPrice: null, badge: null, image: "/images/Storgae.jpg", desc: "Durable airtight storage containers perfect for keeping food fresh and organized in the kitchen.", features: ["Airtight seal", "Durable material", "Multiple sizes", "Easy to clean"] },
    { id: 6, name: "Rechargeable Blender", category: "Appliance", price: 12000, originalPrice: null, badge: "New", image: "/images/blenders.jpg", desc: "Portable rechargeable blender for smoothies, shakes, and juice. Suitable for home, office, and travel.", features: ["USB rechargeable", "Portable design", "Easy to clean", "Travel friendly"] },
    { id: 7, name: "Mini Rechargeable Fan", category: "Appliance", price: 14000, originalPrice: null, badge: null, image: "/images/fan.jpg", desc: "Compact rechargeable fan perfect for use during power outages. Portable and energy saving.", features: ["USB rechargeable", "3 speed settings", "Compact design", "Energy saving"] },
    { id: 8, name: "Solar Light / Bulb", category: "Electronics", price: 9000, originalPrice: null, badge: null, image: "/images/Solar.jpg", desc: "Bright solar rechargeable light for homes and shops. Works without electricity.", features: ["Solar powered", "No electricity needed", "Long battery life", "Weather resistant"] },
    { id: 9, name: "Lunch Box / Flask", category: "Kitchen", price: 7500, originalPrice: null, badge: null, image: "/images/Lunchbox.jpg", desc: "Food flask and lunch box for keeping meals warm or fresh. Ideal for students and workers.", features: ["Keeps food warm", "Leak proof", "Easy to carry", "BPA free"] },
    { id: 10, name: "Extension Box", category: "Electronics", price: 6500, originalPrice: null, badge: null, image: "/images/Extensionbox.jpg", desc: "Strong extension box with multiple sockets for safe connection of home and office devices.", features: ["Multiple sockets", "Surge protection", "Long cable", "Safety certified"] },
    { id: 11, name: "Kitchen Organizers", category: "Kitchen", price: 8000, originalPrice: null, badge: null, image: "/images/Organizers.jpg", desc: "Space-saving kitchen organizers for plates, spices, and utensils. Keeps kitchen neat and tidy.", features: ["Space saving design", "Easy to assemble", "Rust resistant", "Multiple compartments"] },
  ]

  const categories = ["All", ...new Set(productList.map(p => p.category))]
  const filtered = activeCategory === "All" ? productList : productList.filter(p => p.category === activeCategory)

  // Intersection Observer for staggered card entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.id]))
          }
        })
      },
      { threshold: 0.1 }
    )
    cardRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [filtered])

  const handleCardClick = (product) => {
    setSelectedProduct(product)
    setDrawerOpen(true)
    setQuantity(1)
    setAddedToCart(false)
  }

  const handleClose = () => {
    setDrawerOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (e.changedTouches[0].clientX - touchStartX.current > 80) handleClose()
  }

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity })
    setAddedToCart(true)
    setTimeout(() => { setAddedToCart(false); handleClose() }, 1200)
  }

  return (
    <>
      {/* HEADER */}
      <div className="products-header">
        <span className="products-eyebrow">Our Collection</span>
        <h1>Premium <em>Essentials</em></h1>
        <p>Handpicked kitchenware and home products for the modern home.</p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="products-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="products-grid" id="products">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className={`product-card ${visibleCards.has(String(product.id)) ? "product-card--visible" : ""}`}
            style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            data-id={product.id}
            ref={el => cardRefs.current[i] = el}
            onClick={() => handleCardClick(product)}
          >
            <div className="product-card-img">
              {product.badge && (
                <span className={`product-badge ${product.badge === "New" ? "badge-new" : "badge-sale"}`}>
                  {product.badge}
                </span>
              )}
              <img src={product.image} alt={product.name} />
              <div className="product-card-img-overlay">
                <span>View Details</span>
              </div>
            </div>
            <div className="product-card-body">
              <span className="product-card-category">{product.category}</span>
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-desc">{product.desc}</p>
              <div className="product-card-footer">
                <div className="product-card-price">
                  ₦{product.price.toLocaleString()}
                  {product.originalPrice && (
                    <span className="product-card-original">₦{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button className="product-card-btn">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BACKDROP */}
      {drawerOpen && <div className="backdrop" onClick={handleClose} />}

      {/* DRAWER */}
      {drawerOpen && selectedProduct && (
        <div
          className="drawer"
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="drawer-swipe-bar" />
          <button className="drawer-close-btn" onClick={handleClose}>✕ Close</button>

          <div className="drawer-img-wrap">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="drawer-img" />
          </div>

          <span className="drawer-category">{selectedProduct.category}</span>
          <h2 className="drawer-title">{selectedProduct.name}</h2>

          <div className="drawer-price">
            ₦{selectedProduct.price.toLocaleString()}
            {selectedProduct.originalPrice && (
              <span className="drawer-original">₦{selectedProduct.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="drawer-desc">{selectedProduct.desc}</p>

          <h4 className="drawer-section-title">Features</h4>
          <ul className="drawer-features">
            {selectedProduct.features.map((f, i) => (
              <li key={f} style={{ animationDelay: `${i * 80}ms` }}>{f}</li>
            ))}
          </ul>

          <h4 className="drawer-section-title">Quantity</h4>
          <div className="drawer-qty">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <p className="drawer-total">
            Total: <strong>₦{(selectedProduct.price * quantity).toLocaleString()}</strong>
          </p>

          <button
            className={`drawer-add-btn ${addedToCart ? "drawer-add-btn--success" : ""}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      )}
    </>
  )
}