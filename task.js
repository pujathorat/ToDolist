import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task: String,
  checked: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;