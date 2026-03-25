import Hero from "../components/Hero"
import Products from "./Products"

export default function Home({ addToCart }) {
  return (
    <>
      <Hero />
      <div id="products">
        <Products addToCart={addToCart} />
      </div>
    </>
  )
}