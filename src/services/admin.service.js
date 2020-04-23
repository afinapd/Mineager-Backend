const logEmitter = require("../events/logEmitter");
class AdminService {
  constructor(department, gender, bloodType, attendance) {
    this.department = department;
    this.gender = gender;
    this.bloodType = bloodType;
    this.attendance = attendance;
  }

  async fetchAllDepartment() {
    try {
      const result = await this.department.findAll({
        attributes: ["id", "businessId", "name"],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ALL DEPARTMENT SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("AD201");
    }
  }

  async fetchAllGender() {
    try {
      const result = await this.gender.findAll({
        attributes: ["id", "gender"],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ALL GENDER SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("AD202");
    }
  }

  async fetchAllBloodType() {
    try {
      const result = await this.bloodType.findAll({
        attributes: ["id", "type"],
      });

      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ALL BLOODTYPE SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("AD203");
    }
  }

  async prepAttendanceForReport(id) {
    try {
      const result = await this.attendance.findAll({
        where: {
          userId: id,
        },
        attributes: ["date", ["time", "timeIn"], "timeOut"],
        order: [
          ["date", "desc"],
          ["time", "desc"],
        ],
      });
      return result;
    } catch (e) {
      logEmitter.emit("APP-ERROR", {
        logTitle: "FETCH ALL ATTENDANCE BY ID SERVICE FAILED",
        logMessage: e,
      });
      throw new Error("AD204");
    }
  }
}

module.exports = AdminService;
