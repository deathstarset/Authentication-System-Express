const CustomError = require("./custom-error");

class NotAuthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = NotAuthenticated;
