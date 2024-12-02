const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  mobile: { type: Number, unique: true },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", UserSchema);
