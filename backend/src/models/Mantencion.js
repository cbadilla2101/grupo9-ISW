const mongoose = require('mongoose');

const mantencionSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 250
  },
  instalacion: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 100
  },
  fecha_inicio: {
    type: Date,
    required: true
  },
  fecha_termino: {
    type: Date,
    required: true
  },
  imagen_antes: {
    type: String,
    trim: true,
    minLenght: 1,
    maxLenght: 250
  },
  imagen_despues: {
    type: String,
    trim: true,
    minLenght: 1,
    maxLenght: 250
  },
  empresa: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 100
  },
  costo: {
    type: Number,
    required: true
  },
  rutinaria: {
    type: Boolean,
    default: false
  },
  estado: {
    type: String,
    enum: [
      'finalizado',
      'en proceso',
      'pendiente'
    ],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mantencion', mantencionSchema);