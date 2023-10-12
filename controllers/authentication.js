const asyncMiddleware = require("../middlewares/async");
const User = require("../models/User");
const register = asyncMiddleware(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const user = await User.create({
    name,
    username,
    email,
    password,
  });
  const token = user.genJWT(user._id);

  res.status(200).json({ token });
});

const login = asyncMiddleware(async (req, res, next) => {
  res.send("Login");
});
module.exports = { register, login };
