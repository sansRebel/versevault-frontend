"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { fetchUserBlogs, deleteBlog } from "@/services/blogServices";
import { Blog } from "@/types";
import { getUserDetails, removeUserDetails } from "@/utils/user";
import { removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import { useAuthActions } from "@/hooks/useAuth";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineLogout, AiOutlineDelete } from "react-icons/ai";

export default function ProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
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
              onClick={() => console.log("Edit account clicked")}
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
                    onClick={() => router.push(`/blogs/edit/${blog._id}`)}
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
