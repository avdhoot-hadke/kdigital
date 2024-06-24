import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cors from "cors";
import { User, Project, Task } from "./model.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const privateKey = process.env.SECRET_KEY;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to database.");
  } catch (error) {
    console.log(error);
  }
}

main();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  const { name, email, password, contact, role } = req.body;
  try {
    const createdUser = await User.create({
      name,
      email,
      password,
      contact,
      role,
    });
    const token = jwt.sign({ id: createdUser.id }, privateKey);
    console.log("Successfully created user!");
    res.status(200).json({ createdUser, token });
  } catch (error) {
    console.log(error);
    res.sendStatus(403).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) res.status(403).send("User not found !");
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user.id }, privateKey);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.post("/project", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);
  const { projectName, projectType } = req.body;
  try {
    const createdProject = await Project.create({
      projectName,
      leader: user.id,
      projectType,
      tasks: [],
    });
    res.status(201).json({
      message: "Project created successfully",
      project: createdProject,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});
app.get("/project", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);

  try {
    const projects = await Project.find({}).populate("leader").exec();
    res.status(200).json({
      message: "Project found successfully",
      project: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});
app.get("/project/:id", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);

  try {
    const project = await Project.findById(req.params.id)
      .populate("leader")
      .populate("tasks")
      .exec();

    res.status(200).json({
      message: "Project found successfully",
      project: project,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});

app.post("/task", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);
  const { taskName, description, dueDate, project, status } = req.body;
  try {
    const createTask = await Task.create({
      taskName,
      description,
      dueDate,
      project,
      status,
      assignees: user.id,
    });
    const updatedProject = await Project.findByIdAndUpdate(
      project,
      { $push: { tasks: createTask._id } },
      { new: true }
    ).exec();

    res.status(201).json({
      message: "Task created successfully",
      Task: createTask,
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});
app.get("/task", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);

  try {
    const tasks = await Task.find({ assignees: user.id });
    res.status(201).json({
      message: "Task found successfully",
      Task: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});
app.get("/task/:id", async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const user = jwt.verify(token, privateKey);

  try {
    const tasks = await Project.find(req.params.id).populate("leader").exec();

    res.status(200).json({
      message: "Task found successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
});
app.listen(3000, () => {
  console.log("***Server listening on port 3000***");
});
