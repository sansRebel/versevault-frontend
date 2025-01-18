"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchBlogById, likeBlog, commentOnBlog } from "@/services/blogServices";
import { Blog } from "@/types";
import Button from "@/components/Button";
import { getUserDetails } from "@/utils/user";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = getUserDetails();

  useEffect(() => {
    if (!id) return;
    const loadBlog = async () => {
      setLoading(true);
      try {
        const blogDetails = await fetchBlogById(id as string);
        setBlog(blogDetails);
        setLikes(blogDetails.likes); // Initialize likes count
      } catch (err) {
        setError("Failed to load blog details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a blog.");
      return;
    }

    try {
      const updatedLikes = await likeBlog(id as string);
      setLikes(updatedLikes); // Update likes in the state
    } catch {
      alert("Failed to like the blog.");
    }
  };

  const handleComment = async () => {
    if (!user) {
      alert("You must be logged in to comment on a blog.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await commentOnBlog(id as string, newComment.trim());
      setBlog((prevBlog) => ({
        ...prevBlog!,
        comments: [...(prevBlog?.comments || []), { user: user.username, content: newComment.trim() }],
      }));
      setNewComment(""); // Clear comment input
    } catch {
      alert("Failed to post the comment.");
    }
  };

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
          <Button label={`Like (${likes})`} styleType="primary" onClick={handleLike} />
          <div className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered mr-2"
            />
            <Button label="Comment" styleType="secondary" onClick={handleComment} />
          </div>
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
