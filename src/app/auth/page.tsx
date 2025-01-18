"use client";

import { useState } from "react";
import { useAuthActions } from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { loginUser, registerUser } = useAuthActions();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const router = useRouter();

  const handleLogin = async (formData: { username: string; email: string; password: string }) => {
    try {
      await loginUser(formData.username, formData.email, formData.password);
      setToastType("success");
      setToastMessage("Login successful!");
      setTimeout(() => {
        router.push("/profile"); // Redirect to profile page
      }, 2000);
    } catch {
      // Suppress console error and show Toast
      console.error = () =>{}
      setToastType("error");
      setToastMessage("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (formData: { username: string; email: string; password: string }) => {
    try {
      await registerUser(formData.username, formData.email, formData.password);
      setToastType("success");
      setToastMessage("Registration successful! Please log in.");
      setActiveTab("login"); // Switch to login tab after successful registration
    } catch {
      // Suppress console error and show Toast
      setToastType("error");
      setToastMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-base-200 p-8 rounded-lg shadow-lg relative">
        {/* Toast Notification */}
        {toastMessage && <Toast message={toastMessage} type={toastType} />}

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
