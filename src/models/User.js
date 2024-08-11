"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 25,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 40,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    allCompanies: {
        type: [Object],
        default: [],
    },
    passCompanies: {
        type: [Object],
        default: [],
    },
}, { timestamps: true });
module.exports = (0, mongoose_1.model)('user', UserSchema);
