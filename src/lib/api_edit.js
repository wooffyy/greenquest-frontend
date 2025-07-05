import api from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies()
// 🔹 Update user profile
export async function updateUser({ id, data }) {
  const token = cookies.get('Authorization')
  const res = await api.post(`/users/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json", // just in case
    },
  });

  return res.data; 
}

// 🔹 Logout user
export async function logoutUser() {
  const token = cookies.get('Authorization')
  const res = await api.post("/users/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("userProfile"); 
  cookies.remove('Authorization')
  return res.data; 
}
