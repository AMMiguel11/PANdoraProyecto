import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../servicios/carrito.service';
import { FormsModule } from '@angular/forms';
import { Resenia } from '../../interfaces/resenia';
import { ReseniasService } from '../../servicios/resenias.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css',
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto | undefined;
  resenias: Resenia[] = [];
  nuevaResenia = {
    putuacion: 5,
    comentario: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private reseniasService: ReseniasService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    /* cargar los productos y reseñas de la base de datos por su id */
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.cargarProducto(params['id']);
        this.cargarResenias(params['id']);
      }
    });
  }

  /* carga los productos por id */
  cargarProducto(id: string) {
    this.productosService.getProductoPorId(id).subscribe((producto) => {
      this.producto = producto;
    });
  }

  /* carga las reseñas por id */
  cargarResenias(productoId: string) {
    this.reseniasService
      .getResenias(productoId)
      .subscribe((resenias) => {
        this.resenias = resenias.sort(
          (reseniA, reseniB) =>
            new Date(reseniB.fecha).getTime() -
            new Date(reseniA.fecha).getTime()
        );
      });
  }

  /* permite enviar las reseñas */
  enviarResenia() {
    const nombreUsuario = this.authService.getUsuario();
    const resenia: Resenia = {
      productoId: this.producto!._id, //se le pone un ! porque estamos seguros de que el producto existe al llamar al método, sino da error
      usuario: nombreUsuario,
      comentario: this.nuevaResenia.comentario,
      puntuacion: this.nuevaResenia.putuacion,
      fecha: new Date(),
    };

    this.reseniasService.setResenia(resenia).subscribe(() => {
      this.nuevaResenia = {
        putuacion: 5,
        comentario: '',
      };
      this.cargarResenias(this.producto!._id);
    });
  }

  /* añadir el producto al carrito, utilizando carritoService */
  agregarAlCarrito() {
    if (this.producto && this.authService.isLogeado()) {
      const productoParaCarrito: Producto = {
        ...this.producto,
        esReservaFutura: this.producto.stock === 0,
      };
      this.carritoService.agregarProducto(productoParaCarrito);
      alert(`${this.producto.nombre} añadido al carrito`);
    }
  }

  /* formulario para eliminar reseñas, por parte del admin nada más */
  eliminarResenia(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
        this.reseniasService.eliminarResenia(id).subscribe(()=>{
                this.cargarResenias(this.producto!._id);
                alert('Reseña eliminada');
        });
    }
}

}
