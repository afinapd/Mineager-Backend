const AdminService = require("../../services/admin.service");
const BloodType = require("../../models/btype.model");
const Department = require("../../models/department.model");
const Gender = require("../../models/gender.model");
const Attendance = require("../../models/attendance.model");

let gender;
let bloodType;
let department;
let adminService;
let attendance;
describe("Attendance Service testing", () => {
  beforeAll(() => {
    gender = new Gender();
    bloodType = new BloodType();
    department = new Department();
    attendance = new Attendance();
    adminService = new AdminService(department, gender, bloodType, attendance);
  });

  it("should true for all related data", async () => {
    gender.findAll = jest.fn(() => {
      return true;
    });
    department.findAll = jest.fn(() => {
      return true;
    });
    bloodType.findAll = jest.fn(() => {
      return true;
    });
    attendance.findAll = jest.fn(() => {
      return true;
    });

    let result = await adminService.fetchAllDepartment();
    let result2 = await adminService.fetchAllGender();
    let result3 = await adminService.fetchAllBloodType();
    let result4 = await adminService.prepAttendanceForReport(1);

    expect(gender.findAll).toBeCalledTimes(1);
    expect(bloodType.findAll).toBeCalledTimes(1);
    expect(department.findAll).toBeCalledTimes(1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(result).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeTruthy();
    expect(result4).toBeTruthy();
  });

  it("should throw an error of AD201", async () => {
    department.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await adminService.fetchAllDepartment();
    } catch (e) {
      expect(department.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("AD201");
    }
  });

  it("should throw an error of AD202", async () => {
    gender.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await adminService.fetchAllGender();
    } catch (e) {
      expect(gender.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("AD202");
    }
  });

  it("should throw an error of AD203", async () => {
    bloodType.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await adminService.fetchAllBloodType();
    } catch (e) {
      expect(bloodType.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("AD203");
    }
  });

  it("should throw an error of AD204", async () => {
    attendance.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await adminService.prepAttendanceForReport(1);
    } catch (e) {
      expect(attendance.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("AD204");
    }
  });
});
