import { Goal } from "~/server/models/Goal";
import { Post } from "~/server/models/Post";
import { User } from "~/server/models/User";

const challenges = [
  {
    id: 1,
    title: "Complete your first goal",
    description: "Mark your first goal as completed",
    difficulty: "easy",
    xp: 100,
    image: "/badges/1_habit.png",
    count: 0, // Nombre d'actions accomplies
    completed: false, // Statut du challenge
    goal: 1, // Objectif à atteindre
  },

  {
    id: 2,
    title: "Add a new habit",
    description: "Add a new habit to track",
    difficulty: "easy",
    xp: 100,
    image: "/badges/starting_1_habit.png",
    count: 0,
    completed: false,
    goal: 1,
  },
  {
    id: 3,
    title: "Get 5 habits",
    description: "Add 5 habits to your list",
    difficulty: "medium",
    xp: 200,
    image: "/badges/5_habits.png",
    count: 0,
    completed: false,
    goal: 5,
  },
  {
    id: 4,
    title: "Track a habit for a week",
    description: "Track any habit every day for a week",
    difficulty: "medium",
    xp: 300,
    image: "/badges/1_week.png",
    count: 0,
    completed: false,
    goal: 7, // Suivi quotidien pendant une semaine
  },
  {
    id: 6,
    title: "Share your progress",
    description: "Share your progress with a post",
    difficulty: "medium",
    xp: 200,
    image: "/badges/share_progress.png",
    count: 0,
    completed: false,
    goal: 1,
  },
  {
    id: 5,
    title: "Track a habit for a month",
    description: "Track any habit every day for a month",
    difficulty: "hard",
    xp: 500,
    image: "/badges/1_month.png",
    count: 0,
    completed: false,
    goal: 30, // Suivi quotidien pendant un mois
  },
  {
    id: 7,
    title: "Complete 50 habits",
    description: "Complete any habits 50 times",
    difficulty: "hard",
    xp: 600,
    image: "/badges/50_habits.png",
    count: 0,
    completed: false,
    goal: 50,
  },
];
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("deletedebut");
  await Post.deleteMany({ userId: body.userId });
  await Goal.deleteMany({ userId: body.userId });
  if (body.deleteAll) {
    await User.deleteOne({ id: body.userId });
  } else {
    await User.updateOne(
      { id: body.userId },
      { $set: { challenges: challenges, xp: 0, followList: [] } }
    );
  }
  console.log("deletefin");

  return "deleted";
});
