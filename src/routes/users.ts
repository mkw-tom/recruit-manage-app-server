import { Request, Response } from "express";

const router = require("express").Router();

router.get("/", (req:Request , res:Response) => {
  res.send("hello")
})

module.exports = router