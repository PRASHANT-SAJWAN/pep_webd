import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";


const rootReducer = (state = {}, action) => {
    if (action.type === 'SIGN_OUT') {
        state = undefined
    }
    return state
}
export default rootReducer;