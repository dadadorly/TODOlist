import mongoose from 'mongoose';
import 'dotenv/config';

const startDB = async () => {
  await mongoose.connect(process.env.DB_URI as string);
  const db = mongoose.connection;
  db.on('error', (error) => {
    //console.error(error);
  });
  db.once('open', () => {
    //console.log("database connected");
  });
};

export { startDB };
