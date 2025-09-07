"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0].name);
      setPreviewURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex items-center justify-center mt-50 from-purple-200 via-pink-200 to-indigo-200">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-140 border border-white/30">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
          Create Post
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <textarea
            placeholder="What's on your mind?"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
          ></textarea>

          {/* Custom Image Upload */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Upload Image</label>
            <label className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <span>{selectedImage ? selectedImage : "Choose Image"}</span>
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

            {/* Image Preview */}
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="mt-4 w-full object-cover rounded-xl shadow-md"
              />
            )}
          </div>

          <button className="w-full bg-purple-800 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
