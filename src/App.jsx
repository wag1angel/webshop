import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './pages/ProductList'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [cart, setCart] = useState([])

  function addToCart(product, quantity) {
    setCart(function(prevCart) {
      const existingItem = prevCart.find(function(item) {
        return item.id === product.id
      })
      
      if (existingItem) {
        return prevCart.map(function(item) {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + quantity }
          }
          return item
        })
      }
      
      return [...prevCart, { ...product, quantity }]
    })
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
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
