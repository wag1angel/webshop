import { Link } from 'react-router-dom'

function Navbar({ cart }) {
  const cartCount = cart.reduce(function(total, item) {
    return total + item.quantity
  }, 0)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L4 8v16l12 6 12-6V8L16 2z" fill="#5A9BD5"/>
          <path d="M16 6L8 10v12l8 4 8-4V10l-8-4z" fill="#A2D2FF"/>
          <path d="M16 10l-4 2v6l4 2 4-2v-6l-4-2z" fill="#fff"/>
        </svg>
        YONIS-BUTIK
      </Link>
      
      <div className="navbar-links">
        <Link to="/">Produkter</Link>
      </div>
      
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
