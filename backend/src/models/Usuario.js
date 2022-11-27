const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 100
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    enum: [
      'administrador',
      'residente'
    ],
    default: 'residente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);