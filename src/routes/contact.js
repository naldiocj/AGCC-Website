const { Router } = require("express");

const routes = Router();
const ContactController = require("../controllers/ContactController");
const { ensureAuthenticated } = require("../config/auth");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const upload = multer(multerConfig);

routes.get("/contacts", ensureAuthenticated, ContactController.contact);
routes.get("/contact/:id", ensureAuthenticated, ContactController.contactNew);
routes.post("/contacts", ContactController.contactSave);
routes.post(
  "/contact/:id/remove",
  ensureAuthenticated,
  ContactController.contactRemove
);

module.exports = routes;
