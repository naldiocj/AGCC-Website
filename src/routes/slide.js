const { Router } = require("express");
const routes = Router();
const SlideController = require("../controllers/SlideController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/slide", ensureAuthenticated, SlideController.slide);
routes.get("/slide/new", ensureAuthenticated, SlideController.slideNew);

routes.post(
  "/slide/:id/remove",
  upload.single("photo"),
  SlideController.slideUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/slide/:id/update",
  upload.single("photo"),
  SlideController.slideUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/slide/:id", SlideController.slideNew);

routes.post(
  "/slide",
  upload.single("photo"),
  SlideController.slideSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
