"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { fetchUserBlogs } from "@/services/blogServices";
import { Blog } from "@/types";
import { getUserDetails } from "@/utils/user";

export default function ProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const userDetails = getUserDetails();
      setUser(userDetails);

      if (userDetails) {
        const loadUserBlogs = async () => {
          setLoading(true); // Start loading
          try {
            const userBlogs = await fetchUserBlogs();
            setBlogs(userBlogs); // Set blogs data
          } catch (error) {
            console.error("Error fetching user's blogs:", error);
          } finally {
            setLoading(false); // Stop loading
          }
        };

        await loadUserBlogs(); // Call the function
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    };

    initializeUser();
  }, []);

  const handleEditAccount = () => {
    console.log("Edit clicked");
  };

  const handleDeleteAccount = () => {
    console.log("Delete clicked");
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
