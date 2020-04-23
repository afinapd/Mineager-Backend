const logEmitter = require("../events/logEmitter");
const logRoute = (req, res, next) => {
  logEmitter.emit("APP-INFO", {
    logTitle: "INVALID ACTIVITY",
    logMessage: `Url ${req.originalUrl} was requested`,
  });
  res.status(404);
  res.json({ message: "Page Not Found" });
};
module.exports = logRoute;
