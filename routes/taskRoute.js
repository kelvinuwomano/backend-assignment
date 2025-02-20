const express = require("express");
const { register, getAllTasks, login, addTask, updateTask } = require("../controller/userController");

const taskRouter = express.Router();

taskRouter.post("/auth", register);
taskRouter.get("/all-tasks", getAllTasks);
taskRouter.post("/login", login);
taskRouter.post("/task/:id", addTask);
taskRouter.patch("/update-task/:id", updateTask);

module.exports = taskRouter