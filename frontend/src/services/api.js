import axios from "axios";

const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

const register = (userData) => {
  return api.post("/auth/register", userData);
};
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export default api;
export { login, register };
