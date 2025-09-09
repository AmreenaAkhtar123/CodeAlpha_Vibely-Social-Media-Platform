import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

// Create Comment (POST)
export async function POST(req) {
  try {
    await connectDB();
    const { userId, postId, text } = await req.json();

    if (!userId || !postId || !text) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Ensure post exists
    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    const newComment = await Comment.create({ user: userId, post: postId, text });

    return new Response(JSON.stringify({ message: "Comment added", comment: newComment }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Get all comments (GET)
export async function GET() {
  try {
    await connectDB();
    const comments = await Comment.find()
      .populate("user", "username profilePic")
      .populate("post", "text")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
