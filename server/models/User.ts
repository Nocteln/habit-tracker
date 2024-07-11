import { Schema, model } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  followList: {
    type: Array,
    default: [],
  },
});

export const User = model("user", UserSchema);
