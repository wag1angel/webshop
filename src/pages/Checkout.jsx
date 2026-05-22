import { useState } from "react"

function Checkout({ cart }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [ordered, setOrdered] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setOrdered(true)
  }

  return (
    <div className="checkout-page">
      <h1>Kassa</h1>
      {ordered ? (
        <div className="order-success">
          <h2>Tack för din order, {name}!</h2>
          <p>Din order skickas till {address}</p>
        </div>
      ) : (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Namn</label>
            <input
              type="text"
              value={name}
              onChange={function(e) { setName(e.target.value) }}
              placeholder="Ditt namn"
            />
          </div>
          <div className="form-group">
            <label>Adress</label>
            <input
              type="text"
              value={address}
              onChange={function(e) { setAddress(e.target.value) }}
              placeholder="Din leveransadress"
            />
          </div>
          <button type="submit" className="submit-btn">Lägg order</button>
        </form>
      )}
    </div>
  )
}

export default Checkout
