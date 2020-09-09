const Agcc = require("../models/Agcc");

module.exports = {
  async agcc(request, response) {
    try {
      const agccs = await Agcc.find().lean();
      const agcc = agccs[0];
      return response.render("admin/agcc", {
        layout: "admin",
        agcc,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async agccSave(request, response) {
    try {
      const { description, eyesight, mission, values } = request.body;
      if (!description || !eyesight || !mission || !values) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/agcc");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/agcc");
      }
      const { filename: photo } = request.file;
      const agcc = new Agcc({
        description,
        eyesight,
        mission,
        values,
        photo,
      });
      await Agcc.create(agcc);

      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/agcc");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async agccUpdate(request, response) {
    try {
      const { id } = request.params;
      const { description, eyesight, mission, values } = request.body;

      if (!description || !eyesight || !mission || !values) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/agcc");
      }

      let data = {
        description,
        eyesight,
        mission,
        values,
      };
      if (request.file) {
        const { filename: photo } = request.file;
        data = {
          description,
          eyesight,
          mission,
          values,
          photo,
        };
      }
      await Agcc.findOneAndUpdate(
        {
          _id: id,
        },
        data,
        { new: true, runValidators: true }
      ).exec();
      request.flash("success_msg", "Publicado");
      return response.redirect("/admin/agcc");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
