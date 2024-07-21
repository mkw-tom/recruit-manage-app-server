import { timeStamp } from "console";
import { Document, Schema, SchemaDefinition, model } from "mongoose";

interface IPost extends Document {
  userId: string,
  name: string,
  event: string,
  region: string,
  date: string,
  mypage: {
    url: string,
    id: string,
    password: string,
  },
  taskFlow: [{
    task: string,
    situation: string,
    testFormat: string,
    date: string,
    limitData:string,
  }],
  createdAt: Date,
  updatedAt: Date,
}

const PostSchema = new Schema<IPost>({
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
    required: true,
  },
  region: {
    type: String,
    required: true,
    max: 20,
  },
  date: {
    type: String,
    required: true
  },
  mypage: {
    url: {type: String, max: 80},
    id: {type: String, max: 40 },
    password: {type: String, max: 40}
  },
  taskFlow: [{
    task: {type: String},
    situation: {type: String},
    testFormat: {type: String, max:20},
    date: {type: String},
    limitDate: {type: String},
  }],
},
{
  timestamps: true
})

module.exports = model<IPost>('Post', PostSchema)
