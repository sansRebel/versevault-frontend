"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { fetchUserBlogs } from "@/services/blogServices";
import { updateUser, deleteUser } from "@/services/userServices";
import { Blog } from "@/types";
import { getUserDetails, removeUserDetails } from "@/utils/user";
import { removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

export default function ProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const userDetails = getUserDetails();
      setUser(userDetails);

      if (userDetails) {
        try {
          const userBlogs = await fetchUserBlogs();
          setBlogs(userBlogs);
        } catch (error) {
          console.error("Error fetching user's blogs:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleEditAccount = () => {
    setIsEditing(true);
  };

  const handleUpdateAccount = async (formData: { [key: string]: string }) => {
    try {
      const { username, email, password } = formData;
      const updatedUser = await updateUser({ username, email, password });

      // Update local state and storage
      setUser({ username: updatedUser.user.username, email: updatedUser.user.email });
      alert("Account updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account.");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser();
        // Clear local storage and redirect
        removeToken();
        removeUserDetails();
        router.push("/auth");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      }
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">User not logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-8">
        {/* User Information */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
          <p className="text-lg mb-4">{user.email}</p>
          <div className="flex justify-center gap-4">
            <Button label="Edit Account" styleType="primary" onClick={handleEditAccount} />
            <Button label="Delete Account" styleType="danger" onClick={handleDeleteAccount} />
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Account</h2>
            <Form
              fields={[
                { name: "username", label: "Username", type: "text", value: user.username },
                { name: "email", label: "Email", type: "email", value: user.email },
                { name: "password", label: "Password", type: "password", placeholder: "New password (optional)" },
              ]}
              onSubmit={(formData) => {
                const filteredData = Object.entries(formData).reduce<{ [key: string]: string }>((acc, [key, value]) => {
                  if (typeof value === "string") {
                    acc[key] = value; // Include only string fields
                  }
                  return acc;
                }, {});
                handleUpdateAccount(filteredData); // Call the function with filtered data
              }}
              buttonText="Save Changes"
            />

          </div>
        )}

        {/* User Blogs */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">My Blogs</h2>
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : blogs.length > 0 ? (
            <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Card
                  key={blog._id}
                  imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
                  title={blog.title}
                  description={blog.content.substring(0, 100) + "..."}
                  onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You havent posted any blogs yet.</p>
              <Button label="Post a Blog" styleType="primary" onClick={() => (window.location.href = "/blogs/new")} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
