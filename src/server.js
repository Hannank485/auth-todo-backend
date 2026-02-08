import express from "express";
import authRouter from "./Routes/authRoutes.js";
import taskRouter from "./Routes/taskRoute.js";
import authMiddleware from "./Middleware/authMiddleware.js";

// USE EXPRESS
const app = express();
const PORT = process.env.PORT || 4000;
// MIDDLEWARE TO USE JSON
app.use(express.json());

app.use("/auth", authRouter);
app.use("/task", authMiddleware, taskRouter);
// RUN SERVER
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
