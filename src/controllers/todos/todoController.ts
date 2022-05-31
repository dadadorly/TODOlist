import { Request } from "express";
import { TodoService } from "../../services/todoService";
import { Todo } from "../../models/todoModel";
import { todoMapper } from "./todoMapper";
import { NotFound } from "@tsed/exceptions";

export class TodoController {
  protected todoService: TodoService = new TodoService();

  async getTodos() {
    const todos = await this.todoService.getTodos();
    return todos.map(todoMapper);
  }

  async getTodo({ params: { id } }: Request<{ id: string }>) {
    const todo = await this.todoService.getTodo(id);
    if (!todo) {
      throw new NotFound("Todo not found");
    }
    return todoMapper(todo);
  }

  async addTodo({ body: { title } }: Request<Todo>) {
    const todo = await this.todoService.addTodo(title);
    return todoMapper(todo);
  }

  async deleteTodo(req: Request<{ id: string }>) {
    await this.getTodo(req);
    await this.todoService.deleteTodo(req.params.id);
  }

  async updateTodo(req: Request<{ id: string }, Todo>) {
    await this.getTodo(req);
    const {
      params: { id },
      body: { title, done }
    } = req;
    const todo = await this.todoService.updateTodo({
      _id: id,
      title,
      done
    });
    return todoMapper(todo!);
  }
}
