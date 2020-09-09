const { Router } = require("express");

const routes = Router();
const TeamController = require("../controllers/TeamController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);
routes.get("/team", ensureAuthenticated, TeamController.team);
routes.get("/team/new", ensureAuthenticated, TeamController.teamNew);

routes.post(
  "/team/:id/remove",
  upload.single("photo"),
  TeamController.teamUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/team/:id/update",
  upload.single("photo"),
  TeamController.teamUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/team/:id", TeamController.teamNew);

routes.post(
  "/team/",
  upload.single("photo"),
  TeamController.teamSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
