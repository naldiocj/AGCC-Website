const Portfolio = require("../models/Portfolio");

module.exports = {
  async portfolio(request, response) {
    try {
      const data = await Portfolio.find({}, (err, portfolios) => {
        if (err) new Error(err);
        return response.render("admin/portfolio", {
          layout: "admin",
          portfolios,
          user: request.user,
          count: request.count,
        });
      }).lean();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async portfolioNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const data = await Portfolio.findById(id).lean();
        return response.render("admin/portfolio/edit", {
          layout: "admin",
          data,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/portfolio/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async portfolioSave(request, response) {
    try {
      const { title, description } = request.body;
      if (!title || !description) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/portfolio/new");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/portfolio/new");
      }
      const { filename: photo } = request.file;

      const data = new Portfolio({
        title,
        photo,
        description,
      });
      const portfolio = await Portfolio(data);

      portfolio.save();

      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/portfolio");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async brandUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { title, description } = request.body;
      let data = { title, description };
      if (!id) return request.flash("error_msg", "Id Inválido");
      switch (pagaName) {
        case "/portfolio/:id/remove":
          await Portfolio.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/portfolio");
        case "/portfolio/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              title,
              description,
              photo,
            };
          }
          await Portfolio.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, runValidators: true }
          ).exec();

          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/portfolio");
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
