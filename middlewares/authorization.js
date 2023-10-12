const { NotAuthenticated } = require("../errors/index");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middlewares/async");
require("dotenv").config();
const authorization = asyncMiddleware(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new NotAuthenticated("you are not authorized to access this route");
  }
  const token = authorization.split(" ")[1];

  const { userID } = jwt.verify(token, process.env.JWT_KEY);
  req.user = userID;
  next();
});

module.exports = authorization;
