import { actionTypes } from "redux-firestore"

export default contactReducer = (state = initialState, action) => {
    switch (action.types) {
        case actionTypes.ADD_CONTACT:
            return update(state, { $set: action.contactSection });
        case actionTypes.UPDATE_CONTACT:
            return update(state, { $merge: action.contactSection });
        default:
            return state;
    }
}