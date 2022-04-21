import {Router} from "express";
import {addTodoList, delTodoList, getById, getTodoList, updateTask } from "./todoController";

export const router = Router();

router
  .get("/", getTodoList)
  .get("/:id", getById)
  .post("/", addTodoList)
  .delete("/:id", delTodoList)
  .put("/:id", updateTask)
 // .put("/state/:id", updateState);