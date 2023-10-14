require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const errorHanlder = require("./middlewares/error-handler");
const endpointNotFound = require("./middlewares/endpointNotFound");
const authenticationRouter = require("./routes/authentication");
const authorizationMiddleware = require("./middlewares/authorization");
const httpStatusText = require("./utils/httpStatusText");

connectDB(process.env.MONGO_URI, () => {
  app.listen(port, () => console.log(`Server listening on port ${port}....`));
});

app.use(express.json());
app.use("/api/v1/auth", authenticationRouter);
app.use(endpointNotFound);
app.use(authorizationMiddleware);
// authorization test
app.get("/protectedRoute", async (req, res) => {
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { userID: req.user } });
});
app.use(errorHanlder);
