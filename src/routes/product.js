const { Router } = require("express");

const routes = Router();
const ProductController = require("../controllers/ProductController");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/product", ensureAuthenticated, ProductController.product);
routes.get("/product/new", ensureAuthenticated, ProductController.productNew);

routes.post(
  "/product/:id/remove",
  upload.single("photo"),
  ProductController.productUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.post(
  "/product/:id/update",
  upload.single("photo"),
  ProductController.productUpdateAndRemove,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);
routes.get("/product/:id", ProductController.productNew);

routes.post(
  "/product",
  upload.single("photo"),
  ProductController.productSave,
  (err, req, res, next) => {
    if (err) return res.status(400).send(err.message);
    next();
  }
);

module.exports = routes;
