const Office = require("../models/Office");

module.exports = {
  async office(request, response) {
    try {
      const offices = await Office.find().lean();
      return response.render("admin/office", {
        layout: "admin",
        office: offices[0],
        user: request.user,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async officeSave(request, response) {
    try {
      const {
        service,
        portfolio,
        team,
        serviceTime,
        tel,
        email,
        location,
        office,
      } = request.body;

      if (
        !service ||
        !portfolio ||
        !team ||
        !serviceTime ||
        !tel ||
        !email ||
        !location ||
        !office
      ) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/office");
      }

      const data = new Office({
        service,
        portfolio,
        team,
        serviceTime,
        tel,
        email,
        location,
        office,
      });

      const offices = await Office(data);
      offices.save();
      request.flash("success_msg", "Publicado");
      return response.redirect("/admin/office");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async officeUpdate(request, response) {
    try {
      const { id } = request.params;
      const {
        service,
        portfolio,
        team,
        serviceTime,
        tel,
        email,
        location,
        office,
      } = request.body;

      if (
        !service ||
        !portfolio ||
        !team ||
        !serviceTime ||
        !tel ||
        !email ||
        !location ||
        !office
      ) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/office");
      }

      let data = {
        service,
        portfolio,
        team,
        serviceTime,
        tel,
        email,
        location,
        office,
      };

      await Office.findOneAndUpdate(
        {
          _id: id,
        },
        data,
        { new: true, runValidators: true }
      ).exec();
      request.flash("success_msg", "Publicado");
      return response.redirect("/admin/office");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
