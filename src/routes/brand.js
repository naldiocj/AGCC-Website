const { Router } = require("express");
const routes = Router();
const BrandController = require("../controllers/BrandController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/brand", ensureAuthenticated, BrandController.brand);
routes.get("/brand/new", ensureAuthenticated, BrandController.brandNew);

routes.post(
  "/brand/:id/remove",
  upload.single("photo"),
  BrandController.brandUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/brand/:id/update",
  upload.single("photo"),
  BrandController.brandUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/brand/:id", ensureAuthenticated, BrandController.brandNew);

routes.post(
  "/brand",
  upload.single("photo"),
  BrandController.brandSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
