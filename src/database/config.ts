const mongoose = require('mongoose');

export const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_MONGO)
    console.log('Conectado a MongoDB correctamente')
  } catch (error) {
    console.log('Error de conexion con MongoDB')
    console.log(error)
  }
}
