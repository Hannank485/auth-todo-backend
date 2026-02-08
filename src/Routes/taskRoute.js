import express from "express";
import taskController from "../Controllers/taskController.js";

const router = express.Router();

router.get("/", taskController.fetchTask);

router.post("/", taskController.createTask);

router.put("/:id", taskController.toggleTask);

router.delete("/:id", taskController.deleteTask);
export default router;
