import { setToken, removeToken } from "@/utils/token";
import { setUserDetails, removeUserDetails } from "@/utils/user";
import { login, register } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

export const useAuthActions = () => {
  const { login: setUser, logout: clearUser } = useAuth();

  const loginUser = async (name: string, email: string, password: string) => {
    try {
      const { token, username, email: userEmail } = await login(name, email, password);

      // Store token, username, and email in local storage
      setToken(token);
      setUserDetails(username, userEmail);

      // Optionally update state for logged-in user
      setUser({
          username, email: userEmail,
          id: "",
          password: ""
      });
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Allow error handling in the component
    }
  };

  const registerUser = async (username: string, email: string, password: string) => {
    try {
      const { token, username: newUsername, email: newEmail } = await register(username, email, password);

      // Store token, username, and email in local storage
      setToken(token);
      setUserDetails(newUsername, newEmail);

      // Optionally update state for registered user
      setUser({
          username: newUsername, email: newEmail,
          id: "",
          password: ""
      });
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Allow error handling in the component
    }
  };

  const logoutUser = () => {
    // Clear token and user details from local storage
    removeToken();
    removeUserDetails();

    // Optionally update state for logged-out user
    clearUser();
  };

  return { loginUser, registerUser, logoutUser };
};
