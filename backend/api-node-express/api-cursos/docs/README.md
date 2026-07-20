# Documentación del proyecto

## Arquitectura
- Frontend Angular para administración
- Backend Node.js + Express para API REST
- Base de datos MongoDB Atlas (o local)

## Modelo de datos
- Cursos
- Usuarios
- Inscripciones

## Base de datos
El backend usa la variable de entorno `MONGO_URI`.

Ejemplo Atlas:
```env
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/mi_base_datos?retryWrites=true&w=majority
```

Ejemplo local:
```env
MONGO_URI=mongodb://127.0.0.1:27017/mi_base_datos
```

## Seguridad
- JWT
- bcryptjs
- Helmet
- CORS
