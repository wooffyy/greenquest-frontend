import api from "./api";

// 🔹 Update user profile
export async function updateUser({ id, token, data }) {
  const res = await api.post(`/users/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json", // just in case
    },
  });

  return res.data; 
}

// 🔹 Logout user
export async function logoutUser(token) {
  const res = await api.post("/users/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; 
}
