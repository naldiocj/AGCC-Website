const mongoose = require("mongoose");

const ProdutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    photo: {
      type: String,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProdutSchema);
