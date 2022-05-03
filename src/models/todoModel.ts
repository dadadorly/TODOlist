import mongoose from 'mongoose';

export interface Todo {
  task: string;
  done: boolean;
}

const todoSchema = new mongoose.Schema<Todo>({
  task: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('todo', todoSchema);
