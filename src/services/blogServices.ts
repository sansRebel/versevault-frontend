import apiClient from "./axiosClient";
import { Blog } from "@/types";

// export const fetchBlogs = async(): Promise<Blog[]> =>{
//     const response = await apiClient.get<Blog[]>("");
//     return response.data;
// }

interface CreateBlogPayload{
  title: string;
  content: string;
  image?: File;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
    try {
      const response = await apiClient.get<Blog[]>("api/blog");
      console.log("API Response:", response.data); // Log response to confirm format
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; // Return an empty array if the API call fails
    }
  };
  

export const searchBlogs = async (query: string): Promise<Blog[]> => {
  try {
    const response = await apiClient.get<Blog[]>("api/blog/search", {
      params: { query }, // Pass the search term as a query parameter
    });
    console.log("Search Results:", response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error("Error searching blogs:", error);
    return [];
  }
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
  try {
    const response = await apiClient.get<Blog>(`api/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    throw error; // Propagate error to handle in the component
  }
};

export const fetchUserBlogs = async (): Promise<Blog[]> =>{
  try{
    const response = await apiClient.get<Blog[]>("/api/blog/user");
    return response.data;
  } catch (error){
    console.error("Error fetching user's blogs:", error);
    return [];
  }
}


export const createBlog = async (payload: CreateBlogPayload): Promise<Blog> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  try {
    const response = await apiClient.post<Blog>("/api/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const likeBlog = async (id: string): Promise<number> => {
  try {
    const response = await apiClient.post(`/api/blog/${id}/like`);
    return response.data.likes; // Return updated likes count
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
};

export const commentOnBlog = async (id: string, comment: string): Promise<void> => {
  try {
    await apiClient.post(`/api/blog/${id}/comment`, { comment });
  } catch (error) {
    console.error("Error commenting on blog:", error);
    throw error;
  }
};

export const editBlog = async (id: string, data: { title?: string; content?: string }): Promise<Blog> => {
  try {
    const response = await apiClient.put<Blog>(`/api/blog/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/blog/${id}`);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
