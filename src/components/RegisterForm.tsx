"use client";
import Form from "./Form";

export default function RegisterForm() {
  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password", required: true },
  ];

  const handleRegister = (formData: { [key: string]: string }) => {
    console.log("Register Form Data:", formData);
    // Handle registration logic here
  };

  return <Form fields={fields} onSubmit={handleRegister} buttonText="Register" />;
}
