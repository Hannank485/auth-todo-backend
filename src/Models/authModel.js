import db from "../db.js";
const authModel = {
  async findByUsername(username) {
    const query = db.prepare("SELECT * FROM user WHERE username = ?");
    return query.get(username);
  },
  async create(username, password) {
    const query = db.prepare(`INSERT INTO user(username,password)VALUES (?,?)`);
    const result = query.run(username, password);
    return result.lastInsertRowid;
  },
};

export default authModel;
