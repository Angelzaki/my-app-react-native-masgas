const express = require("express");
const router = express.Router();
const {
  crearPago,
  obtenerPagos,
  obtenerPagoPorId,
  actualizarPago,
} = require("../controllers/pago.controller");

// Crear un nuevo pago
router.post("/pagos", crearPago);

// Obtener todos los pagos
router.get("/pagos", obtenerPagos);

// Obtener un pago por ID
router.get("/pagos/:id", obtenerPagoPorId);

// Actualizar un pago por ID
router.put("/pagos/:id", actualizarPago);

module.exports = router;
