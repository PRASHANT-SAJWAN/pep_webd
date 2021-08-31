import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

// Ye extension hame yaad rakni hai 
import { composeWithDevTools } from 'redux-devtools-extension'
var firebaseConfig = {
  apiKey: "AIzaSyAhkdX5UBKkgD5EGdmkQVLTfyHUImbWTOw",
  authDomain: "resume-builder-238d0.firebaseapp.com",
  projectId: "resume-builder-238d0",
  storageBucket: "resume-builder-238d0.appspot.com",
  messagingSenderId: "950078522135",
  appId: "1:950078522135:web:d16602894cdbc30caced52",
  measurementId: "G-NCHZTEX2X2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase) // redux bindings for firestore,
  )
);
ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);