import { TestBed } from '@angular/core/testing';

import { CarritoService, ProductoCarrito } from './carrito.service';

/* verificar que el precio total del carrito se calcula correctamente */
describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    service = new CarritoService();
  });

  it('debe calcular el precio total del carrito', () => {
    service.productosCarrito = [
      { precio: 2.50, cantidad: 2 } as ProductoCarrito,
      { precio: 1.50, cantidad: 3 } as ProductoCarrito
    ];
    
    expect(service.getPrecioTotal()).toBe(9.50);
  });
});

/* verificar que la cantidad no se reduce por debajo de 1 en los productos */
describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    service = new CarritoService();
  });

  it('debería permitir reducir cantidad solo si es mayor que 1', () => {
    const producto: ProductoCarrito = {
      nombre: 'Pan',
      cantidad: 2,
      precio: 1.50
    } as ProductoCarrito;

    service.menosCantidad(producto); // reduce a 1
    expect(producto.cantidad).toBe(1);

    service.menosCantidad(producto); // no reduce y se mantiene en 1
    expect(producto.cantidad).toBe(1); 
  });
});

/* verificar que funciona el método de limpiar carrito */
describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    service = new CarritoService();
  });

  it('debería limpiar correctamente el carrito', () => {

    service.productosCarrito = [
      {
        nombre: 'Pan',
        cantidad: 2,
        precio: 1.50
      } as ProductoCarrito
    ];

    service.limpiarCarrito();


    expect(service.productosCarrito.length).toBe(0);
  });
});
