"use client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post, currentUser }) {
	// ✅ Guard against undefined values
	const postId = post?._id;
	const currentUserId = currentUser?._id;

	const [likes, setLikes] = useState(post?.likes?.length || 0);
	const [commentsCount, setCommentsCount] = useState(post?.commentsCount || 0);
	const [comments, setComments] = useState([]);
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [loadingComments, setLoadingComments] = useState(false);
	const [liked, setLiked] = useState(
		post?.likes?.some((id) => id === currentUserId) || false
	);
	const [likeLoading, setLikeLoading] = useState(false);

	// ✅ Handle Like Toggle
	const handleLike = async () => {
		if (!postId || !currentUserId) {
			console.warn("Post ID or User ID missing");
			return;
		}

		setLikeLoading(true);

		// Optimistic UI update
		setLikes((prev) => (liked ? prev - 1 : prev + 1));
		setLiked(!liked);

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("No token found in localStorage");
				return;
			}

			const res = await fetch(`/api/posts/${postId}/like`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				// revert if failed
				setLiked((prev) => !prev);
				setLikes((prev) => (liked ? prev + 1 : prev - 1));
				console.error("Like API error:", data.error);
			} else {
				setLikes(data.likes ?? 0);
			}
		} catch (err) {
			console.error("Like error:", err);
			setLiked((prev) => !prev); // revert UI
		} finally {
			setLikeLoading(false);
		}
	};

	// ✅ Fetch Comments
	const fetchComments = async () => {
		if (!postId) return;

		if (showComments) {
			setShowComments(false);
			return;
		}

		setLoadingComments(true);
		try {
			const res = await fetch(`/api/posts/${postId}/comments`);
			const data = await res.json();
			if (res.ok) {
				setComments(data);
				setShowComments(true);
			}
		} catch (err) {
			console.error("Fetch comments error:", err);
		} finally {
			setLoadingComments(false);
		}
	};

	// ✅ Add Comment
	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!newComment.trim() || !postId) return;

		try {
			const res = await fetch(`/api/posts/${postId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ text: newComment }),
			});

			const data = await res.json();
			if (res.ok) {
				setComments((prev) => [...prev, data]);
				setNewComment("");
				setCommentsCount((prev) => prev + 1);
			} else {
				alert(data.error || "Failed to post comment");
			}
		} catch (err) {
			console.error("Error posting comment:", err);
		}
	};

	return (
		<div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-5 space-y-4">
			{/* User Info */}
			<div className="flex items-center space-x-3">
				<img
					src={post?.user?.profilePic || "/default-avatar.png"}
					alt={post?.user?.username || "User avatar"}
					className="w-10 h-10 rounded-full object-cover border border-gray-300"
				/>
				<div>
					<h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
						{post?.user?.username || post?.username || "Unknown User"}
						{post?.createdAt && (
							<span className="text-xs text-gray-500 font-normal">
								•{" "}
								{formatDistanceToNow(new Date(post.createdAt), {
									addSuffix: true,
								})}
							</span>
						)}
					</h3>
				</div>
			</div>

			{/* Post Content */}
			<p className="text-gray-700 text-[15px] leading-relaxed">{post?.content}</p>

			{/* Post Image */}
			{post?.image && (
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
				<button
					onClick={handleLike}
					disabled={likeLoading}
					className={`cursor-pointer flex items-center gap-1 ${
						liked ? "text-red-500" : "text-gray-600 hover:text-purple-600"
					}`}
				>
					❤️ {likes} Likes
				</button>

				<button
					onClick={fetchComments}
					className="cursor-pointer hover:text-purple-600 flex items-center gap-1"
				>
					💬 {commentsCount} Comments
				</button>
			</div>

			{/* Comments Section */}
			{showComments && (
				<div className="mt-3 space-y-3 border-t pt-3">
					{/* Add Comment Form */}
					<form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
						<input
							type="text"
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Write a comment..."
							className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none"
						/>
						<button
							type="submit"
							className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700"
						>
							Post
						</button>
					</form>

					{/* Comments List */}
					{loadingComments ? (
						<p className="text-gray-500 text-sm">Loading comments...</p>
					) : comments.length === 0 ? (
						<p className="text-gray-500 text-sm">No comments yet.</p>
					) : (
						comments.map((comment) => (
							<div key={comment._id} className="flex items-start gap-2">
								<img
									src={comment.user?.profilePic || "/default-avatar.png"}
									alt={comment.user?.username || "User"}
									className="w-8 h-8 rounded-full object-cover border"
								/>
								<div className="bg-gray-100 px-3 py-2 rounded-lg">
									<span className="font-semibold">
										{comment.user?.username || "Unknown"}
									</span>{" "}
									<p className="text-sm">{comment.text}</p>
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
