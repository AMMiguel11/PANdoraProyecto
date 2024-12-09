const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  urlImagen: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  tiempoPreparacion: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  tipo: {           
    type: String
}
});

module.exports = mongoose.model("Producto", productoSchema);
