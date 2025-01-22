"use client";

import Card from "@/components/Card";
import Spinner from "@/components/Spinner"; // Import the Spinner component
import { useState, useEffect } from "react";
import { fetchBlogs, searchBlogs } from "@/services/blogServices";
import { Blog } from "@/types";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/animations";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchBlogs(searchQuery);
          setBlogs(results);
        } else {
          const results = await fetchBlogs();
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
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Explore Blogs</h1>
          <p className="text-lg text-gray-300">
            Discover articles written by our amazing community.
          </p>
        </div>
      </div>

      <section className="py-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8 px-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search blogs..."
              className="input input-bordered w-full shadow-lg rounded-lg pl-10"
            />
            <svg
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Blogs */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner />
          </div>
        ) : blogs.length > 0 ? (
          <motion.div
            className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {blogs.map((blog) => (
              <motion.div key={blog._id} variants={fadeIn}>
                <Card
                  imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
                  title={blog.title}
                  description={blog.content.substring(0, 100) + "..."}
                  onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center">
            <img
              src="/assets/no-results.svg"
              alt="No results"
              className="w-64 mx-auto mb-4"
            />
            <p className="text-lg text-gray-500">
              No blogs found. Try searching for something else!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
