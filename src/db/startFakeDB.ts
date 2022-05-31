import { MongoMemoryServer } from "mongodb-memory-server";
import { startDB } from "./dbconfig";

export async function startFakeDB() {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  // @ts-ignore
  global.MONGO_DB = await MongoMemoryServer.create();

  // @ts-ignore
  const uri = global.MONGO_DB.getUri();
  // @ts-ignore
  global.MONGO_CONNECTION = await startDB(uri);

  // The Server can be stopped again with
  // await mongod.stop();
}

export async function closeFakeDB() {
  // @ts-ignore
  await global.MONGO_CONNECTION.close();
  // @ts-ignore
  await global.MONGO_DB.stop();
}
