const { Router } = require("express");
const routes = Router();
const PortfolioController = require("../controllers/PortfolioController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/portfolio", ensureAuthenticated, PortfolioController.portfolio);
routes.get(
  "/portfolio/new",
  ensureAuthenticated,
  PortfolioController.portfolioNew
);

routes.post(
  "/portfolio/:id/remove",
  upload.single("photo"),
  PortfolioController.brandUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/portfolio/:id/update",
  upload.single("photo"),
  PortfolioController.brandUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/portfolio/:id", PortfolioController.portfolioNew);

routes.post(
  "/portfolio",
  upload.single("photo"),
  PortfolioController.portfolioSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
