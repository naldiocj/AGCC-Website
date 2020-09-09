const Certification = require("../models/Certification");

module.exports = {
  async certification(request, response) {
    try {
      const certifications = await Certification.find(
        {},
        (err, certifications) => {
          if (err) new Error(err);
        }
      ).lean();

      return response.render("admin/certification", {
        layout: "admin",
        certifications,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async certificationNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const certification = await Certification.findById(id).lean();
        if (!certification) return response.status(400).send("Id Inválido");
        return response.render("admin/certification/edit", {
          layout: "admin",
          certification,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/certification/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async certificationSave(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/certification/new");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/certification/new");
      }
      const { filename: photo } = request.file;
      let data = new Certification({
        photo,
        name,
      });
      const certification = await Certification(data);

      certification.save();
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/certification");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async certificationUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name } = request.body;

      let data = { name };
      if (!id) return request.flash("error_msg", "Id Inválido");
      switch (pagaName) {
        case "/certification/:id/remove":
          await Certification.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/certification");
        case "/certification/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              photo,
              name,
            };
          }
          await Certification.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/certification");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
