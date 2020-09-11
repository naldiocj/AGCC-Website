const mongoose = require('mongoose');

const LangSchema = new mongoose.Schema(
  {
    lang: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lang', LangSchema);
