const Borrow = require("../models/borrow.model.js");
const Book = require("../models/book.model.js");

exports.findAll = (req, res) => {
  Borrow.find()
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

exports.borrowBook = async (req, res) => {
  const { username, bookid } = req.body;

  const book = await Book.findById(bookid);
  if (!book || !book.available) {
    return res.status(400).send({ message: "Book not available" });
  }

  const borrow = new Borrow({ username, bookid });

  borrow
    .save()
    .then(() => {
      book.available = false;
      book.save();
      res.send({ message: "Book borrowed successfully", borrow });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
