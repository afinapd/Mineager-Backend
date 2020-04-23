const logEmitter = require("../events/logEmitter");
const logRoute = (req, res, next) => {
  logEmitter.emit("APP-INFO", {
    logTitle: "USER ACTIVITY",
    logMessage: `Url ${req.originalUrl} was requested`,
  });
  next();
};
module.exports = logRoute;
