import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenia } from '../interfaces/resenia';

@Injectable({
  providedIn: 'root',
})
export class ReseniasService {
  private apiUrl = 'https://pandoraproyecto-production.up.railway.app/api/resenias';

  constructor(private http: HttpClient) {}

  /* coger las reseñas de la base de datos */
  getResenias(productoId: string): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(`${this.apiUrl}/producto/${productoId}`);
  }

  /* metodo para crear reseña */
  setResenia(resenia: Resenia): Observable<Resenia> {
    return this.http.post<Resenia>(this.apiUrl, resenia);
  }

  /* metodo para borrar reseña */
  eliminarResenia(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
