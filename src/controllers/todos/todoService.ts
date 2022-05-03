import TodoModel from '../../models/todoModel';


export class TodoService {

  async getTodos() {
    const todos = await TodoModel.find();
    return todos;
  }

  async getTodo(id: string){
    const todo = await TodoModel.findById(id);
    return todo;
  }

  async addTodo(task: string){
    const newTodo = new TodoModel({
      task: task
    });
    newTodo.save()
    return newTodo;
  }

  async deleteTodo(id: string){
    const todoDel = await TodoModel.findByIdAndDelete(id);
    if (!todoDel) return "todo not found";
    else return todoDel;
  }

  async updateTodo(todo : Document){
    const newTodo =new TodoModel(todo);
    newTodo.save();
    return newTodo;
  }
}