const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  User.find()
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

exports.registerUser = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "content cannot be empty",
    });
    return;
  }
  const messages = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    admin: req.body.admin,
  });
  messages
    .save(messages)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating",
      });
    });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ message: "User Logged in Successfully!", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
