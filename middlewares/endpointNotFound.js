const endpointNotFound = (req, res, next) => {
  res.send("route not found");
};

module.exports = endpointNotFound;
