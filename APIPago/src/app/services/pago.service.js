const pagoRepository = require("../repositories/pago.repository");

exports.crearPago = async (pagoData) => {
  return await pagoRepository.crearPago(pagoData);
};

exports.obtenerPagos = async () => {
  return await pagoRepository.obtenerPagos();
};

exports.obtenerPagoPorId = async (id) => {
  return await pagoRepository.obtenerPagoPorId(id);
};

exports.actualizarPago = async (id, actualizacion) => {
  return await pagoRepository.actualizarPago(id, actualizacion);
};
