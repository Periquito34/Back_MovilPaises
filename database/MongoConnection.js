const mongoose = require('mongoose');

const dbConnectionMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

module.exports = {
  dbConnectionMongo
};
