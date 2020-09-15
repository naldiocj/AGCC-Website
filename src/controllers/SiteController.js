const Portfolio = require("../models/Portfolio");
const Brand = require("../models/Brand");
const Service = require("../models/Service");
const Team = require("../models/Team");
const Agcc = require("../models/Agcc");
const Certification = require("../models/Certification");
const Slide = require("../models/Slide");
const Partner = require("../models/Partner");
const Office = require("../models/Office");
const fs = require("fs");
const path = require("path");
const setLang = require("../utils/set_lang");

module.exports = {
  async index(request, response) {
    const offices = await Office.find();
    const pageName = request.path;
    const services = await Service.find().lean();
    const certifications = await Certification.find().lean();
    const partners = await Partner.find().lean();
    const slides = await Slide.find().lean();
    slides.reverse();

    return response.render(
      "index",
      setLang(
        {
          pageName,
          services,
          certifications,
          slides,
          office: offices[0],
          partners,
          activeHome: pageName === "/",
        },
        request
      )
    );
  },
  async aboutUs(request, response) {
    const pageName = "/about";
    const teams = await Team.find().lean();
    const agccs = await Agcc.find().lean();
    const offices = await Office.find();

    return response.render(
      "about",
      setLang(
        {
          pageName,
          teams,
          office: offices[0],
          agcc: agccs[0],
          activeAbout: pageName === "/about",
        },
        request
      )
    );
  },
  async portfolio(request, response) {
    const pageName = "/portfolio";
    const offices = await Office.find();
    await Portfolio.find({}, (err, data) => {
      if (err) new Error(err);
      return response.render(
        "portfolio",
        setLang(
          {
            data,
            office: offices[0],
            pageName,
            activePortfolio: pageName === "/portfolio",
          },
          request
        )
      );
    }).lean();
  },
  async portfolioDetail(request, response) {
    const { id } = request.params;
    const pageName = "/portfolio/:id";
    if (id) {
      const data = await Portfolio.findById(id).lean();
      if (!data) return request.flash("error_msg", "Id Inválido");
      return response.render(
        "portfolioDetail",
        setLang(
          {
            pageName,
            data,
            activePortfolio: pageName === "/portfolio/:id",
          },
          request
        )
      );
    }
  },
  async services(request, response) {
    const pageName = "/services";
    const offices = await Office.find();
    const services = await Service.find().lean();
    return response.render(
      "services",
      setLang(
        {
          services,
          pageName,
          office: offices[0],
          activeServices: pageName === "/services",
        },
        request
      )
    );
  },
  async serviceDetail(request, response) {
    const pageName = "/service/:id";
    const { id } = request.params;
    if (id) {
      const service = await Service.findById(id).lean();
      if (!service) return request.flash("error_msg", "Id Inválido");
      return response.render(
        "serviceDetail",
        setLang(
          {
            service,
            pageName,
            activeServices: pageName === "/service/:id",
          },
          request
        )
      );
    }

    return response.render(
      "services",
      setLang(
        {
          pageName,
          activeServices: pageName === "/services",
        },
        request
      )
    );
  },
  async brand(request, response) {
    const pageName = "/marcas";
    const brands = await Brand.find({}, (err, brands) => {
      if (err) new Error(err);
    })
      .lean()
      .populate("products", "name");

    return response.render(
      "brand",
      setLang(
        {
          pageName,
          brands,
          activeBrand: pageName === "/marcas",
        },
        request
      )
    );
  },
  async product(request, response) {
    const pageName = "/marcas";
    const { id } = request.params;
    if (id) {
      const brand = await Brand.findById(id).lean().populate("products");
      if (!brand) return request.flash("error_msg", "Id Inválido");
      return response.render(
        "product",
        setLang(
          {
            brand,
            pageName,
            activeBrand: pageName === "/marcas",
          },
          request
        )
      );
    }
  },
  teams(request, response) {
    const pageName = "/teams";

    return response.render(
      "teams",
      setLang(
        {
          pageName,
          activeTeams: pageName === "/teams",
        },
        request
      )
    );
  },
  async contacts(request, response) {
    const pageName = "/contacts";
    const offices = await Office.find();
    return response.render(
      "contacts",
      setLang(
        {
          pageName,
          office: offices[0],
          activeContacts: pageName === "/contacts",
        },
        request
      )
    );
  },
};
