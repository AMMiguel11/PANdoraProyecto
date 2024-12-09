const express = require("express");
const router = express.Router();
const Producto = require("../modelos/producto");

/* todos los productos */
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500);
  }
});

/* encontrar producto por id */
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500);
  }
});

/* actualizar disponibilidad del producto */
router.patch('/:id/disponibilidad', async (req, res) => {
  try {
      const producto = await Producto.findByIdAndUpdate(
          req.params.id,
          { disponible: req.body.disponible },
          { new: true }
      );
      res.json(producto);
  } catch (error) {
      res.status(500);
  }
});

/* actualizar stock de un producto por id */
router.patch("/:id/stock", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { stock: req.body.stock },
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    res.status(500);
  }
});

/* reiniciar todos los productos al stock original */
router.post("/reiniciar-stock", async (req, res) => {
  try {
    const productos = await Producto.find();
    for (let producto of productos) {
      producto.stock = 20; //stock por defecto
      await producto.save();
    }
    res.send();
  } catch (error) {
    res.status(500);
  }
});

/* para subir productos por parte de un administrador */
router.post("/", async (req, res) => {
  try {
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoria: req.body.categoria,
      urlImagen: req.body.urlImagen,
      disponible: true,
      tiempoPreparacion: req.body.tiempoPreparacion,
      stock: req.body.stock,
      tipo: req.body.tipo,
    });

    const nuevoProducto = await producto.save();
    res.json(nuevoProducto);
  } catch (error) {
    res.status(500);
  }
});

/* para que el admin borre productos por id */
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.send();
  } catch (error) {
    res.status(500);
  }
});


module.exports = router;
