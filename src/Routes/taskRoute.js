import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const getTasks = db.prepare(`SELECT * FROM task WHERE user_id = ?`);
    const tasks = getTasks.all(req.userId);
    return res.json(tasks);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ error: "Invalid Data Sent" });
  }
  try {
    const insertTask = db.prepare(
      `INSERT INTO task(task,user_id) VALUES (?,?)`,
    );
    const result = insertTask.run(task, req.userId);
    return res.status(201).json({
      id: result.lastInsertRowid,
      task,
      complete: 0,
      user_id: req.userId,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.put("/:id", (req, res) => {
  const taskID = req.params.id;
  if (!taskID) {
    return res.status(400).send({ error: "Invalid ID" });
  }
  try {
    const updateTask = db.prepare(
      `UPDATE task 
      SET complete = NOT complete 
      WHERE user_id = ? AND id = ?`,
    );
    const result = updateTask.run(req.userId, taskID);
    if (result.changes === 0) {
      return res.status(400).send({ error: "INVALID ID" });
    }
    return res.status(200).json({ message: "Task updated" });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const taskID = req.params.id;
  if (!taskID) {
    return res.status(400).send({ error: "Invalid ID" });
  }
  try {
    const deleteTask = db.prepare(`
    DELETE FROM task WHERE user_id = ? AND id = ?
    `);
    const result = deleteTask.run(req.userId, taskID);
    if (result.changes === 0) {
      return res.status(400).send({ error: "INVALID ID" });
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
export default router;
