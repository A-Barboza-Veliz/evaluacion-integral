const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generarToken(usuario) {
    return jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

function crearHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comprarPassword(passwordIngresado, hasGuardado) {
    return bcrypt.compareSync(passwordIngresado, hasGuardado);
}

module.exports = {
    generarToken,
    crearHash,
    comprarPassword
};