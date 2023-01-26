export function generateProgressPercentage(
  habitsAmount: number,
  habitsCompleted: number
) {
  return Math.round((habitsCompleted / habitsAmount) * 100);
}
