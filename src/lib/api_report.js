// lib/report.js
import api from "./api";

export async function reportPost({ username, postId, type }) {
  const token = cookies.get("Authorization");  
  const res = await api.post("/reports", {
    username,
    postId,
    type,
  }, {
    headers: {
      "Authorization": `Bearer ${token}` 
    }
  });

  return res.data;
}
