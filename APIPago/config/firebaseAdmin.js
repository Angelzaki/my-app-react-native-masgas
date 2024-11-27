// config/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("../masgas-ad9a5-firebase-adminsdk-6609d-c114b7fee1.json"); // Ruta al archivo de clave privada

// Inicializa la app de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://masgas-ad9a5.firebaseio.com", // Cambia el ID del proyecto
});

// Instancia de Firestore
const db = admin.firestore();

module.exports = db;
