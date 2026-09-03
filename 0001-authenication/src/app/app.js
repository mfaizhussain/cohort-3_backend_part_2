import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { authenticate } from "../middleware/auth.middleware.js";

const app = express();
app.use(express.json());



app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API done",
  });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    email,
    name,
    password: await bcrypt.hash(password, 10),
  });

  const accessToken = jwt.sign(
    {
      // email,
      // name,
      id: user._id
    },
    "18b0da6128e1fbd4fa01358ac97b699e6313111505228aa65446d33ee2d0bd3b"
  );

  
  res.status(201).json({
    message: "User created successfully",
    data: {
      user: {
        email,
        name,
        id: user._id
      },
      token: accessToken,
    },
  });
});

app.get("/api/auth/me", authenticate, async (req, res) =>{
      


      res.status(200).json({
       user:req.user
      })


});


export default app;