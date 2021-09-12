import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Initialize Firebase
let fbObj = {
    apiKey: "AIzaSyAhkdX5UBKkgD5EGdmkQVLTfyHUImbWTOw",
    authDomain: "resume-builder-238d0.firebaseapp.com",
    projectId: "resume-builder-238d0",
    storageBucket: "resume-builder-238d0.appspot.com",
    messagingSenderId: "950078522135",
    appId: "1:950078522135:web:d16602894cdbc30caced52",
    measurementId: "G-NCHZTEX2X2"
}
firebase.initializeApp(fbObj);
export default firebase;