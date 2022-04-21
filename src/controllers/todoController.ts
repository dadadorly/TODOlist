import {Request, Response} from "express";
import {v4} from "uuid";

interface todo {
  id: number | string,
  task: string,
  state: boolean
}

interface CustomRequest<T> extends Request {
  body: T;
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

export function getTodoList(req: Request, res: Response) {
  res.json([todos]);
}

export function getById({params: {id}}: Request<{ id: string | number }>, res: Response) {
  id = +id;

  const result = todos.find(element => element.id === +id);
  res.json(result);

}

export function addTodoList(req: Request, res: Response) {
  console.log(uuid);

  todos.push({
    id: uuid,
    task: req.body.task,
    state: req.body.state
  });

  res.send();
}

export function delTodoList({params: {id}}: Request<{ id: string | number }>, res: Response) {
  id = +id;

  const result = todos.find((element, index) => {
    if (element.id === id) return todos.splice(index, 1);
  });

}


export function updateTask(req: Request<{ id: string | number }>, res: Response) {
  const id = +req.params.id;

  const index = todos.findIndex(element => element.id === id);

  todos[index].task = req.body.task;
  todos[index].state = req.body.state;
  res.send();
}











