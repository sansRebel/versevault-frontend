"use client";

import Form from "@/components/Form";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import { createBlog } from "@/services/blogServices";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string | File | null }>({
    title: "",
    content: "",
    image: null,
  });

  // Define form fields
  const fields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter blog title", required: true },
    { name: "content", label: "Content", type: "textarea", placeholder: "Write your blog content", required: true },
    { name: "image", label: "Upload Image", type: "file", required: false },
  ];

  // Handle form submission
  const handleCreateBlog = async () => {
    try {
      setLoading(true);
      setToast(null);

      const { title, content, image } = formData;

      // Validate required fields
      if (!title || !content) {
        setToast({ message: "Title and content are required!", type: "error" });
        return;
      }

      // Validate image if provided
      if (image) {
        const file = image as File;
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          setToast({ message: "Only JPEG and PNG files are allowed.", type: "error" });
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setToast({ message: "Image size must be less than 2 MB.", type: "error" });
          return;
        }
      }

      // Call the createBlog service
      await createBlog({
        title: title as string,
        content: content as string,
        image: image as File | undefined,
      });

      setToast({ message: "Blog created successfully!", type: "success" });

      // Redirect to the profile page after a short delay
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error creating blog:", error);
      setToast({ message: "Failed to create blog. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle modal confirmation
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    handleCreateBlog();
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Modal for Confirmation */}
      <Modal
        title="Confirm Blog Creation"
        message="Are you sure you want to create this blog?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-base-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Create New Blog</h1>

        {/* Blog Form */}
        <Form
          fields={fields}
          onSubmit={(data) => {
            setFormData(data);
            setIsModalOpen(true); // Show modal before submitting
          }}
          buttonText={loading ? "Creating..." : "Create Blog"}
        />
      </div>
    </div>
  );
}
