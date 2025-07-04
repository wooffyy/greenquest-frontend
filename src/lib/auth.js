import api from "./api";
import axios from "axios";
import Cookies from "universal-cookie";

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const cookies = new Cookies();

// Ambil user dari localStorage
export function getUserProfile() {
  const userProfile = localStorage.getItem("userProfile");
  return userProfile ? JSON.parse(userProfile) : null;
}

// Simpan user & token setelah login
export async function login(payload) {
  try {
    await axios.get(`http://127.0.0.1:8000/sanctum/csrf-cookie`, {
      withCredentials: true
    });

    const res = await api.post(`/users/login`, payload, {
      withCredentials: true,
    });

    // Simpan token di cookie
    const token = res.data.data.token;
    cookies.set("Authorization", token, {
      path: "/",
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Ambil profil user
    const profileRes = await api.get(`users/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const userData = profileRes.data.user;
    console.log(userData);
    
    // Simpan profil ke localStorage
    localStorage.setItem("userProfile", JSON.stringify(userData));

    return { success: true, user: userData };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
}

// Reset password
export async function resetPassword(payload) {
  try {
    const userProfile = getUserProfile();

    if (!userProfile || !userProfile.id) {
      return {
        success: false,
        message: "User profile not found or invalid.",
      };
    }

    const userId = userProfile.id;

    const res = await api.post(`users/${userId}`, payload, {
      withCredentials: true,
    });

    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.error || "Reset failed",
    };
  }
}

// Logout user
export async function logout() {
  try {
    const token = cookies.get("Authorization");

    await api.post(
      `logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    cookies.remove("Authorization", { path: "/" });
    localStorage.removeItem("userProfile");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
}

export async function register({ fullname, username, email, password }) {
  const res = await api.post("/users/register", {
    fullname,
    username,
    email,
    password,
    role: "User",   // set default role
  });
  return res.data.data;
}


export async function getUserById (){
    const token = cookies.get("Authorization")
    const res = await api.get(`users/`, 
      { 
        headers: 
          { 
            Authorization: `Bearer ${token}` 
          } 
      });
      return res.data;
}