import { setToken, removeToken } from "@/utils/token";
import { setUserDetails, removeUserDetails } from "@/utils/user";
import { login, register } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

export const useAuthActions = () => {
  const { login: setUser, logout: clearUser } = useAuth();

  const loginUser = async (username: string, email: string, password: string) => {
    try {
      const { token, username: fetchedUsername, email: fetchedEmail } = await login(username, email, password);

      setToken(token);
      setUserDetails(fetchedUsername, fetchedEmail);

      setUser({
        username: fetchedUsername,
        email: fetchedEmail,
        id: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error); // Optionally log this once here
      throw new Error("Login failed");
    }
  };

  const registerUser = async (username: string, email: string, password: string) => {
    try {
      const { token, username: fetchedUsername, email: fetchedEmail } = await register(username, email, password);

      setToken(token);
      setUserDetails(fetchedUsername, fetchedEmail);

      setUser({
        username: fetchedUsername,
        email: fetchedEmail,
        id: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error); // Optionally log this once here
      throw new Error("Registration failed");
    }
  };

  const logoutUser = () => {
    removeToken();
    removeUserDetails();
    clearUser();
  };

  return { loginUser, registerUser, logoutUser };
};
