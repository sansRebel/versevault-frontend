import apiClient from "./axiosClient";
import { Blog } from "@/types";

// export const fetchBlogs = async(): Promise<Blog[]> =>{
//     const response = await apiClient.get<Blog[]>("");
//     return response.data;
// }

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