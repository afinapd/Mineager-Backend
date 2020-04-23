const AttendanceService = require("../../services/attendance.service");
const {
  newAbsence,
  getAttendance,
} = require("../../controllers/attendance.controller");

let attendanceService;
let mockRequest;
let mockResponse;
let mockNext;
describe("Attendance controller testing", () => {
  beforeAll(() => {
    attendanceService = new AttendanceService();

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(200);
      res.send = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.sendStatus = jest.fn().mockReturnValue(200);
      return res;
    };

    mockRequest = (body, id, type, page, pref, date) => {
      const req = {
        body: body,
        query: { id: id, page: page, pref: pref, date: date },
        params: { type: type, id: id },
      };
      return req;
    };

    mockNext = () => {
      return true;
    };
  });

  it("Should return result when pref is in", async () => {
    const req = mockRequest("a", "a", "a", "a", "in");
    const res = mockResponse();

    attendanceService.postAbsenceIn = jest.fn(() => {
      return true;
    });

    await newAbsence(req, res, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return result when pref is out", async () => {
    const req = mockRequest("a", "a", "a", "a", "out");
    const res = mockResponse();

    attendanceService.postAbsenceOut = jest.fn(() => {
      return true;
    });

    await newAbsence(req, res, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return 404 when pref is out but presence today is not found", async () => {
    const req = mockRequest("a", "a", "a", "a", "out");
    const res = mockResponse();

    attendanceService.postAbsenceOut = jest.fn(() => {
      return null;
    });

    await newAbsence(req, res, attendanceService);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("Should catch error and return result", async () => {
    const req = mockRequest("a", "a", "a", "a", "out");
    const res = mockResponse();

    attendanceService.postAbsenceOut = jest.fn(() => {
      throw new Error("A");
    });

    await newAbsence(req, res, attendanceService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "A" });
  });

  it("Should return attendance by id", async () => {
    const res = mockResponse();
    const req = mockRequest("A", "id", "id", null, "2020");
    const next = mockNext();

    attendanceService.fetchById = jest.fn(() => {
      return true;
    });
    await getAttendance(req, res, next, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return 404", async () => {
    const res = mockResponse();
    const req = mockRequest("A", "id", "id", null, "2020");
    const next = mockNext();

    attendanceService.fetchById = jest.fn(() => {
      return false;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(false);
  });

  it("Should call next", async () => {
    const res = mockResponse();
    const req = mockRequest("A", null, "id", null, "2020");
    const next = mockNext();

    attendanceService.fetchById = jest.fn(() => {
      return false;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(next).toBeTruthy();
  });

  it("Should return attendance by date", async () => {
    const res = mockResponse();
    const req = mockRequest("body", "id", "date", 1, "pref", "2020");

    attendanceService.fetchByDate = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, mockNext, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should call next", async () => {
    const res = mockResponse();
    const req = mockRequest("body", "id", "date", 1, "pref", null);
    const next = mockNext();
    attendanceService.fetchByDate = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(next).toBeTruthy();
  });

  it("Should return attendance by newest", async () => {
    const res = mockResponse();
    const req = mockRequest("body", "id", "newest", 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchNewestById = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should call next", async () => {
    const res = mockResponse();
    const req = mockRequest("body", null, "newest", 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchNewestById = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(next).toBeTruthy();
  });

  it("Should return attendance by date and id", async () => {
    const res = mockResponse();
    const req = mockRequest("body", "id", "dateandId", 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchAttendanceByDateAndId = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should call next", async () => {
    const res = mockResponse();
    const req = mockRequest("body", null, "dateandId", 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchAttendanceByDateAndId = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(next).toBeTruthy();
  });

  it("Should call next when type is null", async () => {
    const res = mockResponse();
    const req = mockRequest("body", null, null, 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchAttendanceByDateAndId = jest.fn(() => {
      return true;
    });

    await getAttendance(req, res, next, attendanceService);
    expect(next).toBeTruthy();
  });

  it("Should catch error", async () => {
    const res = mockResponse();
    const req = mockRequest("body", "id", "dateandId", 1, "pref", "2020");
    const next = mockNext();

    attendanceService.fetchAttendanceByDateAndId = jest.fn(() => {
      throw new Error("A");
    });

    await getAttendance(req, res, next, attendanceService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "A" });
  });
});
