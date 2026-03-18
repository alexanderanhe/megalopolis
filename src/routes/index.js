const express = require('express');
const healthRoutes = require('./health.routes');
const hoyNoCirculaRoutes = require('./hoyNoCircula.routes');
const weatherRoutes = require('./weather.routes');
const dashboardRoutes = require('./dashboard.routes');

const router = express.Router();

router.use(healthRoutes);
router.use(hoyNoCirculaRoutes);
router.use(weatherRoutes);
router.use(dashboardRoutes);

module.exports = router;
