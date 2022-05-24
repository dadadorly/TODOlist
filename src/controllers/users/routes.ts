import { Router } from "express";
import { UserController } from "./userController";
import { wrapHandler } from "../../utils/wrapHandler";

export const router = Router();
const userController = new UserController();

router
  .get("/", wrapHandler(userController.getUsers.bind(userController)))
  .get("/:id", wrapHandler(userController.getUser.bind(userController)))
  .post("/", wrapHandler(userController.addUser.bind(userController)))
  .delete("/:id", wrapHandler(userController.deleteUser.bind(userController)))
  .put("/:id", wrapHandler(userController.updateUser.bind(userController)));