const DumpService = require("../../services/dump.service");
const {
  dumpAll,
  getUpdateDelta,
  synch,
} = require("../../controllers/dump.controller");

let mockRequest;
let mockResponse;
let dumpService;

describe("Dump controller testing", () => {
  beforeAll(() => {
    dumpService = new DumpService();

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
  });

  it("Should return result", async () => {
    const req = mockRequest("A");
    const res = mockResponse();

    dumpService.fetchAllData = jest.fn(() => {
      return true;
    });

    await dumpAll(req, res, dumpService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should error result", async () => {
    const req = mockRequest("A");
    const res = mockResponse();

    dumpService.fetchAllData = jest.fn(() => {
      throw new Error("1");
    });

    await dumpAll(req, res, dumpService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "1" });
  });

  it("Should return result", async () => {
    const req = mockRequest({ lastUpdated: "AA" });
    const res = mockResponse();

    dumpService.fetchUpdateDelta = jest.fn(() => {
      return true;
    });

    await getUpdateDelta(req, res, dumpService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should error result", async () => {
    const req = mockRequest({ lastUpdated: "AA" });
    const res = mockResponse();

    dumpService.fetchUpdateDelta = jest.fn(() => {
      throw new Error("A");
    });

    await getUpdateDelta(req, res, dumpService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "A" });
  });

  it("Should return result", async () => {
    const req = mockRequest({ lastUpdated: "AA" });
    const res = mockResponse();

    dumpService.synchronize = jest.fn(() => {
      return true;
    });

    await synch(req, res, dumpService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return error result", async () => {
    const req = mockRequest({ lastUpdated: "AA" });
    const res = mockResponse();

    dumpService.synchronize = jest.fn(() => {
      throw new Error("A");
    });

    await synch(req, res, dumpService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "A" });
  });
});
