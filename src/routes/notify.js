const { Router } = require("express");

const routes = Router();
const NotifyController = require("../controllers/NotifyController");
const { ensureAuthenticated } = require("../config/auth");

// routes.get("/office", ensureAuthenticated, OfficeController.office);
routes.post("/notify", NotifyController.notifySave);
routes.post("/notify/count", NotifyController.notifyRemove);

module.exports = routes;
