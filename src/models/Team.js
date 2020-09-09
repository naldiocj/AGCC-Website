const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    photo: {
      type: String,
      default: "demo.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    degree: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
