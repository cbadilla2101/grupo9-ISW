const mongoose = require('mongoose');

const correoSchema = new mongoose.Schema({
  mantencion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mantencion'
    }
  ],
  userEmails: [
    {
      type: String,
      required: true,
      trim: true,
      minLenght: 1,
      maxLenght: 250
    }
  ],
  asunto: {
    type: String,
    trim: true,
    required: true,
    minLenght: 1,
    maxLenght: 100
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    minLenght: 1,
    maxLenght: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Correo', correoSchema);

