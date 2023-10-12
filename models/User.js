const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    minLength: 1,
  },
  username: {
    type: String,
    required: [true, "must provide username"],
    unique: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    match: [
      /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "must provide a valid email",
    ],
    unique: true,
    minLength: 8,
  },
  password: {
    type: String,
    required: [true, "must provide password"],
    mingLength: 8,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.genJWT = function (id) {
  const token = jwt.sign({ userID: id }, process.env.JWT_KEY);
  return token;
};
userSchema.methods.comparePasswords = async function (password) {
  const isMatch = bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
