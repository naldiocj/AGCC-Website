const { Router } = require("express");
const routes = Router();
const PartnerController = require("../controllers/PartnerController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/partner", ensureAuthenticated, PartnerController.partner);
routes.get("/partner/new", ensureAuthenticated, PartnerController.partnerNew);

routes.post(
  "/partner/:id/remove",
  upload.single("photo"),
  PartnerController.partnerUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/partner/:id/update",
  upload.single("photo"),
  PartnerController.partnerUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/partner/:id", PartnerController.partnerNew);

routes.post(
  "/partner/",
  upload.single("photo"),
  PartnerController.partnerSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
