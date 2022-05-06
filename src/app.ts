import express from "express";
import { router as routerTodo } from "./controllers/todos/routes";
import { startDB } from "./db/dbconfig";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()).use("/todos", routerTodo);

startDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
