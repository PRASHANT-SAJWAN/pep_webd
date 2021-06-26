import React, { useState, useEffect, Component } from 'react';
import firebaseAuth from '../config/firebase';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        try {
            let response = await firebaseAuth.signInWithEmailAndPassword(email, password);
            let uid = response.user.uid;
            if (uid) {
                setUser(uid);
                setMessage("");
            }
        } catch (err) {
            setMessage(err.message);
        }
    }

    const handleLogout = async () => {
        setUser(null);
        await firebaseAuth.signOut();
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.uid);
            }
        });

    }, []);

    return (user ?
        <div>
            <h1>Welcome {user}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        :
        <div>
            <h1>FireBase Login</h1>
            <div>
                Email <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div>
                Password <input value={password} type="text" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button onClick={handleLogin}>Login</button>
            <h1 style={{color: "red"}}>{message}</h1>
        </div>
    );
}

export default Login;