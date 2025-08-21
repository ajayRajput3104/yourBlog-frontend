import env from "../utils/env";
import axios from "axios";
import api from "../utils/axiosInstance";

const API_URL = env.apiUrl;

export class FileService {
  // --- Upload a file ---
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await api.post(`${API_URL}/file/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data; // should return { fileId, url }
    } catch (error) {
      throw new Error(error.response?.data?.message || "File upload failed");
    }
  }

  // --- Delete a file ---
  async deleteFile(fileId) {
    try {
      const res = await api.delete(
        `${API_URL}/file/delete/${encodeURIComponent(fileId)}`
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "File delete failed");
    }
  }

  // --- Get file view (direct URL) ---
  async getFileView(fileId) {
    try {
      const res = await api.get(`${API_URL}/file/view/${fileId}`);
      return res.data.url; // backend returns public URL
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get file URL"
      );
    }
  }
}

const fileService = new FileService();
export default fileService;
