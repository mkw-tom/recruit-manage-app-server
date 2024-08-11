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
// import User from '../models/User';
const User = require('../models/User');
const router = require('express').Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield new User({
            username: req.body.username,
            password: req.body.password,
        });
        const user = yield newUser.save();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: req.body.username });
        if (!user)
            return res.status(404).send('ユーザーが見つかりません');
        const vaildPassword = req.body.password === user.password;
        if (!vaildPassword)
            return res.status(400).send('パスワードが見つかりません');
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
module.exports = router;
