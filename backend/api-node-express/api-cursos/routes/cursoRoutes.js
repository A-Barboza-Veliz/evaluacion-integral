const express = require('express');
const router = express.Router();

const {
  crear,
  listar,
  actualizar,
  eliminar,
  obtenerEstadisticas
} = require('../controllers/cursoController');
const { verificarToken, permitirRoles } = require('../seguridad-web-api/src/middlewares');

router.get('/cursos/stats', verificarToken, permitirRoles('admin'), obtenerEstadisticas);
router.post('/cursos', verificarToken, permitirRoles('admin'), crear);
router.get('/cursos/:id', obtener);
router.get('/cursos', listar);
router.put('/cursos/:id', verificarToken, permitirRoles('admin'), actualizar);
router.delete('/cursos/:id', verificarToken, permitirRoles('admin'), eliminar);



module.exports = router;