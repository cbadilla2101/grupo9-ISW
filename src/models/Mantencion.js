const mongoose = require('mongoose');

const mantencionSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 250
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
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
  estado: {
    type: String,
    enum: [
      'finalizado',
      'proceso',
      'pendiente'
    ],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mantencion', mantencionSchema);