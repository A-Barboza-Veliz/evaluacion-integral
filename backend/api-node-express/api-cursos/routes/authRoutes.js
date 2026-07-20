const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const { verificarToken } = require('../seguridad-web-api/src/middlewares');

router.post('/register', registrar);
router.post('/login', login);
router.get('/me', verificarToken, (req, res) => {
  res.json({ usuario: req.user });
});

module.exports = router;
