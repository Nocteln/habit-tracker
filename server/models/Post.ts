import { Schema, model } from "mongoose";

export interface UserDocument extends Document {
  subject: string;
  content: string;
  userId: string;
}

const PostSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export const Post = model("post", PostSchema);
