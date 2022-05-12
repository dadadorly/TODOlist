import todoModel from "../models/todoModel";
import { TodoService } from "./todoService";

jest.mock("../models/todoModel");
const todoService = new TodoService();

describe("todoService", () => {
  describe("getTodos()", () => {
    it("should return todolist", async () => {
      (todoModel.find as jest.Mock).mockResolvedValue([]);
      // when
      const result = await todoService.getTodos();
      // then
      expect(todoModel.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });
  describe("getTodo()", () => {
    it("should return a todo from todoModel", async () => {
      // given
      (todoModel.findById as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "I am a task",
        done: false
      });
      // when
      const result = await todoService.getTodo("id");
      // then
      expect(todoModel.findById as jest.Mock).toHaveBeenCalledWith("id");
      expect(result).toEqual({
        _id: "id",
        title: "I am a task",
        done: false
      });
    });
    it("should return undefined", async () => {
      // given
      (todoModel.findById as jest.Mock).mockResolvedValue(undefined);
      // when
      const result = await todoService.getTodo("unknown-id");
      // then
      expect(todoModel.findById).toHaveBeenCalledWith("unknown-id");
      expect(result).toEqual(undefined);
    });
  });
  describe("addTodos()", () => {
    it("should return the added todo", async () => {
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "title",
        done: false
      });
      (todoModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await todoService.addTodo("title");
      // then
      expect(todoModel).toHaveBeenCalledWith({
        title: "title"
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: "id",
        title: "title",
        done: false
      });
    });
  });
});
