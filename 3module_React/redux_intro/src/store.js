import { applyMiddleware, createStore } from "redux";
import myReducer from './Reducers/myReducer';
import thunk from 'redux-thunk';
import { getFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(myReducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
));

export default store;