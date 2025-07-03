// lib/report.js
import api from "./api";

export async function reportPost({ username, postId, type }) {
  const res = await api.post("/reports", {
    username,
    postId,
    type,
  });

  return res.data;
}
