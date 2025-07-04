import api from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export async function uploadPost(imageFile, caption) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const token = cookies.get("Authorization"); // Ambil token dari cookie

  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`, 
    },
  });

  return res.data;
}


export async function getAllPosts() {
  const token = cookies.get("Authorization")
  const res = await api.get("/posts",{
    headers:
    {
      "Authorization" : `Bearer ${token}`
    }
  });
  return res.data;
}

export async function likePost(postId) {
  const token = cookies.get("Authorization")
  const res = await api.put(`/posts/${postId}/like`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function dislikePost(postId) {
  const token = cookies.get("Authorization")
  const res = await api.put(`/posts/${postId}/dislike`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.data;
}

// Like
export async function incLike(postId) {
  const token = cookies.get("Authorization")
  return await api.put(`/posts/${postId}/incLike`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
}

export async function decLike(postId) {
  const token = cookies.get("Authorization")
  
  return await api.put(`/posts/${postId}/decLike`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
}

// Dislike
export async function incDislike(postId) {
  const token = cookies.get("Authorization")
  
  return await api.put(`/posts/${postId}/incDislike`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
}

export async function decDislike(postId) {
  const token = cookies.get("Authorization")
  
  return await api.put(`/posts/${postId}/decDislike`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
}