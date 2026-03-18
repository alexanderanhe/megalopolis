const express = require('express');
const hoyNoCirculaController = require('../controllers/hoyNoCircula.controller');

const router = express.Router();

router.get('/hoy-no-circula/today', hoyNoCirculaController.getToday);

module.exports = router;
