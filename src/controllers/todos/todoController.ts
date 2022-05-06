import { Request } from "express";
import { TodoService } from "./todoService";
import { Todo } from "../../models/todoModel";
//import { NotFound } from "@tsed/exceptions";

export class TodoController {
  protected todoService: TodoService = new TodoService();

  async getTodos() {
    return await this.todoService.getTodos();
  }

  async getTodo({ params: { id } }: Request<{ id: string }>) {
    return await this.todoService.getTodo(id);
  }

  async addTodo({ body: { task } }: Request<Todo>) {
    return await this.todoService.addTodo(task);
  }

  async deleteTodo({ params: { id } }: Request<{ id: string }>) {
    return await this.todoService.deleteTodo(id);
  }

  async updateTodo({ params: { id }, body: { task, done } }: Request<{ id: string }, Todo>) {
    return this.todoService.updateTodo({
      id,
      task,
      done
    });
  }
}
