const User = require("../../models/user.model");
const BloodType = require("../../models/btype.model");
const Department = require("../../models/department.model");
const Gender = require("../../models/gender.model");
const Attendance = require("../../models/attendance.model");
const DumpService = require("../../services/dump.service");

let user;
let bloodType;
let department;
let gender;
let attendance;
let dumpService;
describe("DumpService Testing", () => {
  beforeAll(() => {
    attendance = new Attendance();
    gender = new Gender();
    department = new Department();
    bloodType = new BloodType();
    user = new User();
    dumpService = new DumpService(
      user,
      gender,
      department,
      attendance,
      bloodType
    );
  });

  it("Should return all create values for all requested delta data", async () => {
    const data = [
      { name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-10" },
    ];
    const resp = {
      update: [],
      create: [{ name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-10" }],
    };
    department.findAll = jest.fn(() => {
      return data;
    });
    user.findAll = jest.fn(() => {
      return data;
    });
    attendance.findAll = jest.fn(() => {
      return data;
    });
    bloodType.findAll = jest.fn(() => {
      return data;
    });
    gender.findAll = jest.fn(() => {
      return data;
    });

    let result = await dumpService.fetchUpdateDelta("2020-10-01");
    expect(department.findAll).toBeCalledTimes(1);
    expect(user.findAll).toBeCalledTimes(1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(bloodType.findAll).toBeCalledTimes(1);
    expect(gender.findAll).toBeCalledTimes(1);
    expect(result.department).toEqual(resp);
    expect(result.user).toEqual(resp);
    expect(result.attendance).toEqual(resp);
    expect(result.bloodType).toEqual(resp);
    expect(result.gender).toEqual(resp);
  });

  it("Should return all create values for all requested delta data but Last updated is actually higher than createdAt", async () => {
    const data = [
      { name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-10" },
    ];
    const resp = {
      update: [],
      create: [{ name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-10" }],
    };
    department.findAll = jest.fn(() => {
      return data;
    });
    user.findAll = jest.fn(() => {
      return data;
    });
    attendance.findAll = jest.fn(() => {
      return data;
    });
    bloodType.findAll = jest.fn(() => {
      return data;
    });
    gender.findAll = jest.fn(() => {
      return data;
    });

    let result = await dumpService.fetchUpdateDelta("2020-10-30");
    expect(department.findAll).toBeCalledTimes(1);
    expect(user.findAll).toBeCalledTimes(1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(bloodType.findAll).toBeCalledTimes(1);
    expect(gender.findAll).toBeCalledTimes(1);
    expect(result.department).toEqual(resp);
    expect(result.user).toEqual(resp);
    expect(result.attendance).toEqual(resp);
    expect(result.bloodType).toEqual(resp);
    expect(result.gender).toEqual(resp);
  });

  it("Should return all update values", async () => {
    const data = [
      { name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-11" },
    ];
    const resp = {
      update: [{ name: "A", createdAt: "2020-10-10", updatedAt: "2020-10-11" }],
      create: [],
    };
    department.findAll = jest.fn(() => {
      return data;
    });
    user.findAll = jest.fn(() => {
      return data;
    });
    attendance.findAll = jest.fn(() => {
      return data;
    });
    bloodType.findAll = jest.fn(() => {
      return data;
    });
    gender.findAll = jest.fn(() => {
      return data;
    });

    let result = await dumpService.fetchUpdateDelta("2020-10-11");
    expect(department.findAll).toBeCalledTimes(1);
    expect(user.findAll).toBeCalledTimes(1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(bloodType.findAll).toBeCalledTimes(1);
    expect(gender.findAll).toBeCalledTimes(1);
    expect(result.department).toEqual(resp);
    expect(result.user).toEqual(resp);
    expect(result.attendance).toEqual(resp);
    expect(result.bloodType).toEqual(resp);
    expect(result.gender).toEqual(resp);
  });

  it("Should throw error of B202", async () => {
    department.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await dumpService.fetchUpdateDelta("2020-10-10");
    } catch (e) {
      expect(department.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("B202");
    }
  });

  it("Should return all values truthy", async () => {
    department.findAll = jest.fn(() => {
      return true;
    });
    user.findAll = jest.fn(() => {
      return true;
    });
    attendance.findAll = jest.fn(() => {
      return true;
    });
    bloodType.findAll = jest.fn(() => {
      return true;
    });
    gender.findAll = jest.fn(() => {
      return true;
    });

    let result = await dumpService.fetchAllData();
    expect(department.findAll).toBeCalledTimes(1);
    expect(user.findAll).toBeCalledTimes(1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(bloodType.findAll).toBeCalledTimes(1);
    expect(gender.findAll).toBeCalledTimes(1);
    expect(result.department).toBeTruthy();
    expect(result.user).toBeTruthy();
    expect(result.attendance).toBeTruthy();
    expect(result.bloodType).toBeTruthy();
    expect(result.gender).toBeTruthy();
  });

  it("Should throw error of B201", async () => {
    department.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await dumpService.fetchAllData();
    } catch (e) {
      expect(department.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("B201");
    }
  });

  it("Should return a status of ok and dupe", async () => {
    attendance.findOne = jest.fn(() => {
      return {
        id: "ACX",
        userId: "123",
        date: "2020-10-10",
        time: "20:20:20",
        timeOut: null,
      };
    });
    attendance.update = jest.fn(() => {
      return true;
    });

    let result = await dumpService.synchronize([
      { id: "ACX", userId: "123", date: "2020-10-10", timeOut: "10:10:10" },
      { id: "ABC", userId: "ABVB", date: "2020-10-10", timeOut: null },
    ]);
    expect(attendance.findOne).toBeCalledTimes(2);
    expect(result[0].status).toEqual("ok");
    expect(result[1].status).toEqual("dupe");
  });

  it("Should return a status of ok as well", async () => {
    attendance.findOne = jest.fn(() => {
      return null;
    });
    attendance.create = jest.fn(() => {
      return true;
    });

    let result = await dumpService.synchronize([
      { id: "ACX", userId: "123", date: "2020-10-10", timeOut: "10:10:10" },
      { id: "ABC", userId: "ABVB", date: "2020-10-10", timeOut: null },
    ]);
    expect(attendance.findOne).toBeCalledTimes(2);
    expect(result[0].status).toEqual("ok");
    expect(result[1].status).toEqual("ok");
  });

  it("Should return a status of fail again", async () => {
    attendance.findOne = jest.fn(() => {
      return null;
    });
    attendance.create = jest.fn(() => {
      throw new Error();
    });

    let result = await dumpService.synchronize([
      { id: "ACX", userId: "123", date: "2020-10-10", timeOut: "10:10:10" },
      { id: "ABC", userId: "ABVB", date: "2020-10-10", timeOut: null },
    ]);
    expect(attendance.findOne).toBeCalledTimes(2);
    expect(result[0].status).toEqual("fail");
    expect(result[1].status).toEqual("fail");
  });

  it("Should throw an error of B203", async () => {
    attendance.findOne = jest.fn(() => {
      throw new Error();
    });
    try {
      await dumpService.synchronize([
        { id: "ACX", userId: "123", date: "2020-10-10" },
        { id: "ABC", userId: "ABVB", date: "2020-10-10" },
      ]);
    } catch (e) {
      expect(attendance.findOne).toBeCalledTimes(2);
      expect(e.message).toEqual("B203");
    }
  });
});
