import { Todo } from "../../models/todoModel";

export function todoMapper(todo: Todo) {
  return {
    id: todo._id,
    title: todo.title,
    done: todo.done
  };
}
