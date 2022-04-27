import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';

export async function getTodoList(req: Request, res: Response) {
  const tasks = await TaskModel.find();

  res.json(tasks);
  return tasks;
}

export async function getById(
  { params: { id } }: Request<{ id: string | number }>,
  res: Response
) {
  const taskById = await TaskModel.findById(id);

  if (!taskById) return 'task not found';
  else {
    res.json(taskById);
    return taskById;
  }
}

export async function addTodoList(req: Request, res: Response) {
  const task = new TaskModel({
    task: req.body.task
  });

  await task.save();

  //res.send(`Task : "${req.body.task}" has been created!` );
  return req.body.task;
}

export async function delTodoList(
  { params: { id } }: Request<{ id: string }>,
  res: Response
) {
  const taskDel = await TaskModel.findByIdAndDelete(id);
  if (!taskDel) return 'task not found';
  else return res.send('Task : "' + taskDel.task + '" has been deleted');
}

export async function updateTask(req: Request<{ id: string }>, res: Response) {
  const id = req.params.id;
  const newTask = null;

  const task = await TaskModel.findById(id);
  if (!task) {
    return 'task not found';
  } else {
    if (task.state !== req.body.state) {
      task.state = req.body.state;
    }
    if (task.task !== req.body.task) {
      task.task = req.body.task;
    }
    const newTask = new TaskModel(task);
    return await newTask.save();
  }

  //res.send('Old task : \n' + task + '\n' + 'New task : \n' + newTask + '\n');
}
