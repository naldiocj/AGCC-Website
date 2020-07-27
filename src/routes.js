const { Router } = require('express');

const routes = Router();

// Controllers
const SiteController = require('./controllers/SiteController');

routes.get('/', SiteController.index);
routes.get('/sobre-nos', SiteController.aboutUs);
routes.get('/areas-de-consultorias', SiteController.services);
routes.get('/portfolio', SiteController.portfolio);
routes.get('/equipa-de-trabalho', SiteController.teams);
routes.get('/contactos', SiteController.contacts);

module.exports = routes;
