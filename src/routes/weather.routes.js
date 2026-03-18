const express = require('express');
const weatherController = require('../controllers/weather.controller');

const router = express.Router();

router.get('/weather/current', weatherController.getCurrent);

module.exports = router;
