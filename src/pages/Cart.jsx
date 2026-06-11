import { useNavigate } from "react-router-dom"
import { useCart } from '../CartContext'

function Cart() {
  // Hämtar cart direkt från Context — behöver inte props längre
  const { cart } = useCart()
  const navigate = useNavigate()

  return (
    <div className="cart-page">
      <h1>Varukorg</h1>
      {cart.length === 0 && <p className="cart-empty">Kundvagnen är tom!</p>}
      {cart.map(function(item) {
        return (
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
      {cart.length > 0 && (
        <div className="cart-total">
          <p>Totalt: {cart.reduce(function(total, item) {
            return total + item.price * item.quantity
          }, 0)} kr</p>
          <button className="checkout-btn" onClick={function() { navigate('/checkout') }}>
            Till kassan
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart