import { Router } from 'express';
import { TodoController } from './todoController';

export const router = Router();
const todoController = new TodoController();

router
  .get('/', todoController.getTodos)
  .get('/:id', todoController.getTodo)
  .post('/', todoController.addTodo)
  .delete('/:id', todoController.deleteTodo)
  .put('/:id', todoController.updateTodo);
