const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res.status(401).json({ mensaje: 'Token no enviado' });
	}

	const [tipo, token] = authorization.split(' ');

	if (tipo !== 'Bearer' || !token) {
		return res.status(401).json({ mensaje: 'Formato de token invalido' });
	}

	try {
		req.usuario = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		return res.status(401).json({ mensaje: 'Token invalido o expirado' });
	}
}

function verificarRol(...rolesPermitidos) {
	return (req, res, next) => {
		if (!req.usuario) {
			return res.status(401).json({ mensaje: 'No autenticado' });
		}

		if (!rolesPermitidos.includes(req.usuario.rol)) {
			return res.status(403).json({ mensaje: 'No tienes permisos para acceder' });
		}

		next();
	};
}

module.exports = {
	verificarToken,
	verificarRol
};
