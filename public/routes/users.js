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
const router = require('express').Router();
const User = require('../models/User');
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            yield User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json('ユーザーー情報を更新しました');
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json('他人のアカウント情報は編集できません');
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = yield User.findByIdAndDelete(req.params.id);
            return res.status(200).send(`削除しました${user}`);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(404).send('アカウント削除の権限がありません');
    }
}));
module.exports = router;
