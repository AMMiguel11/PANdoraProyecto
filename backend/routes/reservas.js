const express = require("express");
const router = express.Router();
const Reserva = require("../modelos/reserva");
const Producto = require("../modelos/producto");

/* obtener todas las reservas, para admin */
router.get("/", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500);
  }
});

/* obtener todas las reservas de un usuario */
router.get("/usuario/:email", async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.params.email });
    res.json(reservas);
  } catch (error) {
    res.status(500);
  }
});

/* crrear nueva reserva */
router.post("/", async (req, res) => {
  const reserva = new Reserva({
    usuario: req.body.usuario,
    productos: req.body.productos,
    precioTotal: req.body.precioTotal,
    fechaRecogida: new Date(req.body.fechaRecogida),
    horaRecogida: req.body.horaRecogida,
  });

  try {
    const nuevaReserva = await reserva.save();
    res.json(nuevaReserva);
  } catch (error) {
    res.status(500);
  }
});

/* actualizar estado de reserva y del stock cuando se completa*/
router.patch("/:id/estado", async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    reserva.estado = req.body.estado;
    await reserva.save();
    if (req.body.estado === "completada") {
      for (const producto of reserva.productos) {
        // findOne es un método de mongoose, busca un solo documento de la colección
        const productoMongo = await Producto.findOne({
          nombre: producto.producto,
        });
        if (productoMongo) {
          productoMongo.stock = productoMongo.stock - producto.cantidad;
          await productoMongo.save();
        }
      }
    }
    res.send();
  } catch (error) {
    res.status(500);
  }
});

/* para actualizar el estado de las reservas */
router.patch("/:id/estado", async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(reserva);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
