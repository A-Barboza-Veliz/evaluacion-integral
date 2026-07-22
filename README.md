# 🎓 Evaluación Integral - Plataforma de Gestión de Cursos e Inscripciones

Proyecto Full Stack integral para la gestión académica de cursos, profesores, estudiantes e inscripciones, desarrollado con **Angular, React, Next.js, Node.js/Express y MongoDB Atlas**.

---

## 👥 Matriz de Participación de Integrantes

| Nombres y Apellidos | Correo Institucional | Porcentaje de Participación |
| :--- | :--- | :---: |
| **Pujay Quispe, Kimberly Vanessa** | `61294327@mail.isil.pe` | **100%** |
| **Barboza Veliz, Alejandro** | `468060566@mail.isil.pe` | **100%** |

---

## 🌐 Enlaces de Despliegue en Producción (URLs en Vivo)

* 🔐 **Módulo de Autenticación / Login (Next.js - Vercel):**  
  [https://evaluacion-integral-auth.vercel.app](https://evaluacion-integral-auth.vercel.app)
* 🅰️ **Panel Administrativo y Portal Principal (Angular - Vercel):**  
  [https://evaluacion-integral-app.vercel.app](https://evaluacion-integral-app.vercel.app)
* ⚛️ **Portal del Estudiante y Aviso de Matrícula (React - Vercel):**  
  [https://evaluacion-integral-react.vercel.app](https://evaluacion-integral-react.vercel.app)
* ⚙️ **API REST Backend (Node.js/Express - Render):**  
  [https://evaluacion-integral-api.onrender.com/api](https://evaluacion-integral-api.onrender.com/api)

---

## 📹 Enlace de la Exposición en YouTube

* 🔗 **Video de la Exposición:** [https://youtu.be/Id6ftOFOUIU](https://youtu.be/Id6ftOFOUIU)

---

## 🐙 Repositorio de GitHub

* 🔗 **Link del Repositorio:** [https://github.com/A-Barboza-Veliz/evaluacion-integral.git](https://github.com/A-Barboza-Veliz/evaluacion-integral.git)

---

## ⚙️ Requisitos Previos

* **Node.js:** v18+ o superior
* **npm:** v9+ o superior
* **MongoDB Atlas:** Cluster de base de datos en la nube (o MongoDB local)

---

## 🚀 Pasos para Ejecución en Entorno Local

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/A-Barboza-Veliz/evaluacion-integral.git
cd evaluacion-integral
npm install
```

### 2. Configurar Variables de Entorno del Backend
Crear un archivo `.env` en la carpeta `backend/api-node-express/api-cursos/`:
```env
PORT=3000
MONGO_URI=mongodb+srv://abarbozaveliz26_db_user:F5ImRx1E8dzgt0wb@cluster0.n4bwlhp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mi_secreto_super_seguro
```

### 3. Iniciar Todos los Servicios con Un Solo Comando
Desde la raíz del proyecto (`evaluacion-integral`):
```bash
npm run dev
```

Este comando iniciará de forma simultánea los 4 servicios en los siguientes puertos:
* ⚙️ **Backend API (Express):** `http://localhost:3000`
* 🔐 **Módulo de Login (Next.js):** `http://localhost:3001`
* 🅰️ **Panel Administrativo (Angular):** `http://localhost:4200`
* ⚛️ **Portal del Estudiante (React):** `http://localhost:5173`

---

## ☁️ Pasos para el Despliegue en la Nube

### 🟢 1. Backend en Render
1. Crear un **Web Service** en Render conectado al repositorio de GitHub.
2. Definir el **Root Directory:** `backend/api-node-express/api-cursos`.
3. Configurar **Build Command:** `npm install` y **Start Command:** `npm start`.
4. Agregar las variables de entorno `MONGO_URI` y `JWT_SECRET`.
5. Habilitar la IP `0.0.0.0/0` en **MongoDB Atlas Network Access**.

### 🔺 2. Frontends en Vercel
1. Importar el repositorio en Vercel.
2. **App de Login (`next-auth-app`):**
   * **Root Directory:** `next-auth-app`
   * Variables de entorno: `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_ADMIN_URL`, `NEXT_PUBLIC_STUDENT_URL`.
3. **App de Angular (`angular/portal-angular`):**
   * **Root Directory:** `angular/portal-angular`
   * **Output Directory:** `dist/portal-angular/browser`
4. **App de React (`portal-react/react-spa-semana09`):**
   * **Root Directory:** `portal-react/react-spa-semana09`
   * Variable de entorno: `VITE_ANGULAR_URL`.
