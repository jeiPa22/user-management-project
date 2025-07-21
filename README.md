# User Management App (Angular + Hexagonal Architecture)

Aplicación web para gestionar usuarios con roles diferenciados (Administrador y Cajero), construida en Angular bajo principios DDD y arquitectura Hexagonal.

![1_b88](https://github.com/user-attachments/assets/d69aadab-9a7c-4a8e-b1a5-715893e07a62)

## 📌 Funcionalidades

- **Login único** (`/login`) con autenticación mock:

  - Admin: `Admin / LealAdmin` → `/dashboard/admin`
  - Cajero: `Cajero / LealCajero` → `/dashboard/cajero`

- **Rol Admin**:

  - Ver usuarios
  - Crear usuario
  - Editar usuario
  - Eliminar usuario

- **Rol Cajero**:

  - Solo puede visualizar la lista de usuarios

- **Estado persistente**:

  - Toda la información se almacena en `LocalStorage`

- **Seguridad**:
  - Guard de autenticación protege rutas privadas

## 🧱 Arquitectura

- **Domain**: Entidades, Value Objects, Interfaces
- **Application**: Casos de uso (`UseCases`)
- **Infrastructure**: Repositorio + servicios
- **UI**: Componentes, páginas, layouts (Angular sin standalone)

## 🧪 Tecnologías

- Angular
- RxJS
- Boostrap
- LocalStorage (mock de base de datos)
- UUID para generar IDs únicos

## 🚀 Inicio rápido

````bash
npm install
npm start

## 🧪 Ejecución de pruebas

Este proyecto incluye pruebas unitarias para componentes, servicios, guards y casos de uso. Usa el framework de pruebas integrado en Angular (Karma + Jasmine).

### ▶️ Ejecutar pruebas unitarias

```bash
ng test
````
<img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/88618425-a3d1-46ef-b40f-59de68036039" />

