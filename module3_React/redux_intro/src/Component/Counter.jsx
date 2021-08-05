import React from 'react';
// import { useState } from 'react';
import { connect } from 'react-redux';

const Counter = (props) => {
    // const [count, setCount] = useState(5);

    return (<div>
        <h1>Counter</h1>
        <p>{props.count}</p>
        <button onClick={() => { props.increment(); }}>+</button>
        <button onClick={() => { props.decrement(); }}>-</button>
    </div>);
}

// export default Counter;
const mapStateToProps = (store) => {
    // console.log("in map state to props", store);
    return { count: store.count };
}

const mapDispatchToProps = (dispatch) => {
    // console.log("in map dispatch to props", dispatch);
    return {
        increment: () => { dispatch({ type: "INCREMENT" }) },
        decrement: () => { dispatch({ type: "DECREMENT" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);