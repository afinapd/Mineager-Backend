const AuthService = require("../../services/auth.service");
const { authenticate } = require("../../controllers/auth.controller");

let authService;
let mockRequest;
let mockResponse;

describe("Auth controller test", () => {
  beforeAll(() => {
    authService = new AuthService();

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

  it("Should return 200 with result", async () => {
    const res = mockResponse();
    const req = mockRequest("Body");

    authService.auth = jest.fn(() => {
      return true;
    });

    await authenticate(req, res, authService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return 401 and a message unauthorized", async () => {
    const res = mockResponse();
    const req = mockRequest("Body");

    authService.auth = jest.fn(() => {
      return false;
    });

    await authenticate(req, res, authService);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("Should return 500 and a message", async () => {
    const res = mockResponse();
    const req = mockRequest("Body");

    authService.auth = jest.fn(() => {
      throw new Error("1");
    });

    await authenticate(req, res, authService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "1" });
  });
});
