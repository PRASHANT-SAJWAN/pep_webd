import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBr8qOMZQRZkTJPP3tdcY2FmzFSV049oaE",
    authDomain: "reels-4b2cd.firebaseapp.com",
    projectId: "reels-4b2cd",
    storageBucket: "reels-4b2cd.appspot.com",
    messagingSenderId: "1054311395036",
    appId: "1:1054311395036:web:868cc152e84a56b8e2ce19",
    measurementId: "G-GSYQE6EZBE"
  };
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();