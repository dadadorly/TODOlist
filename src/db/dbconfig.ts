import mongoose from "mongoose";
import "dotenv/config";

const startDB = async (url: string) => {
  await mongoose.connect(url);
  const db = mongoose.connection;
  db.on("error", () => {
    //console.error(error);
  });
  db.once("open", () => {
    //console.log("database connected");
  });
};

export { startDB };
