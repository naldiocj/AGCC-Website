const { Router } = require("express");

const routes = Router();
const OfficeController = require("../controllers/OfficeController");
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/office", ensureAuthenticated, OfficeController.office);
routes.post("/office", ensureAuthenticated, OfficeController.officeSave);
routes.post("/office/:id", ensureAuthenticated, OfficeController.officeUpdate);

module.exports = routes;
