const Partner = require("../models/Partner");

module.exports = {
  async partner(request, response) {
    try {
      const partners = await Partner.find({}, (err, partners) => {
        if (err) new Error(err);
      }).lean();

      return response.render("admin/partner", {
        layout: "admin",
        partners,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async partnerNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const partner = await Partner.findById(id).lean();
        if (!partner) return request.flash("error_msg", "Id Inválido");
        return response.render("admin/partner/edit", {
          layout: "admin",
          partner,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/partner/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async partnerSave(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        request.flash("error_msg", "Preencha os campos em falta");
        return response.redirect("/admin/partner/new");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/partner/new");
      }
      const { filename: photo } = request.file;
      let data = new Partner({
        photo,
        name,
      });
      const partner = await Partner(data);

      partner.save();
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/partner");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async partnerUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name } = request.body;

      let data = { name };

      switch (pagaName) {
        case "/partner/:id/remove":
          await Partner.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/partner");
        case "/partner/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              photo,
              name,
            };
          }
          await Partner.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/partner");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
