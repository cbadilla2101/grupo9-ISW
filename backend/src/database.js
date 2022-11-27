const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log('Conectado a MongoDB✅');
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;