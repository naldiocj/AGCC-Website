const { Router } = require("express");

const routes = Router();
const UserController = require("../controllers/UserController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/users", ensureAuthenticated, UserController.user);

routes.get("/users/new", ensureAuthenticated, UserController.userNew);

routes.get("/users/:id", ensureAuthenticated, UserController.userNew);

routes.post(
  "/users",
  upload.single("photo"),
  ensureAuthenticated,
  UserController.userSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/users/api/agcc",
  upload.single("photo"),
  UserController.userSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

routes.post(
  "/users",
  upload.single("photo"),
  UserController.userSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/users/:id/update",
  upload.single("photo"),
  UserController.userUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/users/:id/remove",
  upload.single("photo"),
  UserController.userUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
