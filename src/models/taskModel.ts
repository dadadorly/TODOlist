import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  task : {
    type: String,
    required: true,
    minlength: 1,
    unique:true
  },
  state : {
    type: Boolean,
    default: false
  },
})

export default  mongoose.model('task', taskSchema)