import { Schema, model } from "mongoose";

export interface GoalDocument extends Document {
  name: string;
  _id: string;
  dateStart: string;
  dateEnd: string;
  userId: string;
}

const GoalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
  },
  dateStart: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  lastActivity: {
    type: String,
  },
  streak: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const Goal = model("goal", GoalSchema);
