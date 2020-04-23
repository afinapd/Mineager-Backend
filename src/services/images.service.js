const logEmitter = require("../events/logEmitter");
const dotenv = require("dotenv");
const User = require("../models/user.model");

dotenv.config();

class ImagesService {
  constructor(image) {
    this.image = image;
  }
  async addNewImage(path, type) {
    try {
      const result = await this.image.create({ path: path, type: type });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "ADD NEW IMAGE SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("F201");
    }
  }

  async searchByType(type) {
    try {
      const result = await this.image.findAll({
        attributes: ["id", "path", "type"],
        where: { type: type },
        include: { model: User, attributes: ["id", "name"] },
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "SEARCH IMAGE BY TYPE SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("F202");
    }
  }
}

module.exports = ImagesService;
