"use client";
import Form from "./Form";

type RegisterFormProps = {
  onSubmit: (FormData: {username:string, email: string, password: string}) => void;
};

export default function RegisterForm({onSubmit}: RegisterFormProps) {
  const fields = [
    { name: "username", label: "Name", type: "text", placeholder: "Enter your name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password", required: true },
  ];

  const handleRegister = (formData: { [key: string]: string }) => {
    onSubmit({
      username: formData.username || "",
      email: formData.email || "", 
      password: formData.password || "", 

    })
    // Handle registration logic here
  };

  return <Form fields={fields} onSubmit={handleRegister} buttonText="Register" />;
}

