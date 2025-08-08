# Prueba Técnica - Gestión de Inventario - Alexander Calambas Ramirez . Futuro Desarrollador Satlock

## Requisitos

- Node.js
- PostgreSQL
- pgAdmin 4

## Instrucciones

1. Restaurar la base de datos con el archivo `prueba-tecnica.backup` o ejecutar el `.sql` en pgAdmin.
2. Crear un archivo `.env` con esta configuración:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=Prueba-Tecnica

3. Instalar dependencias:

npm install

## Ejecutar el servidor:

node index.js

## Ejecutar pruebas unitarias:

npm test