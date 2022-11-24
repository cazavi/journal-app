// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvbHO4vzbxakqNysPZtVECTWSmFtHGkV0",
  authDomain: "journal-app-ae2c1.firebaseapp.com",
  projectId: "journal-app-ae2c1",
  storageBucket: "journal-app-ae2c1.appspot.com",
  messagingSenderId: "405230462663",
  appId: "1:405230462663:web:788e123a6d93955ea140e2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);