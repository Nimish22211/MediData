import React, { useEffect } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'
function Login() {
    let history = useHistory();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                history.push('/');
                console.log('user logged in')
                console.log(user)
            } else {
                console.log('user logged out')
            }
        })
    }, [])
    return (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
            <img className="workspace" src="images\workspace.png" />
            <h2 className="login-title">Sign in to get access of your data</h2>
            <button id="signIn" onClick={() => signInWithPopup(auth, provider)}>Sign In With Google</button>
        </div>
    )
}

export default Login
