import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBZKtgsK2ESnW0h6Ov_kZDBGZisldgy65s",
    authDomain: "movies-832c6.firebaseapp.com",
    projectId: "movies-832c6",
    storageBucket: "movies-832c6.appspot.com",
    messagingSenderId: "661238998944",
    appId: "1:661238998944:web:207e1f99c0099739f5a6c5",
    measurementId: "G-EMG9SLSH14"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();