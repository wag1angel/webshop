# 🛒 Yonis-Butik - Webshop med React

En fungerande webshop byggd med React och Vite som hämtar produkter från DummyJSON API med en komplett kundvagn och kassaflöde.

## 🌐 Live Demo
👉 https://github.com/wag1angel/webshop

---

## 🎯 Projektbeskrivning

En modern webshop där användare kan:

- 📦 Bläddra bland produkter hämtade från ett externt API
- 🔍 Söka efter produkter med en debounce-funktion
- 🛍️ Klicka på en produkt och se detaljerad information
- ➕ Välja kvantitet och lägga till produkter i kundvagnen
- 🧾 Se en orderöversikt med totalpris
- ✅ Fylla i namn och adress och slutföra en order

---

## 🚀 Installation

1. Klona projektet:
```bash
git clone https://github.com/wag1angel/webshop.git
```

2. Gå in i mappen:
```bash
cd webshop
```

3. Installera dependencies:
```bash
npm install
```

4. Starta projektet:
```bash
npm run dev
```

Öppna `http://localhost:5173` i webbläsaren.

---

## ✨ Funktioner

### 🔍 Sökfunktion med Debounce
Sökfältet använder debounce med `setTimeout` på 500ms. Istället för att filtrera produkter för varje bokstav användaren skriver — väntar koden tills användaren slutat skriva i 500ms.

```javascript
useEffect(function() {
  const timer = setTimeout(() => {
    setDebounceSearch(search)
  }, 500)
  return function() {
    clearTimeout(timer) // Avbryt gamla timern vid ny bokstav
  }
}, [search])
```

**Varför?** Förhindrar onödiga renderingar och ger en smidigare upplevelse.

### ⚠️ Felhantering med try...catch
Alla API-anrop hanterar fel med `.catch()` i useEffect för att visa ett felmeddelande istället för att krascha appen.

```javascript
useEffect(function() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data.products)
      setLoading(false)
    })
    .catch(err => {
      setError('Något gick fel, försök igen!')
      setLoading(false)
    })
}, [])
```

### 🛒 Kundvagnslogik
Kundvagnen hanteras i `App.jsx` med `useState` så att datan delas mellan alla sidor. Om en produkt redan finns i kundvagnen ökas kvantiteten istället för att lägga till en dubblett.

```javascript
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
```

---

## 🛠️ Tekniker

- **React** med Vite
- **React Router** för navigering mellan sidor
- **useState & useEffect** för tillståndshantering och sidoeffekter
- **useParams** för att hämta produkt-ID från URL:en
- **useNavigate** för programmatisk navigering
- **Fetch API** för API-anrop mot DummyJSON
- **Vanilla CSS** för styling

---

## 📂 Projektstruktur

```
📦 webshop/
├── 📄 index.html
├── 📄 package.json
└── 📁 src/
    ├── 📄 App.jsx          # Routing och kundvagnslogik
    ├── 📄 main.jsx         # Startpunkt
    ├── 📄 index.css        # Global styling
    ├── 📁 components/
    │   ├── 📄 Navbar.jsx   # Navigation med kundvagnsbadge
    │   └── 📄 Footer.jsx   # Footer med länkar
    └── 📁 pages/
        ├── 📄 ProductList.jsx  # Produktlista med sök
        ├── 📄 ProductPage.jsx  # Produktdetaljer
        ├── 📄 Cart.jsx         # Kundvagn
        └── 📄 Checkout.jsx     # Kassa och orderbekräftelse
```

---

## 🧗 Utmaningar & Lösningar

### Utmaning 1: Dela kundvagnen mellan sidor
**Problem:** Kundvagnen behövde vara tillgänglig på både produktsidan, kundvagnssidan och kassasidan.

**Lösning:** Skapa `cart` staten i `App.jsx` och skicka ner den som props till de sidor som behöver den.

```javascript
<Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
<Route path="/cart" element={<Cart cart={cart} />} />
```

### Utmaning 2: Hämta rätt produkt baserat på URL
**Problem:** Produktsidan behövde veta vilket produkt-ID som stod i URL:en för att hämta rätt produkt från API:et.

**Lösning:** `useParams` från React Router läser av ID:t från URL:en.

```javascript
const { id } = useParams() // Hämtar "3" från /products/3
fetch(`https://dummyjson.com/products/${id}`)
```

### Utmaning 3: Navigera programmatiskt
**Problem:** Efter att användaren klickat "Till kassan" behövde vi skicka dem vidare utan en klickbar länk.

**Lösning:** `useNavigate` från React Router.

```javascript
const navigate = useNavigate()
<button onClick={function() { navigate('/checkout') }}>
  Till kassan
</button>
```

---

## 🎓 Skolprojekt — React & Avancerad JavaScript

### Uppfyllda krav:

**Funktionalitet:**
- ✅ Produktlista hämtad från DummyJSON API
- ✅ Produktsida med detaljerad information och kvantitetsväljare
- ✅ Kundvagn med totalpris
- ✅ Orderöversikt med formulär och bekräftelse

**Tekniska krav:**
- ✅ React med Vite och funktionella komponenter
- ✅ React Router för navigering
- ✅ Fetch API med felhantering i useEffect
- ✅ Debounce-funktion för sökfältet
- ✅ useState och useEffect för tillståndshantering

**Kodkvalitet:**
- ✅ Välorganiserad mappstruktur
- ✅ Separata komponenter för varje sida
- ✅ Delad state i App.jsx för kundvagnen

---

## 📧 Kontakt

**Yonis Yusuf**
📧 yonis.yusuf1@outlook.com
💼 [GitHub](https://github.com/wag1angel)

---

*Skapat som examinationsprojekt i React & Avancerad JavaScript — Företagsuniversitetet Stockholm 2025*