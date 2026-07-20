// test-db.js
const mongoose = require('mongoose');
require('dotenv').config();

async function testDB() {
  try {
    console.log('🔍 Conectando a MongoDB...');
    console.log('📝 URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
    
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📂 Base de datos: ${dbName}`);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Colecciones:', collections.map(c => c.name));
    
    const cursosCollection = collections.find(c => c.name === 'cursos');
    if (cursosCollection) {
      const count = await mongoose.connection.db.collection('cursos').countDocuments();
      console.log(`📊 Total de cursos: ${count}`);
      
      if (count > 0) {
        const cursos = await mongoose.connection.db.collection('cursos').find({}).limit(3).toArray();
        console.log('📝 Ejemplos de cursos:');
        cursos.forEach((c, i) => {
          console.log(`  ${i+1}. ${c.curso || 'sin nombre'}`);
        });
      }
    } else {
      console.log('❌ No existe la colección "cursos"');
      console.log('📌 Lista de colecciones disponibles:', collections.map(c => c.name));
    }
    
    await mongoose.disconnect();
    console.log('✅ Desconectado');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDB();