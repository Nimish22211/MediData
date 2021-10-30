import React, { useState } from 'react'
import './InputSection.css'
import db from '../firebase'
import { setSearchTerm } from '../ReduxState/SearchTerm'
import { useDispatch } from 'react-redux'
function InputSection() {
    let dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [quantity, setQuantity] = useState(1);
    const medInput = (e) => {
        e.preventDefault();
        db.collection('cart').add({
            medicine: input,
            quantity: 0
        })
        db.collection('medicines').add({
            medicine: input,
            quantity: quantity,
        })//* add items to medicines collection 
        //* add items to cart collection (along with medicines collection)
        setInput('');
        setQuantity(1)
    }
    const quantInput = (e) => {
        let val = e.target.value;
        setQuantity(val);
    }
    return (
        <div className="inputs">
            <form>
                <input type="text" placeholder="Add a medicine" value={input} onChange={(e) => { setInput(e.target.value) }} />
                {input.match(/\w+/) ? <input type="number" min="1" placeholder="Add a quantity" value={quantity} onChange={quantInput} style={{ marginLeft: '10px', width: '150px' }} /> : <input type="text" value="" placeholder="Add a quantity" style={{ marginLeft: '10px', width: '150px' }} />}
                {input.match(/\w+/) && quantity !== 0 ? <button type="submit" onClick={medInput}>Add</button> : <button disabled>No Name</button>}
            </form>
            <div>
                <input type="text" placeholder="Search a medicine" onChange={e => dispatch(setSearchTerm(e.target.value))} />
                <select>
                    <option value="Filter" defaultValue disabled>Filter</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>
            </div>
        </div >
    )
}

export default InputSection
