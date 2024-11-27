const db = require("../../../config/firebaseAdmin"); // Ruta correcta al archivo de configuración

exports.crearPago = async (pagoData) => {
  try {
    const pagoRef = await db.collection("pagos").add({
      ...pagoData,
      fecha: new Date().toISOString(),
    });
    return { id: pagoRef.id, ...pagoData };
  } catch (error) {
    throw new Error("Error al crear el pago en Firestore: " + error.message);
  }
};

exports.obtenerPagos = async () => {
  try {
    const snapshot = await db.collection("pagos").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error al obtener los pagos: " + error.message);
  }
};

exports.obtenerPagoPorId = async (id) => {
  try {
    const pagoDoc = await db.collection("pagos").doc(id).get();
    return pagoDoc.exists ? { id: pagoDoc.id, ...pagoDoc.data() } : null;
  } catch (error) {
    throw new Error("Error al obtener el pago por ID: " + error.message);
  }
};

exports.actualizarPago = async (id, actualizacion) => {
  try {
    await db.collection("pagos").doc(id).update(actualizacion);
  } catch (error) {
    throw new Error("Error al actualizar el pago: " + error.message);
  }
};
