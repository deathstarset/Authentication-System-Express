const { NotFound, BadRequest, NotAuthenticated } = require("../errors");
const asyncMiddleware = require("../middlewares/async");
const User = require("../models/User");

const register = asyncMiddleware(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.genJWT(user._id);
  res.status(201).json({ token });
});

const login = asyncMiddleware(async (req, res, next) => {
  const { username, password } = req.body;
  if (username === "") {
    throw new BadRequest("username must not be empty");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new NotFound(`there is no one registered with username ${username}`);
  }
  const isMatch = await user.comparePasswords(password);
  if (!isMatch) {
    throw new NotAuthenticated("password incorrect");
  }
  const token = user.genJWT(user._id);
  res.json({ token });
});
module.exports = { register, login };
