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
  // mongoose errors handling => if an error gets thrown its gonna get catched by the async middleware which is gonna forward it using the next function to the error handling middleware
  // thats where its gonna check if the error is an instance of the custom error that we created or not and handle it
  res.status(200).json({ token });
});

module.exports = { register };
