"use client";

export default function PostCard({ post }) {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-8 max-w-2xl mx-auto my-6 border border-white/30">
      
      {/* Username */}
      <h3 className="text-purple-800 font-extrabold text-xl md:text-2xl mb-3 tracking-wide">
        @{post.username}
      </h3>

      {/* Content */}
      <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Image */}
      {/* <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Post"
        className="w-full h-64 object-cover rounded-2xl mb-4"
      /> */}

      {/* Likes and Comments */}
      <div className="flex justify-between items-center text-sm md:text-base text-gray-600 font-semibold">
        <span className="flex items-center gap-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">
          ❤️ {post.likes} Likes
        </span>
        <span className="flex items-center gap-2 hover:text-purple-800 transition-colors duration-200 cursor-pointer">
          💬 {post.comments} Comments
        </span>
      </div>
    </div>
  );
}
