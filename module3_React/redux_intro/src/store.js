import { createStore } from 'redux';
import myReducer from './Reducres/myReducer';

const store = createStore (myReducer);

export default store;