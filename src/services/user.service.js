const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const logEmitter = require("../events/logEmitter");
const Attendance = require("../models/attendance.model");
const image = require("../models/image.model");
const Gender = require("../models/gender.model");
const BloodType = require("../models/btype.model");
const Department = require("../models/department.model");
const bcrypt = require("bcryptjs");

class UserService {
  constructor(user) {
    this.user = user;
    this.inclusion = [
      {
        model: Gender,
        attributes: ["id", "gender"],
      },
      {
        model: BloodType,
        attributes: ["id", "type"],
      },
      {
        model: Department,
        attributes: ["id", "businessId", "name"],
      },
      {
        model: Attendance,
        separate: true,
        attributes: ["id", "date", "time", "timeOut"],
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
        limit: 1,
      },
      {
        model: image,
        attributes: ["id", "path", "type"],
      },
    ];
    this.sentAttributes = [
      "id",
      "qrId",
      "nfcId",
      "name",
      "birth",
      "email",
      "phone",
      "livingPartner",
    ];
  }
  async fetchAll() {
    try {
      const result = await this.user.findAll({
        include: [
          Gender,
          BloodType,
          Department,
          image,
          {
            model: Attendance,
            separate: true,
            order: [
              ["date", "desc"],
              ["time", "desc"],
            ],
          },
        ],
        attributes: [
          "id",
          "qrId",
          "nfcId",
          "name",
          "birth",
          "email",
          "phone",
          "livingPartner",
        ],
      });
      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ALL USER LIST SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E201");
    }
  }

  async fetchById(id) {
    try {
      const result = await this.user.findOne({
        where: { id: id },
        include: this.inclusion,
        attributes: this.sentAttributes,
      });
      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH USER DATA BY USER ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E202");
    }
  }

  async fetchByNfcId(id) {
    try {
      const result = await this.user.findOne({
        where: { nfcId: id },
        include: this.inclusion,
        attributes: this.sentAttributes,
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH USER DATA BY NFC ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E203");
    }
  }

  async fetchByQrId(id) {
    try {
      const result = await this.user.findOne({
        where: { qrId: id },
        include: this.inclusion,
        attributes: this.sentAttributes,
      });
      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH USER DATA BY QR ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E204");
    }
  }

  async fetchByName(name, limit, offset) {
    try {
      const result = await this.user.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        limit: limit,
        offset: limit * offset,
        attributes: [
          "id",
          "qrId",
          "nfcId",
          "name",
          "birth",
          "email",
          "phone",
          "livingPartner",
        ],
        include: [
          {
            model: Gender,
            attributes: ["id", "gender"],
          },
          {
            model: BloodType,
            attributes: ["id", "type"],
          },
          {
            model: image,
            attributes: ["id", "path", "type"],
          },
          {
            model: Department,
            attributes: ["id", "businessId", "name"],
          },
          {
            model: Attendance,
            separate: true,
            attributes: ["id", "date", "time", "timeOut"],
            order: [
              ["date", "desc"],
              ["time", "desc"],
            ],
            limit: 1,
          },
        ],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH USER DATA BY NAME SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E205");
    }
  }

  async addNewUser(body) {
    try {
      body.password = bcrypt.hashSync("admin", 10);
      const result = await this.user.create(body);

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "ADD NEW USER DATA SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E206");
    }
  }

  async updateUser(body, id) {
    try {
      const result = await this.user.update(body, { where: { id: id } });

      return result[0];
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "UPDATE USER SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E207");
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.user.destroy({ where: { id: id } });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "DELETE USER SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("E208");
    }
  }
}
module.exports = UserService;
