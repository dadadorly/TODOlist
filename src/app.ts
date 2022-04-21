import express from "express";
import {router as routerTodo} from "./controllers/routes";

const app = express();
const port = 3000;

app
  .use(express.json())
  .use("/todos", routerTodo);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});