const mongoose = require("mongoose");

const connect = async (uri) => {
  await mongoose.connect(uri);
  console.log("connected to db succefully");
};

module.exports = connect;
