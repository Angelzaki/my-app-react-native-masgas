const admin = require("firebase-admin");
const serviceAccount = require("../masgas-ad9a5-firebase-adminsdk-6609d-c114b7fee1.json"); // Ruta correcta al archivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://masgas-ad9a5.firebaseio.com", // Reemplaza por tu proyecto de Firebase
});

const db = admin.firestore(); // Conexión a Firestore
module.exports = db; // Exportar para usar en otros archivos
