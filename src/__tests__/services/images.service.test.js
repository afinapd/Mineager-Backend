const ImagesService = require("../../services/images.service");
const Images = require("../../models/image.model");
const Sequelize = require("sequelize");

let images;
let imagesService;
describe("Images Service testing", () => {
  beforeAll(() => {
    images = new Images();
    imagesService = new ImagesService(images);
  });

  it("should return true when .create is", async () => {
    images.create = jest.fn(() => {
      return true;
    });

    let result = await imagesService.addNewImage(1, "profile");
    expect(images.create).toBeCalledTimes(1);
    expect(result).toBeDefined();
  });

  it("should throw an error of F201", async () => {
    images.create = jest.fn(() => {
      throw new Error();
    });
    let result;
    try {
      result = await imagesService.addNewImage(1, "profile");
    } catch (e) {
      result = e.message;
    }

    expect(images.create).toBeCalledTimes(1);
    expect(result).toEqual("F201");
  });

  it("Should return true when .findAll is called", async () => {
    images.findAll = jest.fn(() => {
      return true;
    });

    let result = await imagesService.searchByType("profile");
    expect(images.findAll).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("Should throw an error of F202", async () => {
    images.findAll = jest.fn(() => {
      throw new Error();
    });

    try {
      await imagesService.searchByType("profile");
    } catch (e) {
      expect(images.findAll).toBeCalledTimes(1);
      expect(e.message).toEqual("F202");
    }
  });
});
