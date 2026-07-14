const express = require('express');
const router = express.Router();

const {
  crear,
  listar,
  actualizar,
  eliminar,
  obtenerEstadisticas  // ← NUEVO: importar el método
} = require('../controllers/cursoController');

// 📌 NUEVA RUTA: Estadísticas del dashboard
router.get('/cursos/stats', obtenerEstadisticas);

// 📌 Rutas existentes
router.post('/cursos', crear);
router.get('/cursos', listar);
router.put('/cursos/:id', actualizar);
router.delete('/cursos/:id', eliminar);



module.exports = router;