const mongoose = require("mongoose");

const AgccSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    eyesight: {
      type: String,
      required: true,
    },
    values: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agcc", AgccSchema);
