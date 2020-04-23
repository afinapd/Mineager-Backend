const AdminService = require("../../services/admin.service");
const { getAllOf } = require("../../controllers/admin.controller");

let mockRequest;
let mockResponse;
let mockNext;
let adminService;

describe("Admin controller testing", () => {
  beforeAll(() => {
    adminService = new AdminService();

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(200);
      res.send = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.sendStatus = jest.fn().mockReturnValue(200);
      return res;
    };

    mockRequest = (body, id, type, page) => {
      const req = {
        body: body,
        query: { id: id, page: page },
        params: { type: type },
      };
      return req;
    };

    mockNext = () => {
      const next = "A";
      return next;
    };
  });

  it("Should return dp result", async () => {
    const req = mockRequest("A", "A", "dp", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.fetchAllDepartment = jest.fn(() => {
      return true;
    });

    await getAllOf(req, res, next, adminService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return g result", async () => {
    const req = mockRequest("A", "A", "g", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.fetchAllGender = jest.fn(() => {
      return true;
    });

    await getAllOf(req, res, next, adminService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return bt result", async () => {
    const req = mockRequest("A", "A", "bt", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.fetchAllBloodType = jest.fn(() => {
      return true;
    });

    await getAllOf(req, res, next, adminService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return atPrep result", async () => {
    const req = mockRequest("A", "A", "atPrep", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.prepAttendanceForReport = jest.fn(() => {
      return true;
    });

    await getAllOf(req, res, next, adminService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return next at atPrep", async () => {
    const req = mockRequest("A", null, "atPrep", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.prepAttendanceForReport = jest.fn(() => {
      return true;
    });

    await getAllOf(req, res, next, adminService);
    expect(next).toBeTruthy();
  });

  it("Should return true for next result", async () => {
    const req = mockRequest("A", null, null, "A");
    const res = mockResponse();
    const next = mockNext();

    let result = await getAllOf(req, res, next, adminService);
    expect(next).toBeTruthy();
    expect(result).toBeFalsy();
  });

  it("Should catch error and return it", async () => {
    const req = mockRequest("A", 1, "atPrep", "A");
    const res = mockResponse();
    const next = mockNext();

    adminService.prepAttendanceForReport = jest.fn(() => {
      throw new Error("1");
    });

    await getAllOf(req, res, next, adminService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "1" });
  });
});
