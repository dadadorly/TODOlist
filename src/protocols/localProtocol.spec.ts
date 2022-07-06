import { LocalProtocol } from "./localProtocol";
import { comparePassword } from "../utils/encryptPassword";
import { catchAsyncError } from "../utils/catchError";

jest.mock("../services/userService");
jest.mock("../utils/encryptPassword");

const localProtocol = new LocalProtocol({});

// @ts-ignore
const userService = localProtocol.userService;

xdescribe("LocalProtocol", () => {
  describe("onVerify()", () => {
    it("should return a user", async () => {
      //given
      (userService.findByUsername as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "username",
        email: "mail",
        password: "password",
        isAdmin: false
      } as never);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      const done = jest.fn().mockReturnThis();
      //when
      const result = await localProtocol.onVerify("username", "password", done);
      //then
      expect(userService.findByUsername).toHaveBeenCalledWith("username");
      expect(comparePassword).toHaveBeenCalledWith("password", "password");
      expect(result).toEqual({
        _id: "id",
        username: "username",
        email: "mail",
        password: "password",
        isAdmin: "false"
      });
    });
    it("should return unauthorized error when not finding user", async () => {
      //given
      //jest.spyOn(userService, "findByUsername").mockResolvedValue(undefined as never);
      (userService.findByUsername as jest.Mock).mockResolvedValue(undefined);
      const done = jest.fn().mockReturnThis();
      //when
      const actualError = await catchAsyncError(() => localProtocol.onVerify("username", "password", done));
      //then
      expect(userService.findByUsername).toHaveBeenCalledWith("username");
      expect(actualError.message).toEqual("wrong credentials");
    });
  });
});
