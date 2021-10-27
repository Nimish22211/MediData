import React from 'react'
import './Header.css'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom'

function Header({ cartItems }) {
    let items = cartItems.filter(item => item.quantity > 0).length
    console.log(cartItems)
    return (
        <header className="header_flex">
            <Link to="/"> <h1>MediData - <strong>Bandha Medicos</strong></h1></Link>
            <div className="basket">
                <Link to="/cart">
                    <ShoppingBasketIcon />
                    <sub>{items}</sub>
                </Link>
            </div>
        </header>
    )
}

export default Header
