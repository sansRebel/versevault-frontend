"use client";

import { useState } from "react";
import { useAuthActions } from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { loginUser, registerUser } = useAuthActions();

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      await loginUser(formData.email, formData.password);
      console.log("Login successful!");
      // Redirect to another page or display a success message
    } catch (error) {
      console.error("Login failed:", error);
      // Show error feedback to the user
    }
  };

  const handleRegister = async (formData: {username: string, email: string; password: string }) => {
    try {
      await registerUser(formData.username, formData.email, formData.password);
      console.log("Registration successful!");
      setActiveTab("login"); // Switch to login tab after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error feedback to the user
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-base-200 p-8 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="tabs mb-8 flex justify-center">
          <button
            className={`tab tab-lifted ${activeTab === "login" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab tab-lifted ${activeTab === "signup" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
      </div>
    </div>
  );
}
