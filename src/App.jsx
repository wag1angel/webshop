// React Router-komponenter för navigering
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// CartProvider omsluter appen och delar cart-datan via Context
import { CartProvider } from './CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './pages/ProductList'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    // CartProvider omsluter hela appen så alla komponenter kan komma åt cart
    <CartProvider>
      <BrowserRouter>
        <div className="app">
          {/* Navbar hämtar cart från Context — behöver inte props längre */}
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              {/* ProductPage hämtar addToCart från Context — behöver inte props längre */}
              <Route path="/products/:id" element={<ProductPage />} />
              {/* Cart hämtar cart från Context — behöver inte props längre */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App