const { Router } = require("express");
const routes = Router();
const CertificationController = require("../controllers/CertificationController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get(
  "/certification",
  ensureAuthenticated,
  CertificationController.certification
);
routes.get(
  "/certification/new",
  ensureAuthenticated,
  CertificationController.certificationNew
);

routes.post(
  "/certification/:id/remove",
  upload.single("photo"),
  CertificationController.certificationUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/certification/:id/update",
  upload.single("photo"),
  CertificationController.certificationUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/certification/:id", CertificationController.certificationNew);

routes.post(
  "/certification",
  upload.single("photo"),
  CertificationController.certificationSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
