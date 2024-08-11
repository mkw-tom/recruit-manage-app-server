import { Document, Schema, model } from 'mongoose';
// const mongoose = require('mongoose');

interface IUser extends Document {
  username: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  allCompanies: [];
  passCompanies: [];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

module.exports = model<IUser>('user', UserSchema);
