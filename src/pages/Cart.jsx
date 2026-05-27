// useNavigate används för att navigera programmatiskt — skickar användaren till kassan via kod
import { useNavigate } from "react-router-dom"

// Tar emot cart som prop från App.jsx — innehåller alla produkter användaren lagt till
function Cart({ cart }) {
  const navigate = useNavigate()

  return (
    <div className="cart-page">
      <h1>Varukorg</h1>
      {/* Visar meddelande om kundvagnen är tom */}
      {cart.length === 0 && <p className="cart-empty">Kundvagnen är tom!</p>}
      {/* Loopar igenom alla produkter i kundvagnen och visar dem */}
      {cart.map(function(item) {
        return (
          // key behövs av React för att hålla koll på varje unik rad i listan
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-info">
              <h2>{item.title}</h2>
              <p className="price">{item.price} kr</p>
              <p className="quantity">Antal: {item.quantity}</p>
            </div>
          </div>
        )
      })}
      {/* Visar totalpris och kassaknapp bara om kundvagnen inte är tom */}
      {cart.length > 0 && (
        <div className="cart-total">
          {/* reduce räknar ihop totalpriset — pris * antal för varje produkt */}
          <p>Totalt: {cart.reduce(function(total, item) {
            return total + item.price * item.quantity
          }, 0)} kr</p>
          {/* navigate('/checkout') skickar användaren till kassan utan en klickbar länk */}
          <button className="checkout-btn" onClick={function() { navigate('/checkout') }}>
            Till kassan
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart