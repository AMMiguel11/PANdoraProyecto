import { Component } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';
import { Producto } from '../interfaces/producto';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { ReservasService } from '../servicios/reservas.service';
import { HorariosService } from '../servicios/horarios.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  /* definicion de todos los tipos de los productos que tenemos */
  tiposCoccion = ['Poco hecho', 'Normal', 'Muy hecho'];

  decoracionNapo = [
    'Sin decoración',
    'Pepitas chocolate',
    'Pepitas colores',
    'Almendras',
  ];

  rellenosCroissant = ['Sin relleno', 'Chocolate', 'Crema', 'Dulce de leche'];

  rellenosEmpanada = ['Atún', 'Carne', 'Pollo', 'Verduras'];

  fechaSeleccionada: Date | null = null;
  horaSeleccionada: string = '';
  diasDispo: Date[] = [];
  horariosDispo: string[] = [];

  constructor(
    public carritoService: CarritoService,
    private router: Router,
    private authService: AuthService,
    private reservasService: ReservasService,
    private horariosService: HorariosService
  ) {
    this.diasDispo = this.horariosService.getDiasDispo();
  }

  /* asociar tipos de producto a productos */
  getTiposExtras(producto: Producto): string[] {
    switch (producto.tipo) {
      case 'Pan':
        return this.tiposCoccion;
      case 'Croissant':
        return this.rellenosCroissant;
      case 'Napolitana':
        return this.decoracionNapo;
      case 'Empanada':
        return this.rellenosEmpanada;
      default:
        return [];
    }
  }
  /* definicion de los labels para los tipos*/
  getLabelExtras(producto: Producto): string {
    switch (producto.tipo) {
      case 'Pan':
        return 'Tipo de cocción';
      case 'Croissant':
        return 'Relleno';
      case 'Napolitana':
        return 'Decoración';
      case 'Empanada':
        return 'Relleno';
      default:
        return '';
    }
  }
  /* validar que ese producto tiene extras */
  validarExtras(): boolean {
    for (let producto of this.carritoService.productosCarrito) {
      if (this.getTiposExtras(producto).length > 0 && !producto.extra) {
        return false;
      }
    }
    return true;
  }

  /* metodo para poner fecha a las reservas desde carrito, si el producto tiene stock=0 solo deja para dias futuros. */
  ponerFecha(fecha: string) {
    if (fecha) {
      this.fechaSeleccionada = new Date(fecha);
      if (this.carritoService.productosCarrito.length > 0) {
        const tieneReservaFutura = this.carritoService.productosCarrito.some(
          (p) => p.esReservaFutura
        );

        const esHoy = this.esFechaHoy(this.fechaSeleccionada);
        if (tieneReservaFutura && esHoy) {
          alert(
            'Los productos sin stock solo pueden reservarse para días futuros'
          );
          this.fechaSeleccionada = null;
          this.horariosDispo = [];
          return;
        }

        const tiempoPreparacion = this.horariosService.tiempoPreparacionTotal(
          this.carritoService.productosCarrito
        );
        this.horariosDispo = this.horariosService.getHorariosDispo(
          this.fechaSeleccionada,
          tiempoPreparacion
        );
      }
    } else {
      this.fechaSeleccionada = null;
      this.horariosDispo = [];
    }
  }
  /* para validar si la fecha es hoy */
  private esFechaHoy(fecha: Date): boolean {
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  }

  /* metodo para validar que los campos están completos y para realizar la reserva, lleva a mis reservas directamente cuando se realiza*/
  hacerReserva() {
    if (
      !this.validarExtras() ||
      !this.fechaSeleccionada ||
      !this.horaSeleccionada
    ) {
      alert('Por favor, completa todos los campos necesarios');
      return;
    }

    const fechaRecogida = new Date(this.fechaSeleccionada);
    const [horas, minutos] = this.horaSeleccionada.split(':');
    fechaRecogida.setHours(parseInt(horas), parseInt(minutos));

    const nuevaReserva = {
      usuario: this.authService.firebaseAuth.currentUser?.email || '',
      productos: this.carritoService.productosCarrito.map((p) => ({
        producto: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        extra: p.extra,
      })),
      fechaCreacion: new Date(),
      estado: 'pendiente' as 'pendiente', // el 'as pendiente' sirve para indicarle a typescript que el tipo es 'pendiente' y no cualquier string, sino da error
      precioTotal: this.carritoService.getPrecioTotal(),
      fechaRecogida: fechaRecogida,
      horaRecogida: this.horaSeleccionada,
    };

    this.reservasService.setReserva(nuevaReserva).subscribe(() => {
      this.carritoService.limpiarCarrito();
      this.router.navigate(['/reservas']);
    });
  }
}
