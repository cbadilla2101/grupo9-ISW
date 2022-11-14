const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 250
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Categoria', categoriaSchema);