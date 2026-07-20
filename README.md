# Evaluación Integral - Plataforma de Gestión de Cursos e Inscripciones

## Descripción
Proyecto full stack para gestionar cursos, usuarios e inscripciones con Angular, React, Next.js, Node.js/Express y MongoDB.

## Estructura del proyecto
- Angular: panel administrativo
- React: portal del estudiante
- Next.js: parte pública
- Node.js + Express: API REST
- MongoDB Atlas: almacenamiento de datos

## Requisitos
- Node.js 18+
- npm
- MongoDB Atlas

## Variables de entorno
Crear `.env` en la carpeta del backend con MongoDB local:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mi_base_datos
JWT_SECRET=tu_secreto
```

> Si deseas usar MongoDB Atlas en el futuro, reemplaza `MONGO_URI` por una cadena `mongodb+srv://...`.

## Ejecución
- Backend: npm start
- Angular: npm start
- React: npm run dev
- Next.js: npm run dev

## Documentación
- [backend/api-node-express/api-cursos/docs/README.md](backend/api-node-express/api-cursos/docs/README.md)

## Integrantes
- Alejandro
- Estudiante 2
