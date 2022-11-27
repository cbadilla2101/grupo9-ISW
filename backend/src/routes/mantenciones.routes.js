const { Router } = require('express');
const permit = require('../middlewares/auth');
const {
  createMantencion,
  getMantenciones,
  getMantencionById,
  updateMantencionById,
  deleteMantencionById
} = require('../controllers/mantencion.controller');
const upload = require('../middlewares/handleMulter');
const handleErrors = require('../middlewares/handleErrors');

const router = Router();

router.get('/mantenciones', permit('administrador', 'residente'), getMantenciones);

router.post('/mantencion', upload.fields([
  { name: 'imagen_antes', maxCount: 1 },
  { name: 'imagen_despues', maxCount: 1 }
]), handleErrors, permit('administrador'), createMantencion);

router.route('/mantencion/:id')
  .get(permit('administrador', 'residente'), getMantencionById)
  .put(upload.fields([
    { name: 'imagen_antes', maxCount: 1 },
    { name: 'imagen_despues', maxCount: 1 }
  ]), handleErrors, permit('administrador'), updateMantencionById)
  .delete(permit('administrador'), deleteMantencionById);

module.exports = router;