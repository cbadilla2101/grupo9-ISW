const { Router } = require('express');
const mailerController = require('../controllers/mails.controller');

const router = Router();

router.post('/mail', mailerController);

module.exports = router;