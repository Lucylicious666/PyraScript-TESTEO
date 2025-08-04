require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,  // 5 segundos de espera
      socketTimeoutMS: 45000,         // 45 segundos para operaciones
      maxPoolSize: 10,                // Máximo de conexiones
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);  // Cierra la app si no hay conexión
  }
};

module.exports = connectDB;