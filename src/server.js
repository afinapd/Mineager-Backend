const http = require("http");
const express = require("express");
const app = express();
const logEmitter = require("./events/logEmitter");

const appMiddleware = require("./middlewares/app.middleware");
const routeIndex = require("./routes/index");
const path = require("path");


app.use(appMiddleware);
app.use(routeIndex);
app.get('/file/*', (req, res, next) => {
  res.send(req.params[1]);
  next('AA');
})

const server = http.createServer(app);
const io = require("socket.io")(server);
server.on("error", function (ev) {
  logEmitter.emit("APP-ERROR", {
    logTitle: "SERVER ERROR",
    logMessage: ev.message,
  });
});

module.exports = { server, io };
