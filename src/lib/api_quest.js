import api from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Ambil daily quests
export async function getDailyQuests() {
  const token = cookies.get("Authorization");
  const res = await api.get("/quests", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.data;
}

// Complete quest
export async function completeQuest(questId) {
  const token = cookies.get("Authorization");

  try {
    const response = await api.post(`/quests/complete/${questId}`,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to complete quest: ' + error.message);
  }
}

