import env from "../utils/env";
import axios from "axios";

const API_URL = env.apiUrl;

const JSON_HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export class AuthService {
  //--signup--
  async createAccount({ email, password, username }) {
    try {
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        {
          username,
          email,
          password,
        },
        JSON_HEADERS
      );
      if (
        res.data.success &&
        res.data.user &&
        res.data.accessToken &&
        res.data.refreshToken
      ) {
        const authData = {
          user: res.data.user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        return authData;
      }
      return null;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (Array.isArray(error.response?.data?.errors) &&
          error.response.data.errors.map((e) => e.msg).join(", ")) ||
        "Registration failed";
      throw new Error(msg);
    }
  }

  //--login--
  async login({ email, password }) {
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        JSON_HEADERS
      );
      if (
        res.data.success &&
        res.data.user &&
        res.data.accessToken &&
        res.data.refreshToken
      ) {
        const authData = {
          user: res.data.user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        return authData;
      }
      return null;
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (Array.isArray(error.response?.data?.errors) &&
          error.response.data.errors.map((e) => e.msg).join(", ")) ||
        "Login failed";
      throw new Error(msg);
    }
  }
  //--get current logged in user
  async getCurrentUser() {
    try {
      const userData = localStorage.getItem("auth");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.log("AuthService::getCurrentUser::error ", error);
      return null;
    }
  }
  //--logout user--
  async logout() {
    try {
      const userData = this.getCurrentUser();
      if (userData && userData.refreshToken) {
        // Send refresh token to backend for invalidation
        await axios.delete(`${API_URL}/auth/logout`, {
          data: { token: userData.refreshToken },
        });
      }
      localStorage.removeItem("auth");
    } catch (error) {
      console.log("AuthService::logout::error ", error);
    }
  }
  //--refresh access token manually (call on page reload)--
  async refreshAccessToken() {
    const userData = this.getCurrentUser();
    if (!userData?.refreshToken) return null;

    try {
      const res = await axios.post(`${API_URL}/auth/token`, {
        token: userData.refreshToken,
      });
      if (res.data.success && res.data.accessToken) {
        userData.accessToken = res.data.accessToken;
        localStorage.setItem("auth", JSON.stringify(userData));
        return res.data.accessToken;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      this.logout();
      alert("Session expired. Please log in again.");
    }
  }
}

const authService = new AuthService();

export default authService;
