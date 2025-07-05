import api from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export async function reportPost({ post_id, report_id }) {
  const token = cookies.get("Authorization");
  console.log({ post_id, report_id });
  
  const res = await api.post(
    "/posts/report",
    { post_id, report_id },
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
}
