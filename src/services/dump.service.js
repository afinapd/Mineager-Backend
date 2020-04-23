const logEmitter = require("../events/logEmitter");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();
class DumpService {
  constructor(user, gender, department, attendance, bloodType) {
    this.user = user;
    this.gender = gender;
    this.department = department;
    this.attendance = attendance;
    this.bloodType = bloodType;
  }

  async fetchUpdateDelta(lastUpdated) {
    const filter = {
      [Op.or]: {
        createdAt: {
          [Op.between]: [
            new Date(lastUpdated).toISOString(),
            new Date(Date.now()).toISOString(),
          ],
        },
        updatedAt: {
          [Op.between]: [
            new Date(lastUpdated).toISOString(),
            new Date(Date.now()).toISOString(),
          ],
        },
      },
    };
    try {
      const department = this.department.findAll({
        attributes: ["id", "businessId", "name", "createdAt", "updatedAt"],
        where: filter,
      });
      const user = this.user.findAll({
        attributes: [
          "id",
          "qrId",
          "nfcId",
          "name",
          "birth",
          "email",
          "livingPartner",
          "phone",
          "departmentId",
          "bloodTypeId",
          "genderId",
          "createdAt",
          "updatedAt",
        ],
        where: filter,
      });
      const attendance = this.attendance.findAll({
        attributes: [
          "id",
          "date",
          "time",
          "userId",
          "timeOut",
          "createdAt",
          "updatedAt",
        ],
        where: filter,
      });
      const bloodType = this.bloodType.findAll({
        attributes: ["id", "type", "createdAt", "updatedAt"],
        where: filter,
      });
      const gender = this.gender.findAll({
        attributes: ["id", "gender", "createdAt", "updatedAt"],
        where: filter,
      });
      const result = await Promise.all([
        department,
        user,
        attendance,
        bloodType,
        gender,
      ]);
      result.forEach((array, index) => {
        result[index] = {
          update: [],
          create: [],
        };
        array.forEach((object) => {
          if (
            moment(lastUpdated).format(process.env.DATE_FORMAT) <
            moment(object.createdAt).format(process.env.DATE_FORMAT)
          ) {
            result[index].create.push(object);
          } else {
            if (
              moment(object.updatedAt).format(process.env.DATE_FORMAT) >
              moment(object.createdAt).format(process.env.DATE_FORMAT)
            ) {
              result[index].update.push(object);
            } else {
              result[index].create.push(object);
            }
            // console.log("UPDATE B");
            // result[index].update.push(object);
          }
        });
      });

      return {
        department: result[0],
        user: result[1],
        attendance: result[2],
        bloodType: result[3],
        gender: result[4],
      };
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH UPDATE DELTA SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("B202");
    }
  }

  async fetchAllData() {
    try {
      const department = this.department.findAll({
        attributes: ["id", "businessId", "name", "createdAt", "updatedAt"],
      });
      const user = this.user.findAll({
        attributes: [
          "id",
          "qrId",
          "nfcId",
          "name",
          "birth",
          "email",
          "livingPartner",
          "phone",
          "departmentId",
          "bloodTypeId",
          "genderId",
          "createdAt",
          "updatedAt",
        ],
      });
      const attendance = this.attendance.findAll({
        attributes: [
          "id",
          "date",
          "time",
          "userId",
          "timeOut",
          "createdAt",
          "updatedAt",
        ],
      });
      const bloodType = this.bloodType.findAll({
        attributes: ["id", "type", "createdAt", "updatedAt"],
      });
      const gender = this.gender.findAll({
        attributes: ["id", "gender", "createdAt", "updatedAt"],
      });
      const result = await Promise.all([
        department,
        user,
        attendance,
        bloodType,
        gender,
      ]);

      return {
        department: result[0],
        user: result[1],
        attendance: result[2],
        bloodType: result[3],
        gender: result[4],
      };
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "DUMP DATA SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("B201");
    }
  }

  async synchronize(datas) {
    try {
      const resps = [];
      for (let i = 0; i < datas.length; i++) {
        try {
          const result = await this.attendance.findOne({
            where: {
              [Op.and]: [{ userId: datas[i].userId }, { date: datas[i].date }],
            },
          });
          if (result != null) {
            if (result.timeOut == null && datas[i].timeOut != null) {
              await this.attendance.update({
                timeOut: datas[i].timeOut,
                where: { id: result.id },
              });
              resps.push({ id: datas[i].id, status: "ok" });
              continue;
            }
          } else {
            try {
              await this.attendance.create(datas[i]);
              resps.push({ id: datas[i].id, status: "ok" });
              continue;
            } catch (e) {
              resps.push({ id: datas[i].id, status: "fail" });
              continue;
            }
          }
          resps.push({
            id: datas[i].id,
            time: result.time,
            timeOut: result.timeOut,
            status: "dupe",
          });
        } catch (e) {
          resps.push({ id: datas[i].id, status: "fail" });
          if((datas.length - i) == 1) {
            throw new Error();
          }
        }
      }
      return resps;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "SYNCHRONIZE SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("B203");
    }
  }
}

module.exports = DumpService;
