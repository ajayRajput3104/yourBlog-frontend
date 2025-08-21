import axios from "axios";
import { Store } from "../store/store.jsx";
import authService from "../services/AuthService.js";
import { login, logout } from "../store/authSlice.jsx";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData.accessToken; // get token from locaalstorage authData
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await authService.refreshAccessToken();
        if (!newToken) throw new Error("Failed to refresh token");

        const authData = JSON.parse(localStorage.getItem("auth"));
        const updatedUser = { ...authData, accessToken: newToken };
        Store.dispatch(login(authData));

        // Retry the request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        Store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
