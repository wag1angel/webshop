import { useState, useEffect } from "react"
// useParams läser av ID:t från URL:en, t.ex. /products/3 ger id = "3"
import { useParams } from "react-router-dom"

// Tar emot addToCart som prop från App.jsx
function ProductPage({ addToCart }) {
  // Hämtar produkt-ID:t från URL:en
  const { id } = useParams()
  // Sparar den hämtade produkten — börjar som null eftersom vi väntar på en enda produkt
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Sparar vald kvantitet — börjar på 1 eftersom man alltid vill köpa minst en
  const [quantity, setQuantity] = useState(1)

  // Hämtar produkten från API:et när sidan laddas eller när id ändras
  // [id] betyder att useEffect körs igen om användaren navigerar till en annan produkt
  useEffect(function() {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        setProduct(data) // Sparar produkten i state
        setLoading(false)
      })
      .catch(function(err) {
        // Fångar nätverksfel och visar felmeddelande istället för att krascha
        setError('Något gick fel, försök igen!')
        setLoading(false)
      })
  }, [id])

  return (
    <div>
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error">{error}</p>}
      {/* Visar bara produktinformationen om product inte är null */}
      {product && (
        <div className="product-page">
          <img src={product.thumbnail} alt={product.title} className="product-page-image" />
          <div className="product-page-info">
            <h1>{product.title}</h1>
            <p className="price">{product.price} kr</p>
            <p className="description">{product.description}</p>
            <div className="quantity-selector">
              {/* Ternary-operator säkerställer att quantity aldrig går under 1 */}
              <button onClick={function() { setQuantity(quantity - 1 < 1 ? 1 : quantity - 1) }}>-</button>
              <span>{quantity}</span>
              <button onClick={function() { setQuantity(quantity + 1) }}>+</button>
            </div>
            {/* Anropar addToCart från App.jsx med produkten och vald kvantitet */}
            <button className="add-to-cart-large" onClick={function() { addToCart(product, quantity) }}>
              Lägg i kundvagn
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage