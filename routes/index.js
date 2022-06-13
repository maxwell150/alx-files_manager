/*
endpoints of our API:

GET /status => AppController.getStatus
GET /stats => AppController.getStats
*/
const express = require('express');
const AppController = require('../controllers/AppController');

function controllerRouting(app) {
  const router = express.Router();
  app.use(express.json());
  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });
}

module.exports = controllerRouting;
