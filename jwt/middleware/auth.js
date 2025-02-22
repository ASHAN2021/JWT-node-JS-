import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default auth;
