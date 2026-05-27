// Importerar useState för att hantera kundvagnens state
import { useState } from 'react'
// Importerar React Router-komponenter för att hantera navigering
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './pages/ProductList'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  // cart ligger här i App.jsx så att alla sidor kan komma åt den via props
  // Om den låg i Cart.jsx skulle den försvinna när användaren byter sida
  const [cart, setCart] = useState([])

  // Funktion som lägger till en produkt i kundvagnen
  // Tar emot produkten och hur många användaren vill köpa
  function addToCart(product, quantity) {
    setCart(function(prevCart) {
      // Kollar om produkten redan finns i kundvagnen
      const existingItem = prevCart.find(function(item) {
        return item.id === product.id
      })
      
      if (existingItem) {
        // Om produkten redan finns — öka kvantiteten istället för att lägga till dubblett
        return prevCart.map(function(item) {
          if (item.id === product.id) {
            // Spread-operatorn (...) kopierar alla befintliga värden och uppdaterar quantity
            return { ...item, quantity: item.quantity + quantity }
          }
          return item
        })
      }
      
      // Om produkten inte finns — lägg till den som ny rad i kundvagnen
      return [...prevCart, { ...product, quantity }]
    })
  }

  return (
    // BrowserRouter aktiverar React Router för hela appen
    <BrowserRouter>
      <div className="app">
        {/* Navbar får cart som prop för att visa antal varor i kundvagnsikonen */}
        <Navbar cart={cart} />
        <main>
          {/* Routes bestämmer vilken komponent som visas baserat på URL:en */}
          <Routes>
            <Route path="/" element={<ProductList />} />
            {/* :id i URL:en hämtas med useParams i ProductPage */}
            <Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
            {/* cart skickas ner som prop så Cart-sidan kan visa produkterna */}
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App