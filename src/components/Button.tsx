"use client";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  styleType?: "primary" | "secondary" | "danger"; // DaisyUI style classes
  disabled?: boolean;
};

export default function Button({
  label,
  onClick,
  type = "button",
  styleType = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyle = "btn";
  const styleMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-error",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${styleMap[styleType]} ${disabled ? "btn-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
