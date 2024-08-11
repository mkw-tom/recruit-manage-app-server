import { Request, Response } from 'express';
const Post = require('../models/post');
const router = require('express').Router();

//企業の追加
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newPost = await new Post({
      customId: req.body.customId,
      userId: req.body.userId,
      name: req.body.name,
      event: req.body.event,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      region: req.body.region,
    });
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//企業データの取得
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});


//企業データの編集
router.put('/:postId', async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      {
        customId: req.params.postId,
      },
      {
        $set: req.body,
      }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//特定の一つの企業データを取得
router.get('/:postId/select', async (req: Request, res: Response) => {
  try {
    const selectPost = await Post.findOne({
      customId: req.params.postId,
    });
    return res.status(200).json(selectPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//特定の企業データの削除
router.delete('/:postId/delete', async (req: Request, res: Response) => {
  try {
    const deletePost = await Post.findOneAndDelete({
        customId: req.params.postId,
      });
    return res.status(200).json(deletePost);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//------------AddFormEvent----------

router.get('/:id/recent', async (req: Request, res: Response) => {
  try {
    const posts = await Post.findOne({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//------
router.put('/:id/addTask', async (req: Request, res: Response) => {
  try {
    const pushTask = await Post.findOneAndUpdate(
      {
        customId: req.params.id,
      },
      {
        $push: {
          taskFlow: req.body,
        },
      }
    );
    return res.status(200).json(pushTask);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//一番最近追加されたデータを取得

// タスクフローの削除
router.put('/:id/deleteTask/:taskId', async (req: Request, res: Response) => {
  try {
    const deleteTask = await Post.findOneAndUpdate(
      {
        customId: req.params.id,
      },
      {
        $pull: {
          taskFlow: { customId: req.params.taskId },
        },
      }
    );
    return res.status(200).json(deleteTask);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//タスクフローの更新
router.put('/:id/editTask/:taskId', async (req: Request, res: Response) => {
  try {
    const editTask = await Post.findOneAndUpdate(
      {
        customId: req.params.id,
        'taskFlow.customId': req.params.taskId,
      },
      {
        $set: { 'taskFlow.$': req.body },
      }
    );
    return res.status(200).json(editTask);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
