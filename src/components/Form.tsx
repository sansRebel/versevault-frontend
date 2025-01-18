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

type FormProps<T extends Record<string, string>> = {
  fields: FormField[];
  onSubmit: (formData: T) => void;
  buttonText: string;
};

export default function Form<T extends Record<string, string>>({
  fields,
  onSubmit,
  buttonText,
}: FormProps<T>) {
  const [formData, setFormData] = useState<T>(
    fields.reduce((acc, field) => {
      // Assert that the field value or fallback is a string assignable to T[keyof T]
      acc[field.name as keyof T] = (field.value || "") as T[keyof T];
      return acc;
    }, {} as T)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value as T[keyof T],
    }));
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
            value={formData[field.name as keyof T] as string}
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
