//aca ponemos los campos del esquema de base de datos

const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
  curso: {
    type: String,
    required: true
  },
  docente: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  inscritos: {
    type: String,
    required: true
  },
  precio: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Cursos', cursosSchema);