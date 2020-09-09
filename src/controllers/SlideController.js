const Slide = require("../models/Slide");

module.exports = {
  async slide(request, response) {
    try {
      let slides = await Slide.find({}, (err, slides) => {
        if (err) new Error(err);
      }).lean();

      slides = slides.map((s, idx) => ({ ...s, idx }));
      slides.reverse();
      return response.render("admin/slide", {
        layout: "admin",
        slides,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async slideNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const slide = await Slide.findById(id).lean();
        if (!slide) return request.flash("error_msg", "Id Inválido");
        return response.render("admin/slide/edit", {
          layout: "admin",
          slide,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/slide/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async slideSave(request, response) {
    try {
      const { title, sub, status } = request.body;

      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/slide/new");
      }
      const { filename: photo } = request.file;

      if (!title || !sub || !request.file) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/slide/new");
      }

      let data = new Slide({
        title,
        sub,
        photo,
        status,
      });
      if (status) {
        await Slide.find({}, (err, ativo) => {
          ativo.filter(async (slide) => {
            if (slide.status) {
              let status = false;
              await Slide.findOneAndUpdate(
                { _id: slide._id },
                { status },
                { new: true }
              ).exec();
            }
          });
        });
      }

      await Slide.create(data);
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/slide");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async slideUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { title, sub, status } = request.body;
      let data = { title, sub, status };
      switch (pagaName) {
        case "/slide/:id/remove":
          await Slide.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/slide");
        case "/slide/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              title,
              sub,
              photo,
              status,
            };
          }
          if (status) {
            await Slide.find({}, (err, ativo) => {
              ativo.filter(async (slide) => {
                if (slide.status) {
                  let status = false;
                  await Slide.findOneAndUpdate(
                    { _id: slide._id },
                    { status },
                    { new: true }
                  ).exec();
                }
              });
            });
          }

          await Slide.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");

          return response.redirect("/admin/slide");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
