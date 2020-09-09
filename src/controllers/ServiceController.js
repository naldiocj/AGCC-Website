const Service = require("../models/Service");

module.exports = {
  async service(request, response) {
    try {
      const services = await Service.find({}).lean();

      return response.render("admin/service", {
        layout: "admin",
        services,
        count: request.count,
        user: request.user,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async serviceNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const service = await Service.findById(id).lean();
        return response.render("admin/service/edit", {
          layout: "admin",
          service,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/service/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async serviceSave(request, response) {
    try {
      const { name, description } = request.body;

      if (!name) {
        request.flash("error_msg", "Preencha os campos em falta");
        return response.redirect("/admin/service/new");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/service/new");
      }
      const { filename: photo } = request.file;
      const data = new Service({
        name,
        description,
        photo,
      });

      const service = await Service(data);

      service.save();
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/service");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async serviceUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name, description } = request.body;
      let data = { name, description };
      switch (pagaName) {
        case "/service/:id/remove":
          await Service.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/service");
        case "/service/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              name,
              description,
              photo,
            };
          }
          await Service.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/service");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
