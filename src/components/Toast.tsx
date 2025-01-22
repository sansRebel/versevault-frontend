"use client";

import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  duration?: number; // Duration in milliseconds
};

export default function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-md transition-transform transform ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : type === "error"
          ? "bg-red-100 text-red-800"
          : "bg-blue-100 text-blue-800"
      } animate-slideIn`}
    >
      <span>{message}</span>
    </div>
  );
}
