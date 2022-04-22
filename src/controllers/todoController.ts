import {Request, Response} from "express";
import {v4} from "uuid";
import TaskModel from "../models/taskModel";

interface todo {
  id: number | string,
  task: string,
  state: boolean
}


const todos: todo[] = [
  {
    id: 1,
    task: "Ranger la chambre",
    state: false

  },
  {
    id: 2,
    task: "Faire la vaiselle",
    state: true
  }
];


const uuid = v4();

export async function getTodoList(req: Request, res: Response) {
  const tasks = await TaskModel.find();
  res.json(tasks);
}

export async function getById({params: {id}}: Request<{ id: string | number }>, res: Response) {
  id = id;

  //const result = todos.find(element => element.id === +id);
  const taskById = await TaskModel.findById(id);
  res.json(taskById);

}

export async function addTodoList(req: Request, res: Response) {
  /*  console.log(uuid);

    todos.push({
      id: uuid,
      task: req.body.task,
      state: req.body.state
    });*/

  const task = new TaskModel({
    task: req.body.task
  });

  await task.save();

  res.status(201).send(`task ${req.body.task} is created!`);
}

export async function delTodoList({params: {id}}: Request<{ id: string | number }>, res: Response) {
  id = +id;

  /*  const result = todos.find((element, index) => {
      if (element.id === id) return todos.splice(index, 1);
    });*/
  const taskDel = await TaskModel.findByIdAndDelete(id);
  res.send("Delete Success");

}


export async function updateTask(req: Request<{ id: string | number }>, res: Response) {
  const id = req.params.id;

  /*  const index = todos.findIndex(element => element.id === id);

    todos[index].task = req.body.task;
    todos[index].state = req.body.state;*/

  /*const task =  await TaskModel.findById(id)
                        .update(req.body);*/
//  const task =  await TaskModel.findByIdAndUpdate(id,req.body)

  const task = await TaskModel.findById(id);
  if (task.state !== req.body.state) {
    task.state = req.body.state;
  }
  if (task.task !== req.body.task) {
    task.task = req.body.task;
  }
  const newTask = new TaskModel(task);
  await newTask.save();

  res.send("Update Success");
}











