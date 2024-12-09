import { Injectable } from '@angular/core';
import { ProductoCarrito } from './carrito.service';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  constructor() {}

  /* el tiempo de preparación será 15 min más del producto con más tiempo de preparación del carrito */
  tiempoPreparacionTotal(productos: ProductoCarrito[]): number {
    const maxTiempo = Math.max(...productos.map((p) => p.tiempoPreparacion));
    return maxTiempo + 15;
  }

  /* devuelve los horarios de cada día, teniendo en cuenta el tiempo de preparación y redondeando siempre a la siguiente media hora */
  getHorariosDispo(fecha: Date, tiempoPreparacion: number): string[] {
    const horarios: string[] = [];
    const hoy = new Date();
    /* para ver si es hoy comparando día, mes y año */
    const esHoy =
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear();

    let horaInicio = new Date(fecha);
    if (esHoy) {
      const horaActual = new Date(); // si es hoy, empezamos desde la hora actual
      horaInicio.setHours(horaActual.getHours(), horaActual.getMinutes());
      horaInicio = new Date(horaInicio.getTime() + tiempoPreparacion * 60000); //se multiplica para convertir minutos a ms
    } else {
      horaInicio.setHours(8, 0, 0, 0); // si es otro día, empezamos desde la hora de apertura
    }

    /* redondeamos a la siguiente media hora, o hora completa si pasa de 30 min */
    const minutos = horaInicio.getMinutes();
    if (minutos <= 30) {
      horaInicio.setMinutes(30, 0, 0);
    } else {
      horaInicio.setHours(horaInicio.getHours() + 1, 0, 0, 0);
    }

    const horaCierre = new Date(fecha);
    horaCierre.setHours(21, 0, 0, 0);
    let horaActual = horaInicio;

    /* para generar horarios cada 30 min y que pare al llegar a la hora de cierre */
    while (horaActual <= horaCierre) {
      horarios.push(
        `${horaActual.getHours().toString().padStart(2, '0')}:${horaActual
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
      horaActual = new Date(horaActual.getTime() + 30 * 60000);
    }

    return horarios;
  }

  /* para generar un array con las fechas de los próximos 7 días */
  getDiasDispo(): Date[] {
    const dias: Date[] = [];
    const hoy = new Date();

    for (let i = 0; i < 7; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      dias.push(fecha);
    }

    return dias;
  }
}
