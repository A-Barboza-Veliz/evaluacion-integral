// routes/cursoRoutes.js
const express = require('express');
const router = express.Router();

const {
  crear,
  listar,
  actualizar,
  eliminar,
  obtenerEstadisticas,
  obtener
} = require('../controllers/cursoController');

// ✅ USAR EL MIDDLEWARE DE TU COMPAÑERO
const { verificarToken, permitirRoles } = require('../seguridad-web-api/src/middlewares');

router.get('/cursos/stats', verificarToken, permitirRoles('admin'), obtenerEstadisticas);
router.post('/cursos', verificarToken, permitirRoles('admin'), crear);
router.get(['/cursos', '/courses'], listar);
router.get(['/cursos/:id', '/courses/:id'], obtener);
router.put('/cursos/:id', verificarToken, permitirRoles('admin'), actualizar);
router.delete('/cursos/:id', verificarToken, permitirRoles('admin'), eliminar);

module.exports = router;