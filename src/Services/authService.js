import authModel from "../Models/authModel.js";
import taskModel from "../Models/taskModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authService = {
  async register(username, password) {
    //   TO CHECK IF USERNAME EXISTS
    const usernameExist = await authModel.findByUsername(username);
    if (usernameExist) {
      const error = new Error("User already Exists");
      throw error;
    }
    try {
      //   HASH PASSWORD AND STORE IT
      const hashedPassword = await bcrypt.hash(password, 8);
      const result = await authModel.create(username, hashedPassword);

      // CREATE INITIAL TASK
      taskModel.intiialTask(result);
      // CREATE JWT TOKEN
      const token = jwt.sign({ id: result }, process.env.JWT_TOKEN, {
        expiresIn: "24h",
      });
      return { token };
    } catch (err) {
      const error = new Error(err.messsage);
      throw error;
    }
  },
  async login(username, password) {
    try {
      const user = await authModel.findByUsername(username);

      //   TO CHECK IF USER EXISTS
      if (!user) {
        const error = new Error("Invalid Credentials");
        throw error;
      }

      //   CHECK PASSWORD
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("Invalid Credentials");
        throw error;
      }
      // CREATE TOKEN
      const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
        expiresIn: "24h",
      });
      return { token };
    } catch (err) {
      const error = new Error(err.messsage);
      throw error;
    }
  },
};
export default authService;
