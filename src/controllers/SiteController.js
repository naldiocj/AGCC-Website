const Portfolio = require("../models/Portfolio");
const Brand = require("../models/Brand");
const Service = require("../models/Service");
const Team = require("../models/Team");
const Agcc = require("../models/Agcc");
const Certification = require("../models/Certification");
const Slide = require("../models/Slide");
const Partner = require("../models/Partner");
const Office = require("../models/Office");

module.exports = {
  async index(request, response) {
    const offices = await Office.find();
    const pageName = request.path;
    const services = await Service.find().lean();
    const certifications = await Certification.find().lean();
    const partners = await Partner.find().lean();
    const slides = await Slide.find().lean();
    slides.reverse();

    return response.render("index", {
      pageName,
      services,
      certifications,
      slides,
      office: offices[0],
      partners,
      activeHome: pageName === "/",
    });
  },
  async aboutUs(request, response) {
    const pageName = "/about";
    const teams = await Team.find().lean();
    const agccs = await Agcc.find().lean();
    const offices = await Office.find();

    return response.render("about", {
      pageName,
      teams,
      office: offices[0],
      agcc: agccs[0],
      activeAbout: pageName === "/about",
    });
  },
  async portfolio(request, response) {
    const pageName = "/portfolio";
    const offices = await Office.find();
    await Portfolio.find({}, (err, data) => {
      if (err) new Error(err);
      return response.render("portfolio", {
        data,
        office: offices[0],
        pageName,
        activePortfolio: pageName === "/portfolio",
      });
    }).lean();
  },
  async portfolioDetail(request, response) {
    const { id } = request.params;
    const pageName = "/portfolio/:id";
    if (id) {
      const data = await Portfolio.findById(id).lean();
      if (!data) return request.flash("error_msg", "Id Inválido");
      return response.render("portfolioDetail", {
        pageName,
        data,
        activePortfolio: pageName === "/portfolio/:id",
      });
    }
  },
  async services(request, response) {
    const pageName = "/services";
    const offices = await Office.find();
    const services = await Service.find().lean();
    return response.render("services", {
      services,
      pageName,
      office: offices[0],
      activeServices: pageName === "/services",
    });
  },
  async serviceDetail(request, response) {
    const pageName = "/service/:id";
    const { id } = request.params;
    if (id) {
      const service = await Service.findById(id).lean();
      if (!service) return request.flash("error_msg", "Id Inválido");
      return response.render("serviceDetail", {
        service,
        pageName,
        activeBrand: pageName === "/service/:id",
      });
    }

    return response.render("services", {
      pageName,
      activeServices: pageName === "/services",
    });
  },
  async brand(request, response) {
    const pageName = "/marcas";
    const brands = await Brand.find({}, (err, brands) => {
      if (err) new Error(err);
    })
      .lean()
      .populate("products", "name");

    return response.render("brand", {
      pageName,
      brands,
      activeBrand: pageName === "/marcas",
    });
  },
  async product(request, response) {
    const pageName = "/marcas";
    const { id } = request.params;
    if (id) {
      const brand = await Brand.findById(id).lean().populate("products");
      if (!brand) return request.flash("error_msg", "Id Inválido");
      return response.render("product", {
        brand,
        pageName,
        activeBrand: pageName === "/marcas",
      });
    }
  },
  teams(request, response) {
    const pageName = "/teams";

    return response.render("teams", {
      pageName,
      activeTeams: pageName === "/teams",
    });
  },
  async contacts(request, response) {
    const pageName = "/contacts";
    const offices = await Office.find();
    return response.render("contacts", {
      pageName,
      office: offices[0],
      activeContacts: pageName === "/contacts",
    });
  },
};
