"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";

const sampleUserData = {
  username: "meena",
  bio: "Love coding and coffee ☕",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80",
};

const samplePosts = [
  { id: "p1", username: "meena", content: "My first post 🎉", likes: 3, comments: 1 },
  { id: "p2", username: "meena", content: "Working on Vibely 🚀", likes: 5, comments: 2 },
];

export default function ProfilePage({ params }) {
  const [user, setUser] = useState(sampleUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(user.username);
  const [tempBio, setTempBio] = useState(user.bio);

  const handleSave = () => {
    setUser({ ...user, username: tempUsername, bio: tempBio });
    setIsEditing(false);
  };

  return (
    <div className=" from-purple-200 via-pink-200 to-indigo-200 min-h-screen py-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* User Info Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 border border-white/30 relative text-center overflow-hidden">
          
          {/* Edit Button */}
          <button
            className="absolute top-4 right-4 bg-purple-800 text-white px-3 py-1 rounded-lg font-semibold hover:bg-purple-700 transition-shadow shadow-md hover:shadow-lg"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          {/* Profile Avatar */}
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-purple-300 shadow-lg mt-5 mb-4">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          {/* Username */}
          <h2 className="text-2xl font-extrabold text-purple-800 mb-2">
            @{user.username}
          </h2>

          {/* Bio */}
          <p className="text-gray-600 mb-4">{user.bio}</p>

          {/* Gradient Ribbon / Glow */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 opacity-20 blur-3xl pointer-events-none"></div>

          {/* Edit Modal */}
          {isEditing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col justify-center items-center rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-purple-800">Edit Profile</h3>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                placeholder="Bio"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <div className="flex gap-4">
                <button
                  className="bg-purple-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">Posts</h3>
          <div className="space-y-6">
            {samplePosts.map((post) => (
              <div className="transform hover:scale-[1.02] transition-all duration-300" key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
