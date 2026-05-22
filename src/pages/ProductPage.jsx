import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function ProductPage({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(function() {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        setProduct(data)
        setLoading(false)
      })
      .catch(function(err) {
        setError('Något gick fel, försök igen!')
        setLoading(false)
      })
  }, [id])

  return (
    <div>
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error">{error}</p>}
      {product && (
        <div className="product-page">
          <img src={product.thumbnail} alt={product.title} className="product-page-image" />
          <div className="product-page-info">
            <h1>{product.title}</h1>
            <p className="price">{product.price} kr</p>
            <p className="description">{product.description}</p>
            <div className="quantity-selector">
              <button onClick={function() { setQuantity(quantity - 1 < 1 ? 1 : quantity - 1) }}>-</button>
              <span>{quantity}</span>
              <button onClick={function() { setQuantity(quantity + 1) }}>+</button>
            </div>
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
