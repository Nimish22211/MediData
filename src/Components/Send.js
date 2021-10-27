import React, { useState } from 'react'
import { FormControl, TextField, Button } from '@mui/material';
import './Send.css'
function Send({ cartItems }) {
    // const [message, setMessage] = useState(JSON.stringify(cartItems));
    let items = cartItems.filter(item => item.quantity > 0);
    // console.log(message)
    let messageString = items.map(item => 'Name-' + item.medicine + '  Quantity-' + item.quantity + "%0a")
    const [message, setMessage] = useState(messageString);
    const sendMessage = () => {
        var url = "https://wa.me/919569722211?text=" + message;
        window.open(url, '_blank');
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Send Message</h1>
            <FormControl className="sendForm">
                <TextField multiline type="text" label="Message" style={{ width: '500px' }}
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                <br />
                <Button onClick={() => sendMessage()} variant="contained">Send</Button>
            </FormControl>
        </div>
    )
}

export default Send
