// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt9dIKF-tLwffb8_xVXADZz987KjPxSBo",
    authDomain: "journalapp-f7620.firebaseapp.com",
    projectId: "journalapp-f7620",
    storageBucket: "journalapp-f7620.appspot.com",
    messagingSenderId: "392488768941",
    appId: "1:392488768941:web:ae631841b23ab701d93d24"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);