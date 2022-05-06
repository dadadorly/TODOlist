import { Router } from "express";
import { TodoController } from "./todoController";
import { wrapHandler } from "../../utils/wrapHandler";

export const router = Router();
const todoController = new TodoController();

router
  .get("/", wrapHandler(todoController.getTodos.bind(todoController)))
  .get("/:id", wrapHandler(todoController.getTodo.bind(todoController)))
  .post("/", wrapHandler(todoController.addTodo.bind(todoController)))
  .delete("/:id", wrapHandler(todoController.deleteTodo.bind(todoController)))
  .put("/:id", wrapHandler(todoController.updateTodo.bind(todoController)));
