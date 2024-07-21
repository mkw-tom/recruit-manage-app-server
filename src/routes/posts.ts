import { Request, Response } from "express";
const Post = require("../models/post")
const router = require("express").Router();

router.post("/add", async (req:Request, res:Response) => {
  try {
    const newPost = await new Post({
      userId: req.body.userId,
      name: req.body.name,
      event: req.body.event,
      region: req.body.region,
      date: req.body.date,
      mypage: req.body.mypage,
      taskFlow: req.body.taskFlow,
    })
    const psot = await newPost.save();
    return res.status(200).send("新たに企業を追加しました")
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get("/:id", async (req: Request, res:Response) => {
  try {
    const posts = await Post.find({userId: req.params.id});
    return res.status(200).json(posts)
  } catch(error) {
    return res.status(500).json(error)
  }
})

router.put("/:id", async (req: Request, res:Response) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    })
    return res.status(200).json(updatedPost)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router