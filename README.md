Webshop — React Project
En fungerande webshop byggd med React och Vite. Hämtar produkter från DummyJSON API och har en komplett kundvagn och kassaflöde.
Installation

Klona projektet:

bashgit clone https://github.com/wag1angel/webshop.git

Gå in i mappen:

bashcd webshop

Installera dependencies:

bashnpm install

Starta projektet:

bashnpm run dev
Öppna http://localhost:5173 i webbläsaren.
Funktioner

Produktlista hämtad från DummyJSON API
Produktsida med detaljerad information
Lägg till produkter i kundvagnen och justera kvantitet
Kundvagn med totalpris
Kassasida med orderformulär och orderbekräftelse
Sökfunktion med debounce

Tekniker

React med Vite
React Router för navigering mellan sidor
Fetch API för API-anrop
Vanilla CSS för styling

Debounce
Sökfunktionen använder debounce med setTimeout på 500ms. När användaren skriver i sökfältet startas en timer — om användaren fortsätter skriva avbryts timern och startas om. Filtreringen körs först när användaren slutat skriva i 500ms. Detta förhindrar onödiga renderingar för varje bokstav.
Felhantering med try...catch
Alla API-anrop i useEffect är wrappade med .catch() för att fånga nätverksfel. Om ett anrop misslyckas visas ett felmeddelande för användaren istället för att appen kraschar.