import api from "./api";

export async function login({ username, password }) {
    const res = await api.post("/users/login", { username, password });
    return res.data.data;
}

export async function register({ fullname, username, email, password }) {
  const res = await api.post("/register", {
    fullname,
    username,
    email,
    password,
    role: "User",   // set default role
  });
  return res.data.data;
}


export async function getUserById ({ id, token }){
    const res = await api.get(`users/${id}`, { headers: 
        { Authorization: `Bearer ${token}` } 
    });
    return res.data;
}