import jwt from "jsonwebtoken";
export default function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ error: "INVALID TOKEN" });
  }
}
