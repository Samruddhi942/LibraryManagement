const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    name: String,
    author: String,
    genre: String,
    type: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", BookSchema);
