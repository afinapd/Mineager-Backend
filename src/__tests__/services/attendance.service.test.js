const AttendanceService = require("../../services/attendance.service");
const Attendance = require("../../models/attendance.model");

let attendance;
let attendanceService;
describe("Attendance Service testing", () => {
  beforeAll(() => {
    attendance = new Attendance();
    attendanceService = new AttendanceService(attendance);
  });

  it("should return all attendance related to the user data", async () => {
    attendance.findAll = jest.fn(() => {
      return { "1": [{ A: 1 }, { B: 2 }, { C: 3 }] };
    });

    let result = await attendanceService.fetchById(1, 1, 1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(result).toBeDefined();
  });

  it("should throw an error of A203", async () => {
    attendance.findAll = jest.fn(() => {
      throw new Error("A203");
    });
    let result;
    try {
      result = await attendanceService.fetchById(1, 1, 1);
    } catch (e) {
      result = e.message;
    }

    expect(attendance.findAll).toBeCalledTimes(1);
    expect(result).toEqual("A203");
  });

  it("Should return newest data by user", async () => {
    attendance.findOne = jest.fn(() => {
      return true;
    });
    let result = await attendanceService.fetchNewestById(1);
    expect(attendance.findOne).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of A204", async () => {
    attendance.findOne = jest.fn(() => {
      throw new Error();
    });
    try {
      await attendanceService.fetchNewestById(1);
    } catch (e) {
      expect(attendance.findOne).toBeCalledTimes(1);
      expect(e.message).toEqual("A204");
    }
  });

  it("Should return attendance data by id and date", async () => {
    attendance.findAll = jest.fn(() => {
      return true;
    });

    let result = await attendanceService.fetchAttendanceByDateAndId(
      1,
      "2020",
      1,
      2
    );
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of A205", async () => {
    attendance.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await attendanceService.fetchAttendanceByDateAndId(1, "2020", 1, 2);
    } catch (e) {
      expect(attendance.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("A205");
    }
  });

  it("Should fetch attendance data by date", async () => {
    attendance.findAll = jest.fn(() => {
      return true;
    });

    let result = await attendanceService.fetchByDate("2020", 1, 1);
    expect(attendance.findAll).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of A201", async () => {
    attendance.findAll = jest.fn(() => {
      throw new Error();
    });
    try {
      await attendanceService.fetchByDate("2020", 1, 2);
    } catch (e) {
      expect(attendance.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("A201");
    }
  });

  it("Should return true for new data in", async () => {
    attendance.create = jest.fn(() => {
      return ["A"];
    });

    let result = await attendanceService.postAbsenceIn("1", 1);
    expect(attendance.create).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of A202", async () => {
    attendance.create = jest.fn(() => {
      throw new Error();
    });

    try {
      await attendanceService.postAbsenceIn(1, 1);
    } catch (e) {
      expect(attendance.create).toBeCalledTimes(1);
      expect(e.message).toEqual("A202");
    }
  });

  it("Should return true for new data out", async () => {
    attendance.update = jest.fn(() => {
      return [true];
    });

    let result = await attendanceService.postAbsenceOut("1", 1);
    expect(attendance.update).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of A206", async () => {
    attendance.update = jest.fn(() => {
      throw new Error();
    });

    try {
      await attendanceService.postAbsenceOut(1, 1);
    } catch (e) {
      expect(attendance.update).toBeCalledTimes(1);
      expect(e.message).toEqual("A206");
    }
  });
});
