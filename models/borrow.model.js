const mongoose = require("mongoose");

const BorrowSchema = mongoose.Schema(
  {
    username: String,
    bookid: { type: mongoose.Schema.Types.ObjectId, ref: "Book", unique: true },
    duedate: {
      type: Date,
      default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000),
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("borrows", BorrowSchema);
