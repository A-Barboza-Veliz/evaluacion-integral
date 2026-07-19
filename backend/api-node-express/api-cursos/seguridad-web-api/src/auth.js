import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
export function generarToken(usuario) {

    return jwt  . sign ( 
        { id: usuario.id , rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export function crearHash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


export function comprarPassword(passwordIngresado,hasGuardado ) {}