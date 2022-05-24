import express from "express";
import { router as routerTodo } from "./controllers/todos/routes";
import { router as routerUser } from "./controllers/users/routes";
import "dotenv/config";

export const app = express();

app.use(express.json()).use("/todos", routerTodo).use("/users", routerUser);
