const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const logEmitter = require("../events/logEmitter");
const User = require("../models/user.model");
// const Gender = require('../models/gender.model');
// const BloodType = require('../models/btype.model');
// const Department = require('../models/department.model');
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();
class AttendanceService {
  constructor(attendance) {
    this.attendance = attendance;
  }

  async fetchById(id, offset, limit) {
    try {
      const result = await this.attendance.findAll({
        where: { userId: id },
        limit: limit,
        offset: limit * offset,
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
        attributes: ["id", "date", "time", "timeOut"],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH DATE BY ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A203");
    }
  }

  async fetchNewestById(id) {
    try {
      const result = await this.attendance.findOne({
        where: { userId: id },
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
        attributes: ["id", "date", "time", "timeOut"],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH NEWEST DATE BY ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A204");
    }
  }

  async fetchAttendanceByDateAndId(id, date, offset, limit) {
    try {
      const result = await this.attendance.findAll({
        where: {
          [Op.and]: {
            date: {
              [Op.like]: `%${date}%`,
            },
            userId: id,
          },
        },
        limit: limit,
        offset: limit * offset,
        attributes: ["id", "date", "time", "timeOut"],
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH NEWEST DATE BY ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A205");
    }
  }

  async fetchByDate(date, offset, limit) {
    try {
      const result = await this.attendance.findAll({
        where: {
          date: {
            [Op.like]: `%${date}%`,
          },
        },
        include: { model: User, attributes: ["name"] },
        limit: limit,
        offset: limit * offset,
        attributes: ["id", "date", "time", "timeOut", "userId"],
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
      });
      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ABSENCE DATA BY DATE SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A201");
    }
  }

  async postAbsenceIn(body, id) {
    try {
      const result = await this.attendance.create({
        date: body.date,
        time: body.time,
        userId: id,
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "POST NEW ABSENCE DATA SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A202");
    }
  }

  async postAbsenceOut(body, id) {
    try {
      const result = await this.attendance.update(
        {
          timeOut: body.time,
        },
        {
          where: {
            [Op.and]: {
              timeOut: null,
              userId: id,
              date: moment().format(process.env.DATE_FORMAT),
            },
          },
        }
      );

      return result[0];
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "POST NEW ABSENCE DATA SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("A206");
    }
  }
}

module.exports = AttendanceService;