"use client";
import { useState } from "react";

type FormField = {
  name: string;
  label: string;
  type: string; // e.g., "text", "email", "password", "file", etc.
  placeholder?: string;
  value?: string;
  required?: boolean;
};

type FormProps = {
  fields: FormField[];
  onSubmit: (formData: { [key: string]: string | File | null }) => void; // Allow null for files
  buttonText: string;
};


export default function Form({ fields, onSubmit, buttonText }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string | File | null }>(
    fields.reduce<{ [key: string]: string | File | null }>((acc, field) => {
      acc[field.name] = field.type === "file" ? null : field.value || "";
      return acc;
    }, {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-2">
          <span className="font-medium">{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            onChange={handleChange}
            required={field.required}
            className="input input-bordered"
          />
        </label>
      ))}
      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

