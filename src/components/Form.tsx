"use client";

import { useState } from "react";
import Button from "@/components/Button";

type FormField = {
  name: string;
  label: string;
  type: string | "file";
  placeholder?: string;
  value?: string;
  required?: boolean;
};

type FormProps<T extends Record<string, string | File | null>> = {
  fields: FormField[];
  onSubmit: (formData: T) => void;
  buttonText: string;
};

export default function Form<T extends Record<string, string | File | null>>({
  fields,
  onSubmit,
  buttonText,
}: FormProps<T>) {
  const [formData, setFormData] = useState<T>(
    fields.reduce((acc, field) => {
      acc[field.name as keyof T] =
        field.type === "file" ? (null as T[keyof T]) : ((field.value || "") as T[keyof T]);
      return acc;
    }, {} as T)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? (files?.[0] || null) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-2">
          <span className="font-medium text-gray-700">{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={field.type !== "file" ? (formData[field.name as keyof T] as string) : undefined}
            onChange={handleChange}
            required={field.required}
            className="input input-bordered px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-primary transition-all"
          />
        </label>
      ))}
      <Button label={buttonText} type="submit" styleType="primary" />
    </form>
  );
}
