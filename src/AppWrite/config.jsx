import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage ,Query} from "appwrite";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service::createPost::error:", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service::updatePost::error:", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service::deletePost::error:", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service::getPost::error:", error);
      return false;
    }
  }
  async getPostAll(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [queries]
      );
    } catch (error) {
      console.log("Appwrite service::getPostAll::error:", error);
      return false;
    }
  }
  //file upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service::uploadFile::error:", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service::deleteFile::error:", error);
      return false;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.log("Appwrite service::getFilePreview::error:", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
