import mongoose from 'mongoose';

export interface Task {
  task: string;
  state: boolean;
}

const taskSchema = new mongoose.Schema<Task>({
  task: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  state: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('task', taskSchema);
