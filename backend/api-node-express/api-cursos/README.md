# API de Gestión de Cursos

API REST para la gestión de cursos e inscripciones con Node.js, Express, MongoDB y JWT.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- JWT
- bcryptjs
- Helmet
- CORS

## Variables de entorno
Crea un archivo .env con:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/cursos
JWT_SECRET=mi_secreto_super_seguro
```

## Endpoints
- GET /api/cursos
- POST /api/cursos
- PUT /api/cursos/:id
- DELETE /api/cursos/:id
- GET /api/cursos/stats
