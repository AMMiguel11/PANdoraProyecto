import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'https://pandoraproyecto-production.up.railway.app/api/productos';

  constructor(private http: HttpClient) {}

  /* coger productos de la base de datos */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /* coger producto por su id */
  getProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /* productos segun su categoría */
  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoria=${categoria}`);
  }

  /* actualizar el stock cuando le damos un nuevo valor */
  cambiarStock(productoId: string, nuevoStock: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${productoId}/stock`, {
      stock: nuevoStock,
    });
  }

  /* reiniciar el stock de los productos a su valor por defecto que ponemos en el método*/
  reiniciarStock(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reiniciar-stock`, {});
  }

  /* crear nuevo producto por el admin */
  setProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  /* borrar producto por el admin */
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /* cambiar la disponibilidad del producto, para mostrarlo o no */
  cambiarDispo(id: string, disponible: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/disponibilidad`, {
      disponible,
    });
  }
}
