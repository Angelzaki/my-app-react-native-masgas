// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyD764cHkXlDRDAS53F4dy95eK2YGbxDKzU",
  authDomain: "masgas-ad9a5.firebaseapp.com",
  projectId: "masgas-ad9a5",
  storageBucket: "masgas-ad9a5.appspot.com",
  messagingSenderId: "834758828398",
  appId: "1:834758828398:web:22caf97616f3badd51e17f",
  measurementId: "G-M84C4MM258"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);