const initialState = {
    count: 5,
}

const myReducer = (state = initialState, action) => {
    if (action.type == 'INCREMENT') {
        return { ...state, count: state.count + 1 };
    } else if (action.type == 'DECREMENT') {
        return { ...state, count: state.count - 1 };
    } else {
        return state;
    }
};

export default myReducer;