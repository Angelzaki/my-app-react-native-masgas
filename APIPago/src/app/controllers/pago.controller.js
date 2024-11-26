const pagoRepository = require("../repositories/pago.repository");

exports.crearPago = async (req, res) => {
  try {
    const { cliente, descripcion, metodo, estado, monto } = req.body;

    // Validar campos requeridos
    if (!cliente || !descripcion || !metodo || !estado || !monto) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const nuevoPago = {
      cliente,
      descripcion,
      metodo,
      estado,
      monto,
    };

    // Llamar al repositorio para crear el pago
    const pagoCreado = await pagoRepository.crearPago(nuevoPago);

    res.status(201).json({ message: "Pago creado exitosamente", pago: pagoCreado });
  } catch (error) {
    console.error("Error en crearPago:", error.message);
    res.status(500).json({ message: "Error al crear el pago", error: error.message });
  }
};

exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await pagoRepository.obtenerPagos();
    res.status(200).json({ pagos });
  } catch (error) {
    console.error("Error en obtenerPagos:", error.message);
    res.status(500).json({ message: "Error al obtener los pagos", error: error.message });
  }
};

exports.obtenerPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await pagoRepository.obtenerPagoPorId(id);

    if (!pago) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.status(200).json({ pago });
  } catch (error) {
    console.error("Error en obtenerPagoPorId:", error.message);
    res.status(500).json({ message: "Error al obtener el pago", error: error.message });
  }
};

exports.actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizacion = req.body;

    await pagoRepository.actualizarPago(id, actualizacion);
    res.status(200).json({ message: "Pago actualizado exitosamente" });
  } catch (error) {
    console.error("Error en actualizarPago:", error.message);
    res.status(500).json({ message: "Error al actualizar el pago", error: error.message });
  }
};
