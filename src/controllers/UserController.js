const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  async user(request, response) {
    try {
      const users = await User.find().lean();
      return response.render("admin/user", {
        layout: "admin",
        users,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async userNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const data = await User.findById(id).lean();
        if (!data) return request.flash("error_msg", "Id Inválido");
        return response.render("admin/user/edit", {
          layout: "admin",
          data,
          user: request.user,
          count: request.count,
        });
      }

      return response.render("admin/user/new", {
        layout: "admin",
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  async userSave(request, response) {
    try {
      const { name, email, password, admin } = request.body;
      if (!name || !email || !password)
        return request.flash("error_msg", "Preencha os campos em falta");
      let data = {
        name,
        email,
        password,
        admin,
      };

      if (request.file) {
        const { filename: photo } = request.file;
        data = {
          name,
          email,
          password,
          admin,
          photo,
        };
      }

      data.password = encryptPassword(password);

      const user = await User(data);

      user.save();

      const pagName = request.route.path;

      switch (pagName) {
        case "/users/api/agcc":
          return response.json(user);
      }

      request.flash("success_msg", "Salvo");

      return response.redirect("/admin/users");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  async userUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name, email, password, admin } = request.body;
      let data = { name, email, password, admin };
      if (!id) return request.flash("error_msg", "Id Inválido");
      switch (pagaName) {
        case "/users/:id/remove":
          await User.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/users");
        case "/users/:id/update":
          if (!password) {
            delete data.password;
          }
          if (request.file) {
            const { filename: photo } = request.file;
            data.photo = photo;
          }
          if (password) data.password = encryptPassword(password);
          await User.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, upsert: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/users");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
