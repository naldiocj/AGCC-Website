const express = require("express");
const path = require("path");
module.exports = (app) => {
  app.use(express.static(path.join(__dirname, "..", "..", "public")));
  app.use(
    "/admin/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/portfolio",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/portfolio/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/product/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/areas-de-consultorias/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/portfolio/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/brand/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/service/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/product/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/brand/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/slide/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/team/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/partner/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/agcc/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/certification/:id/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/users/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/team/",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
  app.use(
    "/admin/contact/:id",
    express.static(path.join(__dirname, "..", "..", "public"))
  );
};
