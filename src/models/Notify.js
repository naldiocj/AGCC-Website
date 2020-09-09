const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);
