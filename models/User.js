const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
  },
  username: {
    type: String,
    required: [true, "must provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    match: [
      /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "must provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "must provide email"],
  },
});
// hashing the password before sending it to the db
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.genJWT = function (id) {
  const token = jwt.sign({ userID: id }, process.env.JWT_KEY);
  return token;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
