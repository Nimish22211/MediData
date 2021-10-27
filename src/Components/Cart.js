import React from 'react'
import './Cart.css'
import db from '../firebase'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Cart({ cartItems }) {
    let items = cartItems.filter(item => item.quantity > 0);
    const handleAdd = (cartItemId) => {
        db.collection('cart').doc(cartItemId).get().then(doc => {
            var prev = doc.data().quantity;
            var newQty = prev + 1;
            db.collection('cart').doc(cartItemId).update({ quantity: newQty });
        })
    }
    const handleMinus = (cartItemId) => {
        db.collection('cart').doc(cartItemId).get().then(doc => {
            var prev = doc.data().quantity;
            var newQty = prev - 1;
            db.collection('cart').doc(cartItemId).update({ quantity: newQty });
        })
    }
    const handleDelete = (cartItemId) => {
        db.collection('cart').doc(cartItemId).get().then(doc => {
            var prev = doc.data().quantity;
            var newQty = prev - prev;
            db.collection('cart').doc(cartItemId).update({ quantity: newQty });
        })
    }
    return (
        <div className="cartDiv">
            <div className="cartHeader">
                <h1 className="cartTitle">Cart</h1>
                <Link to="/send"><button>Send</button></Link>
            </div>
            <div className="cartItemsDiv">
                <div className="cartBox">
                    <h4 className="cartItemName">Item</h4>
                    <h4 className="cartItemQuantity">Quantity</h4>
                    <h4 className="cartItemEdit">Edit</h4>
                </div>
                {items.map(item => <div className="cartItem">
                    <div>{item.medicine}</div>
                    <div>{item.quantity}</div>
                    <div className="cartEdit">
                        <div onClick={() => handleMinus(item.cartId)} className="dec" style={{ textAlign: 'center' }}>-</div>
                        <div onClick={() => handleAdd(item.cartId)} className="inc" style={{ textAlign: 'center' }}>+</div>
                        <div onClick={() => handleDelete(item.cartId)}><DeleteForeverIcon className="deleteBtn" /></div>
                    </div>
                </div>)}
            </div>
            {items.length === 0 && <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Cart is empty</h2>}

        </div>
    )
}

export default Cart
