const Brand = require("../models/Brand");

module.exports = {
  async brand(request, response) {
    try {
      const brands = await Brand.find({}, (err, brands) => {
        if (err) new Error(err);
      })
        .lean()
        .populate("products", "name");

      return response.render("admin/brand", {
        layout: "admin",
        brands,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async brandNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const data = await Brand.findById(id).lean();
        return response.render("admin/brand/edit", {
          layout: "admin",
          data,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/brand/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async brandSave(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/brand/new");
      }

      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/brand/new");
      }
      const { filename: photo } = request.file;
      const data = new Brand({
        name,
        photo,
      });
      const brand = await Brand(data);

      brand.save();
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/brand");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async brandUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name } = request.body;
      let data = { name };
      switch (pagaName) {
        case "/brand/:id/remove":
          await Brand.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/brand");
        case "/brand/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              name,
              photo,
            };
          }
          await Brand.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/brand");
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
