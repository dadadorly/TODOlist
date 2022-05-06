import TodoModel, { Todo } from "../../models/todoModel";

export class TodoService {
  async getTodos() {
    return await TodoModel.find();
  }

  async getTodo(id: string) {
    return await TodoModel.findById(id);
  }

  async addTodo(task: string) {
    const newTodo = new TodoModel({
      task: task
    });
    await newTodo.save();
    return newTodo;
  }

  async deleteTodo(id: string) {
    return await TodoModel.findByIdAndDelete(id);
  }

  async updateTodo(todo: Todo) {
    const oldTodo = await TodoModel.findByIdAndUpdate(todo.id, todo);
    return oldTodo;
  }
}
