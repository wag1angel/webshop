import { useState, useEffect } from "react"
// Link används för att navigera till produktsidan utan att ladda om sidan
import { Link } from "react-router-dom"

function ProductList() {
  // Sparar alla produkter hämtade från API:et — börjar som tom array
  const [products, setProducts] = useState([])
  // Visar "Laddar..." medan API-anropet pågår — börjar som true
  const [loading, setLoading] = useState(true)
  // Sparar felmeddelande om API-anropet misslyckas — börjar som null
  const [error, setError] = useState(null)
  // Uppdateras direkt när användaren skriver i sökfältet
  const [search, setSearch] = useState('')
  // Uppdateras först efter 500ms — används för att filtrera produkterna (debounce)
  const [debounceSearch, setDebounceSearch] = useState('')

  // Hämtar alla produkter från DummyJSON när sidan laddas
  // [] i slutet betyder att useEffect bara körs en gång
  useEffect(function() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products) // Sparar produkterna i state
        setLoading(false) // Stänger av laddningsindikatorn
      })
      .catch(err => {
        // Om något går fel visas ett felmeddelande istället för att appen kraschar
        setError('Något gick fel, försök igen!')
        setLoading(false)
      })
  }, [])

  // Debounce — väntar 500ms efter att användaren slutat skriva innan sökningen körs
  // [search] betyder att useEffect körs varje gång search ändras
  useEffect(function() {
    const timer = setTimeout(() => {
      setDebounceSearch(search) // Uppdaterar sökordet efter 500ms
    }, 500);
    return function() {
      clearTimeout(timer) // Avbryter timern om användaren skriver en ny bokstav
    }
  }, [search])

  // Filtrerar produkterna baserat på debounceSearch — körs inte för varje bokstav
  const filteredProducts = products.filter(function(product) {
    // toLowerCase() gör sökningen skiftlägeskänslig — "iphone" hittar "iPhone"
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
          // Uppdaterar search direkt vid varje knapptryckning
          onChange={function(e) { setSearch(e.target.value) }}
        />
      </div>
      
      <div className="section-title">
        <span>Vårt Sortiment</span>
        <h2>Alla Produkter</h2>
      </div>
      
      {/* Visar laddningstext medan produkterna hämtas */}
      {loading && <p className="loading">Laddar...</p>}
      {/* Visar felmeddelande om fetch misslyckades */}
      {error && <p className="error">{error}</p>}
      
      <div className="product-grid">
        {/* Loopar igenom filtrerade produkter och skapar ett kort för varje */}
        {filteredProducts.map(function(product) {
          return (
            // Link skickar användaren till produktsidan med produktens ID i URL:en
            // key behövs av React för att hålla koll på varje unikt kort i listan
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