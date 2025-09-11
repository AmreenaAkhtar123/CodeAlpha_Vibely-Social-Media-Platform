"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Post created successfully!");
        setContent("");
        setSelectedImage(null);
        setPreviewURL(null);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 from-purple-200 via-pink-200 to-indigo-200 ">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-140 border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
          Create Post
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            required
          ></textarea>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Upload Image
            </label>
            <label className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <span>{selectedImage ? selectedImage.name : "Choose Image"}</span>
              <span className="bg-purple-800 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-purple-700 transition">
                Browse
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="mt-4 w-full object-cover rounded-xl shadow-md h-50"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
