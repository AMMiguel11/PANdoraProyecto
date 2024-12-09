import { Routes } from '@angular/router';

export const routes: Routes = [
  // ruta por defecto
  {
    path: '',
    redirectTo: '/catalogo',
    pathMatch: 'full',
  },

  /* ruta a los componentes. con Lazy Loading. Path define la ruta, y luego loadComponent importa el archivo del componente. después se obtiene el componente específico*/
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./catalogo/catalogo.component').then((c) => c.CatalogoComponent),
  },
  {
    path: 'catalogo/:id',
    loadComponent: () =>
      import('./catalogo/detalle-producto/detalle-producto.component').then(
        (c) => c.DetalleProductoComponent
      ),
  },
  {
    path: 'reservas',
    loadComponent: () =>
      import('./reservas/reservas.component').then((c) => c.ReservasComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./registro/registro.component').then((c) => c.RegistroComponent),
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./carrito/carrito.component').then((c) => c.CarritoComponent),
  },

  /* en caso de que no se encuentre la ruta redirige a catalogo */
  {
    path: '**',
    redirectTo: '/catalogo',
  },
];
