import express from 'express';
import { router as routerTodo } from './controllers/todos/routes';
import { startDB } from './db/dbconfig';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json()).use('/todos', routerTodo);

(function connect() {
  startDB().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });
})();
