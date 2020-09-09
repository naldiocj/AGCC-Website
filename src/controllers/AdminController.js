const Portfolio = require("../models/Portfolio");
const Brand = require("../models/Brand");
const Product = require("../models/Product");
const Service = require("../models/Service");
const Team = require("../models/Team");
const User = require("../models/User");
const Notify = require("../models/Notify");
const passport = require("passport");

module.exports = {
  index(request, response) {
    return response.render("admin/index", {
      layout: "auth",
      template: "login-page",
    });
  },
  async login(req, res, next) {
    try {
      passport.authenticate("local", {
        successRedirect: "/admin/dashboard",
        failureRedirect: "/admin",
        badRequestMessage: "Preencha todos os campos", // change "missing credentials" message
        failureFlash: true,
        successMessage: "olá",
        successFlash: "olá",
      })(req, res, next);
    } catch (e) {
      res.status(400).send();
    }
  },
  async dashboard(request, response, next) {
    const brands = await Brand.find().lean();
    const countBrand = brands.length;

    const products = await Product.find().lean();
    const countProduct = products.length;

    const users = await User.find().lean();
    const countUser = users.length;

    const portfolios = await Portfolio.find().lean();
    const countPortfolio = portfolios.length;

    response.render("admin/dashboard", {
      layout: "admin",
      user: request.user,
      count: request.count,
      countBrand,
      countUser,
      countProduct,
      countPortfolio,
    });
  },

  logout(req, res) {
    req.logout();
    req.flash("success_msg", "Você está desconectado");
    res.redirect("/admin/");
  },
};
