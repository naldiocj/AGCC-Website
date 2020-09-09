const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    sub: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slide", SlideSchema);
