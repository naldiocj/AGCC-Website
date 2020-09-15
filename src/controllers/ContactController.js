const Contact = require("../models/Contact");
const { count } = require("../models/Contact");
const Notify = require("../models/Notify");
module.exports = {
  async contact(request, response) {
    try {
      const data = await Contact.find({}, (err, contacts) => {
        if (err) new Error(err);
        contacts.reverse();

        contacts = contacts.map((c) => {
          c.message = c.message.slice(0, 100);
          c.createdAt = new Date(c.createdAt).toUTCString();

          return c;
        });
        return response.render("admin/contact", {
          layout: "admin",
          contacts,
          user: request.user,
          count: request.count,
        });
      }).lean();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async contactNew(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const contact = await Contact.findOne({ _id: id });
        let count = null;
        if (contact.activo) {
          let counts = await Notify.findOne({
            _id: "5f5905fd0fcee36b84726cb1",
          });
          counts.count -= 1;
          counts.save();
          count = counts.count;
        }
        contact.activo = false;
        contact.save();

        return response.render("admin/contact/show", {
          layout: "admin",
          contact,
          user: request.user,
          count: count,
        });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  async contactSave(request, response) {
    try {
      const { name, email, subject, tel, message } = request.body;
      if (!name || !subject || !tel || !message || !email) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/contactos");
      }
      const data = new Contact({
        name,
        email,
        subject,
        tel,
        message,
      });
      let counts = await Notify.findOne({ _id: "5f57b11cc2df51667c009ef2" });
      counts.count += 1;
      counts.save();

      const contact = await Contact(data);

      contact.save();
      request.flash("success_msg", "Mensagem enviada");
      response.redirect("/contactos");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async contactRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;

      await Contact.findByIdAndDelete(id);
      request.flash("success_msg", "Removido");
      return response.redirect("/admin/contacts");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
