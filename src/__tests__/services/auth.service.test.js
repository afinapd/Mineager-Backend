const AuthService = require("../../services/auth.service");
const User = require("../../models/btype.model");
const Axios = require("axios");
const bcrypt = require("bcryptjs");
jest.mock("axios");
jest.mock("bcryptjs");

let user;
// let axios;
describe("Attendance Service testing", () => {
  beforeAll(() => {
    user = new User();
    // axios = Axios;
    authService = new AuthService(user);
  });

  it("should return falsy values when", async () => {
    user.findOne = jest.fn(() => {
      return false;
    });
    let result = await authService.auth({ email: "r", password: "admin" });
    expect(user.findOne).toBeCalledTimes(1);
    expect(result).toBeFalsy();

    // user.findOne = jest.fn(() => {
    //   return true;
    // });
    // result = await authService.auth({ email: "r", password: "a" });
    // expect(user.findOne).toBeCalledTimes(1);
    // expect(result).toBeFalsy();
  });

  it("Should return desired values and truthy", async () => {
    user.findOne = jest.fn(() => {
      return { id: "1", qrId: "A", nfcId: "B", email: "C", name: "G" };
    });
    bcrypt.compareSync.mockImplementationOnce(() => {
      return true;
    });
    Axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { result: "ABCADS123" } })
    );
    let result = await authService.auth({ email: "A", password: "admin" });
    expect(user.findOne).toBeCalledTimes(1);
    expect(Axios.post).toBeCalledTimes(1);
    expect(bcrypt.compareSync).toBeCalledTimes(1);
    expect(result.id).toEqual("1");
  });

  it("Should return null", async () => {
    user.findOne = jest.fn(() => {
      return { id: "1", qrId: "A", nfcId: "B", email: "C", name: "G" };
    });
    bcrypt.compareSync.mockImplementationOnce(() => {
      return false;
    });
    let result = await authService.auth({ email: "A", password: "admin" });
    expect(user.findOne).toBeCalledTimes(1);
    expect(result).toBeFalsy();
  });

  it("Should throw an error of Z201", async () => {
    user.findOne = jest.fn(() => {
      throw new Error();
    });

    try {
      await authService.auth({ email: "A", password: "admin" });
    } catch (e) {
      expect(user.findOne).toBeCalledTimes(1);
      expect(e.message).toEqual("Z201");
    }
  });
});
