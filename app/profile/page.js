"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "https://api.dicebear.com/7.x/avataaars/svg?seed=alpha"
  );
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const avatarOptions = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=alpha",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=beta",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=gamma",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=delta",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=epsilon",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=zeta",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=eta",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=theta",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=iota",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=kappa",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=lambda",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=mu",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=nu",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=xi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=omicron",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=pi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=rho",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=sigma",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=tau",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=upsilon",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=phi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=chi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=psi",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=omega",
  ];

  const dummyAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=meena";

  // Save avatar to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("avatar", avatar);
  }, [avatar]);

  useEffect(() => {
    async function fetchProfileAndPosts() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setBio(data.bio || "");
          setAvatar(data.avatar || avatar);
          
          // Fetch user’s posts
          const postsRes = await fetch("/api/users/me/posts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const postsData = await postsRes.json();
          if (postsRes.ok) setPosts(postsData);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileAndPosts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio, avatar }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setEditing(false);
        alert("Profile updated!");
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading profile...</div>;
  if (!user) return <div className="text-center mt-20 text-lg">No user logged in</div>;

  return (
    <div className="from-purple-200 via-pink-200 to-indigo-200 min-h-screen py-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* User Info */}
        <div className="bg-white/90 shadow-2xl rounded-3xl p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-purple-300 shadow-lg mt-5 mb-4">
            <img
              src={avatar || dummyAvatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-purple-800 mb-2">@{user.username}</h2>
          <p className="text-gray-600 mb-4">{bio || "No bio yet."}</p>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <form onSubmit={handleSave} className="bg-white/90 p-4 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded-lg"
                placeholder="Write your bio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Choose Avatar</label>
              <div className="grid grid-cols-6 gap-3 max-h-64 overflow-y-auto p-2 border rounded-lg">
                {avatarOptions.map((img) => (
                  <img
                    key={img}
                    src={img}
                    onClick={() => setAvatar(img)}
                    className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
                      avatar === img ? "border-purple-600" : "border-gray-300"
                    }`}
                    title={img.split("seed=")[1]}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-lg">
              Save Changes
            </button>
          </form>
        )}

        {/* Posts Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">Posts</h3>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
