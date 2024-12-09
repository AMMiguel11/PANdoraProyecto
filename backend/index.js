const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

/* conexion con mongodb */
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

/* rutas */
const productosRouter = require("./routes/productos");
const reservasRouter = require("./routes/reservas");
const reseniasRouter = require("./routes/resenias");
app.use("/api/resenias", reseniasRouter);
app.use("/api/productos", productosRouter);
app.use("/api/reservas", reservasRouter);

/* conexion con el servidor */
app.listen(PORT, () => console.log(`Server conectado en el puerto: ${PORT}`));
