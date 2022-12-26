const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");

const usuariosRoutes = require('./routes/usuarios.routes');
const mantencionesRoutes = require('./routes/mantenciones.routes');
const correosRoutes = require('./routes/correos.routes');

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/public', express.static(path.resolve('./public')));

app.get('/', (_req, res) => res.json('API Mantencion de Instalaciones'));
app.use('/api', usuariosRoutes);
app.use('/api', mantencionesRoutes);
app.use('/api', correosRoutes);

module.exports = app;