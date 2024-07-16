export function calculateLevel(xp) {
  const baseXP = 100; // XP nécessaire pour passer du niveau 1 au niveau 2
  const level = Math.floor(Math.log(xp / baseXP) / Math.log(1.5)) + 1;
  return level > 0 ? level : 1;
}

export function xpForNextLevel(currentXP) {
  const baseXP = 100; // XP nécessaire pour passer du niveau 1 au niveau 2
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = baseXP * Math.pow(1.5, currentLevel);
  return Math.ceil(nextLevelXP - currentXP);
}

export async function addXp(currentXP, XPtoAdd) {
  console.log(currentXP, XPtoAdd);
  if (!currentXP || !currentXP) return;

  await $fetch(`/api/user/addXp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ xp: XPtoAdd }),
  });

  const updatedXP = currentXP + XPtoAdd;

  console.log(updatedXP);
  if (updatedXP >= xpForNextLevel(currentXP) + currentXP) {
    return calculateLevel(updatedXP);
  } else return false;
}
