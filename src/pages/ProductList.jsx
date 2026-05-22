import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')

  useEffect(function() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch(err => {
        setError('Något gick fel, försök igen!')
        setLoading(false)
      })
  }, [])

  useEffect(function() {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 500);
    return function() {
      clearTimeout(timer)
    }
  }, [search])

  const filteredProducts = products.filter(function(product) {
    return product.title.toLowerCase().includes(debounceSearch.toLowerCase())
  })

  return (
    <div>
      <div className="hero">
        <h1>Välkommen till Yonis-Butik</h1>
        <p>Utforska vårt breda sortiment av kvalitetsprodukter</p>
      </div>
      
      <div className="search-container">
        <input 
          type="text"
          className="search-input"
          placeholder="Sök produkt..."
          value={search}
          onChange={function(e) { setSearch(e.target.value) }}
        />
      </div>
      
      <div className="section-title">
        <span>Vårt Sortiment</span>
        <h2>Alla Produkter</h2>
      </div>
      
      {loading && <p className="loading">Laddar...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="product-grid">
        {filteredProducts.map(function(product) {
          return (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} className="product-card-image" />
              <div className="product-card-content">
                <span className="product-category">{product.category}</span>
                <h3>{product.title}</h3>
                <p className="description">{product.description.substring(0, 60)}...</p>
                <div className="product-card-footer">
                  <span className="product-price">{product.price} <span>kr</span></span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList
