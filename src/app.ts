import express from "express";
import {router as routerTodo} from "./controllers/routes";
import mongoose from "mongoose"
import TaskModel from "./models/taskModel"

const app = express();
const port = 3000;

app
  .use(express.json())
  .use("/todos", routerTodo);

mongoose.connect("mongodb+srv://david:6boYv6Dy@cluster0.4ntjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection
db.on("error", (error) => {
  console.error(error)
})
db.once("open", () => {
  console.log("database connected")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});