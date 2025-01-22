"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { fetchUserBlogs, deleteBlog, editBlog } from "@/services/blogServices";
import { updateUser } from "@/services/userServices";
import { Blog } from "@/types";
import { getUserDetails, removeUserDetails } from "@/utils/user";
import { removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import { useAuthActions } from "@/hooks/useAuth";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineLogout, AiOutlineDelete } from "react-icons/ai";

export default function ProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false); // State for account editing
  const [isEditingBlog, setIsEditingBlog] = useState<Blog | null>(null); // State for blog editing
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm?: () => void } | null>(
    null
  );
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const { logoutUser } = useAuthActions();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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
        } catch {
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

  const handleUpdateAccount = async (formData: { username?: string; email?: string; password?: string }) => {
    try {
      const updatedUser = await updateUser(formData);
      if (updatedUser) {
        setUser(updatedUser);
        showToast("Account updated successfully.", "success");
      } else {
        showToast("Failed to update account.", "error");
      }
    } catch {
      showToast("An error occurred while updating the account.", "error");
    } finally {
      setIsEditingAccount(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setIsEditingBlog(blog);
  };

  const handleUpdateBlog = async (formData: { title?: string; content?: string }) => {
    if (!isEditingBlog) return;

    try {
      const updatedBlog = await editBlog(isEditingBlog._id, formData);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
      showToast("Blog updated successfully.", "success");
    } catch {
      showToast("Failed to update blog.", "error");
    } finally {
      setIsEditingBlog(null);
    }
  };

  const handleDeleteBlog = (id: string) => {
    openModal("Delete Blog", "Are you sure you want to delete this blog?", async () => {
      try {
        await deleteBlog(id);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        showToast("Blog deleted successfully.", "success");
      } catch {
        showToast("Failed to delete blog.", "error");
      } finally {
        closeModal();
      }
    });
  };

  const handleDeleteAccount = () => {
    openModal("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", async () => {
      try {
        removeToken();
        removeUserDetails();
        logoutUser();
        router.push("/auth");
        showToast("Account deleted successfully.", "success");
      } catch {
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
    <div className="min-h-screen bg-base-100 px-4 lg:px-8">
      <section className="py-8">
        {/* Toast Notifications */}
        {toast && <Toast message={toast.message} type={toast.type} />}

        {/* Modal */}
        {modal && (
          <Modal
            title={modal.title}
            message={modal.message}
            isOpen={modal.isOpen}
            onClose={closeModal}
            onConfirm={modal.onConfirm}
          />
        )}

        {/* User Information Card */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center mb-8">
          {isEditingAccount ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Edit Account</h2>
              <Form
                fields={[
                  { name: "username", label: "Username", type: "text", value: user.username },
                  { name: "email", label: "Email", type: "email", value: user.email },
                  { name: "password", label: "Password", type: "password", placeholder: "Enter new password" },
                ]}
                onSubmit={handleUpdateAccount}
                buttonText="Save Changes"
              />
              <Button
                label="Cancel"
                styleType="secondary"
                onClick={() => setIsEditingAccount(false)}
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-lg text-gray-600 mb-4">{user.email}</p>
              <div className="flex justify-center gap-4">
                <Button
                  label={
                    <>
                      <AiOutlineEdit /> Edit Account
                    </>
                  }
                  styleType="primary"
                  onClick={() => setIsEditingAccount(true)}
                />
                <Button
                  label={
                    <>
                      <AiOutlineDelete /> Delete Account
                    </>
                  }
                  styleType="danger"
                  onClick={handleDeleteAccount}
                />
                <Button
                  label={
                    <>
                      <AiOutlineLogout /> Sign Out
                    </>
                  }
                  styleType="secondary"
                  onClick={() => {
                    logoutUser();
                    router.push("/auth");
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Post New Blog Button */}
        <div className="text-center mb-8">
          <Button
            label={
              <>
                <AiOutlinePlus /> Post a Blog
              </>
            }
            styleType="primary"
            onClick={() => router.push("/blogs/new")}
          />
        </div>

        {/* Blog Editing Form */}
        {isEditingBlog && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <Form
              fields={[
                { name: "title", label: "Title", type: "text", value: isEditingBlog.title },
                { name: "content", label: "Content", type: "textarea", value: isEditingBlog.content },
              ]}
              onSubmit={handleUpdateBlog}
              buttonText="Save Changes"
            />
            <Button
              label="Cancel"
              styleType="secondary"
              onClick={() => setIsEditingBlog(null)}
            />
          </div>
        )}

        {/* User Blogs */}
        <h2 className="text-2xl font-bold text-center mb-8">My Blogs</h2>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
                <Card
                  imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
                  title={blog.title}
                  description={blog.content.substring(0, 100) + "..."}
                  onClick={() => router.push(`/blogs/${blog._id}`)}
                />
                <div className="flex justify-between gap-2 mt-4">
                  <Button
                    label={
                      <>
                        <AiOutlineEdit /> Edit
                      </>
                    }
                    styleType="primary"
                    onClick={() => handleEditBlog(blog)}
                  />
                  <Button
                    label={
                      <>
                        <AiOutlineDelete /> Delete
                      </>
                    }
                    styleType="danger"
                    onClick={() => handleDeleteBlog(blog._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">You havent posted any blogs yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
