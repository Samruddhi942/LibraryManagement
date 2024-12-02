const Return = require("../models/return.model.js");
const Borrow = require("../models/borrow.model.js");
const Book = require("../models/book.model.js");

exports.findAll = (req, res) => {
  Return.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err.stack);
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
};

exports.returnBook = async (req, res) => {
  const { username, bookid } = req.body;

  try {
    const borrowRecord = await Borrow.findOneAndDelete({ username, bookid });

    if (!borrowRecord) {
      return res.status(404).send({ message: "Borrow record not found" });
    }

    const book = await Book.findById(bookid);
    if (book) {
      book.available = true;
      await book.save();
    }

    const dueDate = borrowRecord.duedate;
    const today = new Date();
    let fine = 0;

    if (today > dueDate) {
      const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 10;
    }

    const returnRecord = new Return({
      username,
      bookid,
      duedate: dueDate,
      fine,
    });

    await returnRecord.save();

    res.send({ message: "Book returned successfully", returnRecord });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
