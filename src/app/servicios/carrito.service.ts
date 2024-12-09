import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

export interface ProductoCarrito extends Producto {
  cantidad: number;
  extra?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  productosCarrito: ProductoCarrito[] = [];

  /* añadir producto al carrito */
  agregarProducto(producto: Producto) {
    const productoExistente = this.productosCarrito.find(
      (p) => p._id === producto._id
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.productosCarrito.push({
        ...producto, //el operador (...) sirve para copiar todas las propiedades del objeto sin tener que copiar una por una
        cantidad: 1,
      });
    }
  }
  
  /* eliminar producto del carrito */
  eliminarProducto(id: string) {
    this.productosCarrito = this.productosCarrito.filter((p) => p._id !== id);
  }

  /* aumentar cantidad del producto en el carrito, con el boton */
  masCantidad(producto: ProductoCarrito) {
    // para productos con stock normal
    if (!producto.esReservaFutura && producto.cantidad >= producto.stock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    // para reservas futuras o productos con stock disponible
    producto.cantidad++;
  }

  /* reducir cantidad del producto en el carrito, con el boton */
  menosCantidad(producto: ProductoCarrito) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  /* calcular precio total del carrito */
  getPrecioTotal(): number {
    return this.productosCarrito.reduce(
      (total, p) => total + p.precio * p.cantidad,
      0
    );
  }

  /* vacía el carrito al hacer una reserva*/
  limpiarCarrito() {
    this.productosCarrito = [];
  }
}
