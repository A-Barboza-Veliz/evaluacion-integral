// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

let dbConectada = false;

async function conectarDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';
  const esAtlas = mongoUri.startsWith('mongodb+srv://');

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    dbConectada = true;
    const dbName = mongoose.connection.db.databaseName;
    console.log(`✅ Base de datos conectada: ${dbName}`);
    console.log(`📊 Colecciones disponibles: cursos, usuarios`);
    console.log(`🌐 ${esAtlas ? 'MongoDB Atlas' : 'MongoDB local'}`);
    
  } catch (error) {
    dbConectada = false;
    console.warn('⚠️ No se pudo conectar a MongoDB, el servidor correrá en modo demo.');
    console.warn('❌ Error de MongoDB:', error.message);
  }
}

function estaConectado() {
  return dbConectada;
}

module.exports = {
  conectarDB,
  estaConectado
};