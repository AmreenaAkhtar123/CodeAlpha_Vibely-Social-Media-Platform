"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Mock current logged-in user
  // Later, replace this with real authentication (JWT or NextAuth)
  const currentUser = {
    _id: "66abc12345def67890ghijk", // put a real MongoDB userId
    username: "Meena",
    profilePic: "/default-avatar.png",
  };

  // ✅ Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} currentUser={currentUser} />
        ))
      ) : (
        <p className="text-center text-gray-500">No posts yet.</p>
      )}
    </main>
  );
}
