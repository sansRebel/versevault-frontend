"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function AuthPage(){
    const [activeTab, setActiveTab]= useState<"login" | "signup">("login");

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
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    );
}