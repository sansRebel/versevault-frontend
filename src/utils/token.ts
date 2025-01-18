import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) =>{
    localStorage.setItem("authToken", token);
};

export const getToken = ()=>{
    return localStorage.getItem("authToken");
};

export const removeToken = ()=>{
    localStorage.removeItem("authToken");
};

export const getUserFromToken = (): { _id: string; name: string; email: string } | null => {
    const token = getToken();
    if (!token) return null;

    try {
    const decoded = jwtDecode<{ _id: string; name: string; email: string }>(token);
        return decoded;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};