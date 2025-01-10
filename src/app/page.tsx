"use client";

import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { useFetchBlogs } from "@/hooks/useBlogs";

export default function HomePage() {
  const { blogs, loading } = useFetchBlogs();

  if (loading) {
    return <div className="text-center py-20">Loading blogs...</div>;
  }

  // Fallback: Ensure blogs is always an array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Blogs */}
      <section className="py-8 bg-base-100">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Blogs</h2>
        <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {safeBlogs.map((blog) => (
            <Card
              key={blog._id}
              imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
              title={blog.title}
              description={blog.content.substring(0, 100) + "..."}
              onClick={() => window.location.href = `/blogs/${blog._id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
