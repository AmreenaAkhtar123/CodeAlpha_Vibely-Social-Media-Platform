"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Same dummy avatar as Navbar
  const dummyAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=meena";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-20 text-lg">No user logged in</div>;
  }

  return (
    <div className="from-purple-200 via-pink-200 to-indigo-200 min-h-screen py-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* User Info */}
        <div className="bg-white/90 shadow-2xl rounded-3xl p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-purple-300 shadow-lg mt-5 mb-4">
            <img
              src={user.avatar || dummyAvatar} 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-purple-800 mb-2">
            @{user.username}
          </h2>
          <p className="text-gray-600 mb-4">{user.bio || "No bio yet."}</p>
        </div>

        {/* Posts Section (later hook to API) */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">Posts</h3>
          <div className="space-y-6">
            {/* posts will be mapped here later */}
          </div>
        </div>
      </div>
    </div>
  );
}
