export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string; //para organizar catálogo
  urlImagen: string;
  disponible: boolean;
  tiempoPreparacion: number;
  stock: number;
  tipo: string; // 'Pan', 'Napolitana', 'Croissant'... para añadir opciones de preparación específicas
  cantidad?: number;
  esReservaFutura?: boolean;
}
