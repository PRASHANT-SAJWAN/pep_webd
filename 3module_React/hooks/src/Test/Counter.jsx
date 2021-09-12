import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(prevCount => prevCount + 1)}> Count: {count}</button>
        </div>
    );
}

export default Counter;