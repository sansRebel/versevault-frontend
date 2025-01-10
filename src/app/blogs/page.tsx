"use client";

import Card from "@/components/Card";
import { useState, useEffect } from "react";
import { fetchBlogs, searchBlogs } from "@/services/blogServices";
import { Blog } from "@/types";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchBlogs(searchQuery); // Use the search API
          setBlogs(results);
        } else {
          const results = await fetchBlogs(); // Fetch all blogs without pagination
          setBlogs(results);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [searchQuery]); // Trigger on search query change

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-8">
        <h2 className="text-4xl font-bold text-center mb-8">All Blogs</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search blogs..."
            className="input input-bordered w-full max-w-md"
          />
        </div>

        {/* Blogs */}
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
                onClick={() => window.location.href = `/blogs/${blog._id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">No blogs found.</div>
        )}
      </section>
    </div>
  );
}
