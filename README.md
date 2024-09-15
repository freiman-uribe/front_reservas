# Sistema de Reservas y Gestión de Servicios - Frontend

Este es el proyecto frontend de un sistema de reservas y gestión de servicios, desarrollado en React. El sistema cuenta con un dashboard tanto para administradores como para clientes. Los administradores tienen la capacidad de gestionar reservas y servicios, mientras que los clientes pueden hacer reservas y ver los servicios disponibles.

## Tecnologías utilizadas

- **React**: ^18.3.1
- **Axios**: ^1.7.7
- **Material UI**: @mui/material para los estilos y componentes UI

## Características

### 1. **Dashboard de Administrador:**
   - **Gestión de reservas**: El administrador puede:
     - Crear reservas a nombre de los clientes.
     - Editar las reservas existentes.
     - Cancelar las reservas.
     - Visualizar todas las reservas.
   - **Gestión de servicios**: El administrador puede:
     - Crear nuevos servicios.
     - Editar servicios existentes.
     - Desactivar servicios.
     - Listar todos los servicios.

### 2. **Dashboard de Cliente:**
   - **Gestión de servicios**: El cliente puede:
     - Ver los servicios activos disponibles.
     - Hacer reservas de los servicios.
   - **Gestión de reservas**: El cliente puede:
     - Visualizar sus reservas.
     - Cancelar sus reservas.

### 3. **Autenticación**:
   - El sistema incluye funcionalidad de login y registro para gestionar el acceso de los usuarios.

## Instalación

1. Clona este repositorio:
   `git clone https://github.com/ElkinNocuaDev/reservation_frontend.git`

2. Instala las dependencias necesarias:
    `npm install`

3. Crear las variables de entorno de la base de la API para las consultas axios, se debe crear un archivo **.env** en la base del codigo con el siguiente nombre:

    `VITE_BASE_API=http://localhost:3000 #ejemplo url de la base api`

4. Ejecuta el proyecto:
    `npm run dev`

## Uso

  - Login y Registro: Los usuarios deben registrarse y autenticarse para acceder al sistema. Dependiendo del rol del usuario (administrador o cliente), se les redirigirá al dashboard correspondiente.
  - Dashboard de Administrador: Los administradores pueden gestionar tanto los servicios como las reservas.
  - Dashboard de Cliente: Los clientes pueden ver los servicios disponibles y gestionar sus reservas.

## Dependencias principales

  - React: ^18.3.1
  - Axios: ^1.7.7
  - @mui/material: Librería para componentes y estilos de Material UI.
