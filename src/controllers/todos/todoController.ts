import { Request, Response } from 'express';
import TodoModel from '../../models/todoModel';

export class TodoController {
  async getTodos(req: Request, res: Response) {
    const todos = await TodoModel.find();

    res.send(todos);
    return todos;
  }

  async getTodo({ params: { id } }: Request<{ id: string | number }>) {
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return 'todo not found';
    }

    return todo;
  }

  async addTodo(req: Request) {
    const newTodo = new TodoModel({
      task: req.body.task
    });

    return newTodo.save();
  }

  async deleteTodo(
    { params: { id } }: Request<{ id: string }>
  ) {
    const taskDel = await TodoModel.findByIdAndDelete(id);
    if (!taskDel) return "todo not found";
    else return taskDel;
  }



  async updateTodo(req: Request<{ id: string }>) {
    const id = req.params.id;

    const todo = await TodoModel.findById(id);
    if (!todo) {
      return "todo not found";
    } else {
      if (todo.done !== req.body.done) {
        todo.done = req.body.done;
      }
      if (todo.task !== req.body.task) {
        todo.task = req.body.task;
      }
      const newTask = new TodoModel(todo);
      return await newTask.save();
    }

    //res.send('Old task : \n' + task + '\n' + 'New task : \n' + newTask + '\n');
  }


  /*async function getTodoList() {
    const todos = await TodoModel.find();

    return todos;
  }


  async function getById(
    {params: {id}}: Request<{ id: string | number }>,
    res: Response
  ) {
    const taskById = await TodoModel.findById(id);

    if (!taskById) return "task not found";
    else {
      res.json(taskById);
      return taskById;
    }
  }


  async function

  addTodoList(req: Request, res: Response) {
    const task = new TodoModel({
      task: req.body.task
    });

    await task.save();

    //res.send(`Task : "${req.body.task}" has been created!` );
    return req.body.task;
  }


  async function

  delTodoList(
    {params: {id}}: Request<{ id: string }>,
    res: Response
  ) {
    const taskDel = await TodoModel.findByIdAndDelete(id);
    if (!taskDel) return "task not found";
    else return res.send("Task : \"" + taskDel.task + "\" has been deleted");
  }


  async function

  updateTask(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const newTask = null;

    const task = await TodoModel.findById(id);
    if (!task) {
      return "task not found";
    } else {
      if (task.state !== req.body.state) {
        task.state = req.body.state;
      }
      if (task.task !== req.body.task) {
        task.task = req.body.task;
      }
      const newTask = new TodoModel(task);
      return await newTask.save();
    }

    //res.send('Old task : \n' + task + '\n' + 'New task : \n' + newTask + '\n');
  }*/
}
