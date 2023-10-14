const httpStatusText = require("../utils/httpStatusText");
const endpointNotFound = (req, res, next) => {
  if (req.url === "/protectedRoute") {
    return next();
  }
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "the ressource that you are trying to access doesn't exist",
    code: 404,
  });
};

module.exports = endpointNotFound;
