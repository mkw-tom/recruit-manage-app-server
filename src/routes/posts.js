"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post = require('../models/post');
const router = require('express').Router();
//企業の追加
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield new Post({
            customId: req.body.customId,
            userId: req.body.userId,
            name: req.body.name,
            event: req.body.event,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            region: req.body.region,
        });
        const post = yield newPost.save();
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//企業データの取得
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post.find({ userId: req.params.id });
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//企業データの編集
router.put('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield Post.findOneAndUpdate({
            customId: req.params.postId,
        }, {
            $set: req.body,
        });
        return res.status(200).json(updatedPost);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//特定の一つの企業データを取得
router.get('/:postId/select', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectPost = yield Post.findOne({
            customId: req.params.postId,
        });
        return res.status(200).json(selectPost);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//特定の企業データの削除
router.delete('/:postId/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletePost = yield Post.findOneAndDelete({
            customId: req.params.postId,
        });
        return res.status(200).json(deletePost);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//------------AddFormEvent----------
router.get('/:id/recent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post.findOne({ userId: req.params.id })
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//------
router.put('/:id/addTask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pushTask = yield Post.findOneAndUpdate({
            customId: req.params.id,
        }, {
            $push: {
                taskFlow: req.body,
            },
        });
        return res.status(200).json(pushTask);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//一番最近追加されたデータを取得
// タスクフローの削除
router.put('/:id/deleteTask/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTask = yield Post.findOneAndUpdate({
            customId: req.params.id,
        }, {
            $pull: {
                taskFlow: { customId: req.params.taskId },
            },
        });
        return res.status(200).json(deleteTask);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//タスクフローの更新
router.put('/:id/editTask/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editTask = yield Post.findOneAndUpdate({
            customId: req.params.id,
            'taskFlow.customId': req.params.taskId,
        }, {
            $set: { 'taskFlow.$': req.body },
        });
        return res.status(200).json(editTask);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
module.exports = router;
