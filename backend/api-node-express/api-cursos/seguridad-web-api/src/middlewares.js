const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.user = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const rolUsuario = req.user?.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }

    next();
  };
}

module.exports = { verificarToken, permitirRoles };
