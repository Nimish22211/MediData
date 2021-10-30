import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import InputSection from './Components/InputSection';
import ItemContainer from './Components/ItemContainer';
import db from './firebase';
import Cart from './Components/Cart';
import Send from './Components/Send';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([])
  // const [quantity, setQuantity] = useState([])
  const [loading, setLoading] = useState(true)
  // const [noItems, setNoItems] = useState(false)
  const [cartItems, setCartItems] = useState([])
  // console.log(itemsQuant);

  useEffect(() => {
    // if (items.length === 0) {
    db.collection('cart').orderBy('medicine', 'asc').onSnapshot(snapshot => {
      setCartItems(snapshot.docs.map(doc => ({ ...doc.data(), cartId: doc.id })))
    })
    db.collection('medicines').orderBy('medicine', 'asc').onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, medicine: doc.data().medicine, quantity: doc.data().quantity })))
      setLoading(false)
      // setNoItems(false)
    })
    db.collection('medicines').get().then(snap => {
      let size = snap.size // will return the collection size
      if (size === 0) {
        // setNoItems(true)
      }
    });
    // }
  }, [])
  console.log(cartItems)
  // [{id:1, name:a, quantity:1},{id:2, name:b, quantity:1},{id:3, name:c, quantity:1},{id:4, name:d, quantity:1}]
  // console.log(items)
  return (
    <div className="App">
      <Router>
        <Header cartItems={cartItems} />
        <Route path="/" exact>
          <InputSection items={items} />
          <ItemContainer items={items} cartItems={cartItems} />
        </Route>
        <Route path="/cart">
          <Cart cartItems={cartItems} items={items} />
        </Route>
        <Route path="/send">
          <Send cartItems={cartItems} />
        </Route>
      </Router>
      {loading && <h1 style={{ textAlign: 'center' }}>Loading...</h1>}
    </div>
  );
}

export default App;
