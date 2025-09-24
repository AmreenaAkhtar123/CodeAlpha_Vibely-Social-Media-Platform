"use client";
import { useEffect, useState } from "react";

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Load comments when component mounts
  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  // Handle posting a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id, // adjust if you store user differently
          text,
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      setText(""); // clear input
      fetchComments(); // reload comments after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* Comment input form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          Post
        </button>
      </form>

      {/* Comments list */}
      <div className="mt-4 space-y-2">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b pb-2">
              <p className="font-semibold">
                {comment.user?.username || "Unknown User"}
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
