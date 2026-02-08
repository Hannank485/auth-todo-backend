import db from "../db.js";

const taskModel = {
  async intiialTask(id) {
    const insertTask = db.prepare(
      `INSERT INTO task(task, user_id) VALUES (?,?)`,
    );
    insertTask.run("This is Your initial TASK u may add more", id);
  },

  // FETCH TASK
  async fetchTask(id) {
    const getTasks = db.prepare(`SELECT * FROM task WHERE user_id = ?`);
    const tasks = getTasks.all(id);
    return tasks;
  },

  //   CREATE TASK
  async createTask(task, id) {
    const insertTask = db.prepare(
      `INSERT INTO task(task,user_id) VALUES (?,?)`,
    );
    const result = insertTask.run(task, id);
    return result.lastInsertRowid;
  },
  async updateTask(userId, taskId) {
    const updateTask = db.prepare(
      `UPDATE task 
      SET complete = NOT complete 
      WHERE user_id = ? AND id = ?`,
    );
    const result = updateTask.run(userId, taskId);
    return result;
  },
  async deleteTask(userId, taskId) {
    const deleteTask = db.prepare(`
    DELETE FROM task WHERE user_id = ? AND id = ?
    `);
    const result = deleteTask.run(userId, taskId);
    return result;
  },
};
export default taskModel;
