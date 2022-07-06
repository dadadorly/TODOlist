import userModel, { User } from "../models/userModel";
import { UserService } from "./userService";

jest.mock("../models/userModel");
const userService = new UserService();

describe("userService", () => {
  describe("getTodos()", () => {
    it("should return user list", async () => {
      (userModel.find as jest.Mock).mockResolvedValue([]);
      // when
      const result = await userService.getUsers();
      // then
      expect(userModel.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });
  describe("getUser()", () => {
    it("should return a user from userModel", async () => {
      // given
      (userModel.findById as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      // when
      const result = await userService.getUser("id");
      // then
      expect(userModel.findById as jest.Mock).toHaveBeenCalledWith("id");
      expect(result).toEqual({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
    it("should return undefined", async () => {
      // given
      (userModel.findById as jest.Mock).mockResolvedValue(undefined);
      // when
      const result = await userService.getUser("id");
      // then
      expect(userModel.findById).toHaveBeenCalledWith("id");
      expect(result).toEqual(undefined);
    });
  });
  describe("addUser()", () => {
    it("should return the added user", async () => {
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      (userModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await userService.addUser("name", "email@example.com", "password");
      // then
      expect(userModel).toHaveBeenCalledWith({
        username: "name",
        email: "email@example.com",
        password: "password"
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
  });
  describe("deleteUser()", () => {
    it("should return undefined", async () => {
      // given
      (userModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      // when
      await userService.deleteUser("id");
      // then
      expect(userModel.findByIdAndDelete as jest.Mock).toHaveBeenCalledWith("id");
    });
  });
  describe("updateUser()", () => {
    it("should return oldTodo", async () => {
      // given
      const oldTodo: User = {
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      };
      const newTodo: User = {
        _id: "id",
        username: "other-name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      };
      (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(oldTodo);
      // when
      const result = await userService.updateUser(newTodo);
      // then
      expect(userModel.findByIdAndUpdate as jest.Mock).toHaveBeenCalledWith(oldTodo._id, {
        _id: "id",
        username: "other-name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      expect(result).toEqual({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
  });
  describe("findByUsername()", () => {
    it("should return user by his username", async () => {
      // given
      (userModel.findOne as jest.Mock).mockResolvedValue({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
      // when
      const result = await userService.findByUsername("name");
      // then
      expect(userModel.findOne as jest.Mock).toHaveBeenCalledWith({ username: "name" });
      expect(result).toEqual({
        _id: "id",
        username: "name",
        email: "email@example.com",
        password: "password",
        isAdmin: false
      });
    });
  });
});
