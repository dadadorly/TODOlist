import { UserController } from "./userController";
import { catchAsyncError } from "../../utils/catchError";

jest.mock("../../services/userService");
const userController = new UserController();

//@ts-ignore
const userService = userController.userService;

describe("userController", () => {
  describe("getUsers()", () => {
    it("should return empty array", async () => {
      // given
      (userService.getUsers as jest.Mock).mockResolvedValue([]);
      // when
      const result = await userController.getUsers();
      // then
      expect(userService.getUsers).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });
  describe("getUser()", () => {
    it("should return a user from userModel", async () => {
      // given
      (userService.getUser as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      const req = { params: { id: "id" } } as any;
      // when
      const result = await userController.getUser(req);
      // then
      expect(result).toEqual({
        id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      expect(userService.getUser as jest.Mock).toHaveBeenCalledWith("id");
    });
    it("should return error user not found", async () => {
      // given
      (userService.getUser as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: "id" } } as any;
      // when
      const actualError = await catchAsyncError(() => userController.getUser(req));
      // then
      expect(actualError.message).toEqual("User not found");
    });
  });
  describe("addUser()", () => {
    it("should add a new user in database", async () => {
      // given
      (userService.addUser as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      const req = {
        body: {
          username: "name",
          email: "email@example.com",
          password: "password"
        }
      } as any;
      // when
      const result = await userController.addUser(req);
      // then
      expect(result).toEqual({
        id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
  });
  describe("deleteUser()", () => {
    it("should delete a user by id", async () => {
      // given
      (userService.getUser as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      (userService.deleteUser as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: "id" } } as any;
      // when
      const result = await userController.deleteUser(req);
      // then
      expect(userService.getUser).toHaveBeenCalledWith("id");
      expect(result).toEqual(undefined);
    });
  });
  describe("updateUser()", () => {
    it("should update a todo", async () => {
      // given
      (userService.getUser as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      (userService.updateUser as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      const req = { params: { id: "id" }, body: { title: "task", done: true } } as any;
      // when
      const result = await userController.updateUser(req);
      // then
      expect(userService.getUser).toHaveBeenCalledWith("id");
      expect(result).toEqual({
        id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
  });
});
