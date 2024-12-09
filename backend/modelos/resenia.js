const mongoose = require("mongoose");

const reseniaSchema = new mongoose.Schema({
  productoId: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resenia", reseniaSchema);
