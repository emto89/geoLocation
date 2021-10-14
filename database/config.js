const mongoose = require('mongoose');

const dbConnection = async()=>{
  try {
   await  mongoose.connect(process.env.MONGODB);
   console.log('Base de datos online')
  } catch (error) {
      console.log('Error BD', error)
     throw new Error('Error al inicializar la BD')  ;
  }

}

module.exports = {
    dbConnection
}