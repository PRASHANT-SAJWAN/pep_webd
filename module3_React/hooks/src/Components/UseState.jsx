import React, { useState } from 'react';

const UseState = () => {
  const [count, setCount] = useState(1);

  return (<div>
    <p>{count}</p>
    <p>{color}</p>
    <button onClick={() => setCount(count => count + 1)}>+</button>
    <button onClick={() => setCount(count => count - 1)}>-</button>
  </div>);
}

export default UseState;