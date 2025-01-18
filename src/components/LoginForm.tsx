"use client";
import Form from "@/components/Form";

type LoginFormData = {
  username: string;
  email: string;
  password: string;
};

export default function LoginForm({ onSubmit }: { onSubmit: (formData: LoginFormData) => void }) {
  const fields = [
    { name: "usrname", label: "User Name", type: "username", placeholder: "Enter your name", required: false },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
  ];

  return <Form<LoginFormData> fields={fields} onSubmit={onSubmit} buttonText="Login" />;
}

