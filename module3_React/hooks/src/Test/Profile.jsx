import React, { useState } from 'react';

const Profile = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <h2>
                    Name: {name}, Age: {age}
                </h2>
            </form>
        </div>
    );
}

export default Profile;