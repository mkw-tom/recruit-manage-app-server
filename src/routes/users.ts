import { Request, Response } from 'express';
const router = require('express').Router();
const User = require('../models/User');

router.put('/:id', async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json('ユーザーー情報を更新しました');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('他人のアカウント情報は編集できません');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).send(`削除しました${user}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(404).send('アカウント削除の権限がありません');
  }
});

module.exports = router;