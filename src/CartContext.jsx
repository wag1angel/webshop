import { createContext, useContext, useState } from 'react'

// Skapar Context-objektet som komponenter kan prenumerera på
const CartContext = createContext()

// Custom hook för att enkelt hämta cart-datan i vilken komponent som helst
export function useCart() {
  return useContext(CartContext)
}

// Provider-komponenten som omsluter appen och delar cart-datan
export function CartProvider({ children }) {
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
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}