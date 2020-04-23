const logEmitter = require("../events/logEmitter");
const dotenv = require("dotenv");
const Axios = require("axios");
const bcrypt = require("bcryptjs");

dotenv.config();
class AuthService {
  constructor(user) {
    this.user = user;
  }

  async auth(user) {
    try {
      const { email, password } = user;
      let authUser = await this.user.findOne({ where: { email: email } });

      if (authUser) {
        const permitted = bcrypt.compareSync(password, authUser.password);
        if (permitted) {
          const {
            data: { result },
          } = await Axios.post(`${process.env.REDIS}/token`, {
            name: authUser.name,
            email: authUser.email,
          });
          authUser = {
            id: authUser.id,
            nfcId: authUser.nfcId,
            qrId: authUser.qrId,
            name: authUser.name,
            email: authUser.email,
            token: result,
          };
        } else {
          authUser = null;
        }
      } else {
        authUser = null;
      }
      return authUser;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "AUTH SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("Z201");
    }
  }
}

module.exports = AuthService;
