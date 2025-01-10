"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams
import { fetchBlogById } from "@/services/blogServices";
import { Blog } from "@/types";
import Button from "@/components/Button";

export default function BlogDetailsPage() {
  const { id } = useParams(); // Access the dynamic route parameter
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Wait for the ID to be available
    const loadBlog = async () => {
      setLoading(true);
      try {
        const blogDetails = await fetchBlogById(id as string);
        setBlog(blogDetails);
      } catch (err) {
        setError("Failed to load blog details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading blog...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-8">
        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full max-w-4xl rounded-lg shadow-md"
              />
            )}
          </div>
        </header>

        {/* Blog Content */}
        <article className="px-4 lg:px-24">
          <p className="text-lg mb-8">{blog.content}</p>
          <p className="text-lg">Author: <strong>{blog.author}</strong></p>
        </article>

        {/* Actions */}
        <div className="flex justify-center gap-4 my-8">
          <Button label="Like" styleType="primary" />
          <Button label="Comment" styleType="secondary" />
        </div>

        {/* Comments Section */}
        <section className="px-4 lg:px-24">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {blog.comments && blog.comments.length > 0 ? (
            <div className="space-y-4">
              {blog.comments.map((comment, index) => (
                <div key={index} className="p-4 bg-base-200 rounded-lg shadow">
                  <p>
                    <strong>{comment.user}:</strong> {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </section>
      </section>
    </div>
  );
}
