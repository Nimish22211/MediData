import React, { useEffect } from 'react'
import './Header.css'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useHistory, useLocation } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
function Header({ cartItems, user }) {
    let items = cartItems.filter(item => item.quantity > 0).length;
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                // history.push('/');
                return
            } else {
                history.push('/login');
            }
        })
    }, [location.pathname])
    const handleSignOut = () => {
        let confirm = window.confirm('Are you sure you want to sign out?');
        if (confirm) {
            signOut(auth);
            history.push('/login');
        }
    }
    return (
        <header className="header_flex">
            <Link to="/"> <h1>MediData - <strong>Bandha Medicos</strong></h1></Link>
            <div className="rightBox">
                {user && <div className="userInfo" onClick={handleSignOut}><div>{user.name}</div> <img src={user.photoURL} width="35px" style={{ marginLeft: '10px' }} /></div>}
                <div className="basket">
                    <Link to="/cart">
                        <ShoppingBasketIcon />
                        <sub>{items}</sub>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
