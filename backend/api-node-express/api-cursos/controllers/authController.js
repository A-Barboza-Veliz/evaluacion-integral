// controllers/authController.js
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
  console.log('📥 Datos recibidos en register:', req.body);

  if (!estaConectado()) {
    return res.status(503).json({ error: 'El modo demo no permite registrar usuarios' });
  }

  try {
    const nombre = req.body.nombre || req.body.name;
    const correo = req.body.correo || req.body.email;
    const password = req.body.password;
    const rol = req.body.rol || req.body.role || 'estudiante';

    if (!nombre || !correo || !password) {
      console.log('❌ Faltan campos obligatorios');
      return res.status(400).json({ error: 'Nombre, correo y password son obligatorios' });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      console.log('❌ Correo ya registrado:', correo);
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: crearHash(password),
      rol: rol || 'estudiante'
    });

    console.log('✅ Usuario creado:', nuevoUsuario.correo);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error) {
    console.error('❌ Error en register:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const correo = req.body.correo || req.body.email;
    const password = req.body.password;

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
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('❌ Error en perfil:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ NUEVO: Obtener todos los estudiantes (solo admin)
exports.getEstudiantes = async (req, res) => {
  try {
    console.log('📊 Obteniendo lista de estudiantes...');

    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para ver esta información' });
    }

    const estudiantes = await Usuario.find({ rol: 'estudiante' }).select('-password').sort({ createdAt: -1 });
    console.log(`📊 ${estudiantes.length} estudiantes encontrados`);
    res.json(estudiantes);
  } catch (error) {
    console.error('❌ Error al obtener estudiantes:', error);
    res.status(500).json({ error: error.message });
  }
};