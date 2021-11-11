import React from 'react'
import './ItemContainer.css'
import db from '../firebase'
import { selectSearchTerm } from '../ReduxState/SearchTerm'
import { useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function ItemContainer({ items, cartItems, user }) {
    items = items.map((item) => ({ ...item, itemInCart: cartItems }))
    //* itemInCart will return all the items in cart then in map function below with the help of i we will get the item which needs to be deleted
    let searchTerm = useSelector(selectSearchTerm)
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
            if (newQty >= 0) {
                db.collection('cart').doc(cartItemId).update({ quantity: newQty });
            }
        })
    }
    const handleDelete = (itemId, cartItem) => {
        // itemId - id of item to be deleted from medicines collection
        // cartItem - item to be deleted from cart collection 
        // then in cartItem -> cartItem.cartId - id of cart item to be deleted
        db.collection('medicines').doc(itemId).delete()
        db.collection('cart').doc(cartItem.cartId).delete()
    }
    return (
        <div>
            <table>
                <thead className="heading">
                    <tr >
                        <th className="number">Sno</th>
                        <th className="item">Item</th>
                        <th className="quant">Quantity</th>
                        <th className="order">Quantity in Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.email === "shailbandha@gmail.com" && items.filter(item => {
                        if (!searchTerm.match(/\w/)) {
                            return item
                        } else if (item.medicine.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return item
                        }
                    }).map((item, i) => (
                        <tr className="table-bottom">
                            <td>{i + 1}</td>
                            <td style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                <div className="itemName">
                                    {item.medicine[0].toUpperCase() + item.medicine.slice(1)}
                                    <DeleteForeverIcon className="deleteBtn" onClick={() => handleDelete(item.id, item.itemInCart[i])} />
                                </div>
                            </td>
                            <td>{item.quantity}</td>
                            <td className="addCart">
                                <div className="dec" onClick={() => handleMinus(item.itemInCart[i].cartId)}>-</div>
                                <div>{item.itemInCart[i].quantity}</div>
                                <div className="inc" onClick={() => handleAdd(item.itemInCart[i].cartId)}>+</div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {items.length === 0 && <h1 style={{ textAlign: 'center' }}>No Items</h1>}
            {user && user.name !== "NIMISH BANDHA" && <h3 style={{ textAlign: 'center', marginTop: "50px" }}>You are not authorized to view this page</h3>}
            {user && user.name == "NIMISH BANDHA" && items.length === 0 && <h2 style={{ textAlign: 'center' }}>Refresh & try again</h2>}
        </div>
    )
}

export default ItemContainer
