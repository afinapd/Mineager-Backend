const ImageService = require("../../services/images.service");
const {
  addNewImage,
  findImageByType,
} = require("../../controllers/images.controller");

let imageService;
let mockRequest;
let mockResponse;

describe("Images Controller testing", () => {
  beforeAll(() => {
    imageService = new ImageService();

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
        body: { path: body },
        query: { id: id, page: page },
        params: { type: type },
      };
      return req;
    };
  });

  it("Should send with the corresponding result", async () => {
    const res = mockResponse();
    const req = mockRequest("AA", "1", "image");

    imageService.addNewImage = jest.fn(() => {
      return true;
    });
    await addNewImage(req, res, imageService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should catch error and return it", async () => {
    const res = mockResponse();
    const req = mockRequest("AA", "1", "image");

    imageService.addNewImage = jest.fn(() => {
      throw new Error("1");
    });

    await addNewImage(req, res, imageService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "1" });
  });

  it("Should return result", async () => {
    const res = mockResponse();
    const req = mockRequest("A", 1, "AAA");

    imageService.searchByType = jest.fn(() => {
      return true;
    });

    await findImageByType(req, res, imageService);
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("Should return result", async () => {
    const res = mockResponse();
    const req = mockRequest("A", 1, "AAA");

    imageService.searchByType = jest.fn(() => {
      throw new Error("A");
    });

    await findImageByType(req, res, imageService);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorCode: "A" });
  });
});
