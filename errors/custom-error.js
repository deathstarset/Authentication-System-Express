const httpStatusText = require("../utils/httpStatusText");

class CustomError extends Error {
  statusText = httpStatusText.ERROR;
  constructor(message) {
    super(message);
  }
}

module.exports = CustomError;
