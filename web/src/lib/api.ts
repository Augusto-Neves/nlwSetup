import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export async function getSummary() {
  const summary = await api.get("/summary");

  return summary.data;
}

export async function getHabitDay(date: Date) {
  const habitDay = await api.get("/day", {
    params: {
      date: date.toISOString(),
    },
  });

  return habitDay.data;
}

export async function toggleHabit(id: string) {
  await api.patch(`/habits/${id}/toggle`);
}
