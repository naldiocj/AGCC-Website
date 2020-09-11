const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const routes = Router();

// Controllers
const SiteController = require('../controllers/SiteController');
const Lang = require('../models/Lang');

routes.get('/', SiteController.index);
// i18n
routes.get('/en', async (req, res, next) => {
  const lang = { lang: 'en' };

  await Lang.findByIdAndUpdate(
    { _id: '5f5b7bc4c507990ebc0d1cf2' },
    { lang: 'en' }
  );

  return res.redirect('/');
});

routes.get('/pt', async (req, res, next) => {
  const lang = { lang: 'pt' };

  await Lang.findByIdAndUpdate(
    { _id: '5f5b7bc4c507990ebc0d1cf2' },
    { lang: 'pt' }
  );

  return res.redirect('/');
});

routes.get('/sobre-nos', SiteController.aboutUs);
routes.get('/areas-de-consultorias', SiteController.services);
routes.get('/marcas', SiteController.brand);
routes.get('/product/:id', SiteController.product);
routes.get('/equipa-de-trabalho', SiteController.teams);
routes.get('/contactos', SiteController.contacts);
routes.get('/portfolio', SiteController.portfolio);

routes.get('/portfolio/:id', SiteController.portfolioDetail);
routes.get('/areas-de-consultorias/:id', SiteController.serviceDetail);

module.exports = routes;
