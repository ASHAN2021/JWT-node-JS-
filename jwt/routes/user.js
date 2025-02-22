import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log("ACCESS_TOKEN_KEY:", process.env.ACCESS_TOKEN_KEY); // Add this line to check the value of ACCESS_TOKEN_KEY

const router = express.Router();

router.post("/login", (req, res) => {
  //DB
  //OK

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
  res.send({ accessToken });
});

export default router;
