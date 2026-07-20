// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registrar, login, obtenerPerfil, getEstudiantes } = require('../controllers/authController');
const { verificarToken } = require('../seguridad-web-api/src/middlewares');

router.post('/register', registrar);
router.post('/login', login);
router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/estudiantes', verificarToken, getEstudiantes);

module.exports = router;