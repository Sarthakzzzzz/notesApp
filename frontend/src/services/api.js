import axios from "axios";
import { isTokenExpired } from "../utils/jwtUtils";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to check token expiration
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.clear();
      window.location.reload();
      return Promise.reject(new Error("Token expired"));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData)
};

// Notes API
export const notesAPI = {
  getAll: (userId) => api.get(`/api/notes${userId ? `?userId=${userId}` : ''}`),
  getById: (id) => api.get(`/api/notes/${id}`),
  create: (note) => api.post("/api/notes", note),
  update: (id, note) => api.put(`/api/notes/${id}`, note),
  delete: (id) => api.delete(`/api/notes/${id}`)
};

// User Profile API
export const userAPI = {
  getProfile: () => api.get("/me"),
  updateProfile: (userData) => api.put("/me", userData),
  deleteProfile: () => api.delete("/me"),
  getAllUsers: () => api.get("/me/all")
};

export default api;
export const { login, register } = authAPI;
