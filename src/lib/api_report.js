import api from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export async function reportPost({ postId, reason }) {
  const token = cookies.get("Authorization");  

  const res = await api.post(`/posts/${postId}/report`, {
    reason,
  }, {
    headers: {
      "Authorization": `Bearer ${token}` 
    }
  });

  return res.data;
}
