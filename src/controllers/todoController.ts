import {Request, Response} from "express";
import TaskModel from "../models/taskModel";

interface todo {
  id: number | string,
  task: string,
  state: boolean
}


export async function getTodoList(req: Request, res: Response) {
  const tasks = await TaskModel.find();
  res.json(tasks);
}

export async function getById({params: {id}}: Request<{ id: string | number }>, res: Response) {
  const taskById = await TaskModel.findById(id);
  res.json(taskById);

}

export async function addTodoList(req: Request, res: Response) {
  const task = new TaskModel({
    task: req.body.task
  });

  await task.save();

  res.status(201).send(`Task : "${req.body.task}" has been created!`);
}

export async function delTodoList({params: {id}}: Request<{ id: string | number }>, res: Response) {

  const taskDel = await TaskModel.findByIdAndDelete(id);
  res.send("Task : \"" + taskDel.task + "\" has been deleted");

}


export async function updateTask(req: Request<{ id: string | number }>, res: Response) {
  const id = req.params.id;

  const task = await TaskModel.findById(id);
  if (task.state !== req.body.state) {
    task.state = req.body.state;
  }
  if (task.task !== req.body.task) {
    task.task = req.body.task;
  }
  const newTask = new TaskModel(task);
  await newTask.save();

  res.send("Old task : \n" + task + "\n" + "New task : \n" + newTask + "\n");
}











