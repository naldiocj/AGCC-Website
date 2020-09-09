const Team = require("../models/Team");

module.exports = {
  async team(request, response) {
    try {
      const teams = await Team.find({}).lean();

      return response.render("admin/team", {
        layout: "admin",
        teams,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async teamNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const team = await Team.findById(id).lean();

        return response.render("admin/team/edit", {
          layout: "admin",
          team,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/team/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async teamSave(request, response) {
    try {
      const { name, role, email, degree } = request.body;

      if (!name || !degree || !email || !role) {
        request.flash("error_msg", "Preencha os campos em falta");
        return response.redirect("/admin/team/new");
      }

      let data = new Team({
        name,
        role,
        email,
        degree,
      });
      if (request.file) {
        const { filename: photo } = request.file;
        data = new Team({
          name,
          role,
          photo,
          email,
          degree,
        });
      }

      const team = await Team(data);
      team.save();
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/team");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async teamUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name, role, email, degree } = request.body;
      let data = { name, role, email, degree };

      switch (pagaName) {
        case "/team/:id/remove":
          await Team.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/team");
        case "/team/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              name,
              role,
              photo,
              email,
              degree,
            };
          }
          await Team.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/team");
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
