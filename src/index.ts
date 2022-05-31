import { startDB } from "./db/dbconfig";
import { app } from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.DB_URI as string;

startDB(MONGO_DB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
