import { useAuth } from "@/context/AuthContext";
import { login, register } from "@/services/authServices";
import {setToken, removeToken} from "@/utils/token";


export const useAuthActions = () => {
    const {login: setUser, logout: clearUser} = useAuth();

    const loginUser = async (email: string, password: string) => {
        const {token, user} = await login(email, password);
        setToken(token);
        setUser(user);
    };

    const registerUser = async (username:string, email: string, password: string) => {
        const {token, user} = await register(username, email, password);
        setToken(token);
        setUser(user);
    };

    const logoutUser = () =>{
        removeToken();
        clearUser();
    };

    return {loginUser, registerUser, logoutUser};
}