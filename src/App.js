import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import InputSection from './Components/InputSection';
import ItemContainer from './Components/ItemContainer';
import db from './firebase';
import Cart from './Components/Cart';
import Send from './Components/Send';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Components/Login';
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('cart').orderBy('medicine', 'asc').onSnapshot(snapshot => {
      setCartItems(snapshot.docs.map(doc => ({ ...doc.data(), cartId: doc.id })))
    })
    db.collection('medicines').orderBy('medicine', 'asc').onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, medicine: doc.data().medicine, quantity: doc.data().quantity })))
      setLoading(false)
      // setNoItems(false)
    })

    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        })
        // console.log(user)
      } else {
        setUser(null)
      }
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Header cartItems={cartItems} user={user} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <InputSection />
          <ItemContainer items={items} cartItems={cartItems} user={user} />
        </Route>
        <Route path="/cart">
          <Cart cartItems={cartItems} items={items} user={user} />
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
