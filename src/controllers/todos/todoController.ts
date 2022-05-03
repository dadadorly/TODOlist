import {Request, Response} from "express";
import {TodoService} from "./todoService";
import TodoModel from "../../models/todoModel";

const todoService = new TodoService();

export class TodoController {


  async getTodos(req: Request,res: Response) {

    const todos = await todoService.getTodos();

    res.json(todos);
    return todos;
  }

  async getTodo({params: {id}}: Request<{ id: string }>, res: Response) {

    id = "" + id;

    const todo = await todoService.getTodo(id);

    if (!todo) {
      return "todo not found";
    }

    res.json(todo);
    return todo;
  }

  async addTodo(req: Request, res: Response) {
    const task = req.body.task;
    const newTodo = await todoService.addTodo(task);
    res.send("Todo : \""+ task + "\" has been created ");
    return newTodo;
  }

  async deleteTodo({params: {id}}: Request<{ id: string }>,res:Response) {

    const todoDel = await todoService.deleteTodo(id);
    res.send("Todo has been deleted");
    return todoDel;
  }


  async updateTodo(req: Request<{ id: string }>,res:Response) {
    const id = req.params.id;

    const todo = await todoService.getTodo(id);

    if (!todo) {
      res.send("Todo not found");
      return "todo not found";
    } else {
      const newTodo = todo;
      if (newTodo.done !== req.body.done) {
        newTodo.done = req.body.done;
      }
      if (newTodo.task !== req.body.task) {
        newTodo.task = req.body.task;
      }
      await todoService.updateTodo(newTodo as any);
      res.send('Old todo : \n' + todo.task +'\n'+todo.done+ '\n' + 'New todo : \n' + newTodo.task +'\n'+newTodo.done+ '\n');
      return newTodo;
    }


  }

}
