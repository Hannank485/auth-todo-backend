import taskService from "../Services/taskService.js";

const taskController = {
  // FETCH TASk
  async fetchTask(req, res) {
    try {
      const tasks = await taskService.fetchTask(req.userId);
      return res.json(tasks);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
  //   CREATE TASK
  async createTask(req, res) {
    const { task } = req.body;
    if (!task) {
      return res.status(400).send({ error: "Invalid Data Sent" });
    }
    try {
      const result = await taskService.createTask(task, req.userId);
      return res.status(201).json({
        id: result,
        task,
        complete: 0,
        user_id: req.userId,
      });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
  //   UPDATE TASK COMPLETED STATUS
  async toggleTask(req, res) {
    const taskID = req.params.id;
    if (!taskID) {
      return res.status(400).send({ error: "Invalid ID" });
    }
    try {
      await taskService.toggleTask(req.userId, taskID);
      return res.status(200).json({ message: "Task updated" });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
  async deleteTask(req, res) {
    const taskID = req.params.id;
    if (!taskID) {
      return res.status(400).send({ error: "Invalid ID" });
    }
    try {
      await taskService.deleteTask(req.userId, taskID);
      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
};
export default taskController;
