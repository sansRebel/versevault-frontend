"use client";

import Form from "@/components/Form";
import { createBlog } from "@/services/blogServices";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Define form fields
  const fields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter blog title", required: true },
    { name: "content", label: "Content", type: "textarea", placeholder: "Write your blog content", required: true },
    { name: "image", label: "Upload Image", type: "file", required: false },
  ];

  // Handle form submission
  const handleCreateBlog = async (formData: { [key: string]: string | File | null }) => {
    try {
      setLoading(true);

      // Extract data from formData
      const { title, content, image } = formData;

      // Call the createBlog service
      await createBlog({
        title: title as string,
        content: content as string,
        image: image as File | undefined, // Handle null case
      });

      console.log("Blog created successfully");

      // Redirect to the profile page
      router.push("/profile");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-base-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Create New Blog</h1>
        <Form fields={fields} onSubmit={handleCreateBlog} buttonText={loading ? "Creating..." : "Create Blog"} />
      </div>
    </div>
  );
}
