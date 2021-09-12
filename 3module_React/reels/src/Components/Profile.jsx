import React, { useState } from 'react'
import { useEffect } from 'react';
import { firebaseDB, firebaseStorage } from "../config/firebase";

export default function Profile() {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState(null);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        let users = firebaseDB.collection ('users').doc().get().then ((data) => data.data());
    }, [])
    return (
        <div>
            Profile
        </div>
    )
}
