import { Request, Response } from "express";
const User = require("../models/User")

const router = require("express").Router();

router.post("/register", async (req:Request, res:Response) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post("/login", async (req:Request, res:Response) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send("ユーザーが見つかりません");
    const vaildPassword = req.body.password === user.password;
    if(!vaildPassword) return res.status(400).send("パスワードが見つかりません");
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router