const Book = require("../models/book.model.js");

exports.findAll = (req, res) => {
  Book.find()
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
exports.createBook = (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.genre || !req.body.type) {
    return res.status(400).send({
      message: "Required fields (name, author, genre, type) cannot be empty",
    });
  }

  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
    type: req.body.type,
    available: req.body.available ?? true,
  });

  book
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book.",
      });
    });
};

exports.updateBook = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty",
    });
  }
  const id = req.params.messageId;
  Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runvalidators: true,
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + id,
        });
      } else res.send({ message: "update successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error updating with id=" + id,
      });
    });
};
