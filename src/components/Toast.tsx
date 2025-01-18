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
    return () => clearTimeout(timer); // Cleanup timer
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div
        className={`alert ${
          type === "success" ? "alert-success" : type === "error" ? "alert-error" : "alert-info"
        }`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
