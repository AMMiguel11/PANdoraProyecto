import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl = 'http://localhost:3000/api/reservas';

  constructor(private http: HttpClient) {}

  /* crear una nueva reserva */
  setReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  /* coger reservas existentes de la base de datos para cada usuario */
  getReservas(email: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${email}`);
  }

  /* coger todas las reservas de la base de datos, para el admin */
  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  /* cambiar estado de las reservas en la base de datos */
  cambiarEstado(
    reservaId: string,
    nuevoEstado: 'pendiente' | 'completada'
  ): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}/${reservaId}/estado`, {
      estado: nuevoEstado,
    });
  }

  /* para cancelar una reserva por su id */
  cancelarReserva(reservaId: string): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}/${reservaId}/estado`, {
      estado: 'cancelada',
    });
  }
}
