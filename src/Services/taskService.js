import taskModel from "../Models/taskModel.js";

const taskService = {
  async fetchTask(id) {
    const tasks = await taskModel.fetchTask(id);
    return tasks;
  },

  async createTask(task, id) {
    const result = await taskModel.createTask(task, id);
    return result;
  },
  async toggleTask(userId, taskId) {
    const result = await taskModel.updateTask(userId, taskId);
    if (result.changes === 0) {
      const error = new Error("INVALID ID ");
      throw error;
    }
  },
  async deleteTask(userId, taskId) {
    const result = await taskModel.deleteTask(userId, taskId);
    if (result.changes === 0) {
      const error = new Error("INVALID ID ");
      throw error;
    }
  },
};

export default taskService;
