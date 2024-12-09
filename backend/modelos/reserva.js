const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  productos: [
    {
      producto: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      extra: String,
    },
  ],
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["pendiente", "completada", "cancelada"],
    default: "pendiente",
  },
  precioTotal: {
    type: Number,
    required: true,
  },
  fechaRecogida: {
    type: Date,
    required: true,
  },
  horaRecogida: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reserva", reservaSchema);
