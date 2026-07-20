const Usuario = require('../models/Usuario');
const { crearHash, comprarPassword, generarToken } = require('../seguridad-web-api/src/auth');
const { estaConectado } = require('../config/database');

const usuarioDemo = {
  id: 'demo-user',
  nombre: 'Usuario Demo',
  correo: 'demo@demo.com',
  rol: 'estudiante',
  password: crearHash('demo123')
};

exports.registrar = async (req, res) => {
  if (!estaConectado()) {
    return res.status(503).json({ error: 'El modo demo no permite registrar usuarios' });
  }

  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Nombre, correo y password son obligatorios' });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: crearHash(password),
      rol: rol || 'estudiante'
    });

    res.status(201).json({
      mensaje: 'Usuario registrado',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!estaConectado()) {
      if (correo !== usuarioDemo.correo) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const passwordValido = comprarPassword(password, usuarioDemo.password);
      if (!passwordValido) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = generarToken({ id: usuarioDemo.id, rol: usuarioDemo.rol });
      return res.json({ mensaje: 'Login correcto (modo demo)', token, usuario: usuarioDemo });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordValido = comprarPassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken({ id: usuario._id, rol: usuario.rol });

    res.json({
      mensaje: 'Login correcto',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
