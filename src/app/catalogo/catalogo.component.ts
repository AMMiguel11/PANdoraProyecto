import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../servicios/productos.service';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaProductoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = [];
  palabra = '';
  categoria = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  /* carga todos los productos y extrae las categorias disponibles */
  cargarProductos() {
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos.filter((p) => p.disponible);
      this.productosFiltrados = this.productos;
      const todasLasCategorias: string[] = [];

      for (const producto of productos) {
        if (!todasLasCategorias.includes(producto.categoria)) {
          todasLasCategorias.push(producto.categoria);
        }
      }
      this.categorias = todasLasCategorias;
    });
  }

  /* filtra por nombre de producto y categoría */
  filtrarProductos() {
    let productosFiltrados = this.productos;
    if (this.palabra !== '') {
      productosFiltrados = productosFiltrados.filter((producto) => {
        const nombre = producto.nombre.toLowerCase();
        const descripcion = producto.descripcion.toLowerCase();
        const busqueda = this.palabra.toLowerCase();

        return nombre.includes(busqueda) || descripcion.includes(busqueda);
      });
    }

    if (this.categoria !== '') {
      productosFiltrados = productosFiltrados.filter((producto) => {
        return producto.categoria === this.categoria;
      });
    }

    this.productosFiltrados = productosFiltrados;
  }
}
