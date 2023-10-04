const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const errorHanlder = require("./middlewares/error-handler");
const endpointNotFound = require("./middlewares/endpointNotFound");
const authenticationRouter = require("./routes/authentication");

app.use(express.json());
app.use("/api/v1/user", authenticationRouter);
app.use(errorHanlder);
app.use(endpointNotFound);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
