import axios from "axios";
import { getToken } from "@/utils/token";

const apiClient = axios.create({
    baseURL: process.env.Next_PUBLIC_API_URL,
})

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


export default apiClient;
