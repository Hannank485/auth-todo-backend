import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: "Invalid Data" });
  }
  //   TO CHECK IF USERNAME EXISTS
  const getUser = db.prepare(`SELECT * FROM user where username = ?`);
  const usernameExist = getUser.get(username);
  if (usernameExist) {
    return res.status(409).send({ error: "USERNAME ALREADY EXISTS" });
  }

  try {
    //   HASH PASSWORD AND STORE IT
    const hashedPassword = await bcrypt.hash(password, 8);
    const insertUser = db.prepare(
      `INSERT INTO user(username,password)VALUES (?,?)`,
    );
    const result = insertUser.run(username, hashedPassword);

    // CREATE INITIAL TASK
    const insertTask = db.prepare(
      `INSERT INTO task(task, user_id) VALUES (?,?)`,
    );
    insertTask.run(
      "This is Your initial TASK u may add more",
      result.lastInsertRowid,
    );

    // CREATE JWT TOKEN
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_TOKEN,
      {
        expiresIn: "24h",
      },
    );
    return res.json({ token });
  } catch (err) {
    return res.sendStatus(500).send({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   TO CHECK IF USER EXISTS
  if (!username || !password) {
    return res.status(400).send({ error: "Invalid Data" });
  }

  try {
    const getUser = db.prepare(`SELECT * FROM user where username = ?`);
    const user = getUser.get(username);

    //   TO CHECK IF USER EXISTS
    if (!user) {
      return res.status(401).send({ error: "INVALID CREDENTIALS" });
    }

    //   CHECK PASSWORD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "INVALID CREDENTIALS" });
    }
    // CREATE TOKEN
    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });
    return res.json({ token });
  } catch (err) {
    return res.sendStatus(500).send({ error: err.message });
  }
});
export default router;
