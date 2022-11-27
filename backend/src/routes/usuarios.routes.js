const { Router } = require('express');
const permit = require('../middlewares/auth');
const {
  createUsuarios,
  getUsuarios,
  getUsuarioById,
  updateUsuarioById,
  deleteUsuarioById
} = require('../controllers/usuario.controller');

const router = Router();

router.route('/usuarios')
  .get(permit('administrador', 'residente'), getUsuarios)
  .post(permit('administrador'), createUsuarios);

router.route('/usuario/:id')
  .get(permit('administrador', 'residente'), getUsuarioById)
  .put(permit('administrador'), updateUsuarioById)
  .delete(permit('administrador'), deleteUsuarioById);

module.exports = router;