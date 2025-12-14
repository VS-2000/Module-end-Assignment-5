const Task = require("../models/Task");

// Get all tasks for user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Add new task
const addTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
};

// Update task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

// Delete task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted successfully" });
};


module.exports = { getTasks, addTask, updateTask, deleteTask };
