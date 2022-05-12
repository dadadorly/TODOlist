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
/*
describe('todoController', () => {
  beforeEach(() => {
    (todoModel.findById as jest.Mock).mockClear();
  });
  describe('getTodo()', () => {
    it('should throw todo error not found', async () => {
      // given
      const todoController = new TodoController();
      (todoModel.findById as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: 'id' } } as any;
      // when
      const result = await todoController.getTodo(req);
      // then
      expect(result).toEqual('todo not found');
    });
  });
  describe('deleteTodo()', () => {
    it('should return todo not found ', async () => {
      // given

      (todoModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      const req = { params: { id: '1A' } } as any;


      // when
      const todoController = new TodoController()
      const result = await todoController.deleteTodo(req);
      // then
      expect(result).toEqual('todo not found');
    });
  });
  describe('updateTodo()', () => {
    it('should update a todo', async () => {
      // given
      const todoController = new TodoController();
      (todoModel.findById as jest.Mock).mockResolvedValue({
        id: 'some-id',
        task: 'old',
        done: false
      });
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        id: 'some-id',
        task: 'new',
        done: true
      });
      (todoModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await todoController.updateTodo({
        params: { id: 'some-id' },
        body: { task: 'new test updateTodo()', done: true }
      } as Request<{ id: string }, any, { task: string; done: boolean }>);
      // then
      expect(todoModel.findById).toHaveBeenCalledWith('some-id');
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        id: 'some-id',
        task: 'new',
        done: true
      });
    });
  });
});
*/
