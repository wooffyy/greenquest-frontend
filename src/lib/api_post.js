import api from "./api";

export async function uploadPost(imageFile, caption) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function getAllPosts() {
  const res = await api.get("/posts");
  return res.data;
}

export async function likePost(postId) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}

export async function dislikePost(postId) {
  const res = await api.post(`/posts/${postId}/dislike`);
  return res.data;
}
