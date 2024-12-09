const express = require("express");
const router = express.Router();
const Resenia = require("../modelos/resenia");

/* ver reseñas por producto */
router.get("/producto/:productoId", async (req, res) => {
  try {
    const resenias = await Resenia.find({ productoId: req.params.productoId });
    res.json(resenias);
  } catch (error) {
    req.statusCode(500);
  }
});

/* postear reseña */
router.post("/", async (req, res) => {
  const resenia = new Resenia({
    productoId: req.body.productoId,
    usuario: req.body.usuario,
    comentario: req.body.comentario,
    puntuacion: req.body.puntuacion,
  });

  try {
    const nuevaResenia = await resenia.save();
    res.json(nuevaResenia);
  } catch (error) {
    res.status(500);
  }
});

/* eliminar reseña, esto solo lo podrá hacer el admin */
router.delete("/:id", async (req, res) => {
  try {
    const resenia = await Resenia.findByIdAndDelete(req.params.id);
    res.send();
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
