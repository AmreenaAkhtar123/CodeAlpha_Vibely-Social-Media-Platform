import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-5 space-y-4">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <img
          src={post.user?.avatar || "https://via.placeholder.com/50"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
            {post.user?.username || post.username}
            {post.createdAt && (
              <span className="text-xs text-gray-500 font-normal">
                • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 text-[15px] leading-relaxed">{post.content}</p>

      {/* Post Image */}
      {post.image && (
        <div className="rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-64 object-cover transition hover:scale-105 duration-300"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex justify-between items-center pt-2 text-gray-600 text-sm border-t border-gray-100">
        <span className="cursor-pointer hover:text-purple-600">
          👍 {post.likes || 0} Likes
        </span>
        <span className="cursor-pointer hover:text-purple-600">
          💬 {post.comments || 0} Comments
        </span>
      </div>
    </div>
  );
}
