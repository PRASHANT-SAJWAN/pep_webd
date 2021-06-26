import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBNWdgP6GrxuycPx3eMBjAk5rQu_xkp7pI",
    authDomain: "login-app-ba72c.firebaseapp.com",
    projectId: "login-app-ba72c",
    storageBucket: "login-app-ba72c.appspot.com",
    messagingSenderId: "942237108987",
    appId: "1:942237108987:web:72a2e1fdd4e1eb345ffe5e",
    measurementId: "G-FY5HG2Y82H"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export default firebaseAuth;