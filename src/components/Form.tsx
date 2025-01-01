"use client";
import { useState } from "react";

type FormField = {
  name: string;
  label: string;
  type: string; // e.g., "text", "email", "password", etc.
  placeholder?: string;
  value?: string;
  required?: boolean;
};

type FormProps = {
  fields: FormField[];
  onSubmit: (formData: { [key: string]: string }) => void;
  buttonText: string;
};

export default function Form({ fields, onSubmit, buttonText }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce<{ [key: string]: string }>((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {}) // Add `{}` as the initial value and type it explicitly
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="input input-bordered flex items-center gap-2">
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="grow"
          />
        </label>
      ))}
      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}
