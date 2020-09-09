const { Router } = require("express");

const routes = Router();
const AgccController = require("../controllers/AgccController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/agcc", ensureAuthenticated, AgccController.agcc);

routes.post(
  "/agcc",
  upload.single("photo"),
  AgccController.agccSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/agcc/:id",
  upload.single("photo"),
  AgccController.agccUpdate,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
