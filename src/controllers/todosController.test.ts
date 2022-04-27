import taskModel from '../models/taskModel';
import { Request, Response } from 'express';
import {
  addTodoList,
  delTodoList,
  getById,
  getTodoList,
  updateTask
} from './todoController';

jest.mock('../models/taskModel');

export interface Todo {
  id: number | string;
  task: string;
  state: boolean;
}

describe('Les tests du CRUD mock', () => {
  it('should return all todos', async () => {
    // given
    const todos: Todo[] = [
      {
        id: 1,
        task: 'Ranger la chambre',
        state: false
      },
      {
        id: 2,
        task: 'Faire la vaisselle',
        state: true
      }
    ];
    (taskModel.find as jest.Mock).mockResolvedValue(todos);
    const mockRequest = {
      body: {}
    } as Request;

    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn()
    };
    const expectedTodos: Todo[] = [
      {
        id: 1,
        task: 'Ranger la chambre',
        state: false
      },
      {
        id: 2,
        task: 'Faire la vaisselle',
        state: true
      }
    ];
    // when
    const result = await getTodoList(mockRequest, mockResponse);
    // then
    expect(result).toEqual(expectedTodos);
  });

  it('addTodoList ', async () => {
    // given

    const mockRequest = {
      body: {
        task: 'Faire un mock',
        state: false
      }
    } as Request;

    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await addTodoList(mockRequest, mockResponse);
    // then
    expect(result).toEqual(mockRequest.body.task);
  });
  it('should return the todo by id ', async () => {
    // given
    const todos: Todo[] = [
      {
        id: '1A',
        task: 'Ranger la chambre',
        state: false
      },
      {
        id: '2A',
        task: 'Faire la vaisselle',
        state: true
      }
    ];
    (taskModel.findById as jest.Mock).mockResolvedValue({});
    const req = { params: { id: '1A' } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await getById(req as any, res);
    // then
    expect(result).toEqual({});
  });
  it('getById case not found ', async () => {
    // given

    (taskModel.findById as jest.Mock).mockResolvedValue(undefined);
    const req = { params: { id: '1A' } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await getById(req as any, res);
    // then
    expect(result).toEqual('task not found');
  });
  it('delTodoList', async () => {
    // given

    (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
    const req = { params: { id: '1A' } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await delTodoList(req as any, res);
    // then
    expect(result).toEqual('task not found');
  });
  it('delete case not found ', async () => {
    // given

    (taskModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
    const req = { params: { id: '1A' } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await delTodoList(req as any, res);
    // then
    expect(result).toEqual('task not found');
  });
  it('update ', async () => {
    // given

    (taskModel.findById as jest.Mock).mockResolvedValue({
      id: 'id',
      task: 'old',
      state: false
    });
    const save = (jest.fn() as jest.Mock).mockResolvedValue({
      id: 'id',
      task: 'new',
      state: true
    });
    (taskModel as jest.MockedFunction<any>).mockImplementation(() => {
      return {
        save
      };
    });
    const req = { params: { id: 'id' }, body: { task: 'new', state: true } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };
    // when
    const result = await updateTask(req as any, res);
    // then
    expect(taskModel.findById).toHaveBeenCalledWith('id');
    expect(save).toBeCalled();
    expect(save).toHaveReturned();
    expect(result).toEqual({
      id: 'id',
      task: 'new',
      state: true
    });
  });
  it('update case not found ', async () => {
    // given

    (taskModel.findById as jest.Mock).mockResolvedValue(undefined);
    const req = { params: { id: '1A' } };
    const res: any = {
      json: jest.fn(),
      status: jest.fn()
    };

    // when
    const result = await delTodoList(req as any, res);
    // then
    expect(result).toEqual('task not found');
  });
});
