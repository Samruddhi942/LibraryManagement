module.exports = (app) => {
  const UserController = require("../controllers/user.controller.js");
  const BookController = require("../controllers/book.controller.js");
  const BorrowController = require("../controllers/borrow.controller.js");
  const ReturnController = require("../controllers/return.controller.js");

  app.get("/get-user", UserController.findAll);
  app.get("/get-book", BookController.findAll);
  app.get("/get-borrow", BorrowController.findAll);
  app.get("/get-return", ReturnController.findAll);

  app.post("/register", UserController.registerUser);
  app.post("/book", BookController.createBook);
  app.put("/updatebook/:messageId", BookController.updateBook);
  app.post("/borrow", BorrowController.borrowBook);
  app.post("/return", ReturnController.returnBook);
  app.post("/login", UserController.login);
};
