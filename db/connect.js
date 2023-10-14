const mongoose = require("mongoose");

const connect = async (uri, cb) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to db succefully");
    return cb();
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
