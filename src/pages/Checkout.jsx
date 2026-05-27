import { useState } from "react"

// Tar emot cart som prop från App.jsx
function Checkout({ cart }) {
  // Sparar vad användaren skriver i namnfältet
  const [name, setName] = useState('')
  // Sparar vad användaren skriver i adressfältet
  const [address, setAddress] = useState('')
  // Håller koll på om ordern är lagd — byter från false till true när formuläret skickas
  const [ordered, setOrdered] = useState(false)

  function handleSubmit(e) {
    // Stoppar webbläsaren från att ladda om sidan när formuläret skickas
    e.preventDefault()
    // Byter ordered till true — visar bekräftelsen istället för formuläret
    setOrdered(true)
  }

  return (
    <div className="checkout-page">
      <h1>Kassa</h1>
      {/* Ternary-operator — om ordered är true visas bekräftelsen, annars formuläret */}
      {ordered ? (
        <div className="order-success">
          <h2>Tack för din order, {name}!</h2>
          <p>Din order skickas till {address}</p>
        </div>
      ) : (
        // onSubmit anropar handleSubmit när användaren klickar "Lägg order"
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Namn</label>
            {/* value och onChange håller input-fältet synkat med name-staten */}
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