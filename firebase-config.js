// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyD764cHkXlDRDAS53F4dy95eK2YGbxDKzU",
  authDomain: "masgas-ad9a5.firebaseapp.com",
  projectId: "masgas-ad9a5",
  storageBucket: "masgas-ad9a5.appspot.com",
  messagingSenderId: "834758828398",
  appId: "1:834758828398:web:22caf97616f3badd51e17f",
  measurementId: "G-M84C4MM258",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
