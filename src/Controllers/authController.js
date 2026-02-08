import authService from "../Services/authService.js";

const authController = {
  async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Invalid Data" });
    }
    try {
      const token = await authService.register(username, password);
      return res.status(200).json({ token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    //   TO CHECK IF USER EXISTS
    if (!username || !password) {
      return res.status(400).send({ error: "Invalid Data" });
    }
    try {
      const token = await authService.login(username, password);
      return res.status(200).json({ token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
export default authController;
