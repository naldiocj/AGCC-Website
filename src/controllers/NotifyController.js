const Notify = require("../models/Notify");

module.exports = {
  async notifySave(request, response) {
    try {
      const count = await Notify.create(request.body);
      response.json(count);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async notifyRemove(request, response) {
    try {
      let counts = await Notify.findOne({ _id: "5f57b11cc2df51667c009ef2" });
      counts.count = 0;
      counts.save();

      const pagName = request.route.path;

      switch (pagName) {
        case "/notify/count":
          return response.json({ success: true });
      }

      response.redirect("/admin/contacts");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
