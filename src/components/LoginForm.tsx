"use client";
import Form from "./Form";

type LoginFormProps = {
  onSubmit: (FormData: {username: string, email: string, password: string}) => void;
};

export default function LoginForm({onSubmit}: LoginFormProps) {
  const fields = [

    {
      name: "username",
      label: "User Name",
      type: "username",
      placeholder: "Enter your name",
      required: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];
  const handleSubmit = (formData: { [key: string]: string }) => {
    // Ensure the object is type-safe
    onSubmit({
      username: formData.username || "",
      email: formData.email || "",
      password: formData.password || "",
    });
  }

  return <Form fields={fields} onSubmit={handleSubmit} buttonText="Login" />
}