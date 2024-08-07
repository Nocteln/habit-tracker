import { Schema, model } from "mongoose";

export interface GoalDocument extends Document {
  name: string;
  _id: string;
  dateStart: string;
  dateEnd: string;
  userId: string;
}

let today = new Date();
today.setDate(today.getDate() - 1);

const GoalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  lastActivity: {
    type: Date,
    default: today,
  },
  streak: {
    type: Number,
    default: 0,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
    default: "check",
  },
  iconColor: {
    type: String,
    required: true,
    default: "white",
  },
  displayedOnProfile: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export const Goal = model("goal", GoalSchema);
