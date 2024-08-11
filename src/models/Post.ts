import { Document, Schema, model } from 'mongoose';

interface IPost extends Document {
  customId: string;
  userId: string;
  name: string;
  event: string;
  region: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  mypage: {
    url: string;
    id: string;
    password: string;
  };
  taskFlow: [
    {
      customId: string;
      task: string;
      situation: string;
      testFormat: string;
      date: string;
      limitDate: string;
      current: boolean;
      next: boolean;
      finished: boolean;
      edit: boolean;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    customId: { type: String, required: true, unique: true },
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 40,
    },
    event: {
      type: String,
      // required: true,
    },
    region: {
      type: String,
      // required: true,
      max: 20,
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false,
    },
    mypage: {
      url: { type: String, max: 80, default: '' },
      id: { type: String, max: 40, default: '' },
      password: { type: String, max: 40, default: '' },
    },
    taskFlow: [
      {
        customId: { type: String },
        task: { type: String },
        situation: { type: String, default: '未完了' },
        testFormat: { type: String, max: 20 },
        date: { type: String },
        limitDate: { type: String },
        current: { type: Boolean, default: false },
        next: { type: Boolean, default: false },
        finished: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model<IPost>('Post', PostSchema);
