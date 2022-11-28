const { Router } = require('express');
const permit = require('../middlewares/auth');
const sendCorreo = require('../middlewares/handleNodemailer');
const {
  createCorreo,
  getCorreos,
  getCorreoById,
  deleteCorreoById
} = require('../controllers/correo.controller');

const router = Router();

router.get('/correos', permit('administrador', 'residente'), getCorreos);

router.post('/correo', permit('administrador'), sendCorreo, createCorreo);

router.route('/correo/:id')
  .get(permit('administrador', 'residente'), getCorreoById)
  .delete(permit('administrador'), deleteCorreoById);
  
module.exports = router;