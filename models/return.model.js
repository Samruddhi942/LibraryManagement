const mongoose = require("mongoose");

const ReturnSchema = mongoose.Schema(
  {
    username: String,
    bookid: { type: mongoose.Schema.Types.ObjectId, ref: "Book", unique: true },
    duedate: { type: Date, ref: "Borrow" },
    fine: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("returns", ReturnSchema);
