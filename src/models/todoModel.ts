import mongoose from "mongoose";

export interface Todo {
  _id?: string;
  title: string;
  done: boolean;
}

const todoSchema = new mongoose.Schema<Todo>({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  done: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("todo", todoSchema);
