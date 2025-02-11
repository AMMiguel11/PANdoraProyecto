import { HorariosService } from './horarios.service';
import { ProductoCarrito } from './carrito.service';

/* verificar que el tiempo de preparación total se calcula correctamente, seleccionando el mayor tiempo y añadiendole 15min */
describe('HorariosService', () => {
  let service: HorariosService;

  beforeEach(() => {
    service = new HorariosService();
  });

  it('debe calcular el tiempo de preparacion total', () => {
    const productos = [
      { tiempoPreparacion: 10 },
      { tiempoPreparacion: 15 },
      { tiempoPreparacion: 5 }
    ] as ProductoCarrito[];
    
    expect(service.tiempoPreparacionTotal(productos)).toBe(30);
  });
});

