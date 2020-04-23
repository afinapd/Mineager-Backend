const UserService = require("../../services/user.service");
const {
  getAll,
  createNew,
  update,
  getById,
  removeUser,
} = require("../../controllers/user.controller");

let userService;
let mockResponse;
let mockRequest;

describe("User Controller testing", () => {
  beforeAll(() => {
    userService = new UserService();

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

  //----------------------------------------------------------------------//
  // get all
  it("Should call respond with result and 200 status code", async () => {
    const res = mockResponse();
    const req = mockRequest("Hemlo World", "1");

    userService.fetchAll = jest.fn(() => {
      return "Ok";
    });

    await getAll(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Ok");
  });

  it("Should catch the error and respond with 500", async () => {
    const res = mockResponse();
    const req = mockRequest("Hemlo World", "1");

    userService.fetchAll = jest.fn(() => {
      throw new Error("not Ok");
    });

    await getAll(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "not Ok" });
  });

  //----------------------------------------------------------------------//
  // create new
  it("Should respond with the result", async () => {
    const res = mockResponse();
    const req = mockRequest("Hemlo World", "1");

    userService.addNewUser = jest.fn(() => {
      return "Ok";
    });

    await createNew(req, res, userService);
    expect(res.send).toHaveBeenCalledWith("Ok");
  });

  it("Should catch and error and respond with 500", async () => {
    const res = mockResponse();
    const req = mockRequest("Hemlo World", "1");

    userService.addNewUser = jest.fn(() => {
      throw new Error("not Ok");
    });

    await createNew(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "not Ok" });
  });

  //----------------------------------------------------------------------//
  // update
  it("Should call json with the result if the id is not null", async () => {
    const res = mockResponse();
    const req = mockRequest("HemloWorld", "notnull");

    userService.updateUser = jest.fn(() => {
      return true;
    });

    await update(req, res, userService);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should call sendstatus with 404 if id is null", async () => {
    const res = mockResponse();
    const req = mockRequest("Helo", null);

    await update(req, res, userService);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("Should catch the error", async () => {
    const res = mockResponse();
    const req = mockRequest("A", "A");
    userService.updateUser = jest.fn(() => {
      throw new Error("No");
    });

    await update(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "No" });
  });

  //----------------------------------------------------------------------//
  //get by id
  it("Should return data with id", async () => {
    const req = mockRequest("A", "A", "id", null);
    const res = mockResponse();

    userService.fetchById = jest.fn(() => {
      return true;
    });

    await getById(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return data with nfc", async () => {
    const req = mockRequest("A", "A", "nfc", null);
    const res = mockResponse();

    userService.fetchByNfcId = jest.fn(() => {
      return true;
    });

    await getById(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return data with qr", async () => {
    const req = mockRequest("A", "A", "qr", null);
    const res = mockResponse();

    userService.fetchByQrId = jest.fn(() => {
      return true;
    });

    await getById(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return data with name", async () => {
    const req = mockRequest("A", "A", "name", null);
    const res = mockResponse();

    userService.fetchByName = jest.fn(() => {
      return true;
    });

    await getById(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should return error 404 when the result is not found at all", async () => {
    const req = mockRequest("A", "A", "name", 4);
    const res = mockResponse();

    userService.fetchByName = jest.fn(() => {
      return null;
    });

    await getById(req, res, userService);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("Should catch and return error", async () => {
    const req = mockRequest("A", "A", "name", null);
    const res = mockResponse();

    userService.fetchByName = jest.fn(() => {
      throw new Error("no");
    });

    await getById(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "no" });
  });
  //----------------------------------------------------------------------//

  //remove user
  it("Should call .json with result if id is not null", async () => {
    const res = mockResponse();
    const req = mockRequest("A", "A", "A", 1);

    userService.deleteUser = jest.fn(() => {
      return true;
    });

    await removeUser(req, res, userService);
    expect(res.json).toHaveBeenCalledWith(true);
  });

  it("Should call .sendStatus 404", async () => {
    const res = mockResponse();
    const req = mockRequest("A", null);

    await removeUser(req, res, userService);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("Should call catch the error and return corresponding response", async () => {
    const res = mockResponse();
    const req = mockRequest("A", "A", "A", 1);

    userService.deleteUser = jest.fn(() => {
      throw new Error("no");
    });

    await removeUser(req, res, userService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "no" });
  });
  //----------------------------------------------------------------------//
});
