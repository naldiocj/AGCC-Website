const { Router } = require("express");
const routes = Router();
const ServiceController = require("../controllers/ServiceController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);
routes.get("/service", ensureAuthenticated, ServiceController.service);
routes.get("/service/new", ensureAuthenticated, ServiceController.serviceNew);

routes.post(
  "/service/:id/remove",
  upload.single("photo"),
  ServiceController.serviceUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/service/:id/update",
  upload.single("photo"),
  ServiceController.serviceUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/service/:id", ServiceController.serviceNew);

routes.post(
  "/service",
  upload.single("photo"),
  ServiceController.serviceSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
