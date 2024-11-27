const express = require("express");
const cors = require("cors");
const pagoRoutes = require("./src/app/routes/pago.routes"); // Ruta correcta al archivo

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Soporte para JSON en el body

// Rutas
app.use("/api", pagoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://192.168.100.6:${PORT}`);
});
