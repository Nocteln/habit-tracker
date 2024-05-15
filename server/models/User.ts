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
    type: Number,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const User = model("user", UserSchema);
