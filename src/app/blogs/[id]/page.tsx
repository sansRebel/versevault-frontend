"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBlogById, likeBlog, unlikeBlog, commentOnBlog } from "@/services/blogServices";
import { Blog } from "@/types";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { getUserDetails } from "@/utils/user";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [likedByUser, setLikedByUser] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string } | null>(null);
  const user = getUserDetails();

  const openModal = (title: string, message: string) => {
    setModal({ isOpen: true, title, message });
  };

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    if (!id) return;
  
    const loadBlog = async () => {
      setLoading(true);
      try {
        const blogDetails = await fetchBlogById(id as string);
        setBlog(blogDetails);
        setLikes(blogDetails.likes);
  
        // Check if the user has already liked the blog
        if (user && blogDetails.likedBy.includes(user.username)) {
          setLikedByUser(true);
        }
      } catch (err) {
        setError("Failed to load blog details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadBlog();
  }, [id]); // Dependency array includes only `id`
  

  const handleLikeToggle = async () => {
    if (!user) {
      openModal("Login Required", "You must be logged in to like or unlike a blog.");
      return;
    }

    try {
      if (likedByUser) {
        const updatedLikes = await unlikeBlog(id as string);
        setLikes(updatedLikes);
        setLikedByUser(false);
      } else {
        const updatedLikes = await likeBlog(id as string);
        setLikes(updatedLikes);
        setLikedByUser(true);
      }
    } catch {
      alert("Failed to update like status.");
    }
  };

  const handleComment = async () => {
    if (!user) {
      openModal("Login Required", "You must be logged in to comment on a blog.");
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
      setNewComment("");
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
      {/* Modal */}
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          isOpen={modal.isOpen}
          onClose={closeModal}
          onConfirm={() => {
            closeModal();
            router.push("/auth");
          }}
        />
      )}

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
          <p className="text-lg">
            Author: <strong>{blog.author}</strong>
          </p>
        </article>

        {/* Actions */}
        <div className="flex justify-center gap-4 my-8">
          <Button
            label={likedByUser ? `Unlike (${likes})` : `Like (${likes})`}
            styleType="primary"
            onClick={handleLikeToggle}
          />
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
