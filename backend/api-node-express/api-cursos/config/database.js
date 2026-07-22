const mongoose = require('mongoose');
require('dotenv').config();

let dbConectada = false;

const conectarDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    dbConectada = true;
    console.log('MongoDB conectado:', mongoose.connection.db.databaseName);
  } catch (err) {
    dbConectada = false;
    console.log('Error de conexion MongoDB:', err.message);
  }
};

const estaConectado = () => dbConectada;

module.exports = {
  conectarDB,
  estaConectado
};