const jwt = require("jsonwebtoken");
const moment = require("moment");
const axios = require("axios");

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    if (authorization.startsWith("Bearer ")) {
      const token = authorization.slice(7, authorization.length);
      const {
        data: { status },
      } = await axios.get(`${process.env.REDIS}/token/validate?t=${token}`);
      console.log(status);
      if (status != "Token Valid") {
        res.sendStatus(401);
      } else next();

      // jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      //   if (err) {
      //     res.sendStatus(401);
      //   } else {
      //     const decodedToken = decoded;
      //     if (Date.now() >= new Date(decodedToken.exp * 1000)) {
      //       res.sendStatus(401);
      //     } else {
      //       next();
      //     }
      //   }
      // });
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = tokenValidation;
