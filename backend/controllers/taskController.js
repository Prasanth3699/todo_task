const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createTask = async (req, res) => {
  const { title, description, status, dueDate, reminder } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      reminder,
      user: req.user.id,
    });

    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.updatedAt = Date.now();

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    console.log("comes here");
    let task = await Task.findById(req.params.id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
