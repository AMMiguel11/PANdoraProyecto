import { Component, OnInit } from '@angular/core';
import { Reserva } from '../interfaces/reserva';
import { ReservasService } from '../servicios/reservas.service';
import { CommonModule, DatePipe, NumberSymbol } from '@angular/common';
import { ProductosService } from '../servicios/productos.service';
import { Producto } from '../interfaces/producto';
import { FormsModule } from '@angular/forms';
import { ProductoNuevo } from '../interfaces/productoNuevo';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  reservasActivas: Reserva[] = [];
  historialReservas: Reserva[] = [];
  mostrarHistorial: boolean = false;
  productos: Producto[] = [];
  mostrarStock: boolean = false;
  mostrarNuevoProducto: boolean = false;
  formularioProducto: ProductoNuevo = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    urlImagen: '',
    tiempoPreparacion: 0,
    stock: 0,
    tipo: '',
  };
  categorias = ['Panes', 'Dulce', 'Salado'];
  tipos = ['Pan', 'Napolitana', 'Croissant', 'Empanada'];

  constructor(
    private reservasService: ReservasService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarProductos();
  }

  /* cargar todas las reservas de la base de datos segun su estado y ordenadas por fecha de creacion */
  cargarReservas() {
    this.reservasService.getAllReservas().subscribe((reservas) => {
      this.reservasActivas = reservas
        .filter((res) => res.estado === 'pendiente')
        .sort(
          (resA, resB) =>
            new Date(resB.fechaCreacion).getTime() -
            new Date(resA.fechaCreacion).getTime()
        );

      this.historialReservas = reservas
        .filter(
          (res) => res.estado === 'completada' || res.estado === 'cancelada'
        )
        .sort(
          (resA, resB) =>
            new Date(resB.fechaCreacion).getTime() -
            new Date(resA.fechaCreacion).getTime()
        );
    });
  }

  /* cargar los productos de la base de datos */
  cargarProductos() {
    this.productosService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  /* poner estado completada a una reserva */
  marcarCompletada(reservaId: string) {
    this.reservasService
      .cambiarEstado(reservaId, 'completada')
      .subscribe(() => {
        this.cargarReservas(); //para recargar la lista;
      });
  }

  /* pasar fecha a string y mostrarla de forma correcta en el html */
  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleString();
  }

  /* este es un método para que solo se pueda marcar como completada la reserva, si pasa de la hora de la fecha de entrega marcada. hay que incluirlo en el ngIf de marcar como completada */
  /*   esMismaFecha(fechaRecogida: Date, horaRecogida : string): boolean {
    const hoy = new Date();
    const fechaR = new Date(fechaRecogida);

    const mismaFecha = (
      hoy.getDate() === fechaR.getDate() &&
      hoy.getMonth() === fechaR.getMonth() &&
      hoy.getFullYear() === fechaR.getFullYear()
    );

   if (!mismaFecha) {
      return false;
    }

    const [horaRecogidaH, horaRecogidaM] = horaRecogida.split(':').map(Number);
    const horaActual = hoy.getHours();
    const minutosActual = hoy.getMinutes();

   
    const minutosRecogida = horaRecogidaH * 60 + horaRecogidaM;  // convertir todo a minutos para comparar
    const minutosAhora = horaActual * 60 + minutosActual;

    return minutosAhora >= minutosRecogida; 
  } */

  /* actualizar el stock de un producto */
  actualizarStock(producto: Producto) {
    this.productosService
      .cambiarStock(producto._id, producto.stock)
      .subscribe(() => {
        alert('Stock actualizado correctamente');
      });
  }

  /* reiniciar el stock de un producto */
  reinicioStock() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el stock?')) {
      this.productosService.reiniciarStock().subscribe(() => {
        alert('Stock reiniciado correctamente');
        window.location.reload();
      });
    }
  }

  /* crear un nuevo producto */
  crearProducto() {
    if (this.validarFormulario()) {
      const nuevoProducto = {
        ...this.formularioProducto,
        disponible: true,
        _id: '', // mongoDB genera esto, es para que no de error
      };
      this.productosService.setProducto(nuevoProducto).subscribe(() => {
        alert('Nuevo producto creado');
        this.limpiarFormulario();
      });
    }
  }

  /* validar que los campos se insertan de forma correcta */
  validarFormulario(): boolean {
    if (
      !this.formularioProducto.nombre ||
      !this.formularioProducto.descripcion ||
      this.formularioProducto.precio <= 0
    ) {
      alert('Por favor, completa todos los campos');
      return false;
    }
    return true;
  }

  /* limipiar el formulario una vez que le damos a crear producto */
  limpiarFormulario() {
    this.formularioProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      urlImagen: '',
      tiempoPreparacion: 0,
      stock: 0,
      tipo: '',
    };
  }

  /*  formulario de confirmacion de que se quiere eliminar el producto de la base de datos*/
  confirmarEliminarProducto(producto: Producto) {
    if (confirm(`¿Estás seguro de que quieres eliminar ${producto.nombre}?`)) {
      this.productosService.eliminarProducto(producto._id).subscribe(() => {
        this.productos = this.productos.filter((p) => p._id !== producto._id);
        alert('Producto eliminado correctamente');
        this.cargarProductos();
      });
    }
  }

  /* metodo para ocultar o mostrar el prooducto cambiando la disponibilidad */
  ocultarMostrarProducto(producto: Producto) {
    this.productosService
      .cambiarDispo(producto._id, !producto.disponible)
      .subscribe((productoActualizado) => {
        producto.disponible = productoActualizado.disponible;
      });
  }
}
