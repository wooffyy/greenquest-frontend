import api from "./api";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Ambil user dari localStorage
export function getUserProfile() {
  if (typeof window === "undefined") return null;
  const userProfile = localStorage.getItem("userProfile");
  return userProfile ? JSON.parse(userProfile) : null;
}

// Simpan user & token setelah login
export async function login(payload) {
  try {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    const res = await api.post("/users/login", payload, {
      withCredentials: true,
    });

    const token = res.data.data.token;

    cookies.set("Authorization", token, {
      path: "/",
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const profileRes = await api.get("users/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const userData = profileRes.data.user;

    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(userData));
    }

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
      "logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    cookies.remove("Authorization", { path: "/" });

    if (typeof window !== "undefined") {
      localStorage.removeItem("userProfile");
    }

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
}

// Register user
export async function register({ fullname, username, email, password }) {
  try {
    const res = await api.post("/register", {
      fullname,
      username,
      email,
      password,
      role: "User", // default role
    });

    const token = res.data.data.token;

    cookies.set("Authorization", token, {
      path: "/",
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const profileRes = await api.get("users/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const userData = profileRes.data.user;

    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(userData));
    }

    return { success: true, user: userData };
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || "Registration failed",
    };
  }
}

// Ambil profil user yang sedang login
export async function getUserById() {
  try {
    const token = cookies.get("Authorization");

    const res = await api.get("users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}
