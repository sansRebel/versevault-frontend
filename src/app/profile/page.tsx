"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { fetchUserBlogs, editBlog, deleteBlog } from "@/services/blogServices";
import { Blog } from "@/types";
import { getUserDetails, removeUserDetails } from "@/utils/user";
import { removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Toast from "@/components/Toast"; // Toast component
import Modal from "@/components/Modal"; // Modal component
import { useAuthActions } from "@/hooks/useAuth";

export default function ProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm?: () => void } | null>(
    null
  );
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null); // Toast state
  const router = useRouter();
  const {logoutUser} =useAuthActions();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  const openModal = (title: string, message: string, onConfirm?: () => void) => {
    setModal({ isOpen: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    const initializeUser = async () => {
      const userDetails = getUserDetails();
      setUser(userDetails);

      if (userDetails) {
        try {
          const userBlogs = await fetchUserBlogs();
          setBlogs(userBlogs);
        } catch  {
          showToast("Failed to fetch blogs.", "error");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditing(true);
  };

  const handleUpdateBlog = async (formData: { [key: string]: string }) => {
    if (!editingBlog) return;

    try {
      const updatedBlog = await editBlog(editingBlog._id, {
        title: formData.title,
        content: formData.content,
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );

      showToast("Blog updated successfully.", "success");
      setIsEditing(false);
    } catch  {
      showToast("Failed to update blog.", "error");
    }
  };

  const handleDeleteBlog = (id: string) => {
    openModal("Delete Blog", "Are you sure you want to delete this blog?", async () => {
      try {
        await deleteBlog(id);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        showToast("Blog deleted successfully.", "success");
      } catch  {
        showToast("Failed to delete blog.", "error");
      } finally {
        closeModal();
      }
    });
  };

  const handleDeleteAccount = () => {
    openModal("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", async () => {
      try {
        // Implement account deletion logic
        removeToken();
        removeUserDetails();
        router.push("/auth");
        showToast("Account deleted successfully.", "success");
      } catch  {
        showToast("Failed to delete account.", "error");
      } finally {
        closeModal();
      }
    });
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">User not logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-8">
        {/* Toast Component */}
        {toast && <Toast message={toast.message} type={toast.type} />}

        {/* Modal Component */}
        {modal && (
          <Modal
            title={modal.title}
            message={modal.message}
            isOpen={modal.isOpen}
            onClose={closeModal}
            onConfirm={modal.onConfirm}
          />
        )}

        {/* User Information */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
          <p className="text-lg mb-4">{user.email}</p>
          <div className="flex justify-center gap-4">
            <Button
              label="Edit Account"
              styleType="primary"
              onClick={() => console.log("Edit account clicked")}
            />
            <Button
              label="Delete Account"
              styleType="danger"
              onClick={handleDeleteAccount}
            />
            <Button
              label="Sign Out"
              styleType="secondary"
              onClick={() => {
                logoutUser();
                router.push("/auth"); // Redirect to login page
              }}
            />
          </div>
        </div>


        {/* Edit Blog Form */}
        {isEditing && editingBlog && (
          <div className="max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Blog</h2>
            <Form
              fields={[
                { name: "title", label: "Title", type: "text", value: editingBlog.title },
                { name: "content", label: "Content", type: "textarea", value: editingBlog.content },
              ]}
              onSubmit={handleUpdateBlog}
              buttonText="Save Changes"
            />
          </div>
        )}



        {/* User Blogs */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">My Blogs</h2>
          <div className="text-center mb-8">
            <Button
              label="Post a Blog"
              styleType="primary"
              onClick={() => (window.location.href = "/blogs/new")}
            />
          </div>
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : blogs.length > 0 ? (
            <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div key={blog._id}>
                  <Card
                    imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
                    title={blog.title}
                    description={blog.content.substring(0, 100) + "..."}
                    onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button label="Edit" styleType="primary" onClick={() => handleEditBlog(blog)} />
                    <Button label="Delete" styleType="danger" onClick={() => handleDeleteBlog(blog._id)} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You havent posted any blogs yet.</p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}