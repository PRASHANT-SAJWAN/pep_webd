import React, { useState, useEffect } from 'react'

function UseEffect() {
    const [dataType, setDataType] = useState("Posts");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${dataType}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [dataType])

    return (
        <div>
            <button onClick={() => setDataType("Posts")}>Post</button>
            <button onClick={() => setDataType("Comments")}>Comments</button>
            <button onClick={() => setDataType("Albums")}>Albums</button>
            <div>{dataType}</div>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}

export default UseEffect;