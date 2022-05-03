/*
import todoModel from '../../models/todoModel';
import { Request, Response } from 'express';
import { TodoController } from './todoController';

jest.mock('../../models/todoModel');

export interface Todo {
  id: number | string;
  task: string;
  state: boolean;
}

describe('todoController', () => {
  beforeEach(() => {
    (todoModel.findById as jest.Mock).mockClear();
  });
  describe('getTodos()', () => {
    it('should return empty array', async () => {
      // given
      const todoController = new TodoController();
      (todoModel.find as jest.Mock).mockResolvedValue([]);
      const req = {} as any;
      const res = { send: jest.fn() } as any;
      // when
      const result = await todoController.getTodos(req, res);
      // then
      expect(result).toEqual([]);
    });
  });

  describe('getTodo()', () => {
    it('should return a todo from todoModel', async () => {
      // given
      const todoController = new TodoController();
      (todoModel.findById as jest.Mock).mockResolvedValue([
        {
          task: 'I am a task'
        }
      ]);
      const req = { params: { id: 'id' } } as any;
      // when
      const result = await todoController.getTodo(req);
      // then
      expect(result).toEqual([
        {
          task: 'I am a task'
        }
      ]);
      expect(todoModel.findById as jest.Mock).toHaveBeenCalledWith('id');
    });

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
  describe('addTodo()', () => {
    it('should add a new todo in database', async () => {
      // given
      const todoController = new TodoController();
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        id: "id",
        task: "task",
        done: false
      });
      (todoModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      const req ={
        body: {
          task: "task",
          done: false
        }
      } as any
      // when
        const result = await todoController.addTodo(req)
      // then
      expect(todoModel).toHaveBeenCalledWith({
        task: "task",
        done: false
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        id: "id",
        task: "task",
        done: false
      });
    });
  });
  describe('deleteTodo()', () => {
    it('should delete a todo by id', async () => {
      // given

      (todoModel.findByIdAndDelete as jest.Mock).mockResolvedValue([]);
      const req = { params: { id: '1A' } } as any;


      // when
      const todoController = new TodoController()
      const result = await todoController.deleteTodo(req);
      // then
      expect(result).toEqual([]);
    });
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
