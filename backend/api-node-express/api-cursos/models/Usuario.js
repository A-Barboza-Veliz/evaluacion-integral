// models/Usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['estudiante', 'admin'], default: 'estudiante' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);