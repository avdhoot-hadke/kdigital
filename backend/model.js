import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: Number, required: true },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Team member"],
    default: "Team member",
    required: true,
  },
  tasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: false },
  ],
});

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
    required: true,
  },
  dueDate: { type: Date, required: false },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignees: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  ],
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectType: { type: String, required: true },
  tasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: false },
  ],
});

export const User = mongoose.model("User", userSchema);
export const Task = mongoose.model("Task", taskSchema);
export const Project = mongoose.model("Project", projectSchema);
