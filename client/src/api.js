import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getImages = () => axios.get(`${API}/images`).then((r) => r.data);
export const deleteImage = (id) => axios.delete(`${API}/images/${id}`).then((r) => r.data);

// Send the actual file to our own server as multipart/form-data.
// The server saves it into /uploads, builds the URL, and stores only that URL in MongoDB.
export const uploadImage = (file) => {
  const form = new FormData();
  form.append("image", file); // the field name must match upload.single("image")
  return axios.post(`${API}/images`, form).then((r) => r.data);
};
