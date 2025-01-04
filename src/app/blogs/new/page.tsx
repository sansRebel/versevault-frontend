"use client";
import Form from "@/components/Form";

export default function CreateBlogPage() {
  const fields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter blog title", required: true },
    { name: "content", label: "Content", type: "textarea", placeholder: "Write your blog content", required: true },
    { name: "image", label: "Upload Image", type: "file", required: false },
  ];

  const handleCreateBlog = (formData: { [key: string]: string | File }) => {
    console.log("Blog Form Data:", formData);
    // Placeholder for blog creation logic
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-base-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Create New Blog</h1>
        <Form fields={fields} onSubmit={handleCreateBlog} buttonText="Create Blog" />
      </div>
    </div>
  );
}
