const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const DB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/librarydb";
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit();
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
  res.send({ message: "Library Management System API is running" });
});

// Routes
require("./routes/app.routes")(app);

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
