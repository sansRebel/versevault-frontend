"use client";

import { ReactNode } from "react";

type ButtonProps = {
  label: string | React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  styleType?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  icon?: ReactNode; // Optional icon
};

export default function Button({
  label,
  onClick,
  type = "button",
  styleType = "primary",
  disabled = false,
  icon,
}: ButtonProps) {
  // Base and variant styles
  const baseStyle =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const styleMap = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:outline-none",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${styleMap[styleType]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
