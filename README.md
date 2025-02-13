# Pandora Panaderia - Sistema de Reservas de panadería online

**Plataforma full-stack para gestión de reservas en panaderías**  
*Desarrollada con MongoDB, Express, Angular y Node.js. Con Firebase para autenticación.*

## 🚀 Funcionalidades clave  

### 👤 **Clientes**  
- ✅ Catálogo interactivo con productos (filtros por categoría y nombre).  
- 🛒 Carrito dinámico con selección de cantidades y preferencias.  
- 📅 Reservas con fecha/hora de recogida.  
- 📜 Historial de reservas (activas y completadas).  
- ⭐ Sistema de reseñas con valoración por estrellas.  

### 👔 **Administradores**  
- 🔒 Panel de control avanzado (CRUD de productos).  
- 📊 Gestión de stock en tiempo real.
- 📅 Gestión de reservas de todos los clientes, incluyendo historial.
- 🛠️ Moderación de reseñas (eliminar contenido inapropiado).


## 🛠️ Tecnologías  
| **Capa**       | **Tecnologías**                                                                 |  
|----------------|---------------------------------------------------------------------------------|  
| **Frontend**   | Angular 18, Angular Material, TypeScript, HTML5, CSS, Bootstrap                 |  
| **Backend**    | Node.js, Express, MongoDB, Firebase (Auth), Javascript                          |  


## ⚙️ Configuración rápida  

1. Clona el repositorio:  
```bash
  git clone https://github.com/AMMiguel11/PANdoraProyecto.git
  cd PANdoraProyecto
```
2. Configura las variables de entorno (.env):
```bash
  # Firebase
  FIREBASE_API_KEY=your_key
  FIREBASE_AUTH_DOMAIN=your_domain

  # MongoDB
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/panaderia
```
3. Instala dependencias:
```bash
  npm install
```
4. Ejecuta la aplicación:
```bash
# Frontend 
  ng serve (http://localhost:4200)

# Backend
  cd backend
  node index.js  (http://localhost:3000)
```







