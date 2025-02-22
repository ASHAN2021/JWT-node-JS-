import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log("ACCESS_TOKEN_KEY:", process.env.ACCESS_TOKEN_KEY); // Add this line to check the value of ACCESS_TOKEN_KEY

const router = express.Router();

let refreshTokens = [];

router.post("/login", (req, res) => {
  //DB
  //OK

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY,{expiresIn:'10s'});
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY,{expiresIn:'24h'});
    refreshTokens.push(refreshToken);
  res.send({ accessToken, refreshToken });
});

router.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err,user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = jwt.sign({name:user.name},process.env.ACCESS_TOKEN_KEY,{expiresIn:'10s'});
        res.json({accessToken});
    });
});

router.delete("/logout", (req, res) => {
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.sendStatus(204);
});

export default router;
