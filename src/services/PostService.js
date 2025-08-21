import env from "../utils/env";
import axios from "axios";
import api from "../utils/axiosInstance";

const API_URL = env.apiUrl;

class PostService {
  //-- create new post--
  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      const res = await api.post(`${API_URL}/posts`, {
        title,
        content,
        featuredImage,
        status,
        userId, // backend expects "userId" exactly
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  }
  //--- update a post
  async updatePost(id, { title, content, featuredImage, status, userId }) {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData.accessToken;
      const res = await api.put(
        `${API_URL}/posts/${id}`,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
  }
  //---Delete a post--
  async deletePost(id) {
    try {
      const res = await api.delete(`${API_URL}/posts/${id}`);
      return res.status === 200;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
  }
  //---get post by slug---
  async getPostBySlug(slug) {
    try {
      const res = await api.get(`${API_URL}/posts/by-slug/${slug}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch post");
    }
  }
  //---get post by Id
  // async getPostById(postId) {
  //   try {
  //     const res = await axios.get(`${POSTS_API_URL}/posts/${postId}`);
  //     return res.data;
  //   } catch (error) {
  //     throw new Error(error.response?.data?.message || "Failed to fetch post");
  //   }
  // }

  //---get all active posts
  async getPostAll() {
    try {
      const res = await api.get(`${API_URL}/posts`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts");
    }
  }
}

const postService = new PostService();
export default postService;
