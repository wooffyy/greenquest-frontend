import api from "./api";

export async function getLeaderboard() {
  try {
    const res = await api.get("/leaderboard");

    const list = res.data.data ?? res.data;

    const sorted = list
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);

    return sorted;
  } catch (err) {
    console.error("Leaderboard fetch failed:", err);
    return [];
  }
}
