import apiClient from "./axiosClient";
import { AuthResponse } from "@/types";

// login service
export const login = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    console.log("Login Payload:", { username, email, password }); // Debug the payload
    const response = await apiClient.post<AuthResponse>("api/auth/signin", {username, email, password});
    console.log("Login Response:", response.data); // Debug response

    return response.data
}


// register service
export const register = async (username: string, email: string, password: string): Promise<AuthResponse> =>{
    console.log("Register Payload:", {username, email, password});
    const response = await apiClient.post<AuthResponse>("api/auth/signup", {username, email, password});
    console.log("Register Response:", response.data);
    return response.data;
}