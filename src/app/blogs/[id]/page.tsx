"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBlogById, likeBlog, unlikeBlog, commentOnBlog } from "@/services/blogServices";
import { Blog } from "@/types";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { getUserDetails } from "@/utils/user";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

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
  }, [id]);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-100">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
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

      <section className="container mx-auto max-w-4xl px-4 py-8">
        {/* Blog Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">{blog.title}</h1>
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full max-w-4xl rounded-lg shadow-lg mx-auto object-cover"
            />
          )}
        </header>

        {/* Blog Content */}
        <article className="px-4 sm:px-8">
          <p className="text-lg leading-8 mb-8">{blog.content}</p>
          <p className="text-lg text-gray-600">
            Author: <strong>{blog.author}</strong>
          </p>
        </article>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 my-8 items-center">
          <Button
            label={
              <span className="flex items-center">
                {likedByUser ? <AiFillHeart className="mr-2 text-red-500" /> : <AiOutlineHeart className="mr-2" />}
                {likedByUser ? "Unlike" : "Like"} ({likes})
              </span>
            }
            styleType="primary"
            onClick={handleLikeToggle}
          />
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full max-w-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              label={
                <span className="flex items-center">
                  <AiOutlineComment className="mr-2" /> Comment
                </span>
              }
              styleType="secondary"
              onClick={handleComment}
            />
          </div>
        </div>

        {/* Comments Section */}
        <section className="px-4 sm:px-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {blog.comments && blog.comments.length > 0 ? (
            <div className="space-y-4">
              {blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow flex items-start"
                >

                  <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p>{comment.content}</p>
                  </div>
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
