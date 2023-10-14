const { MongooseError } = require("mongoose");
const { CustomError } = require("../errors/index");
const httpStatusText = require("../utils/httpStatusText");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: err.statusText,
      message: err.message,
      code: err.statusText,
    });
  }
  if (err instanceof MongooseError) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message, code: 400 });
  }
  res
    .status(500)
    .json({ status: httpStatusText.FAIL, message: err.message, code: 500 });
};

module.exports = errorHandler;
