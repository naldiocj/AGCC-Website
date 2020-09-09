const { Router } = require("express");

const routes = Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const AdminController = require("../controllers/AdminController");

routes.get("/", forwardAuthenticated, AdminController.index);

routes.get("/dashboard", ensureAuthenticated, AdminController.dashboard);

routes.post("/login", forwardAuthenticated, AdminController.login);

routes.get("/logout", ensureAuthenticated, AdminController.logout);

module.exports = routes;
