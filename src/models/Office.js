const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema(
  {
    service: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    team: {
      type: String,
    },
    serviceTime: {
      type: String,
    },
    location: {
      type: String,
    },
    tel: {
      type: String,
    },
    office: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Office", OfficeSchema);
