import { TodoController } from "./todoController";
import { catchAsyncError } from "../../utils/catchError";

jest.mock("../../services/todoService");
const todoController = new TodoController();

//@ts-ignore
const todoService = todoController.todoService;

describe("todoController", () => {
  describe("getTodos()", () => {
    it("should return empty array", async () => {
      // given
      (todoService.getTodos as jest.Mock).mockResolvedValue([]);
      // when
      const result = await todoController.getTodos();
      // then
      expect(todoService.getTodos).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });
  describe("getTodo()", () => {
    it("should return a todo from todoModel", async () => {
      // given
      (todoService.getTodo as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "I am a task",
        done: false
      });
      const req = { params: { id: "id" } } as any;
      // when
      const result = await todoController.getTodo(req);
      // then
      expect(result).toEqual({
        id: "id",
        title: "I am a task",
        done: false
      });
      expect(todoService.getTodo as jest.Mock).toHaveBeenCalledWith("id");
    });
    it("should return error todo not found", async () => {
      // given
      (todoService.getTodo as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: "id" } } as any;
      // when
      const actualError = await catchAsyncError(() => todoController.getTodo(req));
      // then
      expect(actualError.message).toEqual("Todo not found");
    });
  });
  describe("addTodo()", () => {
    it("should add a new todo in database", async () => {
      // given
      (todoService.addTodo as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "task",
        done: false
      });
      const req = {
        body: {
          title: "task"
        }
      } as any;
      // when
      const result = await todoController.addTodo(req);
      // then
      expect(result).toEqual({
        id: "id",
        title: "task",
        done: false
      });
    });
  });
  describe("deleteTodo()", () => {
    it("should delete a todo by id", async () => {
      // given
      (todoService.getTodo as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "I am a task",
        done: false
      });
      (todoService.deleteTodo as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: "1A" } } as any;
      // when
      const result = await todoController.deleteTodo(req);
      // then
      expect(todoService.getTodo).toHaveBeenCalledWith("1A");
      expect(result).toEqual(undefined);
    });
  });
  describe("updateTodo()", () => {
    it("should update a todo", async () => {
      // given
      (todoService.getTodo as jest.Mock).mockResolvedValue({
        _id: "id",
        title: "I am a task",
        done: false
      });
      (todoService.updateTodo as jest.Mock).mockResolvedValue({
        _id: "some-id",
        title: "task",
        done: false
      });
      const req = { params: { id: "some-id" }, body: { title: "task", done: true } } as any;
      // when
      const result = await todoController.updateTodo(req);
      // then
      expect(todoService.getTodo).toHaveBeenCalledWith("some-id");
      expect(result).toEqual({
        id: "some-id",
        title: "task",
        done: false
      });
    });
  });
});
