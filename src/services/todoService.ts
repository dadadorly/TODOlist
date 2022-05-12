import TodoModel, { Todo } from "../models/todoModel";

export class TodoService {
  async getTodos() {
    return await TodoModel.find();
  }

  async getTodo(id: string) {
    return await TodoModel.findById(id);
  }

  async addTodo(title: string) {
    const newTodo = new TodoModel({
      title: title
    });
    await newTodo.save();
    return newTodo;
  }

  async deleteTodo(id: string) {
    return await TodoModel.findByIdAndDelete(id);
  }

  async updateTodo(todo: Todo) {
    return await TodoModel.findByIdAndUpdate(todo._id, todo);
  }
}
